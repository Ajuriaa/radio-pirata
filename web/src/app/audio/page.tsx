import { client, queries, type SiteSettings, type Hero as HeroType, urlFor } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AudioForm from '@/components/AudioForm'

export const metadata = {
  title: 'Enviar Audio | RadioPirata',
  description: 'Envía tu audio al podcast RadioPirata',
}

export const revalidate = 60

async function getData() {
  const [siteSettings, hero] = await Promise.all([
    client.fetch<SiteSettings>(queries.siteSettings),
    client.fetch<HeroType>(queries.hero),
  ])

  return {
    siteSettings: siteSettings || {
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
    },
    hero,
  }
}

export default async function AudioPage() {
  const { siteSettings, hero } = await getData()

  const backgroundUrl = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).url()
    : 'https://images.unsplash.com/photo-1500539270606-982e96067373?q=80&w=1920&auto=format&fit=crop'

  return (
    <>
      <Navbar settings={siteSettings} />
      <div
        className="min-h-screen bg-op-dark pt-24 pb-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${backgroundUrl}')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-op-blue/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-op-dark via-transparent to-transparent"></div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-5xl font-[family-name:var(--font-manga)] text-white text-center mb-8 text-stroke">
              Enviar Audio
            </h1>
            <AudioForm />
          </div>
        </div>
      </div>
      <Footer settings={siteSettings} />
    </>
  )
}
