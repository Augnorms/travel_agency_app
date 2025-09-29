'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Banner from './gallery/banner';

const Gallery = () => {
  const images = [
    '/gallery-images/image-1.jpeg',
    '/gallery-images/image-2.jpeg',
    '/gallery-images/image-3.jpeg',
    '/gallery-images/image-4.jpeg',
    '/gallery-images/image-5.jpeg',
    '/gallery-images/image-8-l-scape.jpeg',
    '/gallery-images/image-9-b.jpg',
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="w-full h-64 relative cursor-pointer"
            layoutId={src}
            onClick={() => setSelectedImage(src)}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill={true}
              className="object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              layoutId={selectedImage}
              className="w-3/4 h-3/4 relative"
            >
              <Image
                src={selectedImage}
                alt="Selected image"
                fill={true}
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
