"use client";

import { useRef, useEffect } from "react";

export default function EventBanner() {
    const mediaItems = [
        { src: "/event_images/canada_amb1.jpeg", alt: "Photo 1" },
        { src: "/event_images/chief1.jpeg", alt: "Photo 2" },
        { src: "/event_images/group1.jpeg", alt: "Photo 3" },
        { src: "/event_images/group2.jpeg", alt: "Photo 4" },
        { src: "/event_images/self1.jpeg", alt: "Photo 5" },
    ];

    const spinRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const spinContainer = spinRef.current;
        if (!spinContainer) return;

        const items = spinContainer.children;
        const count = items.length;
        const radius = 250; // smaller radius = smaller gaps
        const angleIncrement = 360 / count;

        for (let i = 0; i < count; i++) {
            const el = items[i] as HTMLElement;
            const angle = angleIncrement * i;
            el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            el.style.backfaceVisibility = "visible"; // allow rear side to be visible
        }

        spinContainer.style.transformStyle = "preserve-3d";
    }, [mediaItems]);

    return (
        <>
            <div className="w-full overflow-hidden bg-blue-900 h-16 relative">
                <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute whitespace-nowrap text-4xl sm:text-2xl font-bold text-white animate-marquee">
                        Events And Activities Of Shama Sister Commission
                    </div>
                </div>

                <style jsx>{`
                    @keyframes marquee {
                    0% {
                        transform: translateX(100%); /* Start off-screen to the right */
                    }
                    5% {
                        transform: translateX(0%); /* Quickly move into view */
                    }
                    95% {
                        transform: translateX(-100%); /* Stay visible for most of the animation */
                    }
                    100% {
                        transform: translateX(-100%); /* Keep position at the end */
                    }
                    }
                    .animate-marquee {
                    display: inline-block;
                    padding-left: 100%; /* Start with text off-screen to the right */
                    animation: marquee 20s linear infinite; /* Slower animation */
                    will-change: transform;
                    animation-delay: -0.5s; /* Start the animation slightly into its cycle */
                    }
                 `}
                </style>
            </div>


            <div className="w-full h-[60vh] relative perspective-1000 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
                <div
                    ref={spinRef}
                    className="w-full h-full absolute top-0 left-0 transform-3d animate-spin-3d"
                >
                    {mediaItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-[160px] h-[240px] object-cover rounded-md shadow-2xl transform transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                <style jsx>{`
        @keyframes spin-3d {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .animate-spin-3d {
          animation: spin-3d 40s infinite linear;
          transform-style: preserve-3d;
        }
      `}</style>
            </div>
        </>
    );
}
