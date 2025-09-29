import React from "react";
import Image from "next/image";

export default function AboutCertificate() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Certificate Summary */}
        <div className="relative">
          <div
            className="bg-white rounded-2xl p-8 shadow-xl transform 
                       hover:scale-105 hover:rotate-1 transition duration-500"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Attendance Recognition
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              This <span className="font-semibold text-blue-600">Badge of Attendance</span> 
              is proudly presented to{" "}
              <span className="font-semibold text-blue-600">Francis Mensah</span>{" "}
              for participating in the{" "}
              <span className="font-semibold text-blue-600">
                2025 U.S.-Japan Sister Cities Summit
              </span>.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              The summit, held in{" "}
              <span className="font-semibold text-blue-600">Izumisano, Osaka</span>, 
              took place from{" "}
              <span className="font-semibold text-blue-600">
                September 16 – 19, 2025
              </span>, and celebrated cross-cultural collaboration and 
              community partnerships.
            </p>

            <div className="mt-6">
              <span className="text-sm text-gray-500">
                Issued by Sister Cities International
              </span>
            </div>
          </div>

          {/* Stylish shadow for 3D look */}
          <div className="absolute -bottom-6 -left-6 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
        </div>

        {/* Right: Certificate Image */}
        <div
          className="relative bg-white rounded-2xl shadow-2xl p-4 
                     transform hover:rotate-1 hover:scale-105 transition duration-500"
        >
          <Image
            src="/gallery-images/certificate.jpg" // replace with your cert image
            alt="Certificate"
            width={600}
            height={400}
            className="rounded-lg object-contain"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-pink-100 rounded-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
