'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'
import NextLink from 'next/link'
import Image from 'next/image'
import type { SiteSettings } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

interface NavbarProps {
  settings: SiteSettings
}

export default function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 800, smooth: true })
  }

  return (
    <nav className="fixed w-full z-50 bg-op-dark/90 backdrop-blur-sm border-b-4 border-op-gold">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={scrollToTop}
        >
          {settings.logo ? (
            <Image
              src={urlFor(settings.logo).width(48).height(48).url()}
              alt="RadioPirata Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          ) : (
            <Image
              src="/favicon.webp"
              alt="RadioPirata Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          )}
          <span className="text-3xl font-[family-name:var(--font-manga)] text-white tracking-wider text-stroke">
            {settings.siteName}
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-lg font-bold uppercase tracking-wide">
          {settings.navLinks?.map((link, i) => {
            const isPageLink = link.href.startsWith('/')
            const isAnchorLink = link.href.startsWith('#')

            // If it's a page link, use NextLink
            if (isPageLink) {
              return (
                <NextLink
                  key={i}
                  href={link.href}
                  className="hover:text-op-gold transition-colors cursor-pointer"
                >
                  {link.label}
                </NextLink>
              )
            }

            // If it's an anchor link and we're not on home page, navigate to home with anchor
            if (isAnchorLink && !isHomePage) {
              return (
                <NextLink
                  key={i}
                  href={`/${link.href}`}
                  className="hover:text-op-gold transition-colors cursor-pointer"
                >
                  {link.label}
                </NextLink>
              )
            }

            // If it's an anchor link and we're on home page, use smooth scroll
            return (
              <ScrollLink
                key={i}
                to={link.href.replace('#', '')}
                smooth={true}
                duration={800}
                offset={-80}
                className="hover:text-op-gold transition-colors cursor-pointer"
              >
                {link.label}
              </ScrollLink>
            )
          })}
        </div>
        {settings.ctaButton && (
          <a
            href={settings.ctaButton.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-op-red text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition shadow-lg btn-haki uppercase border-2 border-white cursor-pointer"
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
          {settings.navLinks?.map((link, i) => {
            const isPageLink = link.href.startsWith('/')
            const isAnchorLink = link.href.startsWith('#')

            // If it's a page link, use NextLink
            if (isPageLink) {
              return (
                <NextLink
                  key={i}
                  href={link.href}
                  className="block py-2 hover:text-op-gold cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NextLink>
              )
            }

            // If it's an anchor link and we're not on home page, navigate to home with anchor
            if (isAnchorLink && !isHomePage) {
              return (
                <NextLink
                  key={i}
                  href={`/${link.href}`}
                  className="block py-2 hover:text-op-gold cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NextLink>
              )
            }

            // If it's an anchor link and we're on home page, use smooth scroll
            return (
              <ScrollLink
                key={i}
                to={link.href.replace('#', '')}
                smooth={true}
                duration={800}
                offset={-80}
                className="block py-2 hover:text-op-gold cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            )
          })}
          {settings.ctaButton && (
            <a
              href={settings.ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-op-red font-bold cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              {settings.ctaButton.label}
            </a>
          )}
        </div>
      )}
    </nav>
  )
}
