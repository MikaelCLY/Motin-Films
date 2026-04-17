'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Lightbulb, Users, Zap, Building2, Package, Mic, Video } from 'lucide-react'

const solutions = [
  {
    icon: Building2,
    title: 'Filmes Institucional',
    description: 'Apresente seus produtos, serviços, valores e missão de forma envolvente e profissional, fortalecendo a identidade da sua marca.',
    benefit: 'SAIBA MAIS!',
    href: 'https://youtu.be/CTTnFhk2iUI?si=b54qqXDLOhvKJ2WE',
  },
  {
    icon: Package,
    title: 'Filmes Produto',
    description: 'Destaque seus produtos de maneira única no mercado, expondo seus diferenciais e impulsionando vendas.',
    benefit: 'SAIBA MAIS!',
    href: 'https://youtu.be/elQCwkM876I?si=3aPbo25NufR2zV6z',
  },
  {
    icon: Mic,
    title: 'Filme Evento Corporativo',
    description: 'Capture os momentos mais importantes dos seus eventos, transformando-os em materiais de divulgação impactantes.',
    benefit: 'SAIBA MAIS!',
    href: 'https://youtu.be/rQci5PHwSAA?si=ZQVTi_YkqybOJ7Rr',
  },
  {
    icon: Video,
    title: 'Filmes Conteúdo',
    description: 'Dê voz à sua marca nas redes sociais com conteúdos estratégicos que informam, conectam e geram autoridade.',
    benefit: 'SAIBA MAIS!',
    href: 'https://youtu.be/_HyKcah7Qzw?si=CdRzO2ORq7jsheRV',
  },
]

export default function Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="solution" ref={ref} className="section-padding bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 80% 50%, #00B2B2 0%, transparent 55%)'
      }} />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-6 tracking-tight"
          >
            Soluções audiovisuais para empresas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/70 font-medium leading-relaxed text-lg max-w-3xl mx-auto"
          >
            Oferecemos um leque completo de soluções audiovisuais para impulsionar sua marca.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((sol, i) => {
            const Icon = sol.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="glass-teal p-8 group hover:-translate-y-2 transition-all duration-300 rounded-2xl flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-teal/15 flex items-center justify-center mb-6 group-hover:bg-brand-teal/25 transition-colors group-hover:scale-110">
                  <Icon className="w-6 h-6 text-brand-teal" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">{sol.title}</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-6 flex-grow">{sol.description}</p>
                <a 
                  href={sol.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-brand-teal uppercase tracking-wider border-b border-brand-teal/30 hover:border-brand-teal pb-1 transition-colors self-start cursor-pointer"
                >
                  {sol.benefit}
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
