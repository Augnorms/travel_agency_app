"use client"

import "../globals.css"; // import global styles if needed
import Footer from "@/components/footer";
import { UserProvider } from "./ContextApi/UserContext";
import { usePathname } from "next/navigation";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-gray-50">
      <UserProvider>
        {children}
        {pathname !== "/login" ? <Footer /> : <></>}
      </UserProvider>
    </div>
  );
}
