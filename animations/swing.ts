import './swing.css';
import { NamedAnimationPairs, extend, maybeScopedStyleSheet, setKeyframes, setStyles } from './animation-style';
import type { TransitionAnimation, TransitionDirectionalAnimations } from 'astro';

type SwingKeyframeParameter = {
	axis?: { x?: number; y?: number; z?: number; };
	angle?: { grow?: string; shrink?: string; };
	midOpacity?: number;
	toOpacity?: number;
};

type CustomSwingOptions = {
	keyframes?: SwingKeyframeParameter;
	base?: AnimationProperties;
	animations?: NamedAnimationPairs;
};


export const genKeyframes = (
	name: string,
	x: number = 0,
	y: number = 0,
	z: number = 0,
	growAngle = "90deg",
	shrinkAngle = "-90deg",
	midOpacity: number = 1,
	toOpacity: number = 0
) =>
	`
		@keyframes ${name}FwdSwingOut {
		from {
			transform: rotate3d(${x}, ${y}, ${z}, 0);
			opacity: 1;
		}
		50% {
			opacity: ${midOpacity};
		}
		to {
			transform: rotate3d(${x}, ${y}, ${z}, ${growAngle});
			opacity: ${toOpacity};
		}
	}
	@keyframes ${name}FwdSwingIn {
		from {
			transform: rotate3d(${x}, ${y}, ${z}, ${shrinkAngle});
			opacity: ${toOpacity};
		}
		50% {
			opacity: ${midOpacity};
		}
		to {
			transform: rotate3d(${x}, ${y}, ${z}, 0);
			opacity: 1;
		}
	}
	@keyframes ${name}BwdSwingOut {
		from {
			transform: rotate3d(${x}, ${y}, ${z}, 0);
			opacity: 1;
		}
		50% {
			opacity: ${midOpacity};
		}
		to {
			transform: rotate3d(${x}, ${y}, ${z}, ${shrinkAngle});
			opacity: ${toOpacity};
		}
	}
	@keyframes ${name}BwdSwingIn {
		from {
			transform: rotate3d(${x}, ${y}, ${z}, ${growAngle});
			opacity: ${toOpacity};
		}
		50% {
			opacity: ${midOpacity};
		}
		to {
			transform: rotate3d(${x}, ${y}, ${z}, 0);
			opacity: 1;
		}
	}`;

export type AnimationProperties = Omit<TransitionAnimation, "name">;

export const swing = (animation?: AnimationProperties) => namedSwing('', animation);
export const namedSwing = (name: string, animation?: AnimationProperties) => {
	const common = {
		easing: 'ease-in-out',
		fillMode: 'both',
		duration: '0.15s',
		...animation,
	};

	const forwards = {
		old: { ...common, name: `${name}FwdSwingOut` },
		new: { delay: common.duration, ...common, name: `${name}FwdSwingIn` },
	};

	const backwards = {
		old: { ...common, name: `${name}BwdSwingOut` },
		new: { delay: common.duration, ...common, name: `${name}BwdSwingIn` },
	};
	return { forwards, backwards } as TransitionDirectionalAnimations;
};


export const customSwing = (
	name: string,
	options: CustomSwingOptions,
	scope?: string
) => {
	const { keyframes, base, animations: extensions } = options;
	const animations = extend(namedSwing(name, base), extensions ?? {});
	const axis = keyframes?.axis ?? { y: 1 };

	setKeyframes(
		name,
		genKeyframes(name, axis?.x, axis?.y, axis?.z, keyframes?.angle?.grow, keyframes?.angle?.shrink, keyframes?.midOpacity, keyframes?.toOpacity)
	);

	let { scope: finalScope, styles } = maybeScopedStyleSheet(name, scope, animations);
	setStyles(name, styles);
	return finalScope;
};

