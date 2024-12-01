import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const membershipType = defineType({
  name: 'membership',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'name', type: 'string', readOnly: true, validation: (Rule) => Rule.required()}),
    defineField({name: 'email', type: 'email', readOnly: true}),
    defineField({name: 'phone', type: 'string', readOnly: true}),
    defineField({name: 'university', type: 'string', readOnly: true}),
    defineField({name: 'school', type: 'string', readOnly: true}),
    defineField({name: 'centre', type: 'string', readOnly: true}),
    defineField({name: 'programme', type: 'string', readOnly: true}),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})