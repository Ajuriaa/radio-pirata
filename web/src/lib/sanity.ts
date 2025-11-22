import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: '6gjuvgnb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Types
export interface SiteSettings {
  siteName: string
  logo?: SanityImageSource
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    paper: string
  }
  navLinks: Array<{ label: string; href: string }>
  ctaButton: { label: string; href: string }
  socialLinks: {
    twitter?: string
    instagram?: string
    youtube?: string
    spotify?: string
  }
  footerText: string
  copyright: string
}

export interface Hero {
  title: string
  highlightedText: string
  subtitle: string
  backgroundImage?: SanityImageSource
  icon: string
  ctaButtons: Array<{
    label: string
    href: string
    icon?: string
    style: 'primary' | 'spotify'
  }>
}

export interface Episode {
  _id: string
  title: string
  episodeNumber: number
  description: string
  thumbnail?: SanityImageSource
  thumbnailColor?: string
  isNew: boolean
  audioUrl?: string
  spotifyUrl?: string
  publishedAt: string
}

export interface CrewMember {
  _id: string
  name: string
  role: string
  photo?: SanityImageSource
  bounty: number
  order: number
}

export interface Newsletter {
  title: string
  subtitle: string
  placeholder: string
  buttonText: string
  successMessage: string
  icon: string
}

export interface EpisodesSection {
  title: string
  playButtonText: string
}

export interface CrewSection {
  title: string
  subtitle: string
}

// Queries
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]`,
  hero: `*[_type == "hero"][0]`,
  episodes: `*[_type == "episode"] | order(episodeNumber desc)[0...3]`,
  crewMembers: `*[_type == "crewMember"] | order(order asc)`,
  newsletter: `*[_type == "newsletter"][0]`,
  episodesSection: `*[_type == "episodesSection"][0]`,
  crewSection: `*[_type == "crewSection"][0]`,
}
