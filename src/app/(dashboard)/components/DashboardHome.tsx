import { FiUpload, FiImage, FiVideo, FiCreditCard, FiEdit3, FiUsers, FiBarChart2, FiAlertCircle } from "react-icons/fi";
import { useDashboardNav } from "@/app/(dashboard)/ContextApi/dashbordContext";
import UsersPage from "../components/UsersPage";
import AboutPage from "../components/AboutPage";
import GalleryPage from "../components/GalleryPage";
import EventPage from "../components/EventPage";
import Payment from "../components/Payment";
import { useEffect, useState } from "react";

type CardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
};

const AnalyticsCard = ({ title, value, icon, bgColor = "bg-white", textColor = "text-cyan-400" }: CardProps) => (
  <div className={`${bgColor} rounded-xl shadow p-5 border border-blue-700 flex flex-col items-start`}>
    <div className="flex items-center justify-between w-full">
      <p className={`${textColor} text-sm`}>{title}</p>
      {icon && <div className="text-2xl">{icon}</div>}
    </div>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

export default function DashboardHome() {
  const { setActiveRoute } = useDashboardNav();

  const [userCount, setUserCount] = useState(0);
  const [upcomingEventCount, setUpcomingEventCount] = useState(0);
  const [eventMemoriesCount, setEventMemoriesCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("/api/summary/user-summary");
        const data = await response.json();
        setUserCount(data.userCount);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchUpcomingEventCount = async () => {
      try {
        const response = await fetch("/api/summary/upcoming-event-summary");
        const data = await response.json();
        setUpcomingEventCount(data.upcomingEventCount);
      } catch (error) {
        console.error("Error fetching upcoming event count:", error);
      }
    };

    const fetchEventMemoriesCount = async () => {
      try {
        const response = await fetch("/api/summary/memories-event-summary");
        const data = await response.json();
        setEventMemoriesCount(data.eventMemoriesCount);
      } catch (error) {
        console.error("Error fetching event memories count:", error);
      }
    };

    fetchUserCount();
    fetchUpcomingEventCount();
    fetchEventMemoriesCount();
  }, []);

  return (
    <div className="w-full h-full p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-cyan-800">Dashboard Overview</h1>
          <p className="text-cyan-500 mt-1">Welcome back! Here's your activity summary.</p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <AnalyticsCard title="Total Uploads" value={0} icon={<FiUpload className="text-indigo-600" />} />
        <AnalyticsCard title="Total Users" value={userCount} icon={<FiUsers className="text-green-600" />} />
        <AnalyticsCard title="Upcoming Events" value={upcomingEventCount} icon={<FiBarChart2 className="text-rose-600" />} />
        <AnalyticsCard title="Payments Processed" value="0" icon={<FiCreditCard className="text-green-600" />} />
        <AnalyticsCard title="Event Memories" value={eventMemoriesCount} icon={<FiAlertCircle className="text-yellow-600" />} />
      </div>

      {/* QUICK ACTIONS */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
    <button
  className="flex flex-col items-center bg-indigo-100 hover:bg-indigo-200 p-4 rounded-xl cursor-pointer"
  onClick={() => setActiveRoute({ name: "Users", component: <UsersPage /> })}
>
  <FiImage className="text-3xl text-indigo-600" />
  <span className="mt-2 font-medium">Edit Users</span>
</button>

<button
  className="flex flex-col items-center bg-rose-100 hover:bg-rose-200 p-4 rounded-xl cursor-pointer"
  onClick={() => setActiveRoute({ name: "Event", component: <EventPage /> })}
>
  <FiVideo className="text-3xl text-rose-600" />
  <span className="mt-2 font-medium">Edit Events</span>
</button>

<button
  className="flex flex-col items-center bg-blue-100 hover:bg-blue-200 p-4 rounded-xl cursor-pointer"
  // onClick={() => setActiveRoute({ name: "Gallery", component: <GalleryPage /> })}
>
  <FiUpload className="text-3xl text-blue-600" />
  <span className="mt-2 font-medium">Edit Gallery</span>
</button>

<button
  className="flex flex-col items-center bg-green-100 hover:bg-green-200 p-4 rounded-xl cursor-pointer"
  onClick={() => setActiveRoute({ name: "Payment", component: <Payment /> })}
>
  <FiCreditCard className="text-3xl text-green-600" />
  <span className="mt-2 font-medium">Payments</span>
</button>

<button
  className="flex flex-col items-center bg-yellow-100 hover:bg-yellow-200 p-4 rounded-xl cursor-pointer"
  onClick={() => setActiveRoute({ name: "About", component: <AboutPage /> })}
>
  <FiEdit3 className="text-3xl text-yellow-600" />
  <span className="mt-2 font-medium">Edit About Page</span>
</button>

      </div>

      {/* RECENT ACTIVITY / UPLOADS */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Example recent uploads */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-full h-28 bg-gray-200 rounded-xl p-4 flex flex-col justify-between animate-pulse"
            >
              <div className="flex justify-between items-start">
                <span className="bg-gray-300 h-4 w-20 rounded"></span>
                <span className="bg-gray-300 h-4 w-10 rounded"></span>
              </div>
              <div className="bg-gray-300 h-4 w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
