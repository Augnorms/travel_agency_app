import Image from "next/image";
import React from "react";

export default function Banner4() {
  const sections = [
    {
      title: "Student Exchange / Sister Schools",
      img: "/assets/exchange_pic1.webp",
      desc: "Creating opportunities for cultural immersion and global learning.",
    },
    {
      title: "Arts & Cultural Festivals",
      img: "/assets/culture_pic.webp",
      desc: "Celebrating traditions and fostering mutual understanding.",
    },
    {
      title: "Community Development",
      img: "/assets/com_pic.webp",
      desc: "Working together to build stronger, sustainable communities.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-blue-200">
      {/* Title */}
      <div className="text-center text-3xl md:text-4xl font-bold text-gray-800 tracking-wide mb-12 relative">
        OUR PROGRAMS
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>
      </div>

      {/* Triangle layout */}
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8 md:space-y-0">
        {/* Top card (centered) */}
        <div className="w-full md:w-1/3">
          <ProgramCard section={sections[0]} />
        </div>

        {/* Bottom two cards */}
        <div className="w-full flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-center md:gap-16 md:mt-12">
          {sections.slice(1).map((section, idx) => (
            <div key={idx} className="w-full md:w-1/3">
              <ProgramCard section={section} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Reusable card */
function ProgramCard({ section }: { section: { title: string; img: string; desc: string } }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300">
      <div className="relative h-56 w-full">
        <Image
          src={section.img}
          alt={section.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
        <p className="text-gray-600 text-sm">{section.desc}</p>
      </div>
    </div>
  );
}
