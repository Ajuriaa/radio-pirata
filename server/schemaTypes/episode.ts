import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episodio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Número de Episodio',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnailColor',
      title: 'Color de Fondo (si no hay imagen)',
      type: 'string',
      description: 'Color hex (ej: #0F3D59)',
    }),
    defineField({
      name: 'isNew',
      title: 'Es Nuevo',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'audioUrl',
      title: 'URL del Audio',
      type: 'url',
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'URL de Spotify',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Número de Episodio (Desc)',
      name: 'episodeNumberDesc',
      by: [{ field: 'episodeNumber', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      episodeNumber: 'episodeNumber',
      media: 'thumbnail',
    },
    prepare({ title, episodeNumber, media }) {
      return {
        title: `Ep. ${episodeNumber}: ${title}`,
        media,
      }
    },
  },
})
