import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'crewMember',
  title: 'Miembro de la Tripulación',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      description: 'Ej: Host Principal, Analista de Lore, etc.',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bounty',
      title: 'Recompensa (Berries)',
      type: 'number',
      description: 'Ej: 500000000',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Para ordenar en la página',
    }),
  ],
  orderings: [
    {
      title: 'Orden',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
