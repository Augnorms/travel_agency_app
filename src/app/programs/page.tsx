"use client";

import React from "react";
import ProgramsBanner from "@/components/programsBanner";
import ProgramsOffering from "@/components/programsOffering";
import Transparent from "@/components/transparent";
import CoreDuties from "@/components/programsCoreDuty";
import { motion } from "framer-motion";

export default function page() {
  return (
    <div>
      <div className="relative z-10">
        <ProgramsBanner />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ProgramsOffering />
        </motion.div>

        <Transparent className="h-[30vh]"/>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CoreDuties />
        </motion.div>
      </div>
    </div>
  );
}
