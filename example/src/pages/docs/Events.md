# View Transition Events (Technical View)

## View Transition Processing

There are currently four types of actions that trigger Astro's View Transitions:
1. cLicking on a link (HTML `<a>` Element, soon add SVG Anchor and `<map><area>`)
2. submitting a form
3. triggering history navigation browser user interface buttons, keyboard shortcuts, or calls to `history` functions `back()`, `forward()`, or `go()`
4.  calling the function `navigate()`, which is provided by `astro:transitions/client`

Processing begins with a preparation phase that loads the DOM of the target page. Then the actual view transition begins, which takes a screenshot of the current view (green line), swaps the current DOM with the contents of the loaded DOM and then starts the visual transition from the old to the new view (red line). 

``` mermaid
graph
subgraph nav["Client-Side Navigation"]
  subgraph vtp["View Transition Promises"]
  direction LR
  g>updateCallbackDone]~~~h>ready]~~~i>finished]
  end
  subgraph p["Preparation Phase"]
    a{{astro:before-preparation}}-->
    b[["Loader()"<br>load DOM of target page]]-->
    c{{astro:after-preparation}}
  end
  subgraph vt["View Transition"]
    d([startViewTransition])
    subgraph s["Swap DOM Phase"]
      t{{astro:before-swap}}-->
      u[["Swap()"<br>update current DOM<br>with loaded DOM]]-->
      v([update history state<br>and scroll position])-->
      w{{astro:after-swap}}
    end
    subgraph f["Completion Phase"]
      x([Run scripts])-->
      y{{astro:page-load}}-->
      z([Announce Route])-->
      zz([await finished])-->
      zzz([Cleanup])
    end
  end
  p-->d==>s==>f
  d-.->vtp
end

linkStyle 13 stroke:#faa
linkStyle 12 stroke:#afa

style b stroke:#585,stroke-width:1px,color:#fff
style nav fill:#888,stroke:#555,stroke-width:4px,color:#fff
style p fill:#564,stroke:#555,stroke-width:4px,color:#fff
style vt fill:#456,stroke:#555,stroke-width:4px,color:#fff
style s fill:#457,stroke:#777,stroke-width:4px,color:#fff
style vtp fill:#467,stroke:#777,stroke-width:4px,color:#fff
style f fill:#654,stroke:#777,stroke-width:4px,color:#fff
style x stroke:#855,stroke-width:1px,color:#fff
style z stroke:#855,stroke-width:1px,color:#fff

style a fill:#fea,stroke:#ddd,stroke-width:2px,color:#000
style c fill:#fea,stroke:#ddd,stroke-width:2px,color:#000
style t fill:#fea,stroke:#ddd,stroke-width:2px,color:#000
style w fill:#fea,stroke:#ddd,stroke-width:2px,color:#000
style y fill:#fea,stroke:#ddd,stroke-width:2px,color:#000
```
In the completion phase, the newly added scripts are executed, the page title of the new route is announced for users of assistive technologies and some clean-up work is carried out at the end. 

During the view transition, a view transition object exists with three promises that are resolved or rejected at different points during the visual transition. Users can use these to trigger custom code. For details see the [View Transition documentation](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition) on MDN. 

## Events

The yellow blocks in the diagram above mark the positions in Astro's navigation processing at which events are triggered. There are five events.
* `astro:before-preparation` and `astro:after-preparation` at the beginning and end of the preparation phase.
* `astro:before-swap` and `astro:after-swap` at the beginning and end of the swap phase.
* `astro:page-load` during the closing phase.

The `astro:after-` events and the `astro:page-load` event are standard `Event` objects. Their main purpose is to allow the user code to react to navigation behavior at different points of processing. 

The `astro:before` events provide navigation-specific properties 
that show details of the processing. Some of these properties are even writable to give users control over the behavior of navigation processing.

All five events fire on `window.document`.

### The `astro:before-preparation` Event


``` TypeScript events.ts
readonly from: URL // The page where the navigation started 
to: URL // The destination of the navigation. 
direction: Direction | string // The values directly supported by Astro are 'forward' and 'backward', but this can be extended to other values. This property is writable.
readonly navigationType: NavigationTypeString // 'traverse' | 'push' | 'replace' 
readonly sourceElement: Element // If triggered by a link navigation, the anchor element. If triggered by form submission, the submitter (and if submitter is null, the form element). Can also be set via the sourceElement property of the options parameter on a call to navigate()
readonly info: any // If the transition was initiated by a call to navigate(), the value of options.info. Set to an empty object if undefined.
newDocument: Document // The DOM to be transitioned to. This can be an empty DOM if swap() manipulates the current DOM in place.
readonly formData: FormData // Automatically filled in if the navigation was triggered by a form. If the navigation was triggered by a call to navigate(), the value of options.formData.
loader: () => Promise<void>  // A function that sets event.newDocument to the contents of event.to.
```

While the event listener code must run synchronously, the loader function will perform asynchronous actions. 

The `loader` property initially holds Astro's built-in implementation for loading the contents of `event.to` into `event.newDocument`. An event listener might override the value of the `loader` property to define a completely independent implementation. But more often than not, a listener will keep the original value of `loader` and use it to define its own version. 

``` JavaScript listener.js
const originalLoader = event.loader;
event.loader = async () => {
  doSomeThingBefore(event);
  await originalLoader();
  doSomeThingAfter(event)
}
```

Several listener might cooperate and build a Chain of Responsibility by wrapping the loader in several layers like an onion.

``` mermaid
graph TD
subgraph a["render loading indicator"]
subgraph b["prefetch target images"]
subgraph c["optimize off-viewport transitions"]
subgraph d["original loader"]
end end end end

style a fill:#9bf,stroke:#555,stroke-width:2px,color:#000
style b fill:#8ae,stroke:#555,stroke-width:2px,color:#000
style c fill:#79d,stroke:#555,stroke-width:2px,color:#000
style d fill:#68c,stroke:#555,stroke-width:2px,color:#000
```

|  |  |
|---|---|
|Type|`astro:before-preparation` |
|TypeScript Type|`TransitionBeforePreparationEvent`
|Cancelable| yes|

### The `astro:before-swap` Event
Most of the properties of the `astro:before-swap` event are identical to those of the `astro:before-preparation` event. The differences are:
* `direction` is `readonly` in `astro:before-swap`
* `loader` is not defined in `astro:before-swap`
The `astro:before-swap`event offeres two additional properties:
``` TypeScript event.ts
swap: () => void // Initially, Astro's built-in implementation of the swap() operation. The task of the swap operation is to update the current DOM, typically to reflect the contents of event.newDocument.  
readonly viewTransition: ViewTransition // The object returned by startViewTransition().  
``` 

The `swap()` method of the `astro:before-swap` event is used in a very similar way as `loader()` of `astro:before-preparation` event. It is possible to override the built-in implementation by assigning to the `swap` property and it is possible to build chains with several wrappers. Other tan `loader` swap does *not* support asynchronous actions. Browser implementations of view transition put a rather rigid timout on the code that can run during swap. Long running code should be moved to the loader callback.     

|  |  |
|---|---|
|Type|`astro:before-swap` |
|TypeScript Type|`TransitionBeforeSwapEvent`
|Cancelable| no|
