import { createClient } from '@/lib/supabase/server'
import AdminNavbar from '@/components/admin/AdminNavbar'
import StatsChart from '@/components/admin/StatsChart'
import LeadTable from '@/components/admin/LeadTable'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | Motin Films',
  robots: { index: false, follow: false },
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-brand-dark">
      <AdminNavbar userEmail={user?.email} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-teal mb-1">
            Painel Administrativo
          </p>
          <h1 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
            Gestão de Leads
          </h1>
          <div className="teal-divider mt-3" />
        </div>

        {/* Stats & Chart */}
        <section aria-label="Estatísticas" className="mb-10">
          <StatsChart />
        </section>

        {/* Leads Table */}
        <section aria-label="Tabela de leads">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-white">
              Todos os Leads
            </h2>
          </div>
          <LeadTable />
        </section>
      </main>
    </div>
  )
}
