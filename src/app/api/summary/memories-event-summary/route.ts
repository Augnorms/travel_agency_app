// File: app/api/event-memories/count-memories/route.ts
import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";  

export async function GET(req: NextRequest) {
  try {
    // 1️⃣ Count all event memories
    const { count, error } = await supabase
      .from("events_memories")
      .select("*", { count: "exact", head: true }); // head:true fetches no rows, only count

    if (error) {
      return NextResponse.json(
        { ok: false, message: "Failed to count event memories" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      status: 200,
      eventMemoriesCount: count,
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
