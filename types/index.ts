export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  necessity: NecessityType
  contacted: boolean
  created_at: string
  updated_at: string
}

export type NecessityType =
  | 'filme_institucional'
  | 'filme_produto'
  | 'filme_evento'
  | 'filme_conteudo'
  | 'outros'

export const NECESSITY_LABELS: Record<NecessityType, string> = {
  filme_institucional: 'Filme Institucional',
  filme_produto: 'Filme Produto',
  filme_evento: 'Filme Evento Corporativo',
  filme_conteudo: 'Filme Conteúdo',
  outros: 'Outros',
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  necessity: NecessityType
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface LeadsFilter {
  search?: string
  contacted?: boolean | null
  necessity?: NecessityType | null
  dateFrom?: string
  dateTo?: string
}

export interface LeadsStats {
  total: number
  contacted: number
  notContacted: number
  byNecessity: Record<NecessityType, number>
  last30Days: DailyCount[]
}

export interface DailyCount {
  date: string
  count: number
}
