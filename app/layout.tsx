import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Motin Films | Filmes de Alto Impacto Cinematográfico',
  description:
    'Conectamos marcas e pessoas com soluções audiovisuais únicas. Filmes institucionais, de produto, evento e conteúdo com qualidade cinematográfica.',
  keywords: ['filmes corporativos', 'produtora audiovisual', 'filme institucional', 'filme produto', 'motin films'],
  openGraph: {
    title: 'Motin Films | Filmes de Alto Impacto Cinematográfico',
    description: 'Conectamos marcas e pessoas com soluções audiovisuais únicas.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
