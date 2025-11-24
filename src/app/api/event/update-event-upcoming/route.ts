import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function PUT(req: NextRequest) {
  try {
    // --------------------------
    // 1️⃣ Read HttpOnly cookie
    // --------------------------
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    // --------------------------
    // 2️⃣ Verify session
    // --------------------------
    const { data: sessions } = await supabase
      .from("sessions")
      .select("*")
      .eq("token", token)
      .limit(1);

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ ok: false, message: "Invalid or expired session" }, { status: 401 });
    }

    const session = sessions[0];

    // --------------------------
    // 3️⃣ Parse body
    // --------------------------
    const body = await req.json();
    const { id, title, description, start_date, end_date } = body;

    if (!id) {
      return NextResponse.json({ ok: false, message: "Event ID is required" }, { status: 400 });
    }

    // --------------------------
    // 4️⃣ Update the event
    // --------------------------
    const { data, error } = await supabase
      .from("upcoming_events")
      .update({
        title,
        description,
        start_date,
        end_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("created_by", session.user_id) // ensure only the creator can update
      .select();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ ok: false, message: "No event found or not authorized" }, { status: 404 });
    }

    // --------------------------
    // 5️⃣ Format date fields for response
    // --------------------------
 
    return NextResponse.json({ ok: true, data: data, message: "Event updated successfully" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
