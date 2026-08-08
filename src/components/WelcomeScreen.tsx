import React from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onOpen: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] bg-grain px-6 py-12 text-center select-none overflow-hidden"
    >
      {/* Centered Editorial Welcome Layout */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center my-auto relative z-10 space-y-10 sm:space-y-12">
        
        {/* 1. Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#2A221E] tracking-tight leading-tight">
            Mili &amp; Agustín
          </h1>
        </motion.div>

        {/* 2. Wedding Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <p className="font-sans text-base sm:text-lg text-[#2A221E] font-normal tracking-wide">
            26 de septiembre de 2026
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#9C9286] uppercase tracking-[0.35em] font-medium">
            Villa Nougués · Tucumán
          </p>
        </motion.div>

        {/* 3. Open Invitation Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xs mx-auto pt-4 sm:pt-6"
        >
          <button
            onClick={onOpen}
            className="group relative w-full overflow-hidden rounded-full bg-[#2A221E] px-8 py-4 sm:py-5 text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 shadow-[0_12px_32px_rgba(42,34,30,0.08)] hover:shadow-[0_16px_40px_rgba(42,34,30,0.15)] hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-500 focus:outline-none cursor-pointer"
          >
            <span className="relative z-10 text-xs sm:text-sm font-sans uppercase tracking-[0.3em] font-medium group-hover:tracking-[0.35em] transition-all duration-300">
              ABRIR INVITACIÓN
            </span>
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};

