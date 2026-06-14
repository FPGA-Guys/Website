import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'post',
	title: 'Blog Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 3,
			description: 'Short summary shown on the blog listing page.',
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'publishedDate',
			title: 'Published date',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'author' }],
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'category' }],
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'Quote', value: 'blockquote' },
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Numbered', value: 'number' },
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Code', value: 'code' },
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
										validation: (Rule) =>
											Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
									},
								],
							},
						],
					},
				}),
				defineArrayMember({
					type: 'image',
					options: { hotspot: true },
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
							title: 'Alt text',
						}),
						defineField({
							name: 'caption',
							type: 'string',
							title: 'Caption',
						}),
					],
				}),
			],
		}),
	],
	orderings: [
		{
			title: 'Published date, newest',
			name: 'publishedDateDesc',
			by: [{ field: 'publishedDate', direction: 'desc' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'coverImage',
			date: 'publishedDate',
		},
		prepare({ title, author, media, date }) {
			return {
				title,
				media,
				subtitle: [author, date ? new Date(date).toLocaleDateString() : null]
					.filter(Boolean)
					.join(' . '),
			};
		},
	},
});
