import groq from 'groq';

export const postsQuery = groq`
	*[_type == "post" && defined(slug.current)] | order(publishedDate desc) {
		_id,
		title,
		"slug": slug.current,
		excerpt,
		publishedDate,
		coverImage,
		author->{
			name,
			"slug": slug.current,
			image
		},
		category->{
			title,
			"slug": slug.current
		}
	}
`;

export const postSlugsQuery = groq`
	*[_type == "post" && defined(slug.current)]{
		"slug": slug.current
	}
`;

export const postBySlugQuery = groq`
	*[_type == "post" && slug.current == $slug][0]{
		_id,
		title,
		"slug": slug.current,
		excerpt,
		publishedDate,
		coverImage,
		body,
		author->{
			name,
			"slug": slug.current,
			image,
			bio
		},
		category->{
			title,
			"slug": slug.current
		}
	}
`;
