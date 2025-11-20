// src/app/(dashboard)/utils/auth.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import supabase from "@/app/api/db_connect/superbaseClient";

export async function requireAuth(redirectTo: string = "/login") {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token")?.value;

  // If token is missing, redirect immediately
  if (!token) {
    redirect(redirectTo);
  }

  // Decode token safely
  let userId: number;

  try {
    const decoded = Buffer.from(token as string, "base64").toString("ascii");
    userId = parseInt(decoded.split("-")[0]);

  } catch (err) {
    redirect(redirectTo); // invalid token format
  }

  if (isNaN(userId)) {
    redirect(redirectTo);
  }

  // Fetch user from Supabase
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !user) {
    redirect(redirectTo);
  }

  const { password, ...safeUser } = user;

  return safeUser;
}
