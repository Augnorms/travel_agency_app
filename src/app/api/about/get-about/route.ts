import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function GET(req: NextRequest) {
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
    // 2️⃣ Validate session
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

    // ----------------------------------------
    // 3️⃣ Fetch "about" record
    // ----------------------------------------
    const { data, error } = await supabase
      .from("about")
      .select("*")
      .order("id", { ascending: false }) // fetch latest entry
      .limit(1);

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { ok: true, data: null, message: "No About content found" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: data[0],
      message: "Fetched successfully"
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
