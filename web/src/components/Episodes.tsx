import { PlayCircle } from 'lucide-react'
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
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 group hover:border-op-gold transition duration-300"
            >
              <div
                className="h-48 relative overflow-hidden"
                style={{ backgroundColor: episode.thumbnailColor || '#0F3D59' }}
              >
                {episode.thumbnail && (
                  <img
                    src={urlFor(episode.thumbnail).width(600).height(400).url()}
                    alt={episode.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                )}
                {episode.isNew && (
                  <div className="absolute top-2 right-2 bg-op-red text-white text-xs font-bold px-2 py-1 rounded">
                    NUEVO
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-op-gold text-sm font-bold uppercase tracking-wider">
                  Episodio {episode.episodeNumber}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3 font-[family-name:var(--font-manga)]">
                  {episode.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{episode.description}</p>
                <button className="w-full bg-gray-700 hover:bg-op-red text-white py-2 rounded flex items-center justify-center gap-2 transition">
                  <PlayCircle />
                  {section.playButtonText}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
