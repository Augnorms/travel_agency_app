"use client";

import React from "react";
import AboutBanner from "@/components/about/aboutBanner";
import Transparent from "@/components/transparent";
import AboutPartners from "@/components/about/aboutPartners";
import AboutCertificate from "@/components/about/aboutCertificate";
import { motion } from "framer-motion";

export default function page() {
  return (
    <div>
      <div className="relative z-10">
        <AboutBanner />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AboutCertificate />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <div
              className="
      absolute 
      rounded-full
      w-[200px] h-[200px]
      bg-white
      shadow-xl
      border-2 border-blue-500
      z-20

      /* DEFAULT (mobile): centered */
      left-1/2
      top-[-12%]
      -translate-x-1/2

      /* SM (>= 640px) */
      sm:left-1/2
      sm:top-[-20%]

      /* LG (>= 1024px): left-aligned */
      lg:left-[10%]
      lg:top-[-4%]
      lg:translate-x-0
    "
            >
              <img
                src="/assets/partner1.jpg"
                alt="Avatar"
                className="
        w-full h-full 
        rounded-full 
        object-cover
      "
              />
            </div>

            <Transparent show />
          </div>



        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AboutPartners />
        </motion.div>
      </div>
    </div>
  );
}
