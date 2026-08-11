---
'astro-vtbot': minor
---

Fixes support for insertion of the #end-of-markdown id for Sätteri builds.

Contrary to my previous assumption, the structure of Sätteri `mdast` plugins differs much from that of `remark` plugins. So I had to replace the `mdast` plugin with a `hast` plugin. See the [ documentation](https://events-3bg.pages.dev/library/StarlightPlugin/#for-sätteri-starlight-041) on how to use it.
