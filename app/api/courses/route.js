import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

//get all courses
export async function GET(request) {
    const { data, error } = await supabase
        .schema('classroom')
        .from('courses')
        .select('title, users(full_name), description, thumbnail_url, is_published, created_at')
        .eq('is_published', true)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}