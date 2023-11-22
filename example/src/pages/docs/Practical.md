# A Guide for Practitioners on View Transition Events

## There are 5 events now? How do I choose the right one?

The events are assigned to five positions in the transition process: The beginning and end of the preparation phase, the beginning and end of the swap phase and during the completion phase. Three of them (`astro:after-preparation`, `astro:after-swap`, `astro:page-load`) are used to notify your code that a certain point in the processing has been reached. The other two events (`astro:before-preparation` and `astro:before-swap`) have additional properties and functions to control the transition process.

While some things can be done in any event, some tasks can only be performed in a specific event, see details below.

## I want to have different bahavior for different links on the page

You can use the `sourceElement` property of the `astro:before-*` events to access the anchor element, button or form that triggered the navigation. There you can test for additional information like presents of `data-` attributes or style-classes.

## I want to show some "loading..." indicator

Use the event listener of the `astro:before-preparation` event to enable the indicator. Hide the indicator in the event listener for the astro:after-preparation event. This ensure that the indicator is removed before the view transition starts and is not part of the initial screenshot. No need to set loader callback or modify event properties.

## I want to add my own custom animation

Await the `ready` promise of the `viewTransition` object. Or have your animation triggered by the insertion of the pseudo elements of the view transition API, [see details here](https://developer.chrome.com/docs/web-platform/view-transitions/)

## I want to prefetch images in the target page

View transitions from thumbnails to large images in target files look very ugly if the target image is not available when the transition starts. For better results, preload the images before the view transition begins.

Define a new `loader` function for the `astro:before-preparation` event. Call the original `loader` function to do the heavy lifting and get the content of the next page in the `newDocument` property. Find the images you want to preload and load them into the cache. Use `Promise.all()` to `await` that all images are ready.

## I want to optimize the number of objects taking part in a transition

In the listener for the `astro:after-preparation` event you have access to the current and the future page content. At that point you could remove animation paires that would otherwise lead to ugly fly throughs when part of them are outside the current view port and others are not. You could also introduce new pairs right before the view transition to get some last minute optimization on the `::view-transition-group` effect.

## I want to use a different loader that can output percentage events during loading.

Yes, you can do that by overriding the `loader` property of the `astro:before-preparation` event. You should take a look at the current source code and copy most of it, as it has already had some bug fixes to handle corner cases.

## The default swapping of view transitions resets iframes and animations

Define your own swap algorithm: overwrite the `swap` property in the `astro:before-swap` event. Instead of throwing the `newDocument` on the old one, do a diff of the two structures and only change the bare minimum of the existing DOM to finally reflect the desired outcome.

## Do all event listeners and callbacks have to be synchronous?

All event listeners should only execute synchronous code. The reason for this is that `EventTarget.dispatchEvent()` cannot be `await`ed for. Another restriction results from the way view transitions work. While the browser executes the code between `astro:before-swap` and `astro:after-swap`, the user interface is frozen. The browser also enforces a strict timeout of a few seconds to ensure that this freeze does not last too long. For this reason, the `swap` callback of the `astro:before-swap` event is not `await`ed for.

You can use asynchronous code in the event listeners and callbacks, but the processing would not wait for that code to complete and it would actually be executed in parallel with the view transition. So this is clearly not recommended.

## I need to execute and await some asynchronous code during the transition

The only way to run asynchronous code during transitions and wait for it to complete is to run it via the `loader` hook of the `astro:before-preparation` event. With this hook, you can load files from the net, compile Rust into WASM, call ChatGPT for help, or perform any other time-consuming preparation your transition requires.
