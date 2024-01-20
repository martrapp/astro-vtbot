No, its not a roBOT, its a <b>B</b>ag <b>o</b>f <b>T</b>ricks!

# **Bag of Tricks** for Astro's **View Transitions**

The bag of tricks provides extensions & support around Astro's view transitions.

![Build Status](https://github.com/martrapp/astro-vt-bot/actions/workflows/astro.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/astro-vtbot)](https://www.npmjs.com/package/astro-vtbot)


A current deployment of tech demos and the documentation can be found at https://events-3bg.pages.dev/

## !!! NEW TRICKS IN THE BAG !!!

> The bag of tricks now includes [pre-built animations](https://events-3bg.pages.dev/animations/one/) that you can use with your view transitions, just like Astro's built-in `fade()` and `slide()`! Use vtbot's `zoom()` and `swing()` with Astro's `transition:animate` or enjoy completely new freedom in designing view transitions using the advanced parameterization options and the new `<AnimationStyle/>` component!

## Reusable Components

* In need for extensions for view transitions because you have issues with iframes on your pages?
* Wanting support in understanding and debugging view transitions or simply want a second pair of eyes on your view transition settings?
* Looking for reusable animations or special transition effects?

Its all [here and growing](https://events-3bg.pages.dev/components/)😊

- `<ReplacementSwap/>`: An alterantive DOM swap(), which preserves elements in the original DOM to avoid reinitialization of iframes or CSS animations.

- `<VtBotDebug/>`: A Debugging component that logs the events and their data as they occur.

- `<Linter/>`: A linter component that helps you identify problems when setting up transitions.

- `Zoom` and `Swing` animations and the `<AnimationsStyle/>` component allows for extended styling options.

- `<Portal/>` component that forces all view transitions through a portal/loading page. 

## Tech Demos

The bag of tricks currently contains [several technical demos](https://events-3bg.pages.dev/demos/) that show examples of the implementation of various effects using the view transition events.

The sources are in the [`example` folder](https://github.com/martrapp/astro-vt-bot/tree/main/example).

## The Jotter
📓 Last but not least, the deployment also includes the [▶ Jotter ◀](https://events-3bg.pages.dev/docs/Jotter/) with a wealth of information on transition events as well as background information and valuable tips & tricks on view transitions in Astro.

Some of the contents are technical demos, some are useful tools, and some are reusable components that you can use in your own project to handle edge cases that go beyond Astro's standard features.

