import { NextRequest, NextResponse } from "next/server";
import supabase from "../../db_connect/superbaseClient";

export async function GET(req: NextRequest) {
  try {
    // ----------------------------------------
    // 3️⃣ Fetch "about" record
    // ----------------------------------------
    const { data, error } = await supabase    
      .from("about")
      .select("*")
      .order("id", { ascending: false }) // fetch latest entry
      .limit(1);

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { ok: true, data: null, message: "No About content found" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: data[0],
      message: "Fetched successfully"
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
