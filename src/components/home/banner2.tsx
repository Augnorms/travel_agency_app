"use client";

import Image from "next/image";
import Link from "next/link";

export default function MissionBanner() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Text */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Building Global Gateway School partnerships, Empowering cities and
            communities
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            Through <span className="font-semibold">cultural exchange</span>,{" "}
            <span className="font-semibold">education</span>, and{" "}
            <span className="font-semibold">community development</span>, we
            connect cities in <span className="font-semibold">Africa</span> to
            cities across the globe to create opportunities that last a
            lifetime.
          </p>

          <Link
            href="/about"
            className="inline-block px-6 py-3 bg-blue-400 text-white font-semibold rounded-md shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Right Side - Image with 3D effect */}
        <div className="relative group perspective">
          <div
            className="transform transition duration-500 group-hover:rotate-y-6 group-hover:-rotate-x-3 
            group-hover:shadow-2xl rounded-xl overflow-hidden"
          >
            <Image
              src="/assets/image-7.jpg" // replace with your image
              alt="Community Partnership"
              width={600}
              height={400}
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
