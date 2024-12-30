---
'astro-vtbot': major
---

When installed as an integration, the <Linter /> and <LoadingIndicator /> components will no longer be auto-installed on all pages. The `autoLint` and `loadingIndicator` options in the `vtbot()` integration in your astro-config file now default to `false` instead of `true`. These options will be completely removed in a future release.


## What's Changing?

- If you use astro-vtbot as a library and haven't installed it as an Astro integration: Nothing changes for you.

- If you have installed it as an integration and have explicitly opted out of the linter and loading indicator: remove these settings: `{autoLint: false, loadingIndicator: false}` from your astro-config file.

- If you have installed it as an integration and called vtbot({...}) with one option or no parameter at all:
To ensure continued functionality, explicitly add the `<Linter />` and/or `<LoadingIndicator />` components to the pages that need them. Ideally, include them in your common `layout.astro` file for consistency across your site. Make sure that the call to `vtbot()` in you astro-config file does not set any options.

### Temporary Workaround
You can restore the previous behavior by enabling the deprecated options, but note that they will be removed soon:

```ts
import vtbot from "astro-vtbot";

export default defineConfig({
	integrations: [vtbot({
		autoLint: true, loadingIndicator: true
	})]
});
```
Take action now to ensure smooth transitions and avoid future disruptions.
