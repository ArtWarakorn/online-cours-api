import { supabase } from '@/lib/supabase'

export async function GET(request, { params }) {
  const { id } = await params

  const { data, error } = await supabase
    .schema('classroom')
    .from('lessons')
    .select(`
      id, title, video_url, content, position, created_at,
      quizzes ( id, title, passing_score )
    `)
    .eq('id', id)
    .single()

  if (error) return Response.json({ error: error.message }, { status: 404 })
  return Response.json({ data })
}

export async function PUT(request, { params }) {
  const { id } = await params
  const body = await request.json()

  const { data, error } = await supabase
    .schema('classroom')
    .from('lessons')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ data })
}

export async function DELETE(request, { params }) {
  const { id } = await params

  const { error } = await supabase
    .schema('classroom')
    .from('lessons')
    .delete()
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ message: 'ลบบทเรียนสำเร็จ' })
}