"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Import for active route
import Logo from "./logo";
import { HiMenu, HiX } from "react-icons/hi";

type HeaderProps = {
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
    { label: "Programs", href: "/programs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  bgColor = "white",
  textColor = "black",
  shadowColor = "rgba(0,0,0,0.1)",
  className = "",
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // ✅ get current route

  return (
    <header
      className={`w-full px-6 py-4 flex items-center justify-between ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: `0 2px 10px ${shadowColor}`,
      }}
    >
      {/* Logo */}
      <div className="flex">
        <Logo width={50} height={50} />
      </div>

      <div>
        <h2 className="hidden lg:block p-2 text-[28px] font-bold text-blue-500 underline decoration-[dodgerblue]">
          Shama Sister City Commission
        </h2>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-6">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href; // ✅ check if active
          return (
            <Link
              key={idx}
              href={item.href}
              className={`px-4 py-2 rounded-md border-b-2 transition transform duration-200
                hover:scale-110 hover:shadow-lg
                ${
                  isActive
                    ? "border-b-[dodgerblue] font-bold text-blue-600" // ✅ Active style
                    : "border-b-transparent"
                }
              `}
              style={{ color: textColor }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 h-screen w-[95%] bg-white/95 backdrop-blur-md
          shadow-lg flex flex-col items-start space-y-6 py-10 px-6
          transform transition-transform duration-300 ease-in-out
          md:hidden z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button inside menu */}
        <button
          onClick={() => setIsOpen(false)}
          className="text-3xl self-end mb-6 focus:outline-none"
        >
          <HiX />
        </button>

        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`px-4 py-2 rounded-md border-b-2 transition transform duration-200
                hover:scale-110 hover:shadow-lg
                ${
                  isActive
                    ? "border-b-[dodgerblue] font-bold text-blue-600"
                    : "border-b-transparent"
                }
              `}
              style={{ color: textColor }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
