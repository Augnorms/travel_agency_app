"use client";
import React, { useEffect, useState } from "react";

interface UpcomingEvent {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    image_url?: string | null;
    location?: string | null;
    created_at: string;
}

export default function EventNotify() {
    const [events, setEvents] = useState<UpcomingEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUpcomingEvents = async () => {
        try {
            const response = await fetch("/api/event/get-event-upcoming", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (!data.ok) {
                setEvents([]);
                setLoading(false);
                return;
            }

            const mapped = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                start_date: item.start_date,
                end_date: item.end_date,
                image_url: item.image_url,
                location: item.location,
                created_at: item.created_at,
            }));

            const today = new Date().toISOString().split("T")[0];

            // Only current or future events
            const filtered = mapped.filter((e: UpcomingEvent) => e.end_date >= today);

            setEvents(filtered);
        } catch (error) {
            console.log(error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUpcomingEvents();
    }, []);

    const isHappeningNow = (event: UpcomingEvent) => {
        const today = new Date().toISOString().split("T")[0];
        return event.start_date <= today && event.end_date >= today;
    };


    // GET CURRENT EVENTS ONLY
    const currentEvents = events.filter((e) => isHappeningNow(e));

    // GET FUTURE EVENTS ONLY
    const upcomingEvents = events.filter((e) => !isHappeningNow(e));

    return (
        <div className="w-full py-14 px-6 bg-gray-50">
            {/* EMPTY STATE — No Current or Upcoming Events */}
            {events.length == 0 && <div className="flex justify-center mt-10">
                <div className="w-full max-w-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-10 text-center animate-fadeIn">
                    <div className="mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 mx-auto opacity-90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                            strokeWidth="1.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6l4 2m6 2a9.004 9.004 0 01-8 8.944A9.004 9.004 0 014 16a9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">
                        No Events Available
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                        There are currently no ongoing or upcoming events.
                        Check back soon for new announcements and programs.
                    </p>
                </div>
            </div>}


            {/* LOADING STATE */}
            {loading && (
                <p className="text-center text-gray-500">Loading events...</p>
            )}

            {/* NO EVENTS AT ALL */}
            {!loading && events.length === 0 && (
                <p className="text-center text-gray-500">No current or upcoming events.</p>
            )}

            {/* NO CURRENT EVENT MESSAGE */}
            {!loading && events.length > 0 && currentEvents.length === 0 && (
                <div className="text-center mb-10">
                    <p className="text-gray-700 font-medium text-lg">
                        There is no event happening right now.
                    </p>
                </div>
            )}

            {/* CURRENT EVENTS ============================ */}
            {currentEvents.length > 0 && (
                <div className="mb-14">
                    <h3 className="text-2xl font-semibold text-green-800 mb-6 text-center">
                        Currently Happening
                    </h3>

                    <div className="flex flex-col items-center gap-8">
                        {currentEvents.map((event) => (
                            <div className="w-full max-w-2xl" key={event.id}>
                                <EventCard event={event} now={true} />
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* UPCOMING EVENTS ============================ */}
            {upcomingEvents.length > 0 && (
                <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Upcoming Events
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.map((event) => (
                            <EventCard event={event} now={false} key={event.id} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

/* ----------------------------------------------
   CARD COMPONENT
------------------------------------------------ */
function EventCard({
    event,
    now,
}: {
    event: UpcomingEvent;
    now: boolean;
}) {
    const daysUntilStart = Math.ceil(
        (new Date(event.start_date).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
    );

    return (
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-green-500">

            {/* Notification Icon */}
            <div className="absolute top-4 right-4">
                <svg
                    className="w-6 h-6 text-red-500 animate-ping"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 002 0V7zm-1 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <div className="p-5 flex flex-col gap-3">

                {/* Status */}
                {now ? (
                    <span className="px-3 py-1 text-sm font-bold bg-green-100 text-green-700 rounded-full w-fit">
                        Happening Now
                    </span>
                ) : (
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full w-fit">
                        Starts in {daysUntilStart} day{daysUntilStart !== 1 ? "s" : ""}
                    </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-blue-900 pr-10">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-pink-600 text-sm line-clamp-3">
                    {event.description}
                </p>

                {/* Dates */}
                <p className="text-sm font-medium text-cyan-700">
                    {event.start_date} → {event.end_date}
                </p>
            </div>

        </div>

    );
}
