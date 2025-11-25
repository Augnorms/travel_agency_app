"use client";
import { redirect } from "next/navigation";

export default function Home() {
  //home page redirected to custom home page
  redirect("/home");
}