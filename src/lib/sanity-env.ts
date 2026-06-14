import sanityProject from '../../sanity.project.json';

/** Public Sanity IDs — safe to commit; also embedded in the client bundle. */
export const sanityProjectId =
	import.meta.env.PUBLIC_SANITY_PROJECT_ID || sanityProject.projectId;

export const sanityDataset =
	import.meta.env.PUBLIC_SANITY_DATASET || sanityProject.dataset || 'production';

export const sanityConfigured = Boolean(sanityProjectId);
