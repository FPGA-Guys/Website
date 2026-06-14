// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { loadEnv } from 'vite';
import sanityProject from './sanity.project.json' with { type: 'json' };

// Load .env locally; fall back to process.env (CI) then committed public project IDs.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const projectId =
	env.PUBLIC_SANITY_PROJECT_ID ??
	process.env.PUBLIC_SANITY_PROJECT_ID ??
	sanityProject.projectId;
const dataset =
	env.PUBLIC_SANITY_DATASET ??
	process.env.PUBLIC_SANITY_DATASET ??
	sanityProject.dataset ??
	'production';

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
		'[MidMon] PUBLIC_SANITY_PROJECT_ID is not set. Blog pages will be empty and /admin Studio is disabled.',
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
		define: {
			// Ensure Studio and client bundles always have Sanity IDs on CI (Cloudflare build vars are runtime-only).
			'import.meta.env.PUBLIC_SANITY_PROJECT_ID': JSON.stringify(projectId),
			'import.meta.env.PUBLIC_SANITY_DATASET': JSON.stringify(dataset),
		},
	},
	session: {
		driver: sessionDrivers.null(),
	},
	adapter: cloudflare({
		imageService: 'compile',
	}),
});
