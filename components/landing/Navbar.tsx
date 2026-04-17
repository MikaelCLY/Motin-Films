'use client'

import { useState, useEffect } from 'react'
import { Film, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#solution' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Contato', href: '#lead-form' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
            className="relative flex items-center gap-2 group"
          >
            <Image 
              src="/images/motin-logo-white.avif" 
              alt="Motin Films Logo" 
              width={140} 
              height={40} 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-sm font-medium text-white/60 hover:text-brand-teal transition-colors animated-underline"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('#lead-form')}
              className="hidden sm:inline-flex btn-primary py-2 px-5 text-xs"
            >
              ORÇAMENTO
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 glass flex items-center justify-center rounded-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-20 glass md:hidden flex flex-col">
          <nav className="flex flex-col items-center gap-6 p-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-xl font-display font-medium text-white hover:text-brand-teal transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#lead-form')}
              className="btn-primary mt-4 w-full justify-center"
            >
              SOLICITAR ORÇAMENTO
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
