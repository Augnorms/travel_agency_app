'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
  const carouselImages = [
    '/gallery-images/image-12.jpg',
    '/gallery-images/image-22.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 10000); // Changed to 4 seconds for better timing
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 1.2,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={carouselImages[currentIndex]}
            alt={`Carousel image ${currentIndex + 1}`}
            fill={true}
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      
      {/* Content overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider">
          Our Gallery
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center px-4">
          Explore our collection of stunning moments captured in time
        </p>
      </motion.div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;