import type { CrewMember, CrewSection } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

interface CrewProps {
  section: CrewSection
  members: CrewMember[]
}

function formatBounty(bounty: number): string {
  return bounty.toLocaleString('en-US')
}

export default function Crew({ section, members }: CrewProps) {
  return (
    <section
      id="tripulacion"
      className="py-24 bg-gray-900"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
      }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-[family-name:var(--font-manga)] text-center text-white mb-4 text-stroke">
          {section.title}
        </h2>
        <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
          {section.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div
              key={member._id}
              className="wanted-poster p-4 text-center text-gray-900 relative"
            >
              <div className="border-b-2 border-gray-800 mb-2">
                <h3 className="font-serif text-3xl font-bold tracking-widest uppercase">
                  WANTED
                </h3>
                <p className="text-xs mb-1 font-serif">DEAD OR ALIVE</p>
              </div>
              <div className="w-full aspect-[4/3] bg-gray-800 mb-3 overflow-hidden border-2 border-gray-700">
                {member.photo ? (
                  <img
                    src={urlFor(member.photo).width(300).height(225).url()}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Photo
                  </div>
                )}
              </div>
              <h4 className="font-serif text-2xl font-bold uppercase mt-2">
                {member.name}
              </h4>
              <p className="font-[family-name:var(--font-body)] text-sm italic mb-2">
                {member.role}
              </p>
              <div className="font-serif text-xl font-bold flex items-center justify-center gap-1">
                <span className="text-xs">BERRIES</span>
                <span>{formatBounty(member.bounty)}</span>
                <span className="text-xs">-</span>
              </div>
              <div className="absolute bottom-2 left-4 font-serif text-xs font-bold opacity-60">
                MARINE
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
