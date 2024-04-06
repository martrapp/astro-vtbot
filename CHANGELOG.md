# The Bag of Tricks for View Transitions

## 1.7.4 - 2024-04-06

### Patch Changes

- b35d054: Makes the viewTransitionsFallback property optional in the Starlight integration.

## 1.7.3 - 2024-04-05

### Patch Changes

- 3e61ad9: Fixes an issue where view transitions reset Starlight's ThemeSelector to show an incorrect value.

## 1.7.2 - 2024-04-02

### Patch Changes

- 9e8532a: Fixes a bug accessing an attribute of null when linking to view transition pages outside the starlight site.

## 1.7.1 - 2024-04-02

### Patch Changes

- 0a21a85: Fixes an issue with the sidebar when navigating from or to pages with `template:splash`

## 1.7.0 - 2024-04-01

### Minor Changes

- 6f0992b: Adds support for enabling view transitions for Starlight sites!

### Patch Changes

- 3141b05: [Linter]: Stop complaining about unused styling scopes.

## 1.6.1 - 2024-03-23

### Patch Changes

- 213aa81: Updates dependencies
- 36a4944: Improves the detection of the favicon icon.
- bfb7994: Sync: Adds support for data-astro-rerun

## 1.6.0 - 2024-02-29

### Minor Changes

- c0e62e0: Adds a new animation called "Move"

### Patch Changes

- fea73d1: Fix bug with auto inserted root group in VtBotDebug

## 1.5.0 - 2924-02-22

### Minor Changes

- c6902df: ReplacementSwap: Adds the ability to preserve attributes of the `<html>` root element.

## 1.4.7 - 2024-02-07

### Patch Changes

- d6b3977: Update to Astro 4.3.4 and small code brushing

## 1.4.6 - 2024-02-04

### Patch Changes

- 555fd41 & 14cc29b: Extends `VtBotDebug` with the ability to log the animations that happen during a view transition
- c4a5911: Adds a `production` property to the `<BrakePad />`. Making the brake a pure DEV mode features unless requested otherwise.

## 1.4.5 - 2024-01-31

### Patch Changes

- c1e5a97: Fixed the check for illegal view transition names which didn't interprete encoded characters correctly
- d6069f4: Adds the new assets directory with the brand new **Bag of Tricks Logo** from Chris to the package exports

## 1.4.4 - 2024-01-30

### Patch Changes

- 877b6d6: Makes the implementation of `<LoadingIndicator />` more robust and adds configuration options for image and position
- 502e89b: `<VtBotDebug />` now shows which scripts are executed and which aren't between `astro:after-swap` & `astro:page-load` events

## 1.4.3 - 2024-01-27

### Patch Changes

- 073f70f: Gives user styles precedence over the built-in CSS of the `<LoadingIndicator />`
- 2e56e9a: Fixes a bug where explicitly set properties of `<ViewTransitions />` were lost.

## 1.4.2 - 2024-01-22

### Patch - Changes

- f4554b6: Adds a new component for easier development of custom loading indicators: [The BrakePad](https://events-3bg.pages.dev/library/BrakePad/)
- f4554b6: Extends LoadingIndicator use JavaScript in custom loading indicators

## 1.4.1 - 2024-01-22

### Patch Changes

chores & typos

## 1.4.0 - 2024-01-22

### Minor Changes

- 0c5f0e3: Extends integration to automatically add `<LoadingIndicator/>` to pages with `<ViewTransitions/>`
- bab5d23: Introduces new LoadingIndicator component

## 1.3.2 - 2024-01-20

### Patch Changes

- e994f6f: Separates lib from docs and tech demos

## 1.3.1 - 2024-01-20

### Patch Changes

- 364cb09: Exposes the `adapter()` function from the FishPond tech demo in `animation-style-ts` to allow for non standard names with `transition:animate={}`

## 1.3.0 - 2024-01-19

### Minor Changes

- d26a1a0: New `<NoScroll />` component keeps scroll positions where they are when navigating to the next page

### Patch Changes

- b496316: Fixes a bug in the ccs selectors for transitions
- 05bafc3: [Doc] Links usage sections of components to installation instructions

## 1.2.0 - 2024-01-17

### Minor Changes

- 42b417e: Provides the initial version of the Portal component
- 99f7b20: Provides tech demo and reusable components for new animation types
- e07a615: Enables installation as an Astro integration with `npx astro add astro-vtbot`. This automatically adds the `<Linter/>` component to all your `<ViewTransition/>` pages!
- fd48b93: Updates the Practitioners' Guide
- e6b62ce: Adds documentation about installation and for the new components: Zoom, Swing, AnimationStyle, Portal
- 8b28dc8: Linter now also checks the `type` property of `<script>` elements for suspicious values
- 1b93255: Enables VtBotDebug to tell you which of your scripts are executed during view transistion bewtween `astro:after-swap` fired and before `astro:page-load`.
  Also removes the feature to redirect the log output to an overlay. As the output grows, we are quickly running out of space with the on-screen display. This might come back some day, but then based on the Astros Dev Toolbar.

### Patch Changes

- fa962a7: Cleans up examples
- 6e31467: Adds types to ReplacementSwap and update docs

## 1.1.5 - 2024-01-08

### Patch Changes

- f5e72f8: Fixes execptions raised when accessing cross origin style sheets in VtBotDebug and Linter

## 1.1.4 - 2023-12-31

### Patch Changes

- [[Linter:](https://events-3bg.pages.dev/library/Linter/)] Add detection of illegal view-transition-names
- [[Jotter:](https://events-3bg.pages.dev/docs/Jotter/)] Add tipps and tricks on astro directives and non-cached images.

Plus

- Minor fixes for demos and demo overview.
- Improvements of the build process.

## 1.1.3 - 2023-12-25

### Patch Changes

- [f11ba855e](https://github.com/martrapp/astro-vtbot/commit/f11ba855e2a2d619d4cdf4bab8767525164fe126) [Linter:] Add warnings when view transition names or scoped styles are potentially lost when elements are copied over by `transition:persist` or `data-vtbot-replace`.

- [6ab6f38b8](https://github.com/martrapp/astro-vtbot/commit/6ab6f38b81d51ce160e23c4dbf194cfce309a149) [VtBotDebug:] Show the `::view-transition` pseudo-elements that the browser inserts when it is ready to start the animations for view transitions.

- [0f1e1dda6](https://github.com/martrapp/astro-vtbot/commit/0f1e1dda65dfbf1778c2187340cbb1e6940a0a5c) [ReplacementSwap:] Improve `<ReplacementSwap>` documentation and optimize how old `astro-route-announcer` are removed.

- Plus: Correction of typos and improvement of wording

## 1.1.2 - 2023-12-23

### Patch Changes

- [6b49bd33f](https://github.com/martrapp/astro-vtbot/commit/6b49bd33f621981a03c01b20c20b8ffe32e210ef) Remove dependency on table-string

## 1.1.1 - 2023-12-23

### Patch Changes

- [`3e4b26c38`](https://github.com/martrapp/astro-vtbot/commit/3e4b26c38eebca31790a657f3c2bccf2133254b0) Fixes view transitions to component pages

- Plus wording...

## 1.1.0 - 2023-12-22

### Minor Changes

- The `<Linter/>` component is out! You will receive meaningful warning and error messages if you configure the transition attributes incorrectly!
- The `<VtDebug/>` component got even better: Now also reports the transition groups that participate in a view transition!
- Improved documentation for the `<ReplacementSwap>/` component!
- New "Winter demo" that shows how different transiton groups participate in a view transition. Plus integration of custom animations right before and after the navigation start.

Plus: more tests, extended documentation, many code refactorings, elimination of `<xmp>` tags, and dependency updates.

## 1.0.0 - 2023-12-11

### Major Changes

- This is the first proper release of this package
