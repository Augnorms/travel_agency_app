import React from "react";

export default function Transparent() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center">
      {/* Transparent Glass Div */}
      <div
        className="hidden
          w-3/4 md:w-1/2 lg:w-1/3
          p-10 rounded-2xl
          backdrop-blur-md 
          shadow-xl 
          border border-white/30
          text-center text-white
        "
      >
        
      </div>
    </div>
  );
}
