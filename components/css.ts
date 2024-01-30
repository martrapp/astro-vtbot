// todos:
// check for different CSS rule types (beside CSSStyleRule)

export function astroContextIds() {
	const inStyleSheets = new Set<string>();
	const inElements = new Set<string>();

	[...document.styleSheets].forEach((sheet) => {
		[...sheet.cssRules].forEach((rule) => {
			if (rule instanceof CSSStyleRule) {
				[...rule.selectorText.matchAll(/data-astro-cid-(\w{8})/g)].forEach((match) =>
					inStyleSheets.add(match[1])
				);
				[...rule.selectorText.matchAll(/\.astro-(\w{8})/g)].forEach((match) =>
					inStyleSheets.add(match[1])
				);
			}
		});
	});

	const ASTRO_CID = 'astroCid';
	[...document.querySelectorAll('*')].forEach((el) => {
		Object.keys((el as HTMLElement).dataset).forEach((key) => {
			if (key.startsWith(ASTRO_CID)) {
				inElements.add(key.substring(ASTRO_CID.length).toLowerCase().replace(/^-/g, ''));
			}
		});
		el.classList.forEach((cls) => {
			if (cls.match(/^astro-(........)$/)) {
				inElements.add(cls.replace(/^astro-/, ''));
			}
		});
	});

	return { inStyleSheets, inElements };
}

// finds all elements of a _the current document_ with a given property in a style sheet
// document.styleSheets does not seem to work for arbitrary documents
export function elementsWithPropertyinStylesheet(
	property: string,
	map: Map<string, Set<Element>> = new Map()
): Map<string, Set<Element>> {
	[...document.styleSheets].forEach((sheet) => {
		const style = sheet.ownerNode as HTMLElement;
		const definedNames = new Set<string>();
		const matches = style?.innerHTML.matchAll(new RegExp(`${property}:\\s*([^;}]*)`, 'g'));
		[...matches].forEach((match) => definedNames.add(match[1]));
		try {
			[...sheet.cssRules].forEach((rule) => {
				if (rule instanceof CSSStyleRule && rule.style[property]) {
					const name = rule.style[property];
					definedNames.delete(name);
					const els = document.querySelectorAll(rule.selectorText);
					map.set(name, new Set([...(map.get(name) ?? new Set()), ...[...els]]));
				}
			});
		} catch (e) {
			console.log(`%c[vtbot] Can't analyze sheet at ${sheet.href}: ${e}`, 'color: #888');
		}
		if (definedNames.size > 0) {
			style.setAttribute('data-illegal-transition-names', [...definedNames].join(', '));
			map.set('', new Set([...(map.get('') ?? new Set()), style]));
		}
	});
	return map;
}

// finds all elements of a document with a given property in their style attribute
export function elementsWithPropertyInStyleAttribute(
	doc: Document,
	property: string,
	map: Map<string, Set<Element>> = new Map()
): Map<string, Set<Element>> {
	doc.querySelectorAll(`[style*="${property}:"`).forEach((el) => {
		const name = (el as HTMLElement).style[property];
		map.set(name, new Set([...(map.get(name) ?? new Set()), el]));
	});
	return map;
}

// finds all elements _of the current document_ with a given property
// in their style attribute or in a style sheet
export function elementsWithStyleProperty(
	property: string,
	map: Map<string, Set<Element>> = new Map()
): Map<string, Set<Element>> {
	return elementsWithPropertyInStyleAttribute(
		document,
		property,
		elementsWithPropertyinStylesheet(property, map)
	);
}
