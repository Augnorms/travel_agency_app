"use client"

import Banner from "../components/banner";
import MissionBanner from "@/components/banner2";
import Banner3 from "@/components/banner3";
import Banner4 from "@/components/banner4";
import Transparent from "@/components/transparent";

export default function Home() {
  return (
    <div 
    >
        <div className="relative z-10">
          <Banner />
          <MissionBanner />
          <Transparent />
          <Banner3 />
          <Transparent />
          <Banner4 />
        </div>
    </div>
  );
}
