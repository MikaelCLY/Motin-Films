'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const clients = [
  { name: 'Unimed', src: '/images/unimed.png' },
  { name: 'Electrolux', src: '/images/electrolux.png' },
  { name: 'LJ Santos', src: '/images/lj-santos.png' },
  { name: 'Inplasul', src: '/images/inplasul.png' },
  { name: 'Liquexpress', src: '/images/liquexpress.png' },
  { name: 'Pasa', src: '/images/pasa.png' },
  { name: 'Spaten', src: '/images/spaten.png' },
  { name: 'Warner Pictures', src: '/images/warner.png' },
]

export default function Clients() {
  const ref = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="py-16 md:py-24 bg-brand-dark-2 relative border-t border-black border-opacity-20 z-20 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs font-semibold uppercase tracking-widest text-brand-teal/80 block"
          >
            Marcas que confiam na Motin Films
          </motion.p>
        </div>

        <div className="relative w-full max-w-7xl mx-auto group/carousel px-4 sm:px-12">
          {/* Navigation Buttons (No Netflix styling/shadows) */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <div className="w-10 h-10 rounded-full bg-black/40 hover:bg-brand-teal text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0"
            aria-label="Scroll right"
          >
            <div className="w-10 h-10 rounded-full bg-black/40 hover:bg-brand-teal text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/10">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-12 md:gap-24 snap-x snap-mandatory py-4 scrollbar-hide items-center"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="snap-center shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 min-w-[140px] md:min-w-[180px]"
                aria-label={`Logo do cliente ${client.name}`}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={160}
                  height={48}
                  className="max-h-12 w-auto object-contain text-white/50 font-display font-medium text-lg uppercase tracking-widest"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  )
}
