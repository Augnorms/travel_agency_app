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
  animationDuration = 10,
  showAnimation = true,
  
  // Filter props
  useFilter = true,
  
  className = "cursor-pointer"
}) {
  // Calculate stroke-dasharray based on circumference (2πr)
  const circumference = 2 * Math.PI * circleRadius;
  
  return (
    <div className={className}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={width} 
        height={height} 
        viewBox="0 0 200 200"
      >
        <defs>
          {/* Filter to create bevel + lighting + shadow */}
          {useFilter && (
            <filter id="bevel3D" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blurredAlpha" />
              <feOffset in="blurredAlpha" dx="4" dy="4" result="shadowOffset" />
              <feMerge>
                <feMergeNode in="shadowOffset" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
              <feSpecularLighting in="blurredAlpha" surfaceScale="5" specularConstant="0.8"
                                specularExponent="20" lightingColor="#ffffff" result="specLight">
                <fePointLight x="-50" y="-50" z="100" />
              </feSpecularLighting>
              <feComposite in="specLight" in2="SourceAlpha" operator="in" result="lit" />
              <feMerge>
                <feMergeNode in="shadowOffset" />
                <feMergeNode in="lit" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          <style>
            {`
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
                animation: ${showAnimation ? `rotateBorder ${animationDuration}s linear infinite` : 'none'};
              }
              @keyframes rotateBorder {
                0% {
                  stroke-dashoffset: 0;
                }
                100% {
                  stroke-dashoffset: -${circumference};
                }
              }
            `}
          </style>
        </defs>

        {/* Blue circle background with 3D effect */}
        <circle 
          cx="100" 
          cy="100" 
          r={circleRadius} 
          fill={circleColor} 
          filter={useFilter ? "url(#bevel3D)" : undefined} 
        />

        {/* Animated white border circle */}
        <circle 
          cx="100" 
          cy="100" 
          r={circleRadius} 
          className="border" 
        />

        {/* Top Text (S²) */}
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

        {/* Bottom Text (C²) */}
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

/*

Usage

// Custom colors and size
<Logo 
  width={300}
  height={300}
  circleColor="#FF6B6B"
  borderColor="#4ECDC4"
  textColor="#2C3E50"
/>

// Custom text content
<Logo 
  topText="A"
  topSuperscript="1"
  bottomText="B"
  bottomSuperscript="3"
/>

// No animation, no filter
<Logo 
  showAnimation={false}
  useFilter={false}
  borderWidth={2}
/>

// Large version with custom styling
<Logo 
  width={400}
  height={400}
  fontSize={64}
  superscriptSize={24}
  circleRadius={120}
  animationDuration={15}
  className="my-8 shadow-lg"
/>

// Scientific notation style
<Logo 
  topText="X"
  topSuperscript="n"
  bottomText="Y"
  bottomSuperscript="m"
  circleColor="#10B981"
  borderColor="#F59E0B"
/>
 
*/