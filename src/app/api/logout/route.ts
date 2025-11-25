// src/app/api/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "../db_connect/superbaseClient";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Read the token from HttpOnly cookie
    const token = req.cookies.get("token")?.value;

    if (token) {
      // 2️⃣ Delete session from Supabase
      await supabase
        .from("sessions")
        .delete()
        .eq("token", token);
    }

    // 3️⃣ Clear the cookie
    const response = NextResponse.json({ ok: true, message: "Logged out successfully" });
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // important to remove cookie
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Internal Server Error" }, { status: 500 });
  }
}
