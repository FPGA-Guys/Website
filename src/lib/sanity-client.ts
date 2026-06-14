import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

/** True when PUBLIC_SANITY_PROJECT_ID is set in the environment. */
export const sanityConfigured = Boolean(projectId);

function createSanityClient(): SanityClient | null {
	if (!projectId) return null;

	return createClient({
		projectId,
		dataset,
		useCdn: false,
		apiVersion: '2024-06-01',
	});
}

export const sanityClient = createSanityClient();

export async function fetchSanity<T>(
	query: string,
	params: Record<string, unknown> = {},
): Promise<T> {
	if (!sanityClient) {
		return [] as T;
	}

	return sanityClient.fetch<T>(query, params);
}
