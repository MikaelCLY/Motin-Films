'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CallToAction() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="pt-24 lg:pt-32 pb-4 bg-brand-dark-2 relative">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-xs font-semibold uppercase tracking-widest text-brand-teal block mb-4"
          >
            Nossa Solução
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-6 tracking-tight"
          >
            Soluções audiovisuais para empresas
          </motion.h2>
          <motion.div
             initial={{ scaleX: 0 }}
             animate={inView ? { scaleX: 1 } : {}}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="teal-divider mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 font-medium leading-relaxed text-lg mb-8 max-w-2xl"
          >
            Oferecemos um leque completo de soluções audiovisuais para impulsionar sua marca.
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.6, delay: 0.4 }}
          >
             <a href="#portfolio" className="btn-primary">
               VEJA NOSSO PORTFÓLIO!
             </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
