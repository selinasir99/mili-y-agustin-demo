import React from 'react';
import { motion } from 'motion/react';

interface SectionTransitionBlockProps {
  variant?: 'olive-monogram' | 'olive-line' | 'clean';
  className?: string;
}

export const SectionTransitionBlock: React.FC<SectionTransitionBlockProps> = ({
  variant = 'olive-line',
  className = '',
}) => {
  return (
    <div
      className={`w-full h-20 sm:h-28 bg-[#656D4A] bg-grain border-y border-[#545B3E] flex items-center justify-center relative overflow-hidden select-none ${className}`}
    >
      {/* Background ultra-subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5A6241] via-[#656D4A] to-[#5A6241] opacity-90" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-md px-6 text-center">
        {variant === 'olive-monogram' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <span className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#FAF7F2] font-light uppercase opacity-95">
              M &amp; A
            </span>
          </motion.div>
        ) : variant === 'olive-line' ? (
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            {/* Single continuous ultra-fine ivory line */}
            <div className="h-[0.5px] w-36 sm:w-60 bg-[#FAF7F2]/60" />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

