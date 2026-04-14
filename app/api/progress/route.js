import { supabase } from '@/lib/supabase'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const student_id = searchParams.get('student_id')

    if (!student_id) {
        return Response.json({ error: 'กรุณาระบุ student_id' }, { status: 400 })
    }

    const { data, error } = await supabase
        .schema('classroom')
        .from('lesson_progress')
        .select(`
      id, is_completed, updated_at,
      lessons ( id, title, position, course_id )
    `)
        .eq('student_id', student_id)

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data })
}

export async function POST(request) {
    const { student_id, lesson_id, is_completed } = await request.json()

    const { data, error } = await supabase
        .schema('classroom')
        .from('lesson_progress')
        .upsert(
            { student_id, lesson_id, is_completed },
            { onConflict: 'student_id,lesson_id' }
        )
        .select()
        .single()

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ data })
}