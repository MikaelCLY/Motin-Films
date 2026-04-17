'use client'

import { useEffect, useState, useCallback } from 'react'
import { LeadsStats } from '@/types'
import { Users, PhoneCall, TrendingUp, Film } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: number | string
  icon: React.ElementType
  accent: string
}) {
  return (
    <div className="glass border border-white/5 p-6 flex items-center gap-4">
      <div
        className="w-12 h-12 flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
      >
        <Icon className="w-6 h-6" style={{ color: accent }} />
      </div>
      <div>
        <p className="text-2xl font-black font-display text-white">{value}</p>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

interface TooltipPayloadItem {
  value: number
  dataKey: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-teal border border-brand-teal/20 p-3 rounded-2xl shadow-xl">
        <p className="text-white/60 text-xs mb-1 font-medium">{label}</p>
        <p className="text-brand-teal font-bold">{payload[0].value} Leads</p>
      </div>
    )
  }
  return null
}

export default function StatsChart() {
  const [stats, setStats] = useState<LeadsStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/leads/stats?days=30')
      const data = await res.json()
      if (res.ok) setStats(data)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading) {
    return (
      <div className="glass-teal border border-brand-teal/20 rounded-3xl p-8 flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
      </div>
    )
  }

  if (!stats) return null

  // Format chart data for Recharts
  const chartData = stats.last30Days?.map((d) => ({
    name: new Date(d.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    Leads: d.count
  })) || []

  const contactedPct = stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total de Leads" value={stats.total} icon={Users} accent="#00B2B2" />
        <StatCard label="Contatados" value={stats.contacted} icon={PhoneCall} accent="#22C55E" />
        <StatCard label="Pendentes" value={stats.notContacted} icon={Film} accent="#EF4444" />
        <StatCard label="Taxa Contato" value={`${contactedPct}%`} icon={TrendingUp} accent="#3B82F6" />
      </div>

      {/* Chart */}
      <div className="glass-teal border border-brand-teal/20 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-white text-lg">Leads por Dia</h3>
            <p className="text-xs text-white/40 mt-0.5">Últimos 30 dias</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-teal rounded-sm" />
            <span className="text-xs text-brand-teal">Leads</span>
          </div>
        </div>
        
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#00B2B2" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                minTickGap={15}
              />
              <YAxis 
                stroke="#00B2B2" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                allowDecimals={false}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(0, 178, 178, 0.05)' }} 
              />
              <Bar 
                dataKey="Leads" 
                fill="#00B2B2" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

