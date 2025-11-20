"use client";
import { motion } from "framer-motion";
import Banner from "@/components/home/banner";
import MissionBanner from "@/components/home/banner2";
import Banner3 from "@/components/home/banner3";
import Banner4 from "@/components/home/banner4";
import Transparent from "@/components/transparent";

export default function Home() {
  return (
    <div>
      <div className="relative z-10">
        {/* Banner 1 */}

          <Banner />
    

        {/* MissionBanner */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <MissionBanner />
        </motion.div>

        {/* Transparent 1 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Transparent className="h-[30vh]"/>
        </motion.div>

        {/* Banner3 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Banner3 />
        </motion.div>

        {/* Transparent 2 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Transparent />
        </motion.div>

        {/* Banner4 */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Banner4 />
        </motion.div>
      </div>
    </div>
  );
}