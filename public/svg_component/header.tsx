"use client"; // only if you're using Next.js App Router

import React from "react";
import Link from "next/link";
import Logo from "./logo";

type HeaderProps = {
  logo?: React.ReactNode; // Can pass an <img /> or Logo component
  navItems?: { label: string; href: string }[];
  bgColor?: string;
  textColor?: string;
  shadowColor?: string;
  className?: string;
};

export default function Header({

  navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  bgColor = "white",
  textColor = "black",
  shadowColor = "rgba(0,0,0,0.1)",
  className = "",
}: HeaderProps) {
  return (
    <header
      className={`w-full px-6 py-4 flex items-center justify-between ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: `0 2px 10px ${shadowColor}`,
      }}
    >
      {/* Logo on the far left */}
      <div className="flex-shrink-0">
        <Logo width={50} height={50}/>
      </div>

      {/* Nav items on the right */}
      <nav className="flex space-x-6">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="px-4 py-2 rounded-md border border-transparent transition 
              hover:border-gray-300 hover:shadow-md"
            style={{ color: textColor }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
