import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const officeBearer = defineType({
  name: 'officeBearer',
  type: 'document',
  icon: UserIcon,
  fieldsets: [
      {name: 'social', options: {collapsible: true}},
      {name: 'affiliation', options: {collapsible: true}},
  ],
  fields: [
    defineField({name: 'position', type: 'string', validation: (Rule) => Rule.required(), 
        options: {
            list: [
                {title: 'Secretary', value: 'Secretary'},
                {title: 'President', value: 'President'},
                {title: 'Vice President', value: 'Vice President'},
                {title: 'General Secretary', value: 'General Secretary'},
                {title: 'Joint Secretary', value: 'Joint Secretary'},
                {title: 'Treasurer', value: 'Treasurer'},
            ]
        }
    }),

    defineField({name: 'name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'image', type: 'image'}),

    defineField({name: 'course', type: 'string', fieldset: 'affiliation'}),
    defineField({name: 'centre', type: 'string', fieldset: 'affiliation'}),
    defineField({name: 'school', type: 'string', fieldset: 'affiliation'}),

    defineField({name: 'email', type: 'string', fieldset: 'social', validation: (Rule) => Rule.email()}),
    defineField({name: 'facebook', type: 'url', fieldset: 'social'}),
    defineField({name: 'instagram', type: 'url', fieldset: 'social'}),
    defineField({name: 'twitter', type: 'url', fieldset: 'social'}),
    defineField({name: 'whatsappNo', type: 'string', fieldset: 'social', validation: (Rule) => Rule.length(10)}),

    defineField({name: 'order', type: 'number'}),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    }
  },
})
