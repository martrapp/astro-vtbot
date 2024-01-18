import { parse } from 'acorn';
import { walk, type Node } from 'estree-walker';
import type { Plugin } from 'vite';

export default function vitePluginVtbotExtend(): Plugin {
	return {
		name: 'vtbot:linter',
		enforce: 'pre',
		transform(code: string, id: string) {
			if (!import.meta.env.DEV || id.endsWith('vtpl.astro') || !id.endsWith('.astro')) return;

			const match = code.match(/from\s*['"]astro:transitions["']/ms);
			if (match) {
				console.log('id :>> ', id);
				const ast = parse(code, {
					ecmaVersion: 'latest',
					sourceType: 'module',
				}) as Node;

				walk(ast, {
					enter(node: any) {
						if (node.type === 'ImportDeclaration' && node.source.value === 'astro:transitions') {
							code =
								code.substring(0, node.source.start) +
								'"astro-vtbot/vtext"' +
								code.substring(node.source.end);
						}
					},
				});
			}
			return code;
		},
	};
}
