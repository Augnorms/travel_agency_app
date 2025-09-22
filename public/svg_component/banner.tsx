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
  secondaryColor = "#ffffff",
  accentColor = "#e2f0ff",

  className = "",

  // Button action
  onLearnMore,
}: BannerProps) {
  return (
    <div className={`relative w-full`} style={{ backgroundColor: primaryColor }}>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"></div>

      <div
        className={`relative mx-auto max-w-6xl px-6 py-16 flex flex-col md:flex-row items-center ${className}`}
      >
        {/* Logo */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-12">
          <div
            className="flex flex-col items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full font-bold"
            style={{ backgroundColor: secondaryColor, color: accentColor }}
          >
            <div className="text-5xl md:text-6xl">
              {topText}
              <sup className="text-xl align-super">{topSuperscript}</sup>
            </div>
            <div className="text-5xl md:text-6xl">
              {bottomText}
              <sup className="text-xl align-super">{bottomSuperscript}</sup>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left">
          <h1
            className="
              font-serif font-bold
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl
              leading-tight
            "
            style={{ color: secondaryColor }}
          >
            {headline}
          </h1>
          <p
            className="
              mt-4
              text-sm sm:text-base md:text-lg lg:text-xl
            "
            style={{ color: accentColor }}
          >
            {subtext}
          </p>

          {/* Learn More Button */}
          {onLearnMore && (
            <button
              onClick={onLearnMore}
              className="mt-6 px-6 py-2 rounded-lg font-medium bg-white text-blue-700 
              hover:bg-blue-100 transition cursor-pointer"
            >
              Learn More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/*
<Banner
  headline="Building Bridges Across Continents"
  subtext="Fostering international cooperation"
  primaryColor="#10B981"
  secondaryColor="#1F2937"
  accentColor="#D1FAE5"
  onLearnMore={() => alert("Learn more clicked!")}
/>

*/