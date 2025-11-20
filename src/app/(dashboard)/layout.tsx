import "../globals.css"; // import global styles if needed
import Footer from "@/components/footer";
import { UserProvider } from "./ContextApi/UserContext";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserProvider>
        {children}
        <Footer />
      </UserProvider>
    </div>
  );
}
