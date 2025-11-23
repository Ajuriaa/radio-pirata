'use client'

import { Anchor, Headphones } from 'lucide-react'
import { Link } from 'react-scroll'
import type { Hero as HeroType } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

interface HeroProps {
  hero: HeroType
}

export default function Hero({ hero }: HeroProps) {
  const backgroundUrl = hero.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).url()
    : 'https://images.unsplash.com/photo-1500539270606-982e96067373?q=80&w=1920&auto=format&fit=crop'

  return (
    <header
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-op-blue/80 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-op-dark via-transparent to-transparent"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-4 flex justify-center animate-bounce">
          <Anchor className="text-op-gold h-16 w-16" />
        </div>
        <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-manga)] text-white mb-6 text-stroke leading-tight">
          {hero.title} <span className="text-op-gold">{hero.highlightedText}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
          {hero.subtitle}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {hero.ctaButtons?.map((btn, i) => {
            const isExternal = btn.href.startsWith('http')
            const baseClassName = `font-[family-name:var(--font-manga)] text-2xl py-3 px-8 rounded border-4 border-black transition transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 ${
              btn.style === 'spotify'
                ? 'bg-green-600 text-white hover:bg-green-500'
                : 'bg-op-gold text-op-dark hover:bg-yellow-400'
            }`

            if (isExternal) {
              return (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClassName}
                >
                  {btn.icon === 'headphones' && <Headphones />}
                  {btn.label}
                </a>
              )
            }

            return (
              <Link
                key={i}
                to={btn.href.replace('#', '')}
                smooth={true}
                duration={800}
                offset={-80}
                className={`${baseClassName} cursor-pointer`}
              >
                {btn.icon === 'headphones' && <Headphones />}
                {btn.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Wave divider */}
      <div className="wave-divider text-op-dark">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#1a1a1a"
          ></path>
        </svg>
      </div>
    </header>
  )
}
