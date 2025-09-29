

'use client';
import { useState,useEffect,useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Content = () => {
  const images = [
    '/gallery-images/image-1.jpeg',
    '/gallery-images/image-2.jpeg',
    '/gallery-images/image-3.jpeg',
    '/gallery-images/image-4.jpeg',
    '/gallery-images/image-5.jpeg',
    '/gallery-images/image-8-l-scape.jpeg',
    '/gallery-images/image-10.jpg',
    '/gallery-images/image-11.jpg',
    '/gallery-images/image-12.jpg',
    '/gallery-images/image-13.jpg',
    '/gallery-images/image-14.jpg',
    '/gallery-images/image-15.jpg',
    '/gallery-images/image-16.jpg',
    '/gallery-images/image-17.jpg',
    '/gallery-images/image-18.jpg',
    '/gallery-images/image-19.jpg',
    '/gallery-images/image-20.jpg',
    '/gallery-images/image-21-b.jpg',
    '/gallery-images/image-22.jpg',
    '/gallery-images/image-23.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  }, [selectedImage, images.length]);

  const handleNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  }, [selectedImage, images.length]);


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === 'Escape') setSelectedImage(null);
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  }, [selectedImage, handlePrevious, handleNext]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
       
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <div className="w-full h-64 relative">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs opacity-75">Click to view</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(20px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-black/80"
            />
            
            {/* Image Container */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`Gallery image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              
              {/* Navigation Controls */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-200"
                aria-label="Previous image"
              >
                &lt;
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-200"
                aria-label="Next image"
              >
                &gt;
              </button>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-colors duration-200"
                aria-label="Close"
              >
               X
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {selectedImage + 1} / {images.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Content;