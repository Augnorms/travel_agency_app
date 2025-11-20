// src/app/(dashboard)/components/Logout.tsx
"use client"; // ← Must be client component

import React from "react";
import { useRouter } from "next/navigation"; // ← correct router for app dir

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include", // send HttpOnly cookies
    });

    const data = await res.json();

    if(data) {router.push("/login");} // redirect after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="w-[100%] p-1 bg-blue-400 text-white rounded hover:bg-blue-200 cursor-pointer"
    >
      Logout
    </button>
  );
}
