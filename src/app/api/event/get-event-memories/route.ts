// File: app/api/event-memories/get-all-memories/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";  

export async function GET(req: NextRequest) {
  try {
    // --------------------------
    // 1️⃣ Fetch all event memories
    // --------------------------
    const { data, error } = await supabase
      .from("events_memories")
      .select("*")
      .order("created_at", { ascending: false }); 

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { ok: true, data: [], message: "No event memories found" },
        { status: 200 }
      );
    }

    // --------------------------
    // 2️⃣ Format dates to YYYY-MM-DD
    // --------------------------
    const formatted = data.map((item) => ({
      ...item,
      created_at: item.created_at?.split("T")[0],
      updated_at: item.updated_at?.split("T")[0],
    }));

    return NextResponse.json({ ok: true, data: formatted, message: "Fetched successfully" });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
