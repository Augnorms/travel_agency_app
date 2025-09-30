"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type BannerProps = {
  headline?: string;
  subtext?: string;
  topText?: string;
  topSuperscript?: string;
  bottomText?: string;
  bottomSuperscript?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  height?: string;
  image?: string;
  cardStyle?: string;
  onLearnMore?: () => void;
};

export default function Banner({
  headline = "Connecting Cultures, Empowering Communities",
  subtext = "Shama (Ghana) & South Molton (UK) – in partnership since 2010",
  topText = "S",
  topSuperscript = "2",
  bottomText = "C",
  bottomSuperscript = "2",
  primaryColor = "#0057B8",
  secondaryColor = "#fff",
  accentColor = "#378be6ff",
  image = "/assets/banner1.webp",
  cardStyle = "",
}: BannerProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      setDisplayedText((prev) => {
        if (!isDeleting) {
          // Typing forward
          if (prev.length < headline.length) {
            return headline.slice(0, prev.length + 1);
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
            return prev;
          }
        } else {
          // Deleting backward
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            // Restart typing
            setIsDeleting(false);
            return "";
          }
        }
      });
    };

    const interval = setInterval(handleTyping, typingSpeed);
    return () => clearInterval(interval);
  }, [headline, isDeleting]);

  return (
    <div
      className="w-full flex items-center justify-center p-8"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: primaryColor,
      }}
    >
      <div
        className={`flex flex-col items-center text-center
          px-8 py-10 rounded-2xl shadow-2xl border border-white/30 bg-white/20 backdrop-blur-md
          max-w-6xl w-full ${cardStyle}`}
      >
        {/* Logo */}
        <div
          className="flex flex-col items-center justify-center 
          w-32 h-32 md:w-40 md:h-40 rounded-full font-bold shadow-lg mb-6"
          style={{
            backgroundColor: secondaryColor,
            color: accentColor,
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex items-center text-5xl md:text-6xl leading-none">
            {topText}
            <sup className="text-xl align-super">{topSuperscript}</sup>
          </div>
          <div className="flex items-center text-5xl md:text-6xl leading-none">
            {bottomText}
            <sup className="text-xl align-super">{bottomSuperscript}</sup>
          </div>
        </div>

        {/* Headline with typing animation */}
        <h1
          className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
          style={{ color: secondaryColor }}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>

        <p
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl"
          style={{ color: accentColor }}
        >
          {subtext}
        </p>

        <Link
          href="/programs"
          className="inline-block px-6 py-3 bg-blue-400 text-white
             font-semibold rounded-md shadow-md hover:bg-green-700 
             hover:shadow-lg transition duration-300 mt-6"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
