import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'always',
	devToolbar: {
		enabled: false,
	},
	vite: {
		server: {
			fs: {
				allow: ['/home/'],
			},
		},
	},
});
