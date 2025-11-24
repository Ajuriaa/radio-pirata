import type { CrewMember, CrewSection } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

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
          {members.map((member) => {
            const content = (
              <div
                className="relative w-full transition-transform duration-300 hover:scale-105 hover:rotate-1"
                style={{ aspectRatio: '3/4' }}
              >
              {/* Photo behind the wanted poster */}
              <div
                className="absolute overflow-hidden z-0"
                style={{
                  top: '20%',
                  left: '10%',
                  width: '80%',
                  height: '45%',
                }}
              >
                {member.photo ? (
                  <Image
                    src={urlFor(member.photo).width(300).height(225).url()}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    width={300}
                    height={225}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                    No Photo
                  </div>
                )}
              </div>

              {/* Wanted poster on top */}
              <Image
                src="/wanted.png"
                alt="Wanted Poster"
                className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
                width={300}
                height={225}
              />

              {/* Name */}
              <div
                className="absolute w-full text-center z-20"
                style={{ bottom: '17%' }}
              >
                <h4 className="font-serif text-lg md:text-xl font-bold uppercase text-gray-900 px-4">
                  {member.name}
                </h4>
                <p className="text-xs text-gray-700 italic">
                  {member.role}
                </p>
              </div>

              {/* Bounty */}
              <div
                className="absolute w-full text-center px-4 z-20"
                style={{ bottom: '11%' }}
              >
                <div className="font-serif text-lg font-bold text-gray-900">
                  {formatBounty(member.bounty)}
                </div>
              </div>
            </div>
            )

            if (member.twitter) {
              return (
                <a
                  key={member._id}
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  {content}
                </a>
              )
            }

            return <div key={member._id}>{content}</div>
          })}
        </div>
      </div>
    </section>
  )
}
