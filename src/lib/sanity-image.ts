import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityConfigured, sanityDataset, sanityProjectId } from './sanity-env';

const builder = sanityConfigured
	? createImageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset })
	: null;

export function urlFor(source: SanityImageSource | null | undefined) {
	if (!builder || !source) {
		return {
			width: () => urlFor(source),
			height: () => urlFor(source),
			url: () => '',
		};
	}

	return builder.image(source);
}

export function imageUrl(
	source: SanityImageSource | null | undefined,
	options?: { width?: number; height?: number; quality?: number },
): string {
	if (!source) return '';

	let image = urlFor(source);
	if (options?.width) image = image.width(options.width);
	if (options?.height) image = image.height(options.height);
	if (options?.quality) image = image.quality(options.quality);

	return image.auto('format').url();
}
