import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'

const PainPoints = dynamic(() => import('@/components/landing/PainPoints'), { ssr: true })
const CallToAction = dynamic(() => import('@/components/landing/CallToAction'), { ssr: true })
const Solution = dynamic(() => import('@/components/landing/Solution'), { ssr: true })
const Clients = dynamic(() => import('@/components/landing/Clients'), { ssr: true })
const Portfolio = dynamic(() => import('@/components/landing/Portfolio'), { ssr: true })
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), { ssr: true })
const LeadForm = dynamic(() => import('@/components/landing/LeadForm'), { ssr: true })
const Footer = dynamic(() => import('@/components/landing/Footer'), { ssr: true })

export const metadata: Metadata = {
  title: 'Motin Films | Filmes de Alto Impacto Cinematográfico',
  description:
    'Conectamos marcas e pessoas com soluções audiovisuais únicas. +10 anos de atuação, +300 clientes, +500 filmes entregues.',
}

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PainPoints />
      <Clients />
      <CallToAction />
      <Portfolio />
      <Solution />
      <Testimonials />
      <LeadForm />
      <Footer />
    </main>
  )
}
