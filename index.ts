import type { AstroIntegration } from 'astro';

export default function createIntegration(_opts = {}): AstroIntegration {
	return {
		name: 'astro-vtbot',
		hooks: {},
	};
}
