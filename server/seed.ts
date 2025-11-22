import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '6gjuvgnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function seed() {
  console.log('🌱 Seeding Sanity with dummy data...\n')

  // Site Settings
  const siteSettings = await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'RADIOPIRATA',
    colors: {
      primary: '#D92525',
      secondary: '#F2CB05',
      accent: '#0F3D59',
      background: '#1a1a1a',
      paper: '#F2E3C9',
    },
    navLinks: [
      { _key: 'nav1', label: 'Episodios', href: '#episodios' },
      { _key: 'nav2', label: 'Tripulación', href: '#tripulacion' },
      { _key: 'nav3', label: 'Nakamas', href: '#comunidad' },
    ],
    ctaButton: {
      label: 'Escuchar Ahora',
      href: '#escuchar',
    },
    socialLinks: {
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      spotify: 'https://spotify.com',
    },
    footerText: 'Hecho con Haki por un desarrollador nakama.',
    copyright: '© 2023 RadioPirata. No afiliado oficialmente con Shueisha o Toei Animation.',
  })
  console.log('✅ Site Settings created')

  // Hero
  const hero = await client.createOrReplace({
    _id: 'hero',
    _type: 'hero',
    title: '¡Zarpamos hacia el',
    highlightedText: 'One Piece!',
    subtitle: 'El podcast definitivo para nakamas. Teorías, análisis, humor y debates sobre el mundo de Eiichiro Oda.',
    icon: 'anchor',
    ctaButtons: [
      { _key: 'cta1', label: 'Ver Episodios', href: '#episodios', style: 'primary' },
      { _key: 'cta2', label: 'Spotify', href: 'https://spotify.com', icon: 'headphones', style: 'spotify' },
    ],
  })
  console.log('✅ Hero created')

  // Episodes Section
  const episodesSection = await client.createOrReplace({
    _id: 'episodesSection',
    _type: 'episodesSection',
    title: 'Log Pose: Últimos Viajes',
    playButtonText: 'Reproducir',
  })
  console.log('✅ Episodes Section created')

  // Episodes
  const episodes = [
    {
      _id: 'episode-105',
      _type: 'episode',
      title: 'El Incidente de Egghead',
      episodeNumber: 105,
      description: 'Analizamos las revelaciones del Dr. Vegapunk y lo que significa para el Siglo Vacío.',
      thumbnailColor: '#0F3D59',
      isNew: true,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: 'episode-104',
      _type: 'episode',
      title: '¿Es Shanks un Villano?',
      episodeNumber: 104,
      description: 'Debate acalorado entre la tripulación sobre las verdaderas intenciones del Pelirrojo.',
      thumbnailColor: '#333333',
      isNew: false,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: 'episode-103',
      _type: 'episode',
      title: 'El Poder más Ridículo',
      episodeNumber: 103,
      description: 'Retrospectiva del Gear 5 y su impacto en la animación moderna.',
      thumbnailColor: '#D92525',
      isNew: false,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  for (const episode of episodes) {
    await client.createOrReplace(episode)
  }
  console.log('✅ Episodes created (3)')

  // Crew Section
  const crewSection = await client.createOrReplace({
    _id: 'crewSection',
    _type: 'crewSection',
    title: 'La Tripulación',
    subtitle: 'Conoce a las voces detrás del micrófono. ¡Cuidado, sus recompensas son altas!',
  })
  console.log('✅ Crew Section created')

  // Crew Members
  const crewMembers = [
    {
      _id: 'crew-capitan',
      _type: 'crewMember',
      name: 'EL CAPITÁN',
      role: 'Host Principal',
      bounty: 500000000,
      order: 1,
    },
    {
      _id: 'crew-navegante',
      _type: 'crewMember',
      name: 'LA NAVEGANTE',
      role: 'Analista de Lore',
      bounty: 330000000,
      order: 2,
    },
    {
      _id: 'crew-tirador',
      _type: 'crewMember',
      name: 'EL TIRADOR',
      role: 'Experto en Teorías',
      bounty: 200000000,
      order: 3,
    },
    {
      _id: 'crew-musico',
      _type: 'crewMember',
      name: 'EL MÚSICO',
      role: 'Edición y Risas',
      bounty: 90000000,
      order: 4,
    },
  ]

  for (const member of crewMembers) {
    await client.createOrReplace(member)
  }
  console.log('✅ Crew Members created (4)')

  // Newsletter
  const newsletter = await client.createOrReplace({
    _id: 'newsletter',
    _type: 'newsletter',
    title: '¡Únete a la Gran Flota!',
    subtitle: 'Recibe noticias de Oda-sensei, avisos de nuevos episodios y teorías exclusivas directamente en tu Den Den Mushi (email).',
    placeholder: 'Tu correo electrónico...',
    buttonText: 'Suscribirse',
    successMessage: '¡Gracias Nakama! Te has unido a la flota.',
    icon: 'mail',
  })
  console.log('✅ Newsletter created')

  console.log('\n🎉 Seed complete! All dummy data has been created.')
}

seed().catch(console.error)
