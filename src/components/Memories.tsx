import React from 'react';
import { motion } from 'motion/react';

interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

// 5 Placeholder images clearly defined for easy replacement by the user
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/ebgka25i/image/upload/v1786049442/IMG_7531_1_sosrza.jpg',
    alt: 'Mili & Agus - Momento 1',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/ebgka25i/image/upload/v1786049441/IMG_7532_1_vvgbz4.jpg',
    alt: 'Mili & Agus - Momento 2',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/ebgka25i/image/upload/v1786049442/IMG_7530_1_dz3w68.jpg',
    alt: 'Mili & Agus - Momento 3',
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/ebgka25i/image/upload/v1786049441/PHOTO-2026-08-06-17-44-09_flq8np.jpg',
    alt: 'Mili & Agus - Momento 4',
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/ebgka25i/image/upload/v1786049441/IMG_7536_1_esl1m7.jpg',
    alt: 'Mili & Agus - Momento 5',
  },
];

export const Memories: React.FC = () => {
  // Duplicating the 5 images twice ensures a seamless 100% infinite loop
  const displayImages = [...galleryImages, ...galleryImages];

  return (
    <section
      id="recuerdos"
      className="py-28 sm:py-36 bg-[#FAF7F2] bg-grain select-none overflow-hidden border-y border-[#E8E2D8]/50"
    >
      {/* Editorial Section Header */}
      <div className="max-w-2xl mx-auto px-6 text-center space-y-3 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium block">
            HISTORIA DE AMOR
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
            Nuestros Recuerdos
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-sans text-sm sm:text-base text-[#6E645A] font-light leading-relaxed max-w-lg mx-auto"
        >
          Algunos momentos que nos trajeron hasta acá.
        </motion.p>
      </div>

      {/* Infinite Seamless Horizontal Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Fade Edges for Editorial Polish */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-5 sm:gap-7 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 35,
            repeat: Infinity,
          }}
        >
          {displayImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="flex-shrink-0 w-[260px] sm:w-[380px] h-[340px] sm:h-[460px] rounded-2xl overflow-hidden border border-[#E8E2D8] bg-[#FAF7F2] shadow-[0_8px_25px_rgba(42,34,30,0.03)]"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
