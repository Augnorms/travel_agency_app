import React from "react";
import Image from "next/image";

export default function AboutPartners() {
  const partners = [
    { name: "Partner 1", img: "/assets/partner1.jpg" },
    { name: "Partner 2", img: "/assets/partner1.jpg" },
    { name: "Partner 3", img: "/assets/partner1.jpg" },
    { name: "Partner 4", img: "/assets/" },
    { name: "Partner 5", img: "/assets/" },
    { name: "Partner 6", img: "/assets/" },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      {/* Title */}
      <div className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        OUR PARTNERS
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>
      </div>

      {/* Pyramid Layout */}
      <div className="flex flex-col items-center space-y-6">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <PartnerCard partner={partners[0]} />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <PartnerCard partner={partners[1]} />
          <PartnerCard partner={partners[2]} />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* <PartnerCard partner={partners[3]} />
          <PartnerCard partner={partners[4]} />
          <PartnerCard partner={partners[5]} /> */}
        </div>
      </div>
    </section>
  );
}

// Partner Card Component
function PartnerCard({ partner }: { partner: { name: string; img: string } }) {
  return (
    <div
      className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-xl 
      bg-white flex items-center justify-center transform 
      hover:scale-105 transition duration-300"
    >
      <Image
        src={partner.img}
        alt={partner.name}
        width={100}
        height={100}
        className="object-contain rounded-full"
      />
    </div>
  );
}
