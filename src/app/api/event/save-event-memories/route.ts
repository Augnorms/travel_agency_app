// app/api/event-memories/save-event-memories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import supabase from "../../db_connect/superbaseClient";

export async function POST(req: NextRequest) {
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
    // 3️⃣ Parse request body
    // --------------------------
    const body = await req.json();
    const { title, description, image_url } = body;

    if (!title || !description || !image_url) {
      return NextResponse.json({ ok: false, message: "Title, description, and image URL are required" }, { status: 400 });
    }

    // --------------------------
    // 4️⃣ Insert new event memory
    // --------------------------
    const { data, error } = await supabase
      .from("events_memories")
      .insert([
        {
          title,
          description,
          image_url,
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data, message: "Event memory saved successfully" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
