import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function POST(req: NextRequest) {
  try {
    // ----------------------------------------
    // 1️⃣ Read HttpOnly cookie
    // ----------------------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ----------------------------------------
    // 2️⃣ Verify session
    // ----------------------------------------
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

    // ----------------------------------------
    // 3️⃣ Parse request body
    // ----------------------------------------
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { ok: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // ----------------------------------------
    // 4️⃣ Insert into 'about' table
    // ----------------------------------------
    const { data, error } = await supabase
      .from("about")
      .insert([{ title, description }])
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
      message: "About content saved successfully",
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
