const T = !!document.startViewTransition,
	D = window.navigation?.currentEntry?.getState && !1,
	v = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
	_ = () => !!document.querySelector('[name="astro-view-transitions-intra-page"]');
let w = 0;
const b = (t) => (w = t),
	A = () => {
		const t = document.querySelector('[name="astro-view-transitions-fallback"]');
		return t ? t.getAttribute('content') : 'animate';
	},
	L = {},
	X = 'astro:after-swap',
	Y = 'astro:page-load',
	k = (t) => document.dispatchEvent(new Event(t)),
	R = () => k(Y);
class O extends Event {
	canIntercept = !0;
	navigationType;
	info;
	intercept;
	constructor(e, n, o) {
		super('navigate', { cancelable: !0 }),
			(this.navigationType = e),
			(this.info = n),
			(this.intercept = o),
			Object.defineProperties(this, {
				canIntercept: { writable: !1, enumerable: !0 },
				navigationType: { writable: !1, enumerable: !0 },
				info: { writable: !1, enumerable: !0 },
				intercept: { writable: !1, enumerable: !0 },
			});
	}
}
class W extends O {
	astro;
	constructor(e, n, o, i) {
		super(e, n, o), (this.astro = i);
	}
}
const K = (t) => t.astro;
function I(t, e, n, o, i, l) {
	const d = [];
	let u;
	const r = [],
		s = [];
	return {
		extension: {
			from: t,
			to: e,
			direction: n,
			newDocument: window.document,
			runBeforeLoader: (a) => {
				d.push(a);
			},
			set customLoader(a) {
				u = a;
			},
			get customLoader() {
				return u;
			},
			runAfterLoader: (a) => {
				r.push(a);
			},
			runFinally: (a) => {
				s.push(a);
			},
		},
		event: void 0,
		run: async (a) => {
			try {
				await Promise.all(d.map((c) => c())),
					await (u ? u(a) : o(a)),
					await Promise.all(r.map((c) => c())),
					await Promise.all(s.map((c) => c()));
			} catch (c) {
				throw (a.preventDefault(), c);
			}
		},
		navigateOptions: i,
		historyState: l,
	};
}
const U = 'astro:before-swap';
class B extends Event {
	from;
	to;
	newDocument;
	direction;
	viewTransition;
	navigationType;
	customSwap;
	info;
	constructor(e, n, o, i, l, d, u) {
		super(U),
			(this.from = e),
			(this.to = n),
			(this.newDocument = l),
			(this.viewTransition = u),
			(this.navigationType = o),
			(this.info = i),
			(this.direction = d);
	}
}
async function V(t, e, n, o, i, l, d, u) {
	const r = new B(t, e, n, o, i, l, d);
	return document.dispatchEvent(r), await (r.customSwap ? r.customSwap(r) : u(r)), r;
}
function H(t) {
	let e = 'forward';
	const n = t.srcElement;
	if (
		!(
			(t.navigationType === 'push' && !n) ||
			!(n instanceof HTMLAnchorElement) ||
			n.dataset.astroReload !== void 0 ||
			n.hasAttribute('download') ||
			!n.href ||
			(n.target && n.target !== '_self') ||
			!v() ||
			n.origin !== location.origin ||
			t.defaultPrevented
		) &&
		!(t.srcElement instanceof HTMLFormElement)
	) {
		if (t.navigationType === 'traverse') {
			const i = g.currentEnty.getState().index;
			(e = i > w ? 'forward' : 'back'), b(i);
		}
		g.event && (g.event.preventDefault(), (g.event = void 0)),
			(L.preparation = I(y, new URL(t.destination.url, location.href), e, $)),
			(t.astro = L.preparation.extension),
			(L.preparation.event = t),
			H(t);
	}
}
const g = {},
	M = (t) => history.state && history.replaceState({ ...history.state, ...t }, '');
let y,
	m,
	q,
	E = !1;
const N = (t, e) => t.pathname === e.pathname && t.search === e.search,
	j = () => {
		let t = document.createElement('div');
		t.setAttribute('aria-live', 'assertive'),
			t.setAttribute('aria-atomic', 'true'),
			(t.className = 'astro-route-announcer'),
			document.body.append(t),
			setTimeout(() => {
				let e = document.title || document.querySelector('h1')?.textContent || location.pathname;
				t.textContent = e;
			}, 60);
	},
	p = 'data-astro-transition-persist';
let S;
history.state
	? (b(history.state.index), scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
	: v() && history.replaceState({ index: w, scrollX, scrollY }, '');
const G = (t, e) => {
	let n = !1,
		o = !1;
	return (...i) => {
		if (n) {
			o = !0;
			return;
		}
		t(...i),
			(n = !0),
			setTimeout(() => {
				o && ((o = !1), t(...i)), (n = !1);
			}, e);
	};
};
async function z(t) {
	try {
		const e = await fetch(t),
			n = e.headers.get('content-type')?.replace(/;.*$/, '');
		return n !== 'text/html' && n !== 'application/xhtml+xml'
			? null
			: { html: await e.text(), redirected: e.redirected ? e.url : void 0, mediaType: n };
	} catch {
		return null;
	}
}
function J() {
	let t = Promise.resolve();
	for (const e of Array.from(document.scripts)) {
		if (e.dataset.astroExec === '') continue;
		const n = document.createElement('script');
		n.innerHTML = e.innerHTML;
		for (const o of e.attributes) {
			if (o.name === 'src') {
				const i = new Promise((l) => {
					n.onload = l;
				});
				t = t.then(() => i);
			}
			n.setAttribute(o.name, o.value);
		}
		(n.dataset.astroExec = ''), e.replaceWith(n);
	}
	return t;
}
const Q = (t, e, n, o) => {
	const l = N(e, t) && e.origin === t.origin;
	let d = !1;
	if (t.href !== location.href && !o)
		if (n.history === 'replace') {
			const u = history.state;
			history.replaceState(
				{ ...n.state, index: u.index, scrollX: u.scrollX, scrollY: u.scrollY },
				'',
				t.href
			);
		} else
			b(w + 1), history.pushState({ ...n.state, index: w, scrollX: 0, scrollY: 0 }, '', t.href);
	(y = t),
		l || (scrollTo({ left: 0, top: 0, behavior: 'instant' }), (d = !0)),
		o
			? scrollTo(o.scrollX, o.scrollY)
			: t.hash
			? (location.href = t.href)
			: d || scrollTo({ left: 0, top: 0, behavior: 'instant' });
};
function Z(t) {
	const e = [];
	for (const n of t.querySelectorAll('head link[rel=stylesheet]'))
		if (
			!document.querySelector(
				`[${p}="${n.getAttribute(p)}"], link[rel=stylesheet][href="${n.getAttribute('href')}"]`
			)
		) {
			const o = document.createElement('link');
			o.setAttribute('rel', 'preload'),
				o.setAttribute('as', 'style'),
				o.setAttribute('href', n.getAttribute('href')),
				e.push(
					new Promise((i) => {
						['load', 'error'].forEach((l) => o.addEventListener(l, i)), document.head.append(o);
					})
				);
		}
	return e;
}
async function P(t, e) {
	const n = (r, s) => {
			const a = r.getAttribute(p),
				c = a && s.head.querySelector(`[${p}="${a}"]`);
			if (c) return c;
			if (r.matches('link[rel=stylesheet]')) {
				const f = r.getAttribute('href');
				return s.head.querySelector(`link[rel=stylesheet][href="${f}"]`);
			}
			return null;
		},
		o = () => {
			const r = document.activeElement;
			if (r?.closest(`[${p}]`)) {
				if (r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement) {
					const s = r.selectionStart,
						a = r.selectionEnd;
					return { activeElement: r, start: s, end: a };
				}
				return { activeElement: r };
			} else return { activeElement: null };
		},
		i = ({ activeElement: r, start: s, end: a }) => {
			r &&
				(r.focus(),
				(r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement) &&
					((r.selectionStart = s), (r.selectionEnd = a)));
		},
		l = async (r) => {
			if (
				r.newDocument.documentElement &&
				r.newDocument.documentElement !== document.documentElement
			) {
				const s = document.documentElement,
					a = [...s.attributes].filter(
						({ name: c }) => (s.removeAttribute(c), c.startsWith('data-astro-'))
					);
				[...r.newDocument.documentElement.attributes, ...a].forEach(({ name: c, value: f }) =>
					s.setAttribute(c, f)
				);
			}
			for (const s of document.scripts)
				for (const a of r.newDocument.scripts)
					if (
						(!s.src && s.textContent === a.textContent) ||
						(s.src && s.type === a.type && s.src === a.src)
					) {
						a.dataset.astroExec = '';
						break;
					}
			if (r.newDocument.head && r.newDocument.head !== document.head) {
				for (const s of Array.from(document.head.children)) {
					const a = n(s, r.newDocument);
					a ? a.remove() : s.remove();
				}
				document.head.append(...r.newDocument.head.children);
			}
			if (r.newDocument.body && r.newDocument.body !== document.body) {
				const s = document.body,
					a = o();
				document.body.replaceWith(r.newDocument.body);
				for (const c of s.querySelectorAll(`[${p}]`)) {
					const f = c.getAttribute(p),
						h = document.querySelector(`[${p}="${f}"]`);
					h && h.replaceWith(c);
				}
				i(a);
			}
		};
	async function d(r) {
		function s(f) {
			const h = f.effect;
			return !h || !(h instanceof KeyframeEffect) || !h.target
				? !1
				: window.getComputedStyle(h.target, h.pseudoElement).animationIterationCount === 'infinite';
		}
		const a = document.getAnimations();
		document.documentElement.dataset.astroTransitionFallback = r;
		const c = document.getAnimations().filter((f) => !a.includes(f) && !s(f));
		return Promise.all(c.map((f) => f.finished));
	}
	e === 'animate' && !E && (await d('old'));
	const u = await V(
		t.astro.from,
		t.astro.to,
		t.navigationType,
		t.info,
		t.astro.newDocument,
		t.astro.direction,
		m,
		l
	);
	(document.documentElement.dataset.astroTransition = u.direction),
		k(X),
		e === 'animate' && !E && d('new').then(() => q());
}
async function $(t) {
	const e = t.info.astro,
		n = e.to.href,
		o = await z(n);
	if (o === null) {
		location.href = n;
		return;
	}
	if (
		(o.redirected && (e.to = new URL(o.redirected)),
		(S ??= new DOMParser()),
		(e.newDocument = S.parseFromString(o.html, o.mediaType)),
		e.newDocument.querySelectorAll('noscript').forEach((i) => i.remove()),
		!e.newDocument.querySelector('[name="astro-view-transitions-enabled"]'))
	) {
		location.href = n;
		return;
	}
}
async function C(t, e, n, o, i) {
	const l = [],
		d = I(e, n, t, $, o, i),
		u = new W(
			i ? 'traverse' : o.history === 'replace' ? 'replace' : 'push',
			o.info,
			(r) => {
				l.push(r);
			},
			d.extension
		);
	window.navigation.addEventListener('navigate', tt, { once: !0 }),
		window.navigation.dispatchEvent(u),
		await Promise.all(l.map((r) => (r.handler ? r.handler() : Promise.resolve()))),
		Q(n, e, o, i);
}
async function tt(t) {
	K(t) &&
		(t.navigationType !== 'traverse' && M({ scrollX, scrollY }),
		t.intercept({
			handler: async () => {
				const e = Z(t.astro.newDocument);
				e.length && (await Promise.all(e)), (E = !1);
				let n = !1;
				if ((m && (m.skipTransition(), await m.finished, (n = !0)), T))
					m = document.startViewTransition(async () => await P(t));
				else {
					const o = (async () => {
						await new Promise((i) => setTimeout(i)), await P(t, A());
					})();
					m = {
						updateCallbackDone: o,
						ready: o,
						finished: new Promise((i) => (q = i)),
						skipTransition: () => {
							E = !0;
						},
					};
				}
				(n || (N(y, t.astro.to) && !_)) && m.skipTransition(),
					m.updateCallbackDone.then(async () => {
						await J(), R(), j();
					}),
					m.finished.then(() => {
						document.documentElement.removeAttribute('data-astro-transition'),
							document.documentElement.removeAttribute('data-astro-transition-fallback'),
							(m = void 0);
					}),
					await m.updateCallbackDone;
			},
		}));
}
function F(t, e) {
	if (!v()) {
		location.href = t;
		return;
	}
	C('forward', y, new URL(t, location.href), e ?? {});
}
function et(t) {
	if (!v() && t.state) {
		history.scrollRestoration && (history.scrollRestoration = 'manual'), location.reload();
		return;
	}
	if (t.state === null) {
		history.scrollRestoration && (history.scrollRestoration = 'auto');
		return;
	}
	history.scrollRestoration && (history.scrollRestoration = 'manual');
	const e = history.state,
		n = e.index,
		o = n > w ? 'forward' : 'back';
	b(n), C(o, y, new URL(location.href), {}, e);
}
const x = () => {
	M({ scrollX, scrollY });
};
{
	(T || A() !== 'none') &&
		((y ??= new URL(location.href)),
		addEventListener('popstate', et),
		addEventListener('load', R),
		'onscrollend' in window
			? addEventListener('scrollend', x)
			: addEventListener('scroll', G(x, 350), { passive: !0 }),
		D && document.addEventListener('astro:connect', (t) => H(t.detail)),
		(window.navigation ??= {
			navigate: F,
			dispatchEvent: document.dispatchEvent.bind(document),
			addEventListener: document.addEventListener.bind(document),
		}));
	for (const t of document.scripts) t.dataset.astroExec = '';
}
function nt(t) {
	if (document.querySelector(`link[rel=prefetch][href="${t}"]`)) return;
	if (navigator.connection) {
		let n = navigator.connection;
		if (n.saveData || /(2|3)g/.test(n.effectiveType || '')) return;
	}
	let e = document.createElement('link');
	e.setAttribute('rel', 'prefetch'), e.setAttribute('href', t), document.head.append(e);
}
(T || A() !== 'none') &&
	!D &&
	document.addEventListener('click', (t) => {
		let e = t.target;
		e instanceof Element && e.tagName !== 'A' && (e = e.closest('a')),
			!(
				!e ||
				!(e instanceof HTMLAnchorElement) ||
				e.dataset.astroReload !== void 0 ||
				e.hasAttribute('download') ||
				!e.href ||
				(e.target && e.target !== '_self') ||
				e.origin !== location.origin ||
				t.button !== 0 ||
				t.metaKey ||
				t.ctrlKey ||
				t.altKey ||
				t.shiftKey ||
				t.defaultPrevented
			) &&
				(t.preventDefault(),
				F(e.href, { history: e.dataset.astroHistory === 'replace' ? 'replace' : 'auto' }));
	});
(T || A() !== 'none') &&
	['mouseenter', 'touchstart', 'focus'].forEach((t) => {
		document.addEventListener(
			t,
			(e) => {
				if (e.target instanceof HTMLAnchorElement) {
					let n = e.target;
					n.origin === location.origin && n.pathname !== location.pathname && v() && nt(n.pathname);
				}
			},
			{ passive: !0, capture: !0 }
		);
	});
