export default function Logo({
  // Size props
  width = 100,
  height = 100,

  // Color props
  circleColor = "#0057B8",
  borderColor = "white",
  textColor = "white",

  // Text content props
  topText = "S",
  topSuperscript = "2",
  bottomText = "C",
  bottomSuperscript = "2",

  // Style props
  fontSize = 48,
  superscriptSize = 20,
  borderWidth = 4,
  circleRadius = 95,

  // Animation props
  animationDuration = 5,
  showAnimation = true,

  // Filter props
  useFilter = true,

  className = "cursor-pointer"
}) {
  const circumference = 2 * Math.PI * circleRadius;
  const spinDuration = `${animationDuration}s`;

  return (
    <div
      className={`logo-spin-container ${className}`}
      style={{
        width,
        height,
        ["--spin-duration" as any]: spinDuration,
        ["--spin-enabled" as any]: showAnimation ? "running" : "paused"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 200 200"
      >
        <defs>
          {useFilter && (
            <filter
              id="bevel3D"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="4"
                result="blurredAlpha"
              />
              <feOffset
                in="blurredAlpha"
                dx="4"
                dy="4"
                result="shadowOffset"
              />
              <feMerge>
                <feMergeNode in="shadowOffset" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>

              <feSpecularLighting
                in="blurredAlpha"
                surfaceScale="5"
                specularConstant="0.8"
                specularExponent="20"
                lightingColor="#ffffff"
                result="specLight"
              >
                <fePointLight x="-50" y="-50" z="100" />
              </feSpecularLighting>

              <feComposite
                in="specLight"
                in2="SourceAlpha"
                operator="in"
                result="lit"
              />

              <feMerge>
                <feMergeNode in="shadowOffset" />
                <feMergeNode in="lit" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          <style>{`
            .letter {
              font-family: Arial, sans-serif;
              font-size: ${fontSize}px;
              fill: ${textColor};
              text-anchor: middle;
            }

            .sup {
              font-size: ${superscriptSize}px;
            }

            .border {
              fill: none;
              stroke: ${borderColor};
              stroke-width: ${borderWidth};
              stroke-dasharray: ${circumference};
              stroke-dashoffset: 0;
              transform-origin: 100px 100px;
              animation: ${
                showAnimation
                  ? `rotateBorder ${animationDuration}s linear infinite`
                  : "none"
              };
            }

            @keyframes rotateBorder {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -${circumference}; }
            }

            /* COIN SPIN CONTAINER ANIMATION */
            .logo-spin-container {
              display: inline-block;
              transform-style: preserve-3d;
              animation: coinSpin var(--spin-duration) linear infinite;
              animation-play-state: var(--spin-enabled);
            }

            @keyframes coinSpin {
              0% {
                transform: rotateY(0deg);
              }
              50% {
                transform: rotateY(180deg) scaleX(0.85);
              }
              100% {
                transform: rotateY(360deg);
              }
            }
          `}</style>
        </defs>

        {/* Blue 3D circle */}
        <circle
          cx="100"
          cy="100"
          r={circleRadius}
          fill={circleColor}
          filter={useFilter ? "url(#bevel3D)" : undefined}
        />

        {/* Animated rotating border */}
        <circle cx="100" cy="100" r={circleRadius} className="border" />

        {/* Top S² */}
        <text
          x="100"
          y="100"
          className="letter"
          filter={useFilter ? "url(#bevel3D)" : undefined}
        >
          {topText}
          <tspan dx="-5" dy={-superscriptSize} className="sup">
            {topSuperscript}
          </tspan>
        </text>

        {/* Bottom C² */}
        <text
          x="100"
          y="140"
          className="letter"
          filter={useFilter ? "url(#bevel3D)" : undefined}
        >
          {bottomText}
          <tspan dx="-5" dy={-superscriptSize} className="sup">
            {bottomSuperscript}
          </tspan>
        </text>
      </svg>
    </div>
  );
}
