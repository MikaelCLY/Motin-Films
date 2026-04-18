'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

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
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-brand-dark-2 relative border-t border-black border-opacity-20 z-20">
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

        <div className="relative w-full max-w-7xl mx-auto">
          {/* Native scrollable track matching Portfolio UX but without buttons */}
          <div 
            className="flex overflow-x-auto gap-12 md:gap-24 px-4 sm:px-12 items-center py-6 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Duplicamos para dar volume inicial se quiserem, mas em scroll navivo clients sem duplicar faz mais sentido. Resolverei mantendo 1 array de clients duplo. */}
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="snap-center shrink-0 flex items-center justify-center opacity-40 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 min-w-[140px] md:min-w-[160px]"
                aria-label={`Logo do cliente ${client.name}`}
              >
                {/* Fallback to alt text beautifully if image is not downloaded yet */}
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

          {/* Fade masks for cinematic edges */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-brand-dark-2 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-brand-dark-2 to-transparent z-10 pointer-events-none" />
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
