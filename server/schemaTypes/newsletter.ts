import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter Section',
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
    defineField({
      name: 'placeholder',
      title: 'Placeholder del Input',
      type: 'string',
      initialValue: 'Tu correo electrónico...',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto del Botón',
      type: 'string',
      initialValue: 'Suscribirse',
    }),
    defineField({
      name: 'successMessage',
      title: 'Mensaje de Éxito',
      type: 'string',
      initialValue: '¡Gracias Nakama! Te has unido a la flota.',
    }),
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono de Lucide (ej: mail)',
      initialValue: 'mail',
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
