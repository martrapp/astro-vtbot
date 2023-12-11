type SavedFocus = {
	activeElement: HTMLElement | null;
	start?: number | null;
	end?: number | null;
};

/*
 * Mark new scripts we already have on the current page as already been executed.
 * This way they will not be executed again
 */
export const disarmKnownScripts = (doc: Document) => {
	[...doc.scripts].forEach((newScript) => {
		newScript.dataset.astroExec = '';
		const found = [...document.scripts].find((oldScript) => oldScript.isEqualNode(newScript));
		if (!found) delete newScript.dataset.astroExec;
	});
};

/*
 * Swap in the atttributes of the html element
 */
export const swapInHTMLAttributes = (doc: Document) => {
	const html = document.documentElement;
	const astroAttributes = [...html.attributes].filter(
		({ name }) => (html.removeAttribute(name), name.startsWith('data-astro-'))
	);
	[...doc.documentElement.attributes, ...astroAttributes].forEach(({ name, value }) =>
		html.setAttribute(name, value)
	);
};

/*
 * Swap in the children of the head
 */
export const swapInHeadElements = (doc: Document) => {
	[...document.head.children].forEach((e) => {
		if (e instanceof HTMLElement) {
			let other = [...doc.head.children].find((o) => o.isEqualNode(e));
			(other ?? e).remove();
		}
	});
	document.head.append(...doc.head.children);
};

/*
 * Save the active element and the current selection
 */
export const saveFocus = (): SavedFocus => {
	const activeElement = document.activeElement as HTMLElement;
	if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
		const start = activeElement.selectionStart;
		const end = activeElement.selectionEnd;
		return { activeElement, start, end };
	}
	return { activeElement };
};

/*
 * Restore the focus and selection if the saved active element still belongs to window.document
 */
export const restoreFocus = ({ activeElement, start, end }: SavedFocus) => {
	if (activeElement && activeElement.ownerDocument === document) {
		activeElement.focus();
		if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
			activeElement.selectionStart = start!;
			activeElement.selectionEnd = end!;
		}
	}
};

/*
 * Execute all steps of the original swap function except the swap of the body element.
 * Accepts a function to substitute the swap of the body element.
 */
export const customSwap = (doc: Document, swapBody: (doc: Document) => void) => {
	disarmKnownScripts(doc);
	swapInHTMLAttributes(doc);
	swapInHeadElements(doc);
	const savedFocus = saveFocus();
	swapBody(doc);
	restoreFocus(savedFocus);
};

/*
 * Default swap function
 *
const defaultSwap = (beforeSwapEvent: TransitionBeforeSwapEvent) => {
	customSwap(beforeSwapEvent.newDocument, (doc) => {
		// Persist elements in the existing body
		const oldBody = document.body;
		document.body.replaceWith(doc.body);

		for (const el of oldBody.querySelectorAll(`[${PERSIST_ATTR}]`)) {
			const id = el.getAttribute(PERSIST_ATTR);
			const newEl = document.querySelector(`[${PERSIST_ATTR}="${id}"]`);
			if (newEl) {
				newEl.replaceWith(el);
			}
		}
	});
};
*/
