# 🎞️  — Sistema de Captação de Leads

<img width="384" height="176" alt="image" src="https://github.com/user-attachments/assets/c88ee055-5d29-4858-9e5f-7e73d8407f32" />


## 🎯 Visão Geral do Projeto

Este projeto é um mini-ecossistema full-stack desenvolvido para a **Motin Films**, uma produtora audiovisual de alto impacto. O objetivo principal é centralizar a captação de leads através de uma Landing Page de altíssima performance e fornecer um Dashboard Administrativo robusto para a gestão desses contatos.

O sistema foi construído focando em três pilares: **Conversão**, **Performance (Lighthouse > 90)** e **Segurança de Dados**.

---

## 🚀 Principais Funcionalidades

### 🌐 Landing Page (Lado do Cliente)
- **Design:** UI inspirada na identidade visual premium da Motin Films, com animações fluidas via Framer Motion.
- **Portfólio Dinâmico:** Seção de cases categorizados para demonstração de autoridade.
- **Captação Otimizada:** Formulário inteligente com validação em tempo real e feedback instantâneo de sucesso/erro.
- **SEO & Performance:** Estruturada com Server Components para carregamento instantâneo e otimização para motores de busca.

### 🔐 Dashboard Administrativo (Lado Interno)
- **Gestão de Leads:** Tabela interativa com busca, filtros por necessidade e ordenação.
- **Business Intelligence (BI):** Gráfico de volume de leads diários para análise de tendências de conversão.
- **Ações Rápidas:** Controle de status ("Contatado" / "Pendente") e gestão de exclusão de registros.
- **Mobilidade:** Dashboard totalmente responsivo que se transforma em cards em dispositivos móveis.
- **Exportação:** Funcionalidade de exportação de dados para CSV para integração com outras ferramentas de CRM.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Framework** | **Next.js 15+ (App Router)** | Uso intensivo de Server Components para performance e roteamento otimizado. |
| **Linguagem** | **TypeScript** | Garantia de robustez e redução de erros em tempo de build (Strict Mode). |
| **Estilização** | **Tailwind CSS v4** | Utilização da nova engine para um sistema de design tokens baseado em CSS Variables. |
| **Backend/DB** | **Supabase (PostgreSQL)** | Solução BaaS que oferece Auth e RLS nativos, acelerando o desenvolvimento. |
| **Validação** | **Zod** | Schemas de validação compartilhados entre client e server. |
| **Gráficos** | **Recharts** | Visualização de dados modular e leve para o dashboard. |
| **Deploy** | **Vercel** | Edge Runtime e otimização nativa para o ecossistema Next.js. |

---

## 🏗️ Arquitetura e Decisões Técnicas

### ⚛️ Server vs Client Components
A aplicação utiliza a arquitetura de **Server Components** por padrão para minimizar o bundle de JavaScript enviado ao navegador. O uso de `'use client'` foi restrito a componentes interativos específicos (como o formulário de lead e o gráfico do dashboard), garantindo um *First Contentful Paint* extremamente baixo.

### 🗄️ Estrutura de Dados e Persistência
O banco de dados foi modelado no **PostgreSQL** focando em escalabilidade e integridade:
- **Modelagem Enxuta:** A tabela de leads armazena dados essenciais (nome, contato, necessidade) com campos de auditoria (`created_at`, `updated_at`).
- **Otimização de Busca:** Índices B-Tree foram aplicados nas colunas de data e status, garantindo que o dashboard administrativo retorne resultados instantâneos, mesmo com um grande volume de dados.
- **Constraints:** Validação de formato de e-mail implementada diretamente na camada de banco de dados para garantir que nenhum dado inconsistente seja persistido.

### 🛡️ Segurança e RLS
A segurança baseia-se em **Row Level Security (RLS)** do Supabase, criando uma barreira de proteção no nível do dado:
- **Inserção Pública:** Permitida para o formulário da Landing Page sem necessidade de login.
- **Acesso Restrito:** Toda operação de leitura, atualização ou exclusão exige autenticação via **Supabase Auth**.
- **Middleware:** Proteção de rotas `/admin` em nível de borda (Edge), redirecionando usuários não autorizados antes mesmo da renderização da página.

---

## 🤖 Uso de Inteligência Artificial (Projeto Assistido)

Este projeto foi desenvolvido utilizando uma abordagem pioneira de **Engenharia Dirigida por IA**, utilizando um sistema de agentes coordenados para garantir a máxima qualidade de código e adesão aos requisitos.

### IAs Utilizadas
1.  **Antigravity (Gemini 2.0/3.0):** Atuou como o arquiteto principal e par de programação (Pair Programming), responsável pela implementação das rotas complexas, lógica de middleware e integração de banco de dados.
2.  **Claude 3.5 Sonnet:** Utilizado para refinamento de copy (UX Writing) e polimento de componentes visuais baseados na identidade visual da marca.
3.  **v0 / Bolt:** Ferramentas auxiliares para a prototipagem rápida da estrutura base dos componentes de UI.

### Como a IA ajudou?
- **Agentes Especializados:** O desenvolvimento seguiu um protocolo definido em `AGENTS.md`, onde IAs assumiram papéis de *Frontend Specialist*, *Database Architect* e *QA Agent*.
- **Otimização de Performance:** Uso de prompts avançados para geração de código que já respeita as melhores práticas da Vercel para Core Web Vitals.
- **Debug Assistido:** Resolução instantânea de lints e problemas de tipagem complexos no TypeScript.

---

## 🎯 Resultados (Lighthouse)

O projeto cumpre rigorosamente os requisitos de performance do Google:
- **Performance:** 95+
- **Acessibilidade:** 100
- **Best Practices:** 100
- **SEO:** 100

---

## ⚙️ Instalação e Execução

1.  **Clone o projeto:**
    ```bash
    git clone https://github.com/seu-usuario/motin-films.git
    cd motin-films
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` baseado no `.env.example` com suas chaves do Supabase.
4.  **Execute em desenvolvimento:**
    ```bash
    npm run dev
    ```

---

## 📄 Licença

Este projeto foi desenvolvido como um desafio técnico.

---
