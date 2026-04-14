import { supabase } from '@/lib/supabase'

export async function GET(request, { params }) {
    const { id } = await params

    const { data, error } = await supabase
        .schema('classroom')
        .from('lessons')
        .select('id, title, video_url, content, position, created_at')
        .eq('course_id', id)
        .order('position')

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data })
}

export async function POST(request, { params }) {
    const { id } = await params
    const { title, video_url, content, position } = await request.json()

    const { data, error } = await supabase
        .schema('classroom')
        .from('lessons')
        .insert({ course_id: id, title, video_url, content, position })
        .select()
        .single()

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data }, { status: 201 })
}