"use client";

import React from "react";
import AboutBanner from "@/components/aboutBanner";
import Transparent from "@/components/transparent";
import AboutPartners from "@/components/aboutPartners";
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
          <Transparent show />
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
