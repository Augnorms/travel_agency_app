import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function POST(req: NextRequest) {
  try {
    // --------------------------
    // 1️⃣ Read HttpOnly cookie
    // --------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
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
      return NextResponse.json(
        { ok: false, message: "Session check failed" },
        { status: 500 }
      );
    }

    if (!sessions || sessions.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const session = sessions[0];
    const user_id = session.user_id;

    // --------------------------
    // 3️⃣ Parse body
    // --------------------------
    const body = await req.json();
    const { title, description, start_date, end_date } = body;

    if (!title || !description || !start_date || !end_date) {
      return NextResponse.json(
        { ok: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // --------------------------
    // 4️⃣ Insert event
    // --------------------------
    const { data, error } = await supabase
      .from("upcoming_events")
      .insert([
        {
          title,
          description,
          start_date,
          end_date,
          created_by: user_id
        }
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      data,
      message: "Upcoming event created successfully",
      session
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
