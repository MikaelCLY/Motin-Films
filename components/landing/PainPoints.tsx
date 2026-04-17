'use client'

import { motion, Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, Clock, FileQuestion, Camera } from 'lucide-react'

const painPoints = [
  {
    icon: AlertTriangle,
    title: 'Vídeos genéricos?',
    description: 'Tenha filmes irreverentes, com linguagem moderna e impacto para destacar sua empresa no mercado.',
  },
  {
    icon: Clock,
    title: 'Falta de tempo para planejar?',
    description: 'Não se preocupe com nada. Cuidamos de todo o processo, do conceito à entrega, para que você foque no seu negócio.',
  },
  {
    icon: FileQuestion,
    title: 'Roteiros confusos?',
    description: 'Nossos roteiristas especialistas em marketing criam narrativas que simplificam a complexidade do seu negócio.',
  },
  {
    icon: Camera,
    title: 'Falta de equipamentos e recursos?',
    description: 'Contamos com tecnologia de ponta e equipe especializada para produções cinematográficas.',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function PainPoints() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="pain-points" ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #00B2B2 0%, transparent 60%)'
      }} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-teal block mb-3"
          >
            O Problema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white mb-4"
          >
            Por que você ainda não investe em audiovisual?
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="teal-divider mx-auto"
          />
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {painPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="glass-teal p-8 group transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center mb-6 group-hover:bg-brand-teal/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand-teal" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 tracking-tight">{point.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed font-medium">{point.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
