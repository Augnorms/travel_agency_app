"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { HiMenu, HiX } from "react-icons/hi";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

type HeaderProps = {
  navItems?: NavItem[];
  bgColor?: string;
  textColor?: string;
  shadowColor?: string;
  className?: string;
};

export default function Header({
  navItems = [
    { label: "Home", href: "/home" },
    { label: "About", href: "/about" },
    {
      label: "Activities",
      href: "#", // parent, doesn't need a real page
      children: [
        { label: "Programs", href: "/programs" },
        { label: "Donate", href: "/donate" },
        { label: "Events", href: "/events" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    {
      label: "Login", href: "#", children: [
        { label: "Login", href: "/dashboard" },
        { label: "dashboard", href: "/dashboard" },
      ]
    },
  ],
  bgColor = "white",
  textColor = "black",
  shadowColor = "rgba(0,0,0,0.1)",
  className = "",
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
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

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 relative border border-blue-500 p-3 rounded-md shadow-lg">
          {navItems.map((item, idx) => {
            const isChildActive = item.children?.some((child) => pathname.startsWith(child.href));
            const isActive = pathname === item.href || isChildActive;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={idx} className="relative group">
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-md border-b-2 transition transform duration-200 hover:scale-110 hover:shadow-lg ${isActive ? "border-b-[dodgerblue] font-bold text-blue-600" : "border-b-transparent"
                    } ${item.href === "/login" ? "md:border md:border-blue-500 md:bg-blue-400 text-white md:font-semibold" : ""
                    }`}
                >
                  {item.label}
                </Link>

                {/* Dropdown (Desktop) */}
                {hasChildren && (
                  <div
                    className="absolute right-0 mt-3 w-48 bg-white border-3 border-blue-200 
               rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 
               group-hover:visible group-hover:translate-y-2 transform 
               transition-all duration-300 z-50
               before:content-[''] before:absolute before:-top-2 before:right-6
               before:border-l-8 before:border-r-8 before:border-b-8
               before:border-l-transparent before:border-r-transparent before:border-b-white"
                  >
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 
                   border-l-4 border-transparent hover:border-blue-500 rounded-md"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
            const isChildActive = item.children?.some((child) => pathname.startsWith(child.href));
            const isActive = pathname === item.href || isChildActive;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={idx} className="w-full">
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-md border-b-2 transition
                  ${isActive
                      ? "border-b-[dodgerblue] font-bold text-blue-600"
                      : "border-b-transparent"
                    }
                  ${item.href === "/login" && "hidden"}
                `}
                  style={{ color: textColor }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>

                {/* Sub-links (Mobile) */}
                {hasChildren && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.children?.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </header>
      <div className="bg-white p-2 text-center mt-1 group">
        <h2
          className="
      hidden lg:block 
      p-2 text-[24px] font-bold 
      text-blue-500 
      whitespace-nowrap 
      underline decoration-[dodgerblue]

      transition-all duration-300 ease-out 
      group-hover:scale-105 
      group-hover:text-blue-600
      group-hover:drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]
    "
        >
          Shama Sister City Commission United Kingdom
        </h2>
      </div>

    </>
  );
}
