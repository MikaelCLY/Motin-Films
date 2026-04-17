'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { leadSchema, LeadSchemaType } from '@/lib/validations/lead'
import { CheckCircle, Loader2, ChevronDown } from 'lucide-react'

interface GTMEvent {
  event: string
  lead_source?: string
  necessity?: string
}

declare global {
  interface Window {
    dataLayer?: GTMEvent[]
  }
}
const necessityOptions = [
  { value: 'filme_institucional', label: 'Filme Institucional' },
  { value: 'filme_produto', label: 'Filme Produto' },
  { value: 'filme_evento', label: 'Filme Evento Corporativo' },
  { value: 'filme_conteudo', label: 'Filme Conteúdo' },
  { value: 'outros', label: 'Outros' },
]

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadSchemaType>({
    resolver: zodResolver(leadSchema),
  })

  const onSubmit = async (data: LeadSchemaType) => {
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json.error || 'Erro ao enviar. Tente novamente.')
        setStatus('error')
        return
      }
      setStatus('success')
      
      // Simulate Google Tag Manager event
      console.log('GTM Event: Lead Generated')
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'lead_generated',
          lead_source: 'landing_page',
          necessity: data.necessity
        })
      }
      
      reset()
    } catch {
      setServerError('Erro de conexão. Verifique sua internet e tente novamente.')
      setStatus('error')
    }
  }

  return (
    <section id="lead-form" ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-xs font-semibold uppercase tracking-widest text-brand-teal block mb-3"
            >
              Fale Conosco
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight"
            >
              Pronto para criar algo{' '}
              <span className="text-teal-glow">incrível?</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="teal-divider mx-auto mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-white/50"
            >
              Preencha o formulário e nossa equipe entrará em contato em até 24h.
            </motion.p>
          </div>

          {/* Success State */}
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-teal p-12 text-center rounded-3xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-brand-teal" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">
                Mensagem enviada!
              </h3>
              <p className="text-white/60 mb-8">
                Logo entraremos em contato
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/554191425126?text=Ol%C3%A1%2C%20Acabei%20de%20enviar%20um%20pedido%20de%20or%C3%A7amento%20pelo%20site%20da%20Motin!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.45 3.4 1.25 4.88L2 22l5.3-1.1c1.4.74 3 1.1 4.7 1.1 5.52 0 10-4.48 10-10S17.52 2 12 2zm.05 16.92v-.02c-1.46 0-2.88-.38-4.13-1.11l-.3-.18-3.07.8.82-3-.2-.31a8.16 8.16 0 0 1-1.25-4.32c0-4.48 3.65-8.13 8.13-8.13s8.13 3.65 8.13 8.13-3.65 8.12-8.13 8.12zm4.4-6c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.11-.54.12s-.6.76-.74.92c-.14.16-.27.18-.51.06a6.63 6.63 0 0 1-1.95-1.2A6.98 6.98 0 0 1 9 10.63c-.15-.26-.02-.4.1-.52.1-.11.24-.28.36-.42.12-.14.16-.24.24-.4.07-.16.03-.31-.02-.43-.07-.12-.55-1.32-.75-1.8-.2-.47-.4-.4-.55-.41H8.1c-.24 0-.62.09-.95.45C6.82 7.46 5.9 8.35 5.9 10s.95 3.25 1.08 3.42c.14.18 2.33 3.56 5.65 5 .79.34 1.4.55 1.88.7.8.25 1.53.21 2.1.13.64-.09 1.95-.8 2.22-1.57.27-.77.27-1.43.19-1.57-.08-.14-.31-.22-.55-.34z" />
                  </svg>
                  ME CHAME NO WHATSAPP
                </a>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary text-sm px-6 py-3 w-full sm:w-auto"
                >
                  VOLTAR
                </button>
              </div>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass-teal p-8 md:p-12 space-y-6 rounded-3xl"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="label-field">Nome completo</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className={`input-field ${errors.name ? 'border-red-500/60 focus:border-red-500/80' : ''}`}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="label-field">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className={`input-field ${errors.email ? 'border-red-500/60 focus:border-red-500/80' : ''}`}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="label-field">Telefone / WhatsApp</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  className={`input-field ${errors.phone ? 'border-red-500/60 focus:border-red-500/80' : ''}`}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>
                )}
              </div>

              {/* Necessity */}
              <div>
                <label htmlFor="necessity" className="label-field">Qual é sua necessidade?</label>
                <div className="relative">
                  <select
                    id="necessity"
                    className={`select-field ${errors.necessity ? 'border-red-500/60' : ''}`}
                    {...register('necessity')}
                    defaultValue=""
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    {necessityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                {errors.necessity && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.necessity.message}</p>
                )}
              </div>

              {/* Server error */}
              {status === 'error' && serverError && (
                <div className="bg-red-900/20 border border-red-500/30 p-3">
                  <p className="text-red-400 text-sm text-center">{serverError}</p>
                </div>
              )}

              {/* Submit */}
              <button
                id="submit-lead-form"
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'SOLICITAR ORÇAMENTO GRATUITO'
                )}
              </button>

              <p className="text-center text-xs text-white/30">
                Seus dados estão seguros. Não fazemos spam.
              </p>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
}
