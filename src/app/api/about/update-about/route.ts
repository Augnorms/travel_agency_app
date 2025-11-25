import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function PATCH(req: NextRequest) {
  try {
    // -----------------------------------
    // 1️⃣ Read HttpOnly cookie
    // -----------------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // -----------------------------------
    // 2️⃣ Validate session token
    // -----------------------------------
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

    // -----------------------------------
    // 3️⃣ Parse Request Body
    // -----------------------------------
    const body = await req.json();
    const { id, title, description } = body;

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "ID is required for update" },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { ok: false, message: "Title is required" },
        { status: 400 }
      );
    }

    // -----------------------------------
    // 4️⃣ Update record
    // -----------------------------------
    const { data, error } = await supabase
      .from("about")
      .update({
        title,
        description,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: data[0],
      message: "About content updated successfully"
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
