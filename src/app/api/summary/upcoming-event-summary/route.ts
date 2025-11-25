import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Read HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify session in database
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

    // 3️⃣ Count upcoming events
    const { count, error } = await supabase
      .from("upcoming_events")
      .select("*", { count: "exact", head: true }); // head:true avoids fetching rows

    if (error) {
      return NextResponse.json(
        { ok: false, message: "Failed to count events" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      status: 200,
      upcomingEventCount: count,
      message: "Fetched successfully",
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
