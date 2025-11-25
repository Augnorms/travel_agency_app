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

    // --------------------------
    // 3️⃣ Parse body and get memory ID
    // --------------------------
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "Memory ID is required" },
        { status: 400 }
      );
    }

    // --------------------------
    // 4️⃣ Check if memory record exists
    // --------------------------
    const { data: existing, error: checkError } = await supabase
      .from("events_memories")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError || !existing) {
      return NextResponse.json(
        { ok: false, message: "Memory record not found" },
        { status: 404 }
      );
    }

    // --------------------------
    // 5️⃣ Delete memory record
    // --------------------------
    const { error: deleteError } = await supabase
      .from("events_memories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        { ok: false, message: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Memory deleted successfully",
      id,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
