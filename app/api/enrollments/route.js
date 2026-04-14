import { supabase } from '@/lib/supabase'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const student_id = searchParams.get('student_id')

    let query = supabase
        .schema('classroom')
        .from('enrollments')
        .select(`
      id, enrolled_at,
      courses ( id, title, description, thumbnail_url )
    `)

    if (student_id) query = query.eq('student_id', student_id)

    const { data, error } = await query.order('enrolled_at', { ascending: false })

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data })
}

export async function POST(request) {
    const { student_id, course_id } = await request.json()

    const { data, error } = await supabase
        .schema('classroom')
        .from('enrollments')
        .insert({ student_id, course_id })
        .select()
        .single()

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data }, { status: 201 })
}