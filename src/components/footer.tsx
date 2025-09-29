import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "./logo";

export default function Footer() {
  return (
    <footer
      className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
     backdrop-blur-md border-t border-white/30 shadow-2xl px-8 py-10"
    >
      {/* Top row: Logo + Socials */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center">
          <Logo width={85} height={85} />
        </div>

        <div>
          {/* Middle Information */}
          <div className="flex-1 text-white/80 text-sm md:text-base text-center">
            <p>
              Building bridges between{" "}
              <span className="font-semibold">Shama (Ghana)</span>
              and <span className="font-semibold">South Molton (UK)</span> since
              2010.
            </p>
            <p className="mt-1">
              Fostering cultural exchange, education, and community development.
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 justify-center md:justify-end">
          <a
            href="https://web.facebook.com/francis.mensah.1614"
            aria-label="Facebook"
            className="w-10 h-10 flex items-center justify-center 
               rounded-full bg-white/20 text-white text-xl 
               shadow-md border border-white/30 
               transform transition duration-300 
               hover:scale-110 hover:shadow-xl"
          >
            <FaFacebook />
          </a>

          <a
            href="#"
            aria-label="Twitter"
            className="w-10 h-10 flex items-center justify-center 
               rounded-full bg-white/20 text-white text-xl 
               shadow-md border border-white/30 
               transform transition duration-300 
               hover:scale-110 hover:shadow-xl"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="w-10 h-10 flex items-center justify-center 
               rounded-full bg-white/20 text-white text-xl 
               shadow-md border border-white/30 
               transform transition duration-300 
               hover:scale-110 hover:shadow-xl"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-white/30" />

      {/* Bottom row: Copyright */}
      <p className="text-center text-xs text-white/60">
        © {new Date().getFullYear()} Shama & South Molton Partnership. All
        rights reserved.
      </p>
    </footer>
  );
}
