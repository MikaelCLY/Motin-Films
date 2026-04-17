import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { leadSchema } from '@/lib/validations/lead'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from('leads')
      .insert([parsed.data])
      .select('id')
      .single()

    if (error) {
      console.error('[API /leads] Supabase error:', error.message)
      return NextResponse.json(
        { error: 'Erro ao salvar lead. Tente novamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { id: data.id, message: 'Lead cadastrado com sucesso!' },
      { status: 201 }
    )
  } catch (err) {
    console.error('[API /leads] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createAdminClient()

    // Verify authenticated user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = parseInt(searchParams.get('limit') ?? '20')
    const search = searchParams.get('search') ?? ''
    const contacted = searchParams.get('contacted')
    const necessity = searchParams.get('necessity')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const offset = (page - 1) * limit

    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }
    if (contacted !== null && contacted !== '') {
      query = query.eq('contacted', contacted === 'true')
    }
    if (necessity) {
      query = query.eq('necessity', necessity)
    }
    if (dateFrom) {
      query = query.gte('created_at', dateFrom)
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo)
    }

    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data,
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    })
  } catch (err) {
    console.error('[API /leads GET]', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
