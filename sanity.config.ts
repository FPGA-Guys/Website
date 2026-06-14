import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schemas';
import sanityProject from './sanity.project.json' with { type: 'json' };

const projectId =
	import.meta.env?.PUBLIC_SANITY_PROJECT_ID ??
	process.env.PUBLIC_SANITY_PROJECT_ID ??
	sanityProject.projectId;
const dataset =
	import.meta.env?.PUBLIC_SANITY_DATASET ??
	process.env.PUBLIC_SANITY_DATASET ??
	sanityProject.dataset ??
	'production';

export default defineConfig({
	name: 'midmon',
	title: 'MidMon',
	projectId,
	dataset,
	plugins: [structureTool()],
	schema: {
		types: schemaTypes,
	},
});
