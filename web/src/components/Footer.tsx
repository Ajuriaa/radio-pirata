import { Anchor, Twitter, Instagram, Youtube, Mic2 } from 'lucide-react'
import type { SiteSettings } from '@/lib/sanity'

interface FooterProps {
  settings: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-op-gold">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Anchor className="text-op-gold" />
              <span className="text-2xl font-[family-name:var(--font-manga)] text-op-red">
                {settings.siteName}
              </span>
            </div>
            <p className="text-gray-500 text-sm">{settings.copyright}</p>
            <p className="text-gray-600 text-xs mt-1">{settings.footerText}</p>
          </div>

          <div className="flex gap-6">
            {settings.socialLinks?.twitter && (
              <a
                href={settings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-red transition transform hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </a>
            )}
            {settings.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-red transition transform hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
            {settings.socialLinks?.youtube && (
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-red transition transform hover:scale-110"
              >
                <Youtube className="h-6 w-6" />
              </a>
            )}
            {settings.socialLinks?.spotify && (
              <a
                href={settings.socialLinks.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-red transition transform hover:scale-110"
              >
                <Mic2 className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
