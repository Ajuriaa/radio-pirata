import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'episodesSection',
  title: 'Sección de Episodios',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playButtonText',
      title: 'Texto del Botón Reproducir',
      type: 'string',
      initialValue: 'Reproducir',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
