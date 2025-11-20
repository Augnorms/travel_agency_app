// app/(dashboard)/dashboard/page.tsx  ← SERVER component
import React from "react";
import { requireAuth } from "@/app/(dashboard)/utils/auth";
import DashboardUI from "../dashboardUI/page";

export default async function DashboardPage() {
  const user = await requireAuth(); // MUST run on server
  return <DashboardUI user={user} />; // pass to client component
}
