import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const releaseType = defineType({
  name: 'release',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}, {type: 'externalImage'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'featuredMedia', type: 'image'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: '_createdAt',
      media: 'featuredMedia',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      const subtitleFormatted = subtitle ? new Date(subtitle).toLocaleDateString() : '';
      return { ...selection, subtitle: subtitleFormatted }
    },
  },
})