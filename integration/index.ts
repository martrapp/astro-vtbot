import type { AstroIntegration } from 'astro';
import vitePluginVtbotExtend from './vite-plugin-extend';
//@ts-expect-error
import icon from '../assets/bag-of-tricks-mono.svg?raw';
import inspectionChamber from '../node_modules/@vtbag/inspection-chamber?raw';
import { fileURLToPath } from 'node:url';

const DTB_TOKEN = 'vtbot-inspection-chamber';

type VtBotOptions = {
	autoLint?: boolean;
	loadingIndicator?: boolean;
};

export default function createIntegration(options?: VtBotOptions): AstroIntegration {
	return {
		name: 'astro-vtbot',
		hooks: {
			'astro:config:setup': (setupOptions) => {
				const linter = options?.autoLint ?? true;
				const loading = options?.loadingIndicator ?? true;
				if (linter || loading) {
					setupOptions.updateConfig({
						vite: {
							plugins: [vitePluginVtbotExtend({ linter, loading })],
						},
					});
				}
				//@ts-expect-error
				if (import.meta.env.DEV) {
					setupOptions.injectRoute({
						pattern: '/_vtbot_inspection_chamber',
						entrypoint: 'node_modules/astro-vtbot/components/InspectionChamber.astro',
					});

					setupOptions.injectScript(
						'head-inline',
						`if (sessionStorage.getItem('${DTB_TOKEN}') === 'true') {${inspectionChamber}}; document.currentScript.remove()`
					);
				}

				setupOptions.addDevToolbarApp({
					id: 'vtbot',
					name: 'The Bag',
					icon,
					entrypoint: fileURLToPath(new URL('../devToolbar/app.ts', import.meta.url)),
				});
			},
		},
	};
}
