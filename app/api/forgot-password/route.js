import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and newPassword are required" },
        { status: 400 }
      );
    }

    // check email exists
    const { data: user, error: findError } = await supabase
      .schema("classroom")
      .from("users")
      .select("id,email")
      .eq("email", email)
      .single();

    if (findError || !user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // update password
    const { data, error } = await supabase
      .schema("classroom")
      .from("users")
      .update({ password: newPassword })
      .eq("email", email)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Password updated", user: data });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}