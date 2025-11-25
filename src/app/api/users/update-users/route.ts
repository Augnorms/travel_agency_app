import supabase from "../../db_connect/superbaseClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
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
    // 3️⃣ Parse request body
    // --------------------------
    const body = await req.json();
    const {
      id,
      firstname,
      lastname,
      email,
      gender,
      date_of_birth,
      nationality,
      residence,
      password,
      role
    } = body;

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // --------------------------
    // 4️⃣ Build update object dynamically
    // --------------------------
    const updateData: Record<string, any> = {
      firstname,
      lastname,
      email,
      gender,
      date_of_birth,
      nationality,
      residence,
      role
    };

    // Hash and update password ONLY if provided
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // --------------------------
    // 5️⃣ Update user in DB
    // --------------------------
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("*");

    if (error) {
      return NextResponse.json({ ok: false, message: error.message });
    }

    return NextResponse.json({ ok: true, data });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
