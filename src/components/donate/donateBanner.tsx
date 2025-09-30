"use client";

export default function DonateBanner() {


  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center">
      {/* Background image */}
    

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Title */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Every donation helps us bring change to the community.
          </p>
          {/* <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg transition">
            Donate Now
          </button> */}
        </div>
      </div>
    </section>
  );
}
