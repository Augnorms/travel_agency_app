import supabase from "../../db_connect/superbaseClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    // --------------------------
    // 1️⃣ Read token from HttpOnly cookie
    // --------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    // --------------------------
    // 2️⃣ Verify token in sessions table
    // --------------------------
    const { data: sessions, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("token", token)
      .limit(1);

    if (sessionError) {
      return NextResponse.json({ ok: false, message: "Session check failed" }, { status: 500 });
    }

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ ok: false, message: "Invalid or expired session" }, { status: 401 });
    }

    const session = sessions[0];

    // --------------------------
    // 3️⃣ Parse body and get event id
    // --------------------------
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ ok: false, message: "Event ID is required" }, { status: 400 });
    }

    // --------------------------
    // 4️⃣ Check if event exists
    // --------------------------
    const { data: event, error: eventError } = await supabase
      .from("upcoming_events")
      .select("id")
      .eq("id", id)
      .eq("created_by", session.user_id) // ensure only creator can delete
      .single();

    if (eventError || !event) {
      return NextResponse.json({ ok: false, message: "Event not found or not authorized" }, { status: 404 });
    }

    // --------------------------
    // 5️⃣ Delete event
    // --------------------------
    const { data, error } = await supabase
      .from("upcoming_events")
      .delete()
      .eq("id", id)
      .eq("created_by", session.user_id);

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data, message: "Event deleted successfully" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
