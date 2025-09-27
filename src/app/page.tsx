"use client"

import Banner from "../components/banner";
import MissionBanner from "@/components/banner2";
import Banner3 from "@/components/banner3";

export default function Home() {
  return (
    <div 
    >
        <div className="absolute inset-0 bg-background/85 pointer-events-none"></div>

        <div className="relative z-10">
          <Banner />
          <MissionBanner />
          <Banner3 />
        </div>
    </div>
  );
}
