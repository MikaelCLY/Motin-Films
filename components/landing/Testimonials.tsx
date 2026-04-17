'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
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
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

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

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-teal p-10 md:p-14 relative rounded-3xl">
            {/* Teal quote icon */}
            <Quote className="w-10 h-10 text-brand-teal/30 mb-8" fill="currentColor" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-teal fill-brand-teal" />
              ))}
            </div>

            {/* Quote */}
            <motion.p
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="font-display text-xl md:text-2xl text-white/90 leading-relaxed font-medium mb-10"
            >
              "{t.text}"
            </motion.p>

            {/* Author */}
            <motion.div
              key={`author-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Avatar placeholder */}
              <div className="w-12 h-12 bg-brand-teal/20 border border-brand-teal/30 flex items-center justify-center font-display font-bold text-brand-teal text-lg rounded-full">
                {t.name[0]}
              </div>
              <div>
                <p className="font-bold text-white text-lg tracking-tight">{t.name}</p>
                <p className="text-sm font-medium text-brand-teal/70">
                  {t.role}{t.company ? ` · ${t.company}` : ''}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              id="testimonial-prev"
              className="w-12 h-12 rounded-full glass hover:glass-teal flex items-center justify-center transition-all duration-200 hover:border-brand-teal/50"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5 text-white/60 hover:text-brand-teal" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-10 h-2 bg-brand-teal'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              id="testimonial-next"
              className="w-12 h-12 rounded-full glass hover:glass-teal flex items-center justify-center transition-all duration-200 hover:border-brand-teal/50"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5 text-white/60 hover:text-brand-teal" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
