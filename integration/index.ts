import type { AstroConfig, AstroIntegration } from 'astro';
import vitePluginVtbotExtend from './vite-plugin-extend';

type VtBotOptions = {
	autoLint: boolean;
};

export default function createIntegration(options?: VtBotOptions): AstroIntegration {
	let config: AstroConfig;
	return {
		name: 'astro-vtbot',
		hooks: {
			'astro:config:setup': ({ updateConfig }) => {
				(options?.autoLint ?? true) &&
					updateConfig({
						vite: {
							plugins: [vitePluginVtbotExtend()],
						},
					});
			},

			'astro:config:done': async ({ config: cfg }) => {
				config = cfg;
			},
		},
	};
}
