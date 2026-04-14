import supabase from '@/lib/supabase'

export async function POST(request) {
    const { email, password } = await request.json()

    const { data, error } = await supabase
        .schema('classroom')
        .from('users')
        .select('id, email, full_name, role')
        .eq('email', email)
        .eq('password', password)
        .single()

    if (error || !data)
        return Response.json({ error: 'email หรือ password ไม่ถูกต้อง' }, { status: 401 })

    return Response.json({ user: data })
}