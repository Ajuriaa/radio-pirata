'use client'

import { Mail } from 'lucide-react'
import type { Newsletter as NewsletterType } from '@/lib/sanity'

interface NewsletterProps {
  newsletter: NewsletterType
}

export default function Newsletter({ newsletter }: NewsletterProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(newsletter.successMessage)
  }

  return (
    <section
      id="comunidad"
      className="py-20 bg-op-red relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/diagmonds-light.png')",
        }}
      ></div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <Mail className="h-16 w-16 mx-auto text-white mb-6" />
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-manga)] text-white mb-4 text-stroke">
          {newsletter.title}
        </h2>
        <p className="text-white text-lg mb-8 max-w-xl mx-auto">
          {newsletter.subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col md:flex-row gap-4"
        >
          <input
            type="email"
            placeholder={newsletter.placeholder}
            className="flex-1 px-6 py-3 rounded-full border-2 border-black focus:outline-none focus:border-op-gold text-op-dark font-bold"
            required
          />
          <button
            type="submit"
            className="bg-op-dark text-op-gold font-[family-name:var(--font-manga)] text-xl px-8 py-3 rounded-full border-2 border-white hover:bg-gray-800 transition shadow-lg"
          >
            {newsletter.buttonText}
          </button>
        </form>
      </div>
    </section>
  )
}
