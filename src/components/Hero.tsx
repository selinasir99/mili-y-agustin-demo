import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

const HERO_IMAGE_URL = 'https://res.cloudinary.com/ebgka25i/image/upload/v1786048925/IMG_7533_avstgw.jpg';

export const Hero: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('cuenta-regresiva');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden select-none bg-[#1A1614]"
    >
      {/* 1. Full-bleed background image occupying 100vh with custom manual object positioning */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src={HERO_IMAGE_URL}
          alt="Mili y Agustín"
          className="hero-photo-img grayscale contrast-[1.05] brightness-[0.92]"
        />
        {/* Soft dark gradient overlay for optimal text contrast without covering faces */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 via-40% to-black/85 pointer-events-none" />
      </div>

      {/* 2. Corner Botanical Accents */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 opacity-30 pointer-events-none text-[#FAF7F2] z-10">
        <svg className="w-10 h-10 sm:w-16 sm:h-16 stroke-[1]" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <path d="M5 5c10 5 20 15 25 30M10 12c-3 1-5 4-4 7 3-1 5-4 4-7zM18 20c-3 1-5 4-4 7 3-1 5-4 4-7zM25 28c-3 1-5 4-4 7 3-1 5-4 4-7z" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-30 pointer-events-none text-[#FAF7F2] scale-x-[-1] z-10">
        <svg className="w-10 h-10 sm:w-16 sm:h-16 stroke-[1]" viewBox="0 0 40 40" fill="none" stroke="currentColor">
          <path d="M5 5c10 5 20 15 25 30M10 12c-3 1-5 4-4 7 3-1 5-4 4-7zM18 20c-3 1-5 4-4 7 3-1 5-4 4-7zM25 28c-3 1-5 4-4 7 3-1 5-4 4-7z" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Text Overlay: Positioned in lower section so faces remain completely unobstructed */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-12 pb-6 sm:pb-10 pointer-events-none w-full max-w-full">
        
        {/* Empty top zone guaranteeing faces remain unobstructed in upper screen third */}
        <div className="h-1/3" aria-hidden="true" />

        {/* Text Block positioned over chest and arms */}
        <div className="mt-auto mb-4 sm:mb-8 flex flex-col items-center justify-center space-y-2.5 sm:space-y-4 max-w-3xl mx-auto pointer-events-auto">
          {/* Couple Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#FAF7F2] tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Mili <span className="font-serif italic text-[#D8D2C2] font-normal">&amp;</span> Agustín
            </h1>
          </motion.div>

          {/* Subtitle: Nos casamos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="h-[0.5px] w-8 sm:w-12 bg-[#FAF7F2]/60" />
            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#E8E2D8] font-light tracking-wide drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              Nos casamos
            </p>
            <div className="h-[0.5px] w-8 sm:w-12 bg-[#FAF7F2]/60" />
          </motion.div>
        </div>

        {/* Scroll CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto pt-2"
        >
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
          >
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#E8E2D8]/90 group-hover:text-[#FAF7F2] transition-colors font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Deslizá para descubrir
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="p-1 text-[#E8E2D8]/90 group-hover:text-[#FAF7F2] transition-colors"
            >
              <ArrowDown className="w-4 h-4 stroke-[1.5]" />
            </motion.div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
