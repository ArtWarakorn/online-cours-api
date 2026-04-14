import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

//get all users
export async function GET(request) {
    const { data, error } = await supabase
        .schema('classroom')
        .from('users')
        .select('*')
        .order('id')

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
// POST a new user
export async function POST(request) {
    try {
        const body = await request.json();
        const { id, email, password, full_name, role } = body;

        const { data, error } = await supabase
            .schema('classroom')
            .from("users")
            .insert([{ id, email, password, full_name, role }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}