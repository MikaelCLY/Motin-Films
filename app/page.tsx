import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'

const PainPoints = dynamic(() => import('@/components/landing/PainPoints'), { ssr: false })
const CallToAction = dynamic(() => import('@/components/landing/CallToAction'), { ssr: false })
const Solution = dynamic(() => import('@/components/landing/Solution'), { ssr: false })
const Clients = dynamic(() => import('@/components/landing/Clients'), { ssr: false })
const Portfolio = dynamic(() => import('@/components/landing/Portfolio'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/landing/Testimonials'), { ssr: false })
const LeadForm = dynamic(() => import('@/components/landing/LeadForm'), { ssr: false })
const Footer = dynamic(() => import('@/components/landing/Footer'), { ssr: false })

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
