"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ProgramsBanner() {
  const images = [
    "/assets/lecture1.webp",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Change background every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
      {/* Background image */}
      <Image
        src={images[currentImage]}
        alt="Who We Are Background"
        fill
        priority
        className="object-cover transition-opacity duration-1000"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Title */}
      <h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
        Our Programs
      </h1>
    </section>
  );
}
