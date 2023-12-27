No, its not a roBOT, its a <b>B</b>ag <b>o</b>f <b>T</b>ricks!

# Bag of Tricks for Astro's View Transitions

The bag of tricks provides support around Astro's view transitions.

![Build Status](https://github.com/martrapp/astro-vt-bot/actions/workflows/astro.yml/badge.svg)
[![npm version](https://badge.fury.io/js/astro-vtbot.svg)](https://badge.fury.io/js/astro-vtbot)

A current deployment of tech demos and the documentation can be found at https://events-3bg.pages.dev/

<span style="font-size: max(2rem,calc(100vw / 30)); float: left; padding: 0 0.5rem 0rem 0;">📓</span><span style="font-size:max(1rem,calc(100vw / 60));">Above all, this includes the [>>>  Jotter <<<](https://events-3bg.pages.dev/docs/Jotter/) with a wealth of information on transition events as well as background information and valuable tips & tricks on view transitions in Astro.</span>

Some of the contents are technical demos, some are useful tools, and some are reusable components that you can use in your own project to handle edge cases that go beyond Astro's standard features.

## Tech Demos

The bag of tricks currently contains [several technical demos](https://events-3bg.pages.dev/demos/) that show examples of the implementation of various effects using the view transition events.

The sources are in the [`example` folder](https://github.com/martrapp/astro-vt-bot/tree/main/example).

## Reusable Components

For functionality and usage [see the documentation](https://events-3bg.pages.dev/components/).

### Feature Enhancements

#### In this release

- `<ReplacementSwap />`: An alterantive DOM swap(), which preserves elements in the original DOM to avoid reinitialization of iframes or CSS animations.

#### Ideas for upcomming components

- A component that identifies and activates the current link in a persistent navigation bar
- A component that preloads images used in view transitions (including load indicator)

### Development support

#### In this release

- `<VtBotDebug />`: A Debugging component that logs the events and their data as they occur.


- `<Linter>`: A linter component that helps you identify problems when setting up transitions.

## Todo list

- find & fix bugs
- provide additional components and demos

