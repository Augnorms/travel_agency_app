import supabase from "../../db_connect/superbaseClient";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1️⃣ Read token from HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify token exists in sessions table
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

    // 3️⃣ Count users instead of fetching all data
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true }); // head: true fetches no rows, just count

    if (error) {
      console.error("Error counting users:", error);
      return NextResponse.json(
        { ok: false, status: 400, message: "Failed to count users" }
      );
    }

    return NextResponse.json({
      ok: true,
      status: 200,
      userCount: count,
      message: "Success"
    });

  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
