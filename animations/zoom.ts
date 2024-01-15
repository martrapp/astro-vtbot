import './zoom.css';
import { NamedAnimationPairs, extend, maybeScopedStyleSheet, setKeyframes, setStyles } from './animation-style';
import type { TransitionAnimation, TransitionDirectionalAnimations } from 'astro';

type ZoomKeyframeParameter = {
	scale?: { forwardOut?: number; forwardIn?: number; backwardOut?: number; backwardIn?: number; };
	opacity?: { forwardOut?: number; forwardIn?: number; backwardOut?: number; backwardIn?: number; };
};

type CustomZoomOptions = {
	keyframes?: ZoomKeyframeParameter;
	base?: AnimationProperties;
	animations?: NamedAnimationPairs;
};


export const genKeyframes = (
	name: string,
	forwardOutScale = 5,
	forwardOutOpacity = 0,
	forwardInScale = 0,
	forwardInOpacity = 0,
	backwardOutScale = 0,
	backwardOutOpacity = 0,
	backwardInScale = 5,
	backwardInOpacity = 0,
) =>
	`
	@keyframes ${name}FwdZoomOut {
		from {
			transform: scale(1);
			opacity: 1;
		}
		to {
			transform: scale(${forwardOutScale});
			opacity: ${forwardOutOpacity};
		}
	}
	@keyframes ${name}FwdZoomIn {
		from {
			transform: scale(${forwardInScale});
			opacity: ${forwardInOpacity};
		}
		to {
			transform: scale(1));
			opacity: 1;
		}
	}
	@keyframes ${name}BwdZoomOut {
		from {
			transform: scale(1);
			opacity: 1;
		}
		to {
			transform: scale(${backwardOutScale});
			opacity: ${backwardOutOpacity};
		}
	}
	@keyframes ${name}BwdZoomIn {
		from {
			transform: scale(${backwardInScale});
			opacity: ${backwardInOpacity};
		}
		to {
			transform: scale(1));
			opacity: 1;
		}
	}`;

export type AnimationProperties = Omit<TransitionAnimation, "name">;

export const zoom = (animation?: AnimationProperties) => namedZoom('', animation);
export const namedZoom = (name: string, animation?: AnimationProperties) => {
	const common = {
		easing: 'ease-in-out',
		fillMode: 'both',
		duration: '0.3s',
		...animation,
	};

	const forwards = {
		old: { ...common, name: `${name}FwdZoomOut` },
		new: { ...common, name: `${name}FwdZoomIn` },
	};

	const backwards = {
		old: { ...common, name: `${name}BwdZoomOut` },
		new: { ...common, name: `${name}BwdZoomIn` },
	};
	return { forwards, backwards } as TransitionDirectionalAnimations;
};


export const customZoom = (
	name: string,
	options: CustomZoomOptions,
	scope?: string
) => {
	const { keyframes, base, animations: extensions } = options;
	const { scale, opacity } = keyframes ?? {};
	const animations = extend(namedZoom(name, base), extensions ?? {});

	setKeyframes(
		name,
		genKeyframes(name, scale?.forwardOut, opacity?.forwardOut, scale?.forwardIn, opacity?.forwardIn, scale?.backwardOut, opacity?.backwardOut, scale?.backwardIn, opacity?.backwardIn)
	);

	let { scope: finalScope, styles } = maybeScopedStyleSheet(name, scope, animations);
	setStyles(name, styles);
	return finalScope;
};

