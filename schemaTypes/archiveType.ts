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
    defineField({name: 'slug', type: 'slug', readOnly: true}),
    defineField({name: 'wordpressURL', type: 'url', readOnly: true}),
    defineField({name: 'created', type: 'datetime', readOnly: true}),
    defineField({name: 'modified', type: 'datetime', readOnly: true}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'created',
      media: 'featuredMedia',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      const subtitleFormatted = subtitle ? new Date(subtitle).toLocaleDateString() : '';
      return { ...selection, subtitle: subtitleFormatted }
    }
  },
})