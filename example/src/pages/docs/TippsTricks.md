# Tips & Tricks

## Page markers & guards

When you navigate to a new page in a typical multi-page application, the state of the previous page is completely erased. You start the new page with a clean module loader, all scripts are gone, as are all event listeners.

This is different for view transitions. Since you keep the same document and just swap in new content, your scripts and handlers will slowly accumulate. Astro has taken some precautions to make your life easier: If you switch to a page that defines a script that has already been executed, it will not be executed again. This way you don't add the same event listener twice. 

But if you have a good idea for an event listener that helps you transition from page A to page B and another one for the transition from B to C, you have two listeners. If you do not explicitly remove it, the A-B listener is still active when you switch from B to C.

Only when you explicitly reload a page without view transitions does the browser forget the listeners.  
