'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return <span ref={ref}>{count}</span>
}

const stats = [
  { value: 10, suffix: '+', label: 'Anos de atuação' },
  { value: 300, suffix: '+', label: 'Clientes Satisfeitos' },
  { value: 500, suffix: '+', label: 'Filmes Registrados' },
  { value: 2000, suffix: '+', label: 'Projetos e Filmes Entregues' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay bg-brand-dark"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale mix-blend-screen"
        >
          <source src="https://www.motinfilms.com.br/Showreel.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay gradients to ensure text readability & cinematic fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark" />
        <div className="absolute inset-0 bg-brand-teal/5 mix-blend-color" />
      </div>

      {/* Tech grid lines */}
      <div className="absolute inset-0 opacity-[0.03] z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Teal accent glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand-teal/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-brand-teal-light/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Modern decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-12 opacity-10 hidden lg:flex flex-col">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex-1 border-b border-r border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-white/40" />
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-12 opacity-10 hidden lg:flex flex-col">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex-1 border-b border-l border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-white/40" />
          </div>
        ))}
      </div>

      <div className="container-custom relative z-10 text-center pt-24 pb-16">

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1.1] mb-6 uppercase tracking-tight"
        >
          <span className="text-white">Filmes de alto impacto com</span>
          <br />
          <span className="text-teal-glow">qualidade cinematográfica</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-brand-teal to-transparent mx-auto mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl font-sans font-medium text-white/70 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          Conectamos marcas e pessoas com <span className="text-white">soluções audiovisuais únicas.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#portfolio" className="btn-primary group">
              CONHEÇA NOSSO PORTFÓLIO
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/5"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-black font-display text-white mb-2 tracking-tight group-hover:text-brand-teal transition-colors">
                {stat.suffix}<CountUp end={stat.value} />
              </div>
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-teal/80">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
