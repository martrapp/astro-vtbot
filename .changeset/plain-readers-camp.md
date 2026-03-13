---
'astro-vtbot': patch
---

Adds compatibility with Astro v6.

Astro v6 removes the previously deprecated `<ViewTransitions />` component. Switch to `<ClientRouter />` instead.

Helper functions and constants for view transition event names in Astro are now deprecated and will be removed in Astro v7. This release avoids using them to reduce deprecation warnings in your projects.

