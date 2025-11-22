import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Texto Destacado',
      type: 'string',
      description: 'Texto que aparece en color dorado (ej: "One Piece!")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de Fondo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono de Lucide (ej: anchor)',
      initialValue: 'anchor',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Botones CTA',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Texto', type: 'string' },
            { name: 'href', title: 'URL', type: 'string' },
            { name: 'icon', title: 'Icono', type: 'string' },
            {
              name: 'style',
              title: 'Estilo',
              type: 'string',
              options: {
                list: [
                  { title: 'Primario (Gold)', value: 'primary' },
                  { title: 'Spotify (Green)', value: 'spotify' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
