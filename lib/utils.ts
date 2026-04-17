import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { NecessityType, NECESSITY_LABELS } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function getNecessityLabel(necessity: NecessityType): string {
  return NECESSITY_LABELS[necessity] ?? necessity
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return phone
}

export function leadsToCSV(leads: import('@/types').Lead[]): string {
  const headers = ['ID', 'Nome', 'Email', 'Telefone', 'Necessidade', 'Contatado', 'Criado em']
  const rows = leads.map((lead) => [
    lead.id,
    lead.name,
    lead.email,
    lead.phone,
    getNecessityLabel(lead.necessity),
    lead.contacted ? 'Sim' : 'Não',
    formatDate(lead.created_at),
  ])
  return [headers, ...rows].map((row) => row.join(',')).join('\n')
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
