import React from "react";
import Image from "next/image";

type ImgItem = {
  src: string;
  size: "big" | "small"; // big image or floating small image
  position?: string; // placement for small
};

type Section = {
  images: ImgItem[];
  title: string;
  subtitle: string;
  points: string[];
  buttonText: string;
};

const sections: Section[] = [
  {
    images: [
      {
        src: "/donations/donate_tablet.jpeg",
        size: "big",
      },
      {
        src: "/donations/donate_tablet_1.jpeg",
        size: "small",
        position: "absolute -right-8 -bottom-14",
      },
    ],
    title: "Bringing Technology Closer to Students",
    subtitle: "Digital Empowerment",
    points: [
      "✔ Providing digital tools for learning",
      "✔ Bridging the technology gap in underprivileged communities",
      "✔ Encouraging innovation and creativity among students",
      "✔ Preparing children for a brighter, tech-driven future",
    ],
    buttonText: "Support Education",
  },
  {
    images: [
      {
        src: "/donations/donate_cement.jpeg",
        size: "big",
      },
      {
        src: "/donations/donate_cement_1.jpeg",
        size: "small",
        position: "absolute -right-8 -bottom-14",
      },
    ],
    title: "Stronger Foundations for Better Learning",
    subtitle: "Building Hope",
    points: [
      "✔ Supplying building materials for school development",
      "✔ Creating safe and conducive classrooms for children",
      "✔ Supporting long-term community growth",
      "✔ Turning every bag of cement into a symbol of hope",
    ],
    buttonText: "Support School Projects",
  },
  {
    images: [
      {
        src: "/donations/health-screen.png",
        size: "big",
      },
      {
        src: "/donations/health-screen.png",
        size: "small",
        position: "absolute -right-8 -bottom-14",
      },
    ],
    title: "Healthy Communities, Stronger Bonds",
    subtitle: "Sister City Health Outreach",
    points: [
      "✔ Health screening initiative led by Dr. Katrine Govier from South Molton",
      "✔ A two-week medical exchange at Shama Hospital, Ghana (2011)",
      "✔ Promoting wellness through Sister City collaboration",
      "✔ Strengthening global friendship through shared care and service"
    ],
    buttonText: "Our Health Outreach",
  },
  {
  images: [
    {
      src: "/donations/lower-pra-donate.png",
      size: "big",
    },
    {
      src: "/donations/lower-pra-donate.png",
      size: "small",
      position: "absolute -right-8 -bottom-14",
    },
  ],
  title: "Empowering Communities Through Partnership",
  subtitle: "Lower Pra Rural Bank CSR Initiative",
  points: [
    "✔ Donated 50,000 old Ghana cedis to the Shama District Assembly",
    "✔ Supported the signing ceremony of the Sister City MoU",
    "✔ Strengthened collaboration between Shama District and South Molton",
    "✔ Advocated community-driven development through corporate responsibility",
  ],
  buttonText: "About This Initiative",
}

];

export default function DonateSecBanner() {
  return (
    <div className="flex flex-col gap-16 px-6 lg:px-10 py-12 lg:py-16 bg-white">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* LEFT IMAGES */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            {section.images.map((item, i) => {
              if (item.size === "big") {
                return (
                  <div
                    key={i}
                    className="w-[280px] h-[320px] sm:w-[340px] sm:h-[380px] lg:w-[380px] lg:h-[420px] relative rounded-2xl overflow-hidden shadow-xl z-10"
                  >
                    <Image
                      src={item.src}
                      alt={`section-${idx}-image-${i}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                );
              }
              if (item.size === "small") {
                return (
                  <div
                    key={i}
                    className={`${item.position} w-[160px] h-[190px] sm:w-[200px] sm:h-[240px] lg:w-[220px] lg:h-[260px] rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20`}
                  >
                    <Image
                      src={item.src}
                      alt={`section-${idx}-image-${i}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                );
              }
            })}
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-1/2 lg:pl-12 text-center lg:text-left">
            <h3 className="text-green-600 font-semibold mb-2">
              {section.subtitle}
            </h3>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug text-gray-800">
              {section.title}
            </h2>
            <ul className="space-y-3 text-gray-700">
              {section.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition">
              {section.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
