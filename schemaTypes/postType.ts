import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
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

export const portableTextType = defineField({
  name: 'portableText',
  type: 'array',
  of: [{type: 'block'}, {type: 'image'}, {type: 'externalImage'}],
})

export const externalImageType = defineType({
  name: 'externalImage',
  title: 'External Image',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
    },
  ],
})