type BannerProps = {
  headline?: string;
  subtext?: string;

  topText?: string;
  topSuperscript?: string;
  bottomText?: string;
  bottomSuperscript?: string;

  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  height?: string;
  image?: string;

  className?: string;

  // Button action
  onLearnMore?: () => void;
};

export default function Banner({
  // Headline and subtext content
  headline = "Connecting Cultures, Empowering Communities",
  subtext = "Shama (Ghana) & South Molton (UK) – in partnership since 2010",

  // Logo text content
  topText = "S",
  topSuperscript = "2",
  bottomText = "C",
  bottomSuperscript = "2",

  // Colors
  primaryColor = "#0057B8",
  secondaryColor = "#fff",
  accentColor = "#378be6ff",
  height = "80vh",
  image = "/assets/banner1.webp",

  className = "",

  // Button action
  onLearnMore,
}: BannerProps) {
  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{
        height,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: primaryColor, // fallback
      }}
    >
      {/* Transparent card wrapper */}
      <div
        className={`relative z-10 flex flex-col items-center text-center
          px-8 py-10 rounded-2xl shadow-2xl border border-white/30 bg-white/20 backdrop-blur-md
          max-w-6xl w-full ${className}`}
      >
        {/* Logo on top */}
        <div
          className="flex flex-col items-center justify-center 
          w-32 h-32 md:w-40 md:h-40 rounded-full font-bold shadow-lg mb-6"
          style={{
            backgroundColor: secondaryColor,
            color: accentColor,
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex items-center text-5xl md:text-6xl leading-none">
            {topText}
            <sup className="text-xl align-super">{topSuperscript}</sup>
          </div>
          <div className="flex items-center text-5xl md:text-6xl leading-none">
            {bottomText}
            <sup className="text-xl align-super">{bottomSuperscript}</sup>
          </div>
        </div>

        {/* Text content */}
        <h1
          className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
          style={{ color: secondaryColor }}
        >
          {headline}
        </h1>
        <p
          className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl"
          style={{ color: accentColor }}
        >
          {subtext}
        </p>

        {/* Learn More Button */}
        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className="mt-6 px-6 py-2 rounded-lg font-medium bg-white text-blue-700 
            hover:bg-blue-100 transition cursor-pointer shadow-md"
          >
            Learn More
          </button>
        )}
      </div>
    </div>
  );
}
