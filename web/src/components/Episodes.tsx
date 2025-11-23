import { Youtube } from 'lucide-react'
import Image from 'next/image'
import type { Episode, EpisodesSection } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

interface EpisodesProps {
  section: EpisodesSection
  episodes: Episode[]
}

export default function Episodes({ section, episodes }: EpisodesProps) {
  return (
    <section id="episodios" className="py-20 bg-op-dark">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-1 w-12 bg-op-red"></div>
          <h2 className="text-5xl font-[family-name:var(--font-manga)] text-white text-center tracking-wide">
            {section.title}
          </h2>
          <div className="h-1 w-12 bg-op-red"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {episodes.map((episode) => (
            <article
              key={episode._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 group hover:border-op-gold transition duration-300 flex flex-col h-full"
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{ backgroundColor: episode.thumbnailColor || '#0F3D59' }}
              >
                {episode.thumbnail && (
                  <Image
                    src={urlFor(episode.thumbnail).width(600).height(400).url()}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    width={600}
                    height={400}
                  />
                )}
                {episode.isNew && (
                  <div className="absolute top-2 right-2 bg-op-red text-white text-xs font-bold px-2 py-1 rounded">
                    NUEVO
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-op-gold text-sm font-bold uppercase tracking-wider">
                  Episodio {episode.episodeNumber}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3 font-[family-name:var(--font-manga)]">
                  {episode.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">{episode.description}</p>
                <div className="flex gap-2 mt-auto">
                  {episode.audioUrl && (
                    <a
                      href={episode.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2 transition"
                    >
                      <Youtube size={20} />
                      YouTube
                    </a>
                  )}
                  {episode.spotifyUrl && (
                    <a
                      href={episode.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2 transition"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Spotify
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
