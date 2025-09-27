"use client";
import React from 'react'
import Image from "next/image";

const sisterCities = [
  {
    name: "Accra",
    country: "Ghana",
    img: "/assets/ghana_pic.webp", // replace with your image path
  },
  {
    name: "Richmond Upon Thames",
    country: "UK",
    img: "/assets/uk_pic.webp", // replace with your image path
  },
  {
    name: "Saitama",
    country: "Japan",
    img: "/assets/japan_pic.webp", // replace with your image path
  },
];

export default function Banner3() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">OUR SISTER CITIES</h2>
        <p className="text-gray-600 mt-2 font-medium">
          our sister cities showcases the best that each city has to offer
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sisterCities.map((city, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            {/* Image */}
            <Image
              src={city.img}
              alt={city.name}
              width={500}
              height={400}
              className="w-full h-64 object-cover"
            />

            {/* Overlay text */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white">
              <h3 className="text-2xl font-bold drop-shadow-lg">
                {city.name}
              </h3>
              <p className="text-lg font-medium">{city.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
