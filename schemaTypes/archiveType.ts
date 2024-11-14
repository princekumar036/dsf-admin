import {ArchiveIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const archiveType = defineType({
  name: 'archive',
  type: 'document',
  icon: ArchiveIcon,
  fields: [
    defineField({name: 'hideOnWebsite', type: 'boolean', initialValue: false}),

    defineField({name: 'title', type: 'string', readOnly: true, validation: (Rule) => Rule.required()}),

    defineField({
      name: 'content',
      type: 'portableText',
      readOnly: true
    }),

    defineField({name: 'featuredMedia', type: 'image', readOnly: true}),

    // defineField({
    //   name: 'excerpt',
    //   type: 'portableText',
    //   readOnly: true
    // }),
    
    // defineField({name: 'sticky', type: 'boolean', readOnly: true}),

    // defineField({
    //   name: 'author',
    //   type: 'reference',
    //   to: [{type: 'author'}],
    // }),

    // defineField({
    //   name: 'categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'category'}]}],
    //   readOnly: true
    // }),

    // defineField({
    //   name: 'tags',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'tag'}]}],
    //   readOnly: true
    // }),

    // defineField({
    //   name: 'status',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Published', value: 'publish'},
    //       {title: 'Future', value: 'future'},
    //       {title: 'Draft', value: 'draft'},
    //       {title: 'Pending', value: 'pending'},
    //       {title: 'Private', value: 'private'},
    //       {title: 'Trash', value: 'trash'},
    //       {title: 'Auto-Draft', value: 'auto-draft'},
    //       {title: 'Inherit', value: 'inherit'},
    //     ],
    //   },
    // }),

    defineField({name: 'slug', type: 'slug', readOnly: true}),

    defineField({name: 'wordpressURL', type: 'url', readOnly: true}),

    defineField({name: 'created', type: 'datetime', readOnly: true}),

    defineField({name: 'modified', type: 'datetime', readOnly: true}),

  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'wordpressURL',
      media: 'featuredMedia',
    },
  },
})