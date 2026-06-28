---
'astro-vtbot': major
---

Technical release for Astro 7 compatibility.

Astro 7 removed a bunch of deprecated constants and functions from the `astro:transitions` and `astro:transitions/client` endpoints. One of those was exposed by `astro-vtbot` as the `CreateAnimationScope.astro` component. This component was removed from `astro-vtbot` in the current release. It was never officially documented and was rarely, if ever, used. If you were using it, please get in touch on Discord (@martrapp) or Bluesky (@martr.app) and we will find a solution.