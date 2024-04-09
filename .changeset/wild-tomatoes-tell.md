---
"astro-vtbot": patch
---

Improves Starlight sidebar support to give a choice between replacement and update:

By default, the content of the sidebar is retained during navigation and only the highlighting of the current page is updated. The alternative is to replace the sidebar content on each navigation (with the content read from the next page). This is activated by adding `replaceSidebarContent` to the component `VtbotStarlight` in `./src/components/starlight/Head.astro`.
