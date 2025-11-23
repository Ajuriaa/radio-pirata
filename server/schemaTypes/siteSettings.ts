import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre del Sitio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'colors',
      title: 'Colores del Tema',
      type: 'object',
      fields: [
        { name: 'primary', title: 'Primario (Red)', type: 'string', initialValue: '#D92525' },
        { name: 'secondary', title: 'Secundario (Gold)', type: 'string', initialValue: '#F2CB05' },
        { name: 'accent', title: 'Acento (Blue)', type: 'string', initialValue: '#0F3D59' },
        { name: 'background', title: 'Fondo (Dark)', type: 'string', initialValue: '#1a1a1a' },
        { name: 'paper', title: 'Paper', type: 'string', initialValue: '#F2E3C9' },
      ],
    }),
    defineField({
      name: 'navLinks',
      title: 'Links de Navegación',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Texto', type: 'string' },
            { name: 'href', title: 'URL', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Botón CTA del Nav',
      type: 'object',
      fields: [
        { name: 'label', title: 'Texto', type: 'string' },
        { name: 'href', title: 'URL', type: 'string' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'X (Twitter)', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'spotify', title: 'Spotify', type: 'url' },
        { name: 'twitch', title: 'Twitch', type: 'url' },
        { name: 'ivoox', title: 'iVoox', type: 'url' },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Texto del Footer',
      type: 'text',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
