// src/app/api/login/route.ts
import supabase from "../db_connect/superbaseClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: "Email and password are required" });
    }

    // 1️⃣ Get user by email
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1);

    if (error) return NextResponse.json({ ok: false, message: error.message });

    if (!users || users.length === 0) {
      return NextResponse.json({ ok: false, message: "Invalid email or password" });
    }

    const user = users[0];

    // 2️⃣ Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ ok: false, message: "Invalid email or password" });

    // 3️⃣ Create a session token
    const token = Buffer.from(`${user.id}-${Date.now()}`).toString("base64");

    // 4️⃣ Store token in Supabase sessions table
    const { error: sessionError } = await supabase
      .from("sessions")
      .insert([{ user_id: user.id, token }]);

    if (sessionError) {
      return NextResponse.json({ ok: false, message: "Failed to create session" });
    }

    // 5️⃣ Set HttpOnly cookie
    const response = NextResponse.json({
      ok: true,
      message: "Login successful",
      user: { ...user, password: undefined },
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
