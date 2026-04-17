import { Film, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import Image from 'next/image'

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
)

const links = [
  { label: 'Início', href: '#hero' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Contato', href: '#lead-form' },
]

const services = [
  'Filme Institucional',
  'Filme de Produto',
  'Filme Evento',
  'Conteúdo Digital',
  'Cobertura Fotográfica',
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-brand-dark border-t border-white/5">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/images/motin-logo-white.avif" 
                alt="Motin Films Logo" 
                width={120} 
                height={32} 
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-white/50 font-medium leading-relaxed mb-6">
              Filmes de alto impacto com qualidade cinematográfica. Conectamos marcas e pessoas com soluções audiovisuais únicas.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/motinfilms' },
                { Icon: TiktokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@motinfilms' },
                { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/motinfilms' },
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/93245114' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full glass-teal flex items-center justify-center hover:bg-brand-teal/20 transition-all duration-200 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5 text-white/60 hover:text-brand-teal transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Navegação</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-white/60 hover:text-brand-teal transition-colors animated-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Serviços</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="text-sm text-white/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Contato</h4>
            <ul className="space-y-4">
              {[
                { Icon: Mail, text: 'contato@motinfilms.com.br' },
                { Icon: Phone, text: '+55 41 9142-5126' },
                { Icon: MapPin, text: 'Rua Cel. Joaquim Ignácio Taborda Ribas, 212 - Bigorrilho, Curitiba - PR' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <span className="text-sm font-medium text-white/60">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Motin Films. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20">
            Produção com qualidade cinematográfica
          </p>
        </div>
      </div>
    </footer>
  )
}
