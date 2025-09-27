"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutBanner() {
  const images = [
    "/assets/about_image.webp", 
     "/assets/about_image1.webp",
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
        WHO WE ARE
      </h1>
    </section>
  );
}
