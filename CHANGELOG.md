# The Bag of Tricks for View Transitions

## 1.1.3 2023-12-24

### Patch Changes

- [f11ba855e](https://github.com/martrapp/astro-vt-bot/commit/f11ba855e2a2d619d4cdf4bab8767525164fe126) [Linter:] Add warnings when view transition names or scoped styles are potentially lost when elements are copied over by `transition:persist` or `data-vtbot-replace`.

- [6ab6f38b8](https://github.com/martrapp/astro-vt-bot/commit/6ab6f38b81d51ce160e23c4dbf194cfce309a149) [VtBotDebug:] Show the `::view-transition` pseudo-elements that the browser inserts when it is ready to start the animations for view transitions. 

- [0f1e1dda6](https://github.com/martrapp/astro-vt-bot/commit/0f1e1dda65dfbf1778c2187340cbb1e6940a0a5c) [ReplacementSwap:] Improve `<ReplacementSwap>` documentation and optimize how old `astro-route-announcer` are removed. 


- Plus: Correction of typos and improvement of wording

## 1.1.2 2023-12-23

### Patch Changes

- [6b49bd33f](https://github.com/martrapp/astro-vt-bot/commit/6b49bd33f621981a03c01b20c20b8ffe32e210ef) Remove dependency on table-string

## 1.1.1 2023-12-23

### Patch Changes

- [`3e4b26c38`](https://github.com/martrapp/astro-vt-bot/commit/3e4b26c38eebca31790a657f3c2bccf2133254b0) Fixes view transitions to component pages

- Plus wording...

## 1.1.0 2023-12-22

### Minor Changes

- The `<Linter/>` component is out! You will receive meaningful warning and error messages if you configure the transition attributes incorrectly!
- The `<VtDebug/>` component got even better: Now also reports the transition groups that participate in a view transition!
- Improved documentation for the `<ReplacementSwap>/` component!
- New "Winter demo" that shows how different transiton groups participate in a view transition. Plus integration of custom animations right before and after the navigation start.  

Plus: more tests, extended documentation, many code refactorings, elimination of `<xmp>` tags, and dependency updates.


## 1.0.0 2023-12-11

### Major Changes 

- This is the first proper release of this package
