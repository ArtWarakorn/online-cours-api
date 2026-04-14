import { supabase } from '@/lib/supabase'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const lesson_id = searchParams.get('lesson_id')

    if (!lesson_id) {
        return Response.json({ error: 'กรุณาระบุ lesson_id' }, { status: 400 })
    }

    let query = supabase
        .schema('classroom')
        .from('quizzes')
        .select(`
      id, title, passing_score, created_at,
      lessons ( id, title )
    `)

    if (lesson_id) query = query.eq('lesson_id', lesson_id)

    const { data, error } = await query

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data })
}

export async function POST(request) {
    const { lesson_id, title, passing_score } = await request.json()

    const { data, error } = await supabase
        .schema('classroom')
        .from('quizzes')
        .insert({ lesson_id, title, passing_score })
        .select()
        .single()

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data }, { status: 201 })
}