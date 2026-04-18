'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'ENAF',
    role: 'Cliente',
    company: '',
    text: 'Ficamos super satisfeitos com a produção. Vídeo principal, vídeos de performance bônus, show. Atendimento, suporte, grupo com profissionais pré, durante e pós evento. Já os temos como prioridade para continuar com nossa parceria de cobertura',
    stars: 5,
  },
  {
    name: 'Escolar Office Brasil',
    role: 'Cliente',
    company: '',
    text: 'A nossa minisérie \'Escolar pelo Brasil\' contou a história de 10 papelarias de norte a sul do Brasil e foi inspirador conhecer a jornada empreendedora de cada um. Agradecemos imensamente ao excelente trabalho da Motin Films e todo o cuidado que tiveram com esse projeto tão especial',
    stars: 5,
  },
  {
    name: 'Liquexpress',
    role: 'Cliente',
    company: '',
    text: 'Ficamos bem contentes com o resultado e com o trabalho de toda a equipe. Conseguiram pegar ótimos takes e prestaram suporte, sempre que necessário. Todos estão de parabéns',
    stars: 5,
  },
]

export default function Testimonials() {
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

  return (
    <section id="testimonials" ref={ref} className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Decorative quote marks */}
      <div className="absolute top-16 left-8 text-[200px] font-display text-brand-teal/[0.02] leading-none select-none pointer-events-none">
        "
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs font-semibold uppercase tracking-widest text-brand-teal block mb-3"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight"
          >
            O que dizem nossos <span className="text-teal-glow">clientes</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="teal-divider mx-auto"
          />
        </div>

        {/* Testimonial Cards Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-7xl mx-auto group/carousel -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {/* Navigation Buttons (No Netflix styling/shadows) */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 sm:w-16 h-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <div className="w-10 h-10 rounded-full bg-black/40 hover:bg-brand-teal text-white flex items-center justify-center backdrop-blur-sm transition-colors transform hover:scale-110 ml-2">
              <ChevronLeft className="w-6 h-6" />
            </div>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 sm:w-16 h-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0"
            aria-label="Scroll right"
          >
            <div className="w-10 h-10 rounded-full bg-black/40 hover:bg-brand-teal text-white flex items-center justify-center backdrop-blur-sm transition-colors transform hover:scale-110 mr-2">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 sm:gap-8 snap-x snap-mandatory pb-8 pt-4 scrollbar-hide px-4 sm:px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="snap-center sm:snap-start shrink-0 w-[300px] sm:w-[450px] md:w-[600px] bg-brand-dark-3/80 border border-white/5 group hover:border-brand-teal/30 p-8 md:p-12 relative rounded-3xl flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Teal quote icon */}
                  <Quote className="w-10 h-10 text-brand-teal/30 mb-6" fill="currentColor" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-brand-teal fill-brand-teal" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-display text-lg md:text-xl text-white/90 leading-relaxed font-medium mb-8">
                    "{t.text}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center font-display font-bold text-brand-teal text-lg rounded-full shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg tracking-tight">{t.name}</p>
                    <p className="text-sm font-medium text-brand-teal/70">
                      {t.role}{t.company ? ` · ${t.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar completely */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  )
}
