# Tips & Tricks

## Page Marker & Guard

When you navigate to a new page in a typical multi-page application, the state of the previous page is completely erased. You start the new page with a clean module loader, all scripts are gone, as are all event listeners.

This is different for view transitions. Since you keep the same document and just swap in new content, your scripts and handlers will slowly accumulate. Astro has taken some precautions to make your life easier: If you switch to a page that defines a script that has already been executed, it will not be executed again. This way you don't add the same event listener twice. 

But if you have a good idea for an event listener that helps you transition from page A to page B and another one for the transition from B to C, you have two listeners. If you do not explicitly remove it, the A-B listener is still active when you switch from B to C.

Only when you explicitly reload a page without view transitions does the browser forget the listeners.  

Removing and reinstalling event listeners is tedious, and even if your website uses several, their number will be small. There is a simple pattern that has worked well for websites with multiple listeners:

1. define your handler as an `.astro` component, which should be used in the `<head>` in the same way as the `ViewTransition/>` element.
3. insert a `<meta/>` element with your marker (this is the reason why our component should be used in the `<head>`)
4. define a function `enabled()` in the script part that checks if the `<meta/>` with your marker string is present.
5. call the `enabled()` function in your event listener to ensure that it is only executed on the pages you intended. 
 
``` astro
<meta name="your-marker" content="true" /> <!-- mark this page -->

<script>
  const enabled = () => !!document.querySelector('meta[name="your-marker"]');

  function listener(event) {
    if (enabled() && ...) {
      ...
    }
  }
```

Alternatively, you can also check the `event.from` and `event.to` values at the beginning of the listener to see whether you want to apply your listener for this transition.

``` js
  function listener(event) {
    if (event.from.endswith("/good-from/") || event.to.endsWith("/good-to/")) {
      ...
    }
  }
```

## TypeScript

All event listeners have a single parameter of type `Event`. This type does not know the special properties that a `TransitionBeforePreparationEvent` or a `TransitionBeforeSwapEvent` has. For type-safe access to these properties, you can use the provided functions `isTransitionBeforePreparationEvent` and `isTransitionBeforeSwapEvent`:

``` ts
<script>
  import { isTransitionBeforeSwapEvent} from 'astro:transitions/client';
  
  function listener(event: Event) {
    if (enabled() && isTransitionBeforeSwapEvent(event)) {
      event.direction = ...
    }
  }
```
