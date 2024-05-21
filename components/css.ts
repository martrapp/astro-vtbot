// todos:
// check for different CSS rule types (beside CSSStyleRule)

const decodeDiv = document.createElement('div');

export const ILLEGAL_TRANSITION_NAMES = 'data-vtbot-illegal-transition-names';
export function astroContextIds() {
	const inStyleSheets = new Set<string>();
	const inElements = new Set<string>();

	[...document.styleSheets].forEach((sheet) => {
		[...sheet.cssRules].forEach((rule) => {
			if (rule instanceof CSSStyleRule) {
				[...rule.selectorText.matchAll(/data-astro-cid-(\w{8})/g)].forEach((match) =>
					inStyleSheets.add(match[1]!)
				);
				[...rule.selectorText.matchAll(/\.astro-(\w{8})/g)].forEach((match) =>
					inStyleSheets.add(match[1]!)
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

type SupportedCSSProperties = 'view-transition-name';
// finds all elements of a _the current document_ with a given _string_ property in a style sheet
// document.styleSheets does not seem to work for arbitrary documents
export function elementsWithPropertyInStylesheet(
	property: SupportedCSSProperties,
	map: Map<string, Set<Element>> = new Map()
): Map<string, Set<Element>> {
	[...document.styleSheets].forEach((sheet) => {
		const style = sheet.ownerNode as HTMLElement;
		const definedNames = new Set<string>();
		const matches = style?.innerHTML
			.replace(/@supports[^{]*\{/gu, '')
			.matchAll(new RegExp(`${property}:\\s*([^;}]*)`, 'gu'));
		[...matches].forEach((match) => definedNames.add(decode(property, match[1]!)));
		try {
			[...sheet.cssRules].forEach((rule) => {
				if (rule instanceof CSSStyleRule) {
					const name = rule.style[property as keyof CSSStyleDeclaration] as string;
					if (name) {
						definedNames.delete(name);
						map.set(
							name,
							new Set([
								...(map.get(name) ?? new Set()),
								...document.querySelectorAll(rule.selectorText),
							])
						);
					}
				}
			});
		} catch (e) {
			console.log(`%c[vtbot] Can't analyze sheet at ${sheet.href}: ${e}`, 'color: #888');
		}
		if (definedNames.size > 0) {
			const illegalNames = [...definedNames].join(', ');
			style.setAttribute(ILLEGAL_TRANSITION_NAMES, illegalNames);
			map.set('', new Set([...(map.get('') ?? new Set()), style]));
		}
	});
	return map;

	function decode(prop: SupportedCSSProperties, value: string): string {
		decodeDiv.style[prop as any] = '';
		decodeDiv.style[prop as any] = value;
		const res = decodeDiv.style[prop as any];
		return res || value;
	}
}

// finds all elements of a document with a given property in their style attribute
export function elementsWithPropertyInStyleAttribute(
	doc: Document,
	property: SupportedCSSProperties,
	map: Map<string, Set<Element>> = new Map()
): Map<string, Set<Element>> {
	doc.querySelectorAll(`[style*="${property}:"`).forEach((el) => {
		const name = (el as HTMLElement).style[property as any]!;
		map.set(name, new Set([...(map.get(name) ?? new Set()), el]));
	});
	return map;
}

// finds all elements _of the current document_ with a given property
// in their style attribute or in a style sheet
export function elementsWithStyleProperty(
	property: SupportedCSSProperties,
	map: Map<string, Set<Element>> = new Map()
): Map<string, Set<Element>> {
	return elementsWithPropertyInStyleAttribute(
		document,
		property,
		elementsWithPropertyInStylesheet(property, map)
	);
}
