No, its not a roBOT, its a <b>B</b>ag <b>o</b>f <b>T</b>ricks!

# Astro Bag of Tricks for View Transitions

The bag of tricks provides components that demonstrate Astro's View Transition API.
Some of these are technical demos, some are useful tools, and some will evolve into reusable components that you can use in your own project to handle edge cases that go beyond Astro's standard features.

## Tech Demos

The bag of tricks currently contains ten technical demos that show examples of the implementation of various effects using the view transition events.

A current deployment of this code can be found at https://events-3bg.pages.dev/

The sources are in the `example` folder.

## Useful Tools

These are work in progress:

Ideas for upcomming components are:

- A Debugging component that logs the events and their data as they occur.
- A Linter component to help you identify problems with transition setup.

For functionality and usage [see the deployed documentation](https://events-3bg.pages.dev/docs/Reusables/) or [here for the local source](./example/src/pages/docs/Reusables.mdx).

## Reusable Components

Also work in progress:

Ideas for upcomming components are:

- A component that identifies and activates the current link in a persistent navigation bar
- An alterantive DOM swap(), which preserves elements in the original DOM to avoid reinitialization of iframes or CSS animations
