import React from "react";
import Image from "next/image";
import { getInitials } from "@/utils/helpers";

export default function AboutPartners() {
  const partners = [
    { name: "Partner 1", img: "/assets/partner1.jpg" },
    { name: "Aff Filiate", img: "" },
    { name: "Aff Filiate", img: "" },
    { name: "Partner 4", img: "" },
    { name: "Partner 5", img: "" },
    { name: "Partner 6", img: "" },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      {/* Title */}
      <div className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        OUR AFFILIATES
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
          {/* Example of initials fallback */}
          {/* <PartnerCard partner={partners[3]} />
          <PartnerCard partner={partners[4]} /> */}
        </div>
      </div>

      {/* Comment-style cards */}
      <div className="mt-16 space-y-6">
        <CommentCard
          avatar="/assets/partner1.jpg"
          name="Francis Mensah"
          text={
            <>
              Working with <strong className="underline decoration-[dodgerblue]">
                Sister Cities International</strong> has been
              a fantastic experience! Their partnerships create real impact.
            </>
          }
        />

        <CommentCard
          avatar="" // No image, fallback to initials
          name="A F"
          text={
            <>
              Working with <strong className="underline decoration-[dodgerblue]">
                Shama Sister City Commission</strong> has
              been a great experience.
            </>
          }
        />
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
      {partner.img ? (
        <Image
          src={partner.img}
          alt={partner.name}
          width={100}
          height={100}
          className="object-contain rounded-full"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg">
          {getInitials(partner.name)}
        </div>
      )}
    </div>
  );
}

// Comment Card Component
function CommentCard({
  avatar,
  name,
  text,
}: {
  avatar: string;
  name: string;
  text: React.ReactNode; // 👈 allow JSX, not just string
}) {
  return (
    <div className="flex justify-center">
      <div className="flex items-start">
        {/* Avatar or Initials */}
        <div className="flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* Comment Bubble */}
        <div className="relative bg-white p-4 ml-4 rounded-lg shadow-lg border border-gray-200">
          <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white drop-shadow-md"></div>

          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-600 text-sm mt-1">{text}</p>
        </div>
      </div>
    </div>
  );
}

