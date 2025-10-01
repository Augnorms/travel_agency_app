"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const images: string[] = [
  "/donations/donate_cement.jpeg",
  "/donations/donate_tablet.jpeg",
];

export default function DonateBanner() {
  const [current, setCurrent] = useState(0);

  // cycle every 30s
  useEffect(() => {
    if (images.length === 0) return; // guard in case no images
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 30000); // 30 sec
    return () => clearInterval(interval);
  }, []);

  // guard if images array is empty or invalid
  if (images.length === 0) {
    return (
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-gray-200">
        <p className="text-gray-600">No images available</p>
      </section>
    );
  }

  const leftImage = images[current] ?? "/donations/donate_cement.jpeg";
  const rightImage = images[(current + 1) % images.length] ?? "";

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex text-center overflow-hidden">
      {/* LEFT SIDE */}
      <div className="relative w-1/2 h-full">
        {leftImage && (
          <Image
            src={leftImage}
            alt="Left background"
            fill
            priority
            className="object-cover transition-opacity duration-1000"
          />
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-1/2 h-full">
        {rightImage && (
          <Image
            src={rightImage}
            alt="Right background"
            fill
            priority
            className="object-cover transition-opacity duration-1000"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Every donation helps us bring change to the community.
          </p>
        </div>
      </div>
    </section>
  );
}
