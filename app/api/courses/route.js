import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

//get all courses
export async function GET(request) {
    const { data, error } = await supabase
        .schema('classroom')
        .from('courses')
        .select('*, users(full_name)')
        .eq('is_published', true)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

// POST a new course
export async function POST(request) {
    try {
        const body = await request.json();
        const { instructor_id, title, description, thumbnail_url, is_published } = body;

        const { data, error } = await supabase
            .schema('classroom')
            .from("courses")
            .insert([{ instructor_id, title, description, thumbnail_url, is_published }])
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