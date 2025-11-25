import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
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
    // 2️⃣ Verify token exists in sessions table
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

    // --------------------------
    // 3️⃣ Decode token safely
    // --------------------------
    let userId: number;
    try {
      const decoded = Buffer.from(token, "base64").toString("ascii");
      userId = parseInt(decoded.split("-")[0]);
      if (isNaN(userId)) throw new Error("Invalid token");
    } catch {
      return NextResponse.json(
        { ok: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // --------------------------
    // 4️⃣ Fetch user
    // --------------------------
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    // --------------------------
    // 5️⃣ Remove password before returning
    // --------------------------
    const { password, ...safeUser } = user;

    return NextResponse.json({ ok: true, user: safeUser });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
