'use client'

import { useCallback, useEffect, useState } from 'react'
import { Lead, NecessityType, NECESSITY_LABELS } from '@/types'
import { formatDate, formatPhone, getNecessityLabel, leadsToCSV, downloadCSV } from '@/lib/utils'
import LeadCard from '@/components/admin/LeadCard'
import {
  Search, Filter, ChevronLeft, ChevronRight,
  CheckCircle2, Circle, Trash2, Download,
  ChevronUp, ChevronDown, X, Loader2
} from 'lucide-react'

const LIMIT = 20

type SortField = 'created_at' | 'name' | 'contacted'
type SortDir = 'asc' | 'desc'

interface Filters {
  search: string
  contacted: '' | 'true' | 'false'
  necessity: NecessityType | ''
}

interface LeadsResponse {
  data: Lead[]
  total: number
  page: number
  totalPages: number
}

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [filters, setFilters] = useState<Filters>({ search: '', contacted: '', necessity: '' })
  const [searchInput, setSearchInput] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      limit: String(LIMIT),
      ...(filters.search && { search: filters.search }),
      ...(filters.contacted !== '' && { contacted: filters.contacted }),
      ...(filters.necessity && { necessity: filters.necessity }),
    })
    try {
      const res = await fetch(`/api/leads?${params}`)
      const json: LeadsResponse = await res.json()
      if (res.ok) {
        setLeads(json.data)
        setTotal(json.total)
        setTotalPages(json.totalPages)
      }
    } finally {
      setLoading(false)
    }
  }, [page, filters])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  /* ---- Sort locally (already fetched page) ---- */
  const sorted = [...leads].sort((a, b) => {
    let va: string | number | boolean = a[sortField]
    let vb: string | number | boolean = b[sortField]
    if (typeof va === 'string') va = va.toLowerCase()
    if (typeof vb === 'string') vb = vb.toLowerCase()
    if (va < vb) return sortDir === 'asc' ? -1 : 1
    if (va > vb) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortField(field); setSortDir('asc') }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 text-brand-teal/30" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-brand-teal" />
      : <ChevronDown className="w-3 h-3 text-brand-teal" />
  }

  /* ---- Actions ---- */
  const toggleContacted = async (id: string, contacted: boolean) => {
    setActionLoading(id)
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contacted }),
    })
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, contacted } : l))
    setActionLoading(null)
  }

  const deleteLead = async (id: string) => {
    setActionLoading(id)
    await fetch(`/api/leads/${id}`, { method: 'DELETE' })
    setLeads((prev) => prev.filter((l) => l.id !== id))
    setTotal((t) => t - 1)
    setDeleteConfirm(null)
    setActionLoading(null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((f) => ({ ...f, search: searchInput }))
    setPage(1)
  }

  const clearFilters = () => {
    setFilters({ search: '', contacted: '', necessity: '' })
    setSearchInput('')
    setPage(1)
  }

  const hasFilters = filters.search || filters.contacted !== '' || filters.necessity !== ''

  const exportCSV = async () => {
    const res = await fetch(`/api/leads?limit=9999`)
    const json = await res.json()
    if (res.ok) {
      const csv = leadsToCSV(json.data)
      downloadCSV(csv, `motin-leads-${new Date().toISOString().split('T')[0]}.csv`)
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-sm">
          <div className="flex-1 flex items-center bg-brand-dark-3 border border-white/10 rounded-lg focus-within:border-brand-teal focus-within:ring-2 focus-within:ring-brand-teal/20 transition-all">
            <Search className="w-4 h-4 text-white/30 ml-3 flex-shrink-0" />
            <input
              id="lead-search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por nome ou email..."
              className="w-full bg-transparent text-white px-3 py-2.5 text-xs focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-secondary py-2.5 px-4 text-xs">
            <Search className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Contacted filter */}
          <select
            id="filter-contacted"
            value={filters.contacted}
            onChange={(e) => { setFilters((f) => ({ ...f, contacted: e.target.value as Filters['contacted'] })); setPage(1) }}
            className="select-field py-2.5 text-xs max-w-[150px]"
          >
            <option value="">Todos</option>
            <option value="false">Pendentes</option>
            <option value="true">Contatados</option>
          </select>

          {/* Necessity filter */}
          <select
            id="filter-necessity"
            value={filters.necessity}
            onChange={(e) => { setFilters((f) => ({ ...f, necessity: e.target.value as NecessityType | '' })); setPage(1) }}
            className="select-field py-2.5 text-xs max-w-[180px]"
          >
            <option value="">Todas necessidades</option>
            {Object.entries(NECESSITY_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors">
              <X className="w-3.5 h-3.5" /> Limpar
            </button>
          )}

          <button
            onClick={exportCSV}
            id="export-csv"
            className="flex items-center gap-1.5 glass-teal rounded-lg border border-brand-teal/20 hover:border-brand-teal/50 text-brand-teal/80 hover:text-brand-teal px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-white/30 mb-4">
        {total} lead{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
      </p>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-teal border border-brand-teal/20 rounded-3xl p-8 max-w-sm w-full text-center">
            <Trash2 className="w-10 h-10 text-brand-red mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-white mb-2">Confirmar exclusão</h3>
            <p className="text-sm text-white/50 mb-8 font-medium">Esta ação não pode ser desfeita. O lead será removido permanentemente.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn-secondary rounded-lg py-2.5 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => deleteLead(deleteConfirm)}
                disabled={!!actionLoading}
                className="flex-1 bg-brand-red hover:bg-red-700 text-white font-semibold py-2.5 px-4 text-sm uppercase tracking-wider transition-colors disabled:opacity-60"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Deletar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="glass-teal border border-brand-teal/20 rounded-3xl p-16 text-center">
          <Filter className="w-10 h-10 text-brand-teal/30 mx-auto mb-4" />
          <p className="text-white/40 font-medium">Nenhum lead encontrado.</p>
          {hasFilters && (
            <button onClick={clearFilters} className="mt-3 text-xs font-bold uppercase tracking-widest text-brand-teal hover:underline">
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {[
                    { key: 'name' as SortField, label: 'Nome' },
                    { key: null, label: 'Email' },
                    { key: null, label: 'Telefone' },
                    { key: null, label: 'Necessidade' },
                    { key: 'contacted' as SortField, label: 'Status' },
                    { key: 'created_at' as SortField, label: 'Data' },
                    { key: null, label: 'Ações' },
                  ].map(({ key, label }) => (
                    <th
                      key={label}
                      className="text-left text-xs font-semibold uppercase tracking-widest text-white/30 pb-3 pr-4 last:pr-0"
                    >
                      {key ? (
                        <button
                          onClick={() => toggleSort(key)}
                          className="flex items-center gap-1 hover:text-white/60 transition-colors"
                        >
                          {label}
                          <SortIcon field={key} />
                        </button>
                      ) : label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 pr-4 font-medium text-white">{lead.name}</td>
                    <td className="py-4 pr-4">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-white/60 hover:text-brand-teal transition-colors"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="py-4 pr-4 text-white/60">{formatPhone(lead.phone)}</td>
                    <td className="py-4 pr-4">
                      <span className="text-xs font-medium text-brand-teal/80">
                        {getNecessityLabel(lead.necessity)}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${
                        lead.contacted
                          ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                          : 'bg-white/5 text-white/40 border border-white/10'
                      }`}>
                        {lead.contacted ? 'Contatado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-white/40 text-xs whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleContacted(lead.id, !lead.contacted)}
                          disabled={actionLoading === lead.id}
                          className={`w-7 h-7 flex items-center justify-center transition-all duration-200 ${
                            lead.contacted
                              ? 'text-green-400 hover:text-white/40'
                              : 'text-white/30 hover:text-green-400'
                          }`}
                          title={lead.contacted ? 'Desmarcar' : 'Marcar como contatado'}
                        >
                          {actionLoading === lead.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : lead.contacted
                            ? <CheckCircle2 className="w-4 h-4" />
                            : <Circle className="w-4 h-4" />
                          }
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(lead.id)}
                          className="w-7 h-7 flex items-center justify-center text-white/20 hover:text-brand-red transition-colors"
                          title="Deletar lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sorted.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onToggleContacted={toggleContacted}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                id="pagination-prev"
                className="w-10 h-10 rounded-lg glass-teal flex items-center justify-center disabled:opacity-30 hover:border-brand-teal/30 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-brand-teal" />
              </button>
              <span className="text-sm font-medium text-white/50">
                Página <span className="text-white font-bold">{page}</span> de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                id="pagination-next"
                className="w-10 h-10 rounded-lg glass-teal flex items-center justify-center disabled:opacity-30 hover:border-brand-teal/30 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-brand-teal" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
