"use client"

import Banner from "../components/banner";


export default function Home() {
  return (
    <div 
    >
        <div className="absolute inset-0 bg-background/85 pointer-events-none"></div>

        <div className="relative z-10">
          <Banner onLearnMore={() => alert("Learn more clicked!")}/>
        </div>
    </div>
  );
}
