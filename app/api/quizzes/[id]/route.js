import {supabase} from '@/lib/supabase'

export async function GET(request, { params }) {
  const { id } = await params

  const { data, error } = await supabase
    .schema('classroom')
    .from('quizzes')
    .select('id, title, passing_score, lessons ( id, title )')
    .eq('id', id)
    .single()

  if (error) return Response.json({ error: error.message }, { status: 404 })
  return Response.json({ data })
}

export async function DELETE(request, { params }) {
  const { id } = await params

  const { error } = await supabase
    .schema('classroom')
    .from('quizzes')
    .delete()
    .eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ message: 'ลบ quiz สำเร็จ' })
}