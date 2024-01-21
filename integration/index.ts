import type { AstroConfig, AstroIntegration } from 'astro';
import vitePluginVtbotExtend from './vite-plugin-extend';

type VtBotOptions = {
	autoLint?: boolean;
	loadingIndicator?: boolean;
};

export default function createIntegration(options?: VtBotOptions): AstroIntegration {
	let config: AstroConfig;
	return {
		name: 'astro-vtbot',
		hooks: {
			'astro:config:setup': ({ updateConfig }) => {
				const linter = options?.autoLint ?? true;
				const loading = options?.loadingIndicator ?? true;
				if (linter || loading) {
					updateConfig({
						vite: {
							plugins: [vitePluginVtbotExtend({ linter, loading })],
						},
					});
				}
			},

			'astro:config:done': async ({ config: cfg }) => {
				config = cfg;
			},
		},
	};
}
