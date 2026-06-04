// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	site: 'https://phasora.com',
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
	adapter: cloudflare({
		// Pre-compile all images at build time using Sharp so they
		// ship as plain static assets (no /_image runtime endpoint).
		// Required for Cloudflare Workers/Pages where the runtime
		// image service is not available without a Cloudflare Images binding.
		imageService: 'compile',
	}),
});
