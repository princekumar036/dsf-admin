import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'date', type: 'datetime'}),
    defineField({name: 'venue', type: 'string'}),
    defineField({name: 'guests', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'eventImage', type: 'image'}),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}, {type: 'externalImage'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
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