'use client'

import { useState } from 'react'
import { Skull, Menu } from 'lucide-react'
import type { SiteSettings } from '@/lib/sanity'

interface NavbarProps {
  settings: SiteSettings
}

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-op-dark/90 backdrop-blur-sm border-b-4 border-op-gold">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skull className="text-op-red h-8 w-8" />
          <span className="text-3xl font-[family-name:var(--font-manga)] text-white tracking-wider text-stroke">
            {settings.siteName}
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-lg font-bold uppercase tracking-wide">
          {settings.navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="hover:text-op-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        {settings.ctaButton && (
          <a
            href={settings.ctaButton.href}
            className="hidden md:inline-block bg-op-red text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition shadow-lg btn-haki uppercase border-2 border-white"
          >
            {settings.ctaButton.label}
          </a>
        )}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-op-dark border-t border-gray-700 p-4 text-center">
          {settings.navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="block py-2 hover:text-op-gold"
            >
              {link.label}
            </a>
          ))}
          {settings.ctaButton && (
            <a
              href={settings.ctaButton.href}
              className="block py-2 text-op-red font-bold"
            >
              {settings.ctaButton.label}
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
