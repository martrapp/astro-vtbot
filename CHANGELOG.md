# The Bag of Tricks for Astro's View Transitions

## 2.1.7 - 2025-07-28

### Patch Changes

- dab3207: Updated dependencies to the latest versions.

## 2.1.6 - 2025-07-09

### Patch Changes

- a0b5c6c: Dependencies: Updated versions of @vtbag/inspection-chamber (1.0.22) and @vtbag/utensil-drawer (1.2.9)

## 2.1.5 - 2025-06-09

### Patch Changes

- b648802: Adds the BackLink component for links with swapped forward / backward animations: https://events-3bg.pages.dev/library/BackLink/

## 2.1.4 - 2025-05-31

### Patch Changes

- a8f4b74: Updates @vtbag/utensil-drawer to v1.2.8

## 2.1.3 - 2025-05-02

### Patch Changes

- 48088bf: Fixes an issue, where the starlight plugin stopped to work on Starlight 0.33.

## 2.1.2 - 2025-03-17

### Patch Changes

- f6c2afd: Resolves a race condition where the Inspection-Chamber fails to halt at the start of the view transition.

## 2.1.1 - 2025-03-08

### Patch Changes

- 2f6380d: Prevents inlining of @vtbag scripts as base64 encoded data URLs
- 352adea: Replaces swap-function support with Astro's official implementation for better compatibility.
- a983bcd: Adapts devToolbar plugin to changed script handling in Astro's client router

## 2.1.0 - 2025-02-24

### Minor Changes

- 892554e: The Bag now offers a Starlight Plugin. With a single [config entry](https://events-3bg.pages.dev/library/StarlightPlugin/#installation) you can switch on smooth browser-native cross-document view transitions on your existing Starlight site. And of course also on new ones ;-)

## 2.0.6 - 2025-02-15

### Patch Changes

- 2c9afdc: Updates @vtbag/inspection-chamber to 1.0.21
- 3b04ef5: Makes Starlight Support compatible with Starlight versions >= 0.32

## 2.0.5 - 2025-01-28

### Patch Changes

- 253879a: -- **Thank you [Luísa](https://github.com/luisaverza)** -- for fixing the plugin integration for monorepos with `pnpm`!\
  fix: resolve relative paths for compatibility with pnpm hoisting

## 2.0.4 - 2025-01-25

### Patch Changes

- a8d29e2: Fixes a problem with icon access in the devToolbar app.

## 2.0.3 - 2025-01-02

### Patch Changes

- 428d815: `<InspectionChamber />` and `<CamShaft />`: Added a workaround to handle quoted animation names in Webkit which caused user agent animation names not being recognized in Safari.

## 2.0.2 - 2025-01-01

### Patch Changes

- 70a8fba: Applies bug fixes from dependencies for `<ElementCrossing />` and `<CamShaft />`.

## 2.0.1 - 2024-12-31

### Patch Changes

- 8ec2ee2: Fixes links and typos in README

## 2.0.0 - 2024-12-30

### Major Changes

- 85e6fb4: When installed as an integration, the <Linter /> and <LoadingIndicator /> components will no longer be auto-installed on all pages. The `autoLint` and `loadingIndicator` options in the `vtbot()` integration in your astro-config file now default to `false` instead of `true`. These options will be completely removed in a future release.

  ## What's Changing?
  - If you use astro-vtbot as a library and haven't installed it as an Astro integration: Nothing changes for you.
  - If you have installed it as an integration and have explicitly opted out of the linter and loading indicator: remove these settings: `{autoLint: false, loadingIndicator: false}` from your astro-config file.
  - If you have installed it as an integration and called vtbot({...}) with one option or no parameter at all:
    To ensure continued functionality, explicitly add the `<Linter />` and/or `<LoadingIndicator />` components to the pages that need them. Ideally, include them in your common `layout.astro` file for consistency across your site. Make sure that the call to `vtbot()` in you astro-config file does not set any options.

  ### Temporary Workaround

  You can restore the previous behavior by enabling the deprecated options, but note that they will be removed soon:

  ```ts
  import vtbot from 'astro-vtbot';

  export default defineConfig({
    integrations: [
      vtbot({
        autoLint: true,
        loadingIndicator: true,
      }),
    ],
  });
  ```

  Take action now to ensure smooth transitions and avoid future disruptions.

### Minor Changes

- Enjoy the new version of the @vtbag/turn-signal: The `<TurnSignal />` components now also supports per link view transition types, see the [@vtbag/turn-signal Changelog](https://github.com/vtbag/turn-signal/blob/main/CHANGELOG.md)

## 1.10.7 - 2024-11-15

### Patch Changes

- 58d8fab: Dependency refresh highlights: @vtbag/element-crossing now fixes an issue with data-\* attributes.

## 1.10.6 - 2024-10-30

### Patch Changes

- 55a7728: Updates the `<ElementCrossing />` component to version 1.0.3 of `@vtbag/element-crossing`.

## 1.10.5 - 2024-10-22

### Patch Changes

- c9abaa1: New versions for @vtbag/inspection-chamber and @vtbag/turn-signal: The Inspection Chamber can now handle the extended signature of the document.startViewTransition as defined by level 2 of the view Transition API and the Turn-Signal computes directions also on the old page!

## 1.10.4 - 2024-10-17

### Patch Changes

- 3cca5c8: -- **Thank you [Lukas](https://github.com/trombach)** -- The Inspection Chamber DevTools now also work for projects using `pnpm`!\
   Fixes `inspectionChamber` endpoint runtime error when using `pnpm`
- ed79b25: Makes the Linter respect vtbot-linter-ignore meta elements for non unique view transition names (e.g. if only one has display != none)
- 44e8134: Updates @vtbag/{inspection-chamber, element-crossing, turn-signal, cam-shaft} to their most recent versions.

## 1.10.3 - 2024-10-04

### Patch Changes

- 1257054: Adds the CamShaft component from @vtbag/cam-shaft

## 1.10.2 - 2024-09-25

### Patch Changes

- 4d943b5: Incorporates a new bugfix version of @vtbag/turn-signal

## 1.10.1 - 2024-09-25

### Patch Changes

- ce65547: Incorporates bugfix version of @vtbag/turn-signal

## 1.10.0 - 2024-09-25

### Minor Changes

- 5efdf5e: Introducing a new tool for your transition from `<ViewTransitions />` to native cross-document view transitions: The `<TurnSignal />` component enables seamless integration of forward and backward animations from `transition:animate` in cross-document transitions. Sync the direction of your animations with browser history navigation, or even with the page order of your site, if you prefer!

## 1.9.4 - 2024.09.19

### Patch Changes

- c0f574e: Linter: Handles "!important" correctly when used with view-transition-names.

## 1.9.3 - 2024-09-19

### Patch Changes

- 8404b0f: Fixes an issue where `<AutoNameSelected />` got ignored when no properties were set.

## 1.9.2 - 2024-09-08

### Patch Changes

- 82de459: Removes a forgotten console.log statement from the `<ElementCrossing />` component.
- 89741bd: Updates @vtbag/element-crossing to 1.0.1
- 20671d6: Updates the wording of the devToolbar integration.

## 1.9.1 - 2024-09-05

### Patch Changes

- 62d9cba: Fixes a bug where the Inspection Chamber claims to be out of order.

## 1.9.0 - 2024-09-05

### Minor Changes

- 58cd5a1: Integrates `@vtbag/element-crossing` to transfer selected HTML state to the next page on CSS-only cross-deocument view transitions

### Patch Changes

- bb74ccd: Provides better guidance if the test chamber cannot be opened via devTools.
- 7796f7c: Fixed an issue where VtBotDebug throws errors when analzing animations of cross-document transitions

## 1.8.8 - 2024-08-28

### Patch Changes

- d977d52: Makes inspection chamber integration more robust.
- 75bb439: Version bumps, especially new version of the inspection chamber with improved css reporting

## 1.8.7 - 2024-08-20

### Patch Changes

- 5393174: LoadingIndicator: Increases robustness of indicator creation.
- dece4d7: Updates @vtbag/inspection-chamber

## 1.8.6 - 2024-08-17

### Patch Changes

- 75932b1: This introduces the `<PointerOnNavigation />` component that reduces cursor switching on navigation.

## 1.8.5 - 2024-08-16

### Patch Changes

- ecc0966: Put the chamber out of order for browsers without native support for the view transition API
- b46e61c: Fixes content-type of chamber script
- 11f53fe: Greatly reduces the footprint of the Chamber in HTML files when used via the integration option.
- a4b36ad: Correctly encodes view transition names used with the AutoNameSelected component
- b28f195: Starlight support: Honor the persisted sidebar state introduced with Starlight v0.26.0

## 1.8.4 - 2024-08-10

### Patch Changes

- 1f15f8c: Updates the Inspection Chamber (@vtbag/inspection-chamber) to the current version

## 1.8.3 - 2024-07-28

### Patch Changes

- ef4ccab: Fixes an issue with the integration of the inspection-chamber.
- 9e3b0e1: Fixes an issue where the loading indicator was not removed when the browser decided to download the target of a link.
- c63b4b8: Update to version 1.0.3 of @vtbag/inspection-chamber

## 1.8.2 - 2024-07-18

### Patch Changes

- 4c2cae2: Inspection-chamber update to get the glow effects back.

## 1.8.1 - 2024-07-18

### Patch Changes

- e87b5e2: Fixes dependencies for new minor version.

## 1.8.0 - 2024-07-18

### Minor Changes

- 316aa13: Introduces the Inspection Chamber, which allows you to put your view transitions through their paces. The Inspection Chamber can be used as a component but also via the brand new DevToolbar integration!

## 1.7.27 - 2024-07-13

### Patch Changes

- 2c6cc84: Fixes element queries in SwapSound and LoadingIndicator

## 1.7.26 - 2024-07-08

### Patch Changes

- 3c83d7f: Fixes a bug where the Linter accessed an undefined event object.

## 1.7.25 - 2024-06-28

### Patch Changes

- f5f1b9c: Adds the long time planned support for CSSGroupingRules when looking for view-transition-names in stylesheets.
- d779ab9: Restructures window.\_\_vtbot, where The Bag keeps some global state.

## 1.7.24 - 2024-06-13

### Patch Changes

- 1e6e93c: VtBotDebug: include new signal property in event properties.

## 1.7.23 - 2024-06-01

### Patch Changes

- b6ee610: Fixes a bug with imports when using loading-indicator.ts

## 1.7.22 - 2024-05-30

### Patch Changes

- c56e9a7: Adds a new component: SwapSound, the audible loading and swapping indicator ;-)
- c56e9a7: Adds a new component: BorderControl simplifies mixed sites with ReplacementSwap and other view transitions.

## 1.7.21 - 2024-05-25

### Patch Changes

- c377ed5: Adds the starlight-blog package to the friendly neighbor list, see https://events-3bg.pages.dev/jotter/starlight/guide/#friendly-neighbor.

## 1.7.20 - 2024-05-23

### Patch Changes

- f4a579d: [AutoNameSelected] New component that supports declaratively adding view transition names for additional morph effects.
- Plus: @lorenzo_lewis/starlight-multi-sidebar support extended to @lorenzo_lewis/starlight-utils

## 1.7.19 - 2024-05-21

### Patch Changes

- 310a1d3: Updates support for starlight-multi-sidebar upto v0.1.3

## 1.7.18 - 2024-05-19

### Patch Changes

- 3158250: Adds support for @lorenzo_lewis/starlight-multi-sidebar.

## 1.7.17 - 2024-05-13

### Patch Changes

- 061d97b: VtBotDebug now shows the changes that are made to the DOM during swap()

## 1.7.16 - 2024-05-09

### Patch Changes

- b8245de: Starting with Astro 4.8, The Bag's swap-utils are obsolete and deprecated.
  For an alternative, you can check out astro/dist/transitions/swap-functions.js

## 1.7.15 - 2024-05-05

### Patch Changes

- 7d50a65: Fixes an issue where switching languages did select a different page.
  plus: Improvements to robustness and test coverage.

## 1.7.14 - 2024-04-26

### Patch Changes

- bc1cd73: VtBotDebug: Fixes an issue where `astro:after-preparation` was not logged at all.
- a92071a: ReplacementSwap: Extends the ability to handle `transition:persist` to children of `html.head`.

## 1.7.13 - 2024-04-23

### Patch Changes

- 87c87ff: Starlight utils: Adds an optional parameter to `openCategory()` to opt-out of scrolling.
- 9f8fe2c: Adds a new experimental component (ReadyToFinished) that allows to postpone viewTransition.finished

## 1.7.12 - 2024-04-20

### Patch Changes

- fe3ca60: PageOrder: adds a new component to the Starlight support that changes the direction of the transition based on the order of the pages in the sidebar.
- aa522c2: LoadingIndicator: Improves the way the loading indicator tries to find an icon to display.

## 1.7.11 - 2024-04-20

### Patch Changes

- 58afbd6: Fixes a bug where importing vtbot as an integration zeroed all content collection types.

## 1.7.10 - 2024-04-19

### Patch Changes

- 2cd5f25: VtBotDebug: Honor `data-astro-rerun` when listing which scripts might run.
- ac261cf: New Component: Provides the PageOffset component which eliminates pseudo-scrolling morph animations of large elements like whole body or huge content areas.
- 2e1f8c8: Linter: Fixes a bug in style sheet parsing when a view-transition-name appeared inside a @supports condition.

## 1.7.9 - 2024-04-14

### Patch Changes

- 46c79d3: Starlight Support: Adds support for tweaking the sidebar of Starlight sites, see https://events-3bg.pages.dev/jotter/starlight/guide/#sidebar-behavior

## 1.7.8 - 2024-04-12

### Patch Changes

- 2ca7b06: Starlight Support: Adds a reusable, improved way to identify sidebar entries.
- 2e96f5e: ReplacementSwap: Adds handling of data-astro-transition-persist to ReplacementSwap for replaced content.
- 93b47de: Starlight Support: Improves sidebar handling: Automatically opens categories when navigated to and scrolls them into view.

## 1.7.7 - 2024-04-09

- 614712e: Starlight Support: Fixes a bug in updateCurrentPageMarker

## 1.7.6 - 2024-04-09

### Patch Changes

- aa5b84d: Starlight Support: Improves Starlight sidebar support to give a choice between replacement and update:

  By default, the content of the sidebar is retained during navigation and only the highlighting of the current page is updated. The alternative is to replace the sidebar content on each navigation (with the content read from the next page). This is activated by adding `replaceSidebarContent` to the component `VtbotStarlight` in `./src/components/starlight/Head.astro`.

## 1.7.5 - 2024-04-09

### Patch Changes

- 6bbd038: VtBotDebug: Fixes a bug with VtBotDebug when included in production build.
- 53388e2: Starlight Support: Makes the coding more defensive and the dependencies on the Starlight page structure more obvious.

## 1.7.4 - 2024-04-06

### Patch Changes

- b35d054: Starlight Support: Makes the viewTransitionsFallback property optional in the Starlight integration.

## 1.7.3 - 2024-04-05

### Patch Changes

- 3e61ad9: Starlight Support: Fixes an issue where view transitions reset Starlight's ThemeSelector to show an incorrect value.

## 1.7.2 - 2024-04-02

### Patch Changes

- 9e8532a: Starlight Support: Fixes a bug accessing an attribute of null when linking to view transition pages outside the starlight site.

## 1.7.1 - 2024-04-02

### Patch Changes

- 0a21a85: Starlight Support: Fixes an issue with the sidebar when navigating from or to pages with `template:splash`

## 1.7.0 - 2024-04-01

### Minor Changes

- 6f0992b: Starlight Support: Adds support for enabling view transitions for Starlight sites!

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
