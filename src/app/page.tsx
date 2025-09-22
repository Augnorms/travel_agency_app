"use client"

import Logo from "../../public/svg_component/logo";
import Banner from "../../public/svg_component/banner";

export default function Home() {
  return (
    <div 
      className="
       font-sans
       min-h-screen 
       bg-[url('/assets/background-image.svg')]
       bg-cover
       bg-center
       bg-no-repeat
    "
    >
        <div className="absolute inset-0 bg-background/85 pointer-events-none"></div>

        <div className="relative z-10">
<Logo />
<Banner onLearnMore={() => alert("Learn more clicked!")}/>
        </div>
    </div>
  );
}
