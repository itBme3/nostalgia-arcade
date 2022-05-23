import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";

import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: netlify()
	},
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};

export default config;
