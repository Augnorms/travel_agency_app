"use client";
import React from "react";
import DonateBanner from "@/components/donate/donateBanner";
import DonateSecBanner from "@/components/donate/donatSecBanner";
import { motion } from "framer-motion";

export default function page() {
  return (
    <div>
      <DonateBanner />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <DonateSecBanner />
      </motion.div>
    </div>
  );
}
