import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/courses/:id
export async function GET(req, { params }) {
    const { id } = await params;

    const { data, error } = await supabase
        .schema('classroom')
        .from("courses")
        .select("*, users(full_name)")
        .eq("id", id)
        .single();

    if (error) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(data);
}

// PUT /api/courses/:id
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const { instructor_id, title, description, thumbnail_url, is_published } = body;

        const { data, error } = await supabase
            .schema('classroom')
            .from("courses")
            .update({
                instructor_id,
                title,
                description,
                thumbnail_url,
                is_published
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

// DELETE /api/courses/:id
export async function DELETE(_request, { params }) {
    try {
        const { id } = await params;

        const { error } = await supabase
            .schema('classroom')
            .from("courses")
            .delete()
            .eq("id", id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}