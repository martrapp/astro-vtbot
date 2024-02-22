No, its **_NOT_** a roBOT 🤖, its a 👜 <b>B</b>ag <b>o</b>f <b>T</b>ricks!✨

# **Bag of Tricks** for Astro's **View Transitions**

The bag of tricks provides extensions & support around Astro's view transitions.

![Build Status](https://github.com/martrapp/astro-vtbot/actions/workflows/run-tests.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/astro-vtbot)](https://www.npmjs.com/package/astro-vtbot)

A current deployment of tech demos and the documentation can be found at https://events-3bg.pages.dev/

## !!! NEW TRICKS ✨ IN THE BAG 👜 !!!

> ↹  You can now tell the  `<ReplacementSwap />` component which attributes of the `<html>`element [to preserve]() during view transitions!

### Recently learned tricks ##

> ⏳ [New Component](https://events-3bg.pages.dev/library/LoadingIndicator/): `<LoadingIndicator/>` is added per default when `astro-vtbot` is installed as an Astro integration with `npx astro add astro-vtbot`.

> 🎥 The bag of tricks now includes [pre-built animations](https://events-3bg.pages.dev/animations/one/) that you can use with your view transitions, just like Astro's built-in `fade()` and `slide()`! Use vtbot's `zoom()` and `swing()` with Astro's `transition:animate` or enjoy completely new freedom in designing view transitions using the advanced parameterization options and the new `<AnimationStyle/>` component!

## Reusable Components 🧩

- In need for extensions for view transitions because you have issues with iframes on your pages?
- Wanting support in understanding and debugging view transitions or simply want a second pair of eyes on your view transition settings?
- Looking for reusable animations or special transition effects?

The `astro-vtbot`package isn't a monolithic library. Use the components you need and only pay bandwidth for those.
|Component|Brotli bytes added|
|-------|-----------------|
BrakePad 🦥 | ~0.1k
Linter 🧹 | ~2k
LoadingIndicator ⏳ | ~0.6k
NoScroll 📜| ~0.1k
Portal 🚪 | ~0.3k
ReplacementSwap ↹ | ~0.5k
Swing 🎷 | ~0.5k
VtBotDebug 🐛 | ~2.6k
Zoom 🔎 | ~0.5k

Visit [the documentation](https://events-3bg.pages.dev/components/) of the reusable components for detailed information.

- `<Linter/>`: A linter component that helps you identify problems when setting up transitions.

- `<VtBotDebug/>`: A Debugging component that logs the events and their data as they occur.

- `<ReplacementSwap/>`: An alterantive DOM swap(), which preserves elements in the original DOM to avoid reinitialization of iframes or CSS animations.

- `<LoadIndicator>`: Have you ever missed the visual feedback on sites with view transitions as to whether the app has noticed the click? Here you go!

- `Zoom` and `Swing` animations and the `<AnimationsStyle/>` component allows for extended styling options.

- `<Portal/>` component that forces all view transitions through a portal/loading page.

- `<NoScroll/>` keep the current vertical and horizontal scroll position when transitioning to the next page.

## Tech Demos 🔥

The bag of tricks currently contains [several technical demos](https://events-3bg.pages.dev/demos/) that show examples of the implementation of various effects using the view transition events.

The sources are in [this repository](https://github.com/martrapp/astro-vtbot-website).

## The Jotter 📓

Last but not least, the deployment also includes the [▶ Jotter ◀](https://events-3bg.pages.dev/docs/Jotter/) with a wealth of information on transition events as well as background information and valuable tips & tricks on view transitions in Astro.

Some of the contents are technical demos, some are useful tools, and some are reusable components that you can use in your own project to handle edge cases that go beyond Astro's standard features.

## Troubleshooting

For help, check out the `Discussions` tab on the [GitHub repo](https://github.com/martrapp/astro-vtbot/discussions).

## Contributing

This package is maintained by [martrapp](https://github.com/martrapp) independently from Astro. You're welcome to contribute by submitting an issue or opening a PR!

## Changelog

See [CHANGELOG.md](https://github.com/martrapp/astro-vtbot/blob/main/CHANGELOG.md) for a history of changes to this package.
