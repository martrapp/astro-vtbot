import { astroBodySwap, customSwap, disarmKnownScripts, restoreFocus, saveFocus, swapInHeadElements, swapInHTMLAttributes } from "./swap-utils";

export let swapFunctions = {
	deselectScripts: disarmKnownScripts,
	swapRootAttributes: (doc: Document) => swapInHTMLAttributes(doc, []),
	swapHeadElements: swapInHeadElements,
	swapBodyElement: (newEl: Element, oldEl: Element) => astroBodySwap(oldEl, newEl),
	saveFocus: () => { const storedFocus = saveFocus(); return () => restoreFocus(storedFocus); },
	restoreFocus,
	swap: (doc: Document) => customSwap(doc, [], (doc) => astroBodySwap(document.body, doc.body))
};

const hideFromVite = "../../astro/dist/transitions/swap-functions.js";

try {
	const builtInFunctions = await import(hideFromVite);
	swapFunctions = builtInFunctions;
} catch (e) {
	// no Astro peer >= 4.8 found. Keep our fallback implementation
}
