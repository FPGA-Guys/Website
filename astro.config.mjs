// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { loadEnv } from 'vite';

// Load .env before config is read (Astro does not invoke function-form configs).
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

const sanityIntegrations = projectId
	? [
			sanity({
				projectId,
				dataset,
				useCdn: false,
				logClientRequests: 'dev',
				studioBasePath: '/admin',
			}),
		]
	: [];

if (!projectId) {
	console.warn(
		'[MidMon] PUBLIC_SANITY_PROJECT_ID is not set. Blog pages will be empty and /admin Studio is disabled until you add it to .env',
	);
}

// https://astro.build/config
export default defineConfig({
	site: 'https://phasora.com',
	// Hybrid: marketing pages prerender; /admin is server-rendered via @sanity/astro injectRoute.
	output: 'server',
	integrations: [react(), ...sanityIntegrations, mdx(), sitemap()],
	vite: {
		envPrefix: ['PUBLIC_'],
	},
	session: {
		driver: sessionDrivers.null(),
	},
	adapter: cloudflare({
		imageService: 'compile',
	}),
});
