"use client"
import { DashboardNavProvider, useDashboardNav } from "@/app/(dashboard)/ContextApi/dashbordContext";
import DashboardHome from "../components/DashboardHome";
import UsersPage from "../components/UsersPage";
import AboutPage from "../components/AboutPage";
import GalleryPage from "../components/GalleryPage";
import EventPage from "../components/EventPage";
import Payment from "../components/Payment";
import Logout from "@/app/(dashboard)/components/Logout";
import Link from "next/link";

export default function DashboardUI({ user }: { user: any }) {
    const routes = [
        { name: "Dashboard", component: <DashboardHome /> },
        { name: "Users", component: <UsersPage /> },
        { name: "About", component: <AboutPage /> },
        // { name: "Gallery", component: <GalleryPage /> },
        { name: "Event", component: <EventPage /> },
        { name: "Payment", component: <Payment /> },
    ];

    return (
        <DashboardNavProvider initialRoute={routes[0]}>
            <DashboardContent user={user} routes={routes} />
        </DashboardNavProvider>
    );
}

function DashboardContent({ user, routes }: { user: any; routes: any }) {

    const { activeRoute, setActiveRoute } = useDashboardNav();

    const initials = `${user?.firstname?.[0] ?? ""}${user?.lastname?.[0] ?? ""}`.toUpperCase();

    return (
        <div className="min-h-screen flex bg-gray-50">
            <aside className="w-64 bg-white border-r shadow-sm p-5 flex flex-col">
                <div className="text-2xl font-bold text-purple-700 mb-8">My Dashboard</div>
                <ul className="space-y-2 flex-1">
                    {routes.map((route: any) => (
                        <li
                            key={route.name}
                            onClick={() => setActiveRoute(route)}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${activeRoute.name === route.name
                                ? "bg-purple-100 text-purple-700 font-semibold shadow-sm"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {route.name}
                        </li>
                    ))}
                </ul>
                <div className="text-xs text-gray-400 mt-auto">© {new Date().getFullYear()} My App</div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="flex">
                        <div>
                            <h1 className="text-xl font-bold text-pink-500 mb-2">{activeRoute.name}</h1>
                            <p className="text-sm text-gray-500">Hello, <span className="font-semibold text-pink-900">{user?.firstname}</span></p>
                        </div>
                        <div className="ml-8 mt-2 cursor-pointer">
                            <Link href={"/home"}>
                              <img src="/svg/home.svg" alt="home" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                                {initials}
                            </div>
                            <span className="font-medium text-gray-700">{user?.firstname}</span>
                            <div>
                                <img src="/svg/arrowDown.svg" alt="dropdown" />
                            </div>
                        </div>
                        <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 space-y-1">
                            <Logout />
                        </div>
                    </div>
                </header>

                <main className="
                       h-screen
                       p-6
                       bg-[url('/assets/background-image.svg')]
                      bg-cover bg-center bg-no-repeat
                 ">

                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        {activeRoute.component}
                    </div>

                </main>
            </div>
        </div>
    );
}
