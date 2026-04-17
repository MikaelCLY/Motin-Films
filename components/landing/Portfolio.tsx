'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const portfolioItems = [
  { videoId: '6bseD2wgI6A' },
  { videoId: 'J3KO2lBBh-w' },
  { videoId: 'Wyg3UPuf5Ec' },
]

// Duplicate items to simulate an infinite stream
const infiniteItems = [...portfolioItems, ...portfolioItems, ...portfolioItems, ...portfolioItems, ...portfolioItems]

const VideoCard = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <div 
      className="relative w-full h-full cursor-pointer group/vid flex items-center justify-center bg-brand-dark-3"
      onClick={() => setIsPlaying(true)}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Video thumbnail"
        fill
        sizes="(max-width: 600px) 300px, (max-width: 1024px) 450px, 600px"
        className="object-cover transition-transform duration-500 group-hover/vid:scale-105"
      />
      {/* Play Button Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover/vid:bg-black/40 transition-colors duration-300 pointer-events-none" />
      <div className="w-16 h-16 rounded-full bg-brand-teal text-white flex items-center justify-center z-10 shadow-lg shadow-brand-teal/20 transform transition-transform group-hover/vid:scale-110 pointer-events-none">
        <Play className="w-6 h-6 ml-1 fill-white" />
      </div>
    </div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current

    // Seamless infinite scroll logic (if reaching boundaries, jump to middle)
    if (scrollLeft === 0) {
      carouselRef.current.scrollTo({ left: scrollWidth / 2, behavior: 'instant' as any })
    } else if (scrollLeft >= scrollWidth - clientWidth - 10) {
      carouselRef.current.scrollTo({ left: scrollWidth / 2 - clientWidth, behavior: 'instant' as any })
    }
  }

  return (
    <section id="portfolio" ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col justify-between mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xs font-semibold uppercase tracking-widest text-brand-teal block mb-3"
            >
              Portfólio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight"
            >
              Veja o que fazemos na <span className="text-teal-glow">prática!</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="teal-divider"
            />
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative -mx-4 px-4 sm:mx-0 sm:px-0 group/carousel"
        >
          {/* Netflix Side Navigation */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 z-20 w-12 sm:w-16 h-full bg-gradient-to-r from-brand-dark-2 via-brand-dark-2/80 to-transparent flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <div className="w-10 h-10 rounded-full bg-black/50 hover:bg-brand-teal text-white flex items-center justify-center backdrop-blur-sm transition-colors transform hover:scale-110">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-0 z-20 w-12 sm:w-16 h-full bg-gradient-to-l from-brand-dark-2 via-brand-dark-2/80 to-transparent flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0"
            aria-label="Scroll right"
          >
            <div className="w-10 h-10 rounded-full bg-black/50 hover:bg-brand-teal text-white flex items-center justify-center backdrop-blur-sm transition-colors transform hover:scale-110">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-8 pt-4 scrollbar-hide px-4 sm:px-12"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {infiniteItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="snap-center sm:snap-start shrink-0 w-[300px] sm:w-[450px] md:w-[600px] relative overflow-hidden bg-brand-dark-3/80 border border-white/5 group hover:border-brand-teal/30 rounded-2xl transition-all duration-300"
                >
                  <div className="aspect-video w-full relative">
                    <VideoCard videoId={item.videoId} />
                  </div>
                  {/* Top teal bar animated */}
                  <div className="absolute top-0 left-0 h-1 w-0 bg-brand-teal group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href="https://www.youtube.com/@MotinFilms"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            VER PORTFÓLIO COMPLETO!
          </a>
        </motion.div>
      </div>

      {/* CSS rule inline to hide scrollbar deeply */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  )
}
