import {
  client,
  queries,
  type SiteSettings,
  type Hero as HeroType,
  type Episode,
  type CrewMember,
  type Newsletter as NewsletterType,
  type EpisodesSection,
  type CrewSection,
} from '@/lib/sanity'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Episodes from '@/components/Episodes'
import Crew from '@/components/Crew'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

// Revalidate every 60 seconds
export const revalidate = 60

async function getData() {
  const [siteSettings, hero, episodes, crewMembers, newsletter, episodesSection, crewSection] =
    await Promise.all([
      client.fetch<SiteSettings>(queries.siteSettings),
      client.fetch<HeroType>(queries.hero),
      client.fetch<Episode[]>(queries.episodes),
      client.fetch<CrewMember[]>(queries.crewMembers),
      client.fetch<NewsletterType>(queries.newsletter),
      client.fetch<EpisodesSection>(queries.episodesSection),
      client.fetch<CrewSection>(queries.crewSection),
    ])

  return {
    siteSettings,
    hero,
    episodes,
    crewMembers,
    newsletter,
    episodesSection,
    crewSection,
  }
}

export default async function Home() {
  const data = await getData()

  // Fallback values if Sanity data is not yet populated
  const siteSettings = data.siteSettings || {
    siteName: 'RADIOPIRATA',
    navLinks: [
      { label: 'Episodios', href: '#episodios' },
      { label: 'Tripulación', href: '#tripulacion' },
      { label: 'Nakamas', href: '#comunidad' },
    ],
    ctaButton: { label: 'Escuchar Ahora', href: '#escuchar' },
    socialLinks: {},
    copyright: '© 2023 RadioPirata. No afiliado oficialmente con Shueisha o Toei Animation.',
    footerText: 'Hecho con Haki por un desarrollador nakama.',
    colors: {
      primary: '#D92525',
      secondary: '#F2CB05',
      accent: '#0F3D59',
      background: '#1a1a1a',
      paper: '#F2E3C9',
    },
  }

  const hero = data.hero || {
    title: '¡Zarpamos hacia el',
    highlightedText: 'One Piece!',
    subtitle: 'El podcast definitivo para nakamas. Teorías, análisis, humor y debates sobre el mundo de Eiichiro Oda.',
    icon: 'anchor',
    ctaButtons: [
      { label: 'Ver Episodios', href: '#episodios', style: 'primary' as const },
      { label: 'Spotify', href: 'https://spotify.com', icon: 'headphones', style: 'spotify' as const },
    ],
  }

  const episodesSection = data.episodesSection || {
    title: 'Log Pose: Últimos Viajes',
    playButtonText: 'Reproducir',
  }

  const episodes = data.episodes || []

  const crewSection = data.crewSection || {
    title: 'La Tripulación',
    subtitle: 'Conoce a las voces detrás del micrófono. ¡Cuidado, sus recompensas son altas!',
  }

  const crewMembers = data.crewMembers || []

  const newsletter = data.newsletter || {
    title: '¡Únete a la Gran Flota!',
    subtitle: 'Recibe noticias de Oda-sensei, avisos de nuevos episodios y teorías exclusivas directamente en tu Den Den Mushi (email).',
    placeholder: 'Tu correo electrónico...',
    buttonText: 'Suscribirse',
    successMessage: '¡Gracias Nakama! Te has unido a la flota.',
    icon: 'mail',
  }

  return (
    <>
      <Navbar settings={siteSettings} />
      <Hero hero={hero} />
      <Episodes section={episodesSection} episodes={episodes} />
      <Crew section={crewSection} members={crewMembers} />
      <Newsletter newsletter={newsletter} />
      <Footer settings={siteSettings} />
    </>
  )
}
