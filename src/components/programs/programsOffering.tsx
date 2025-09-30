"use client";
import React from "react";
import {
  FaSchool,
  FaTheaterMasks,
  FaChalkboardTeacher,
  FaHandshake,
  FaLeaf,
  FaUserGraduate,
  FaLandmark,
  FaGlobeAmericas,
  FaPaintBrush,
  FaHandsHelping,
} from "react-icons/fa";

export default function ProgramsOffering() {
  const programs = [
    {
      title: "Student Exchange / Sister Schools",
      desc: "Partner schools in Shama and South Molton; student visits, joint projects in history, environment, and culture.",
      icon: <FaSchool className="text-blue-500 text-3xl" />,
    },
    {
      title: "Arts & Cultural Festivals",
      desc: "Artists from Ghana & UK showcase music, dance, crafts, and performances to foster cultural appreciation.",
      icon: <FaTheaterMasks className="text-purple-500 text-3xl" />,
    },
    {
      title: "Virtual Workshops & Lectures",
      desc: "Online exchanges: guest lectures, language learning, storytelling, and virtual tours.",
      icon: <FaChalkboardTeacher className="text-green-500 text-3xl" />,
    },
    {
      title: "Business & Trade Missions",
      desc: "Delegations and workshops to promote artisan crafts, exports, e-commerce, and diaspora trade links.",
      icon: <FaHandshake className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Community Development Projects",
      desc: "Collaborations on clean water, health clinics, sustainable farming, and environmental clean-ups.",
      icon: <FaLeaf className="text-teal-500 text-3xl" />,
    },
    {
      title: "Youth Leadership / Mentoring",
      desc: "Leadership camps, youth summits, and mentoring programs to develop civic engagement and life skills.",
      icon: <FaUserGraduate className="text-indigo-500 text-3xl" />,
    },
    {
      title: "Cultural / Heritage Preservation",
      desc: "Documenting traditions, crafts, and language through exhibitions, digital media, and booklets.",
      icon: <FaLandmark className="text-red-500 text-3xl" />,
    },
    {
      title: "Tourism & Heritage Exchange",
      desc: "Promoting heritage trails, homestays, and guided tours to strengthen tourism and local pride.",
      icon: <FaGlobeAmericas className="text-orange-500 text-3xl" />,
    },
    {
      title: "Arts Residencies",
      desc: "Artists-in-residence exchange between Ghana & UK for collaborative projects and teaching workshops.",
      icon: <FaPaintBrush className="text-pink-500 text-3xl" />,
    },
    {
      title: "Volunteering & Service Projects",
      desc: "Hands-on community service: sanitation, gardens, conservation — often led by young people.",
      icon: <FaHandsHelping className="text-cyan-500 text-3xl" />,
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-100">
      {/* Title */}
      <div className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-12">
        OUR PROGRAMS
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 rounded"></div>
      </div>

      {/* Responsive Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center 
              hover:shadow-2xl transition duration-300
              border border-gray-200"
          >
            {/* Icon */}
            <div className="mb-4">{program.icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              {program.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm text-center">{program.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
