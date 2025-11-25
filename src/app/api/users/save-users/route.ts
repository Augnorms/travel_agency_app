import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";
import bcrypt from "bcryptjs";

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

    // --------------------------
    // 3️⃣ Parse body and hash password
    // --------------------------
    const body = await req.json();
    const { firstname, lastname, email, gender, date_of_birth, nationality, residence, password, role } = body;

    if (!password) {
      return NextResponse.json(
        { ok: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const password_hash = await bcrypt.hash(password, 10);

    // --------------------------
    // 4️⃣ Check if email exists
    // --------------------------
    const { data: existingUsers } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (existingUsers?.length) {
      return NextResponse.json(
        { ok: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // --------------------------
    // 5️⃣ Insert new user
    // --------------------------
    const { data, error } = await supabase
      .from("users")
      .insert([{
        firstname,
        lastname,
        email,
        gender,
        date_of_birth,
        nationality,
        residence,
        password: password_hash,
        role
      }])
      .select();

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data, message: "User saved successfully", session });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
