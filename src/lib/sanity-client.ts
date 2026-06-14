import { createClient, type SanityClient } from '@sanity/client';
import { sanityConfigured, sanityDataset, sanityProjectId } from './sanity-env';

export { sanityConfigured } from './sanity-env';

function createSanityClient(): SanityClient | null {
	if (!sanityConfigured) return null;

	return createClient({
		projectId: sanityProjectId,
		dataset: sanityDataset,
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
