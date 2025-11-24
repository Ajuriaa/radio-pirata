import { Anchor, Instagram, Youtube, Twitch, Mail } from 'lucide-react'
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
                {/* X (Twitter) icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
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
                {/* Spotify icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
            )}
            {settings.socialLinks?.twitch && (
              <a
                href={settings.socialLinks.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-red transition transform hover:scale-110"
              >
                <Twitch className="h-6 w-6" />
              </a>
            )}
            {settings.socialLinks?.ivoox && (
              <a
                href={settings.socialLinks.ivoox}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-op-red transition transform hover:scale-110"
              >
                {/* iVoox icon */}
                <svg className="h-6 w-6" viewBox="0 0 414 414" fill="currentColor">
                  <path d="M0 0 C24.75 0 49.5 0 75 0 C75.99 5.61 76.98 11.22 78 17 C83.35790295 33.37137011 91.08511365 45.26376506 106.5625 53.25 C126.28405555 62.74844249 150.45601447 64.7599678 171.53125 58.3203125 C187.61986794 52.19649171 199.88493613 43.31486304 207.69140625 27.59375 C211.89259035 18.1423258 212.62970055 10.96239562 214 0 C238.75 0 263.5 0 289 0 C289 26.22766821 281.56974543 51.07453451 264 71 C263.29746094 71.85722656 262.59492188 72.71445313 261.87109375 73.59765625 C244.08741094 94.51078578 217.55815915 108.06047559 191 114 C187.5 114.125 187.5 114.125 185 114 C185 114.66 185 115.32 185 116 C186.27875 116.04125 187.5575 116.0825 188.875 116.125 C211.47225619 118.45165684 234.00294978 131.72025961 251 146 C251.73863281 146.59167969 252.47726562 147.18335938 253.23828125 147.79296875 C271.89090025 163.33129612 285.85478619 188.82115272 288.6875 212.9375 C289.03797204 218.61514707 289 224.31154617 289 230 C264.25 230 239.5 230 214 230 C213.34 225.05 212.68 220.1 212 215 C208.03777057 199.15108229 200.26601287 186.8038222 186.125 178.1875 C165.45474504 166.88427197 139.55496041 165.72626664 117 172 C102.44167643 176.50530645 90.90381608 185.80616722 83.28515625 198.9609375 C79.02281976 207.4022396 77.42010993 215.76417712 76 225 C75.67 226.65 75.34 228.3 75 230 C50.25 230 25.5 230 0 230 C0 221.15089867 0.14613072 214.25221757 2.1875 205.9375 C2.5280542 204.50772827 2.5280542 204.50772827 2.87548828 203.04907227 C4.60798079 196.03229802 6.74551644 189.47166645 10 183 C10.50144531 181.96101562 11.00289062 180.92203125 11.51953125 179.8515625 C26.53013207 150.25220444 54.002731 130.38564786 84.89306641 119.68408203 C91.14579384 117.65393808 97.40051164 116 104 116 C104 115.34 104 114.68 104 114 C102.989375 113.9175 101.97875 113.835 100.9375 113.75 C71.37411558 109.82885303 41.81281843 92.11254364 23.43359375 68.81640625 C7.59465352 47.91562979 1.44924107 26.08633932 0 0 Z " transform="translate(62,104)"/>
                  <path d="M0 0 C0.97469238 0.00757324 1.94938477 0.01514648 2.95361328 0.02294922 C13.84198535 0.27260729 22.06887792 3.03070023 30.1875 10.4375 C36.27544113 17.01905798 38.6077483 24.08682704 38.4609375 32.91015625 C37.53524478 41.46620185 33.76992147 48.9058504 27.1875 54.4375 C15.11028196 62.3734625 2.08111993 62.99750868 -12.03125 60.9765625 C-21.0782851 58.54302458 -27.68176565 53.57807542 -32.62109375 45.68359375 C-36.67821279 38.03492671 -37.17452957 29.95187918 -35.08984375 21.51171875 C-31.90572489 13.01643805 -26.94977696 7.49939115 -18.8125 3.4375 C-12.39166477 0.54182921 -7.01058824 -0.07582267 0 0 Z " transform="translate(205.8125,42.5625)"/>
                </svg>
              </a>
            )}
            {settings.socialLinks?.email && (
              <a
                href={`mailto:${settings.socialLinks.email}`}
                className="hover:text-op-red transition transform hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
