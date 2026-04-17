# Motin Films — Sistema de Captação de Leads

## 🎯 Visão Geral

Mini-ecossistema completo para captação e gerenciamento de leads da produtora audiovisual **Motin Films**. O projeto é dividido em:

- **Landing Page pública** — página de alta performance e conversão
- **Dashboard Administrativo** — painel protegido para gestão de leads

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm / yarn / pnpm
- Conta no [Supabase](https://supabase.com)
- Conta na [Vercel](https://vercel.com)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/motin-films-leads.git
cd motin-films-leads

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Preencha com suas credenciais do Supabase

# 4. Execute o servidor de desenvolvimento
npm run dev
```

Acesse:
- Landing Page: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## ⚙️ Variáveis de Ambiente

| Variável | Descrição | Pública |
|----------|-----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do seu projeto Supabase | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública (anon) | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço (admin) | **Não** |
| `NEXT_PUBLIC_SITE_URL` | URL do site | Sim |

---

## 🛠️ Tech Stack

| Tecnologia | Versão | Justificativa |
|-----------|--------|---------------|
| **Next.js** | 16+ (App Router) | SSR, Server Components, otimização automática |
| **TypeScript** | 5.8+ | Tipagem estrita (`strict: true`), zero `any` |
| **Tailwind CSS** | 4.0 | Mobile-first, design system consistente |
| **Supabase** | 2.x | PostgreSQL + Auth + RLS em uma plataforma |
| **Zod** | 3.x | Validação de schemas em runtime |
| **React Hook Form** | 7.x | Performance de formulários |
| **Framer Motion** | 12.x | Animações fluidas |
| **Recharts** | 3.x | Gráficos do dashboard |
| **Vercel** | — | Deploy otimizado para Next.js |

---

## 🏗️ Estrutura do Projeto

```
/app
  /page.tsx                     # Landing page (pública)
  /layout.tsx                   # Root layout (fontes, metadata)
  /globals.css                  # Design system global
  /admin
    /page.tsx                   # Dashboard administrativo
    /layout.tsx                 # Layout protegido (auth check)
    /login/page.tsx             # Página de login
  /api
    /leads
      /route.ts                 # POST (criar) + GET (listar) leads
      /[id]/route.ts            # PATCH (atualizar) + DELETE leads
      /stats/route.ts           # Estatísticas para gráficos
/components
  /landing                      # Componentes da landing page
    /Hero.tsx                   # Hero + Stats (Blocos 1-2)
    /PainPoints.tsx             # Dores do cliente (Bloco 3)
    /Solution.tsx               # Soluções oferecidas (Bloco 4)
    /Portfolio.tsx              # Cases/Portfólio (Bloco 5)
    /Testimonials.tsx           # Depoimentos (Bloco 6)
    /LeadForm.tsx               # Formulário de contato (Bloco 7)
    /Footer.tsx                 # Rodapé (Bloco 8)
    /Navbar.tsx                 # Navegação fixa
  /admin                        # Componentes do dashboard
    /AdminNavbar.tsx
    /StatsChart.tsx             # Gráfico + cards de estatísticas
    /LeadTable.tsx              # Tabela desktop + cards mobile
    /LeadCard.tsx               # Card responsivo (mobile)
/lib
  /supabase
    /client.ts                  # Cliente browser (client components)
    /server.ts                  # Cliente servidor + admin
    /middleware.ts              # Proteção de rotas
  /validations/lead.ts          # Schema Zod do formulário
  /utils.ts                     # Formatadores, CSV export, helpers
/types/index.ts                 # Interfaces e tipos centralizados
```

---

## 📊 Database Schema

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  necessity VARCHAR(100) NOT NULL,
  contacted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_contacted ON leads(contacted);
CREATE INDEX idx_leads_email ON leads(email);
```

### Row Level Security (RLS)

```sql
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Inserção pública (formulário da landing page)
CREATE POLICY "Public can insert leads"
  ON leads FOR INSERT WITH CHECK (true);

-- Leitura restrita a usuários autenticados
CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT USING (auth.role() = 'authenticated');

-- Atualização restrita
CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Exclusão restrita
CREATE POLICY "Authenticated users can delete leads"
  ON leads FOR DELETE USING (auth.role() = 'authenticated');
```

---

## 🔒 Segurança

- **RLS** ativo na tabela `leads` — inserção pública, CRUD autenticado
- **Middleware** protege rotas `/admin/*` redirecionando para login
- **Server-side auth check** em `admin/layout.tsx` como segunda camada
- **Service Role Key** nunca exposta ao cliente (usada somente em API routes)
- **Zod validation** em client + server (dupla validação)
- **CSRF** protegido nativamente pelo Next.js (same-origin API routes)

---

## 🎯 Performance

### Otimizações Implementadas

- **`next/font`** para Inter e Playfair Display (self-hosted, sem CLS)
- **`next/image`** para logo (formato AVIF otimizado)
- **Server Components** por padrão (client somente quando necessário)
- **Code splitting** automático pelo App Router
- **Scroll smooth** nativo
- **Lazy load** de seções com `useInView`

### Lighthouse Targets

| Métrica | Meta |
|---------|------|
| Performance | > 90 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |

---

## 📈 Funcionalidades

### Landing Page
- ✅ Hero com animações cinematográficas e stats animados (CountUp)
- ✅ Seção de Pain Points com cards
- ✅ Seção de Soluções com highlights
- ✅ Portfólio de cases categorizado
- ✅ Depoimentos com carrossel
- ✅ Formulário com validação real-time (Zod + React Hook Form)
- ✅ Footer completo com navegação, serviços e contato
- ✅ Navbar responsiva com glassmorphism

### Dashboard Admin
- ✅ Login com Email/Senha (Supabase Auth)
- ✅ Cards de estatísticas (total, contatados, pendentes, taxa)
- ✅ Gráfico "Leads por dia" (Recharts - últimos 30 dias)
- ✅ Tabela responsiva (desktop: tabela, mobile: cards)
- ✅ Busca por nome/email
- ✅ Filtro por status + necessidade
- ✅ Sorting por nome, data, status
- ✅ Paginação (20 por página)
- ✅ Marcar como contatado / desmarcar
- ✅ Excluir lead com confirmação
- ✅ Export CSV
- ✅ Evento GTM (`console.log('GTM Event: Lead Generated')`)

---

## 📝 Decisões de Arquitetura (ADRs)

### ADR-001: Next.js App Router
**Contexto:** Necessidade de SSR, Server Components e otimização automática.
**Decisão:** Usar App Router (Next.js 16) em vez de Pages Router.
**Consequências:** +Performance com Server Components, +SEO, -Complexidade reduzida.

### ADR-002: Supabase
**Contexto:** Necessidade de backend rápido com auth integrada.
**Decisão:** Supabase em vez de backend customizado.
**Consequências:** +Velocidade de desenvolvimento, +RLS nativo, +Auth pronto, -Vendor lock-in moderado.

### ADR-003: Service Role para API Routes
**Contexto:** API routes precisam bypassar RLS para operações admin.
**Decisão:** Usar `SUPABASE_SERVICE_ROLE_KEY` nas API routes com validação manual de auth.
**Consequências:** +Flexibilidade, +Controle fino, precisa de auth check manual.

### ADR-004: Tailwind v4 com @theme
**Contexto:** Design system com cores e tipografia customizados.
**Decisão:** Usar `@theme` do Tailwind v4 para definir design tokens.
**Consequências:** +Design consistente, +CSS vars nativas, +Zero config runtime.

---


## 🚀 Deploy (Vercel)

1. Importe o repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente (mesmas do `.env.example`)
3. Build command: `next build`
4. O deploy é automático a cada push na branch `main`

---

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico para a Motin Films.
