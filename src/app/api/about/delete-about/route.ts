import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function DELETE(req: NextRequest) {
  try {
    // ----------------------------------------------------
    // 1️⃣ Read token from HttpOnly cookies
    // ----------------------------------------------------
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ----------------------------------------------------
    // 2️⃣ Validate session token
    // ----------------------------------------------------
    const { data: sessions, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("token", token)
      .limit(1);

    if (sessionError) {
      return NextResponse.json(
        { ok: false, message: "Session lookup failed" },
        { status: 500 }
      );
    }

    if (!sessions || sessions.length === 0) {
      return NextResponse.json(
        { ok: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // ----------------------------------------------------
    // 3️⃣ Extract ID from query string
    // Example: /api/about/delete?id=5
    // ----------------------------------------------------
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { ok: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // ----------------------------------------------------
    // 4️⃣ Delete the record
    // ----------------------------------------------------
    const { data, error } = await supabase
      .from("about")
      .delete()
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
      message: "About entry deleted successfully",
      deleted: data[0]
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
