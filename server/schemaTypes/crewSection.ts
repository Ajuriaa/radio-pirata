import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'crewSection',
  title: 'Sección de Tripulación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
