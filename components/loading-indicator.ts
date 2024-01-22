/// <reference types="astro/client" />
import { TRANSITION_BEFORE_PREPARATION, TRANSITION_BEFORE_SWAP, TRANSITION_PAGE_LOAD } from 'astro:transitions/client';


let show: () => void;
let hide: () => void;
let ownIndicator: boolean = false;

export function loading(newShow: () => void, newHide: () => void) {
	init(false);
	show = newShow;
	hide = newHide;
}

export async function ensureLoadingIndicator() {
	const loadingIndicator = document.getElementById('vtbot-loading-indicator');
	if (!loadingIndicator) {
		const favicon = (document.querySelector(`link[rel="icon"]:last-of-type`) as HTMLLinkElement)
			?.href;
		let img: HTMLImageElement | SVGSVGElement | null;
		if (favicon && favicon.endsWith('.svg')) {
			const response = await fetch(favicon);
			const text = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, 'image/svg+xml');
			img = doc.querySelector('svg');
		} else {
			img = document.createElement('img');
			img.src = favicon;
			img.alt = 'Loading indicator';
		}
		const div = document.createElement('div');
		div.id = 'vtbot-loading-indicator';
		div.appendChild(img);
		document.body.appendChild(div);
	}
}


const beforePreparation = () => {
	if (!ownIndicator) ensureLoadingIndicator();
	document.documentElement.classList.add(`loading`);
	show && show();
};

const beforeSwap = (event: Event) => {
	document.documentElement.classList.remove(`loading`);
	hide && hide();
};

export function init(createIndicator: boolean = false) {
	if (ownIndicator) return;
	ownIndicator = !createIndicator;
	document.addEventListener(TRANSITION_BEFORE_PREPARATION, beforePreparation);
	document.addEventListener(TRANSITION_BEFORE_SWAP, beforeSwap);
	createIndicator && document.addEventListener(TRANSITION_PAGE_LOAD, ensureLoadingIndicator);
	!createIndicator && document.removeEventListener(TRANSITION_PAGE_LOAD, ensureLoadingIndicator);
}

