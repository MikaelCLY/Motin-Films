'use client'

import { Lead } from '@/types'
import { formatDate, formatPhone, getNecessityLabel } from '@/lib/utils'
import { CheckCircle2, Circle, Trash2, Phone, Mail, Tag } from 'lucide-react'

interface LeadCardProps {
  lead: Lead
  onToggleContacted: (id: string, contacted: boolean) => void
  onDelete: (id: string) => void
}

export default function LeadCard({ lead, onToggleContacted, onDelete }: LeadCardProps) {
  return (
    <div className={`glass-teal rounded-2xl border p-5 transition-all duration-200 ${
      lead.contacted ? 'border-green-500/20' : 'border-brand-teal/20'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{lead.name}</h3>
          <p className="text-xs text-white/40 mt-0.5">{formatDate(lead.created_at)}</p>
        </div>
        <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          lead.contacted
            ? 'bg-green-500/15 text-green-400 border border-green-500/20'
            : 'bg-white/5 text-white/40 border border-white/10'
        }`}>
          {lead.contacted ? 'Contatado' : 'Pendente'}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-3.5 h-3.5 text-brand-teal/30 flex-shrink-0" />
          <a href={`mailto:${lead.email}`} className="text-white/70 hover:text-brand-teal transition-colors truncate text-xs">
            {lead.email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-3.5 h-3.5 text-brand-teal/30 flex-shrink-0" />
          <a href={`tel:${lead.phone}`} className="text-white/70 hover:text-brand-teal transition-colors text-xs">
            {formatPhone(lead.phone)}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-brand-teal/30 flex-shrink-0" />
          <span className="text-xs text-brand-teal/80 font-medium">{getNecessityLabel(lead.necessity)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-white/5">
        <button
          onClick={() => onToggleContacted(lead.id, !lead.contacted)}
          className={`flex-1 flex items-center rounded-lg justify-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            lead.contacted
              ? 'bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20'
              : 'glass-teal border border-brand-teal/20 text-white/50 hover:border-brand-teal/40 hover:text-brand-teal'
          }`}
        >
          {lead.contacted
            ? <><CheckCircle2 className="w-3.5 h-3.5" /> Contatado</>
            : <><Circle className="w-3.5 h-3.5" /> Marcar</>
          }
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="w-9 h-9 rounded-lg glass-teal border border-brand-teal/20 flex items-center justify-center text-brand-red/60 hover:text-brand-red hover:border-brand-red/30 transition-all duration-200"
          aria-label="Deletar lead"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
