import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createAdminClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') ?? '30')

    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - days)

    const { data, error } = await supabase
      .from('leads')
      .select('created_at, contacted, necessity')
      .gte('created_at', dateFrom.toISOString())
      .order('created_at', { ascending: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // --- Total stats ---
    const { count: total } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    const { count: contacted } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('contacted', true)

    // --- Group by day ---
    const dailyCounts: Record<string, number> = {}
    for (let i = 0; i < days; i++) {
      const d = new Date()
      d.setDate(d.getDate() - (days - 1 - i))
      const key = d.toISOString().split('T')[0]
      dailyCounts[key] = 0
    }
    data?.forEach((lead) => {
      const key = lead.created_at.split('T')[0]
      if (key in dailyCounts) dailyCounts[key]++
    })

    // --- Group by necessity ---
    const byNecessity: Record<string, number> = {}
    data?.forEach((lead) => {
      byNecessity[lead.necessity] = (byNecessity[lead.necessity] ?? 0) + 1
    })

    return NextResponse.json({
      total: total ?? 0,
      contacted: contacted ?? 0,
      notContacted: (total ?? 0) - (contacted ?? 0),
      byNecessity,
      last30Days: Object.entries(dailyCounts).map(([date, count]) => ({
        date,
        count,
      })),
    })
  } catch (err) {
    console.error('[API /leads/stats]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
