import React from 'react';
import { motion } from 'motion/react';

interface EditorialDividerProps {
  className?: string;
  variant?: 'simple' | 'monogram';
}

export const EditorialDivider: React.FC<EditorialDividerProps> = ({
  className = '',
  variant = 'simple',
}) => {
  return (
    <div className={`w-full flex items-center justify-center py-6 sm:py-8 select-none ${className}`}>
      {variant === 'monogram' ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-lg px-6"
        >
          {/* Left Fine Soft Olive Line */}
          <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-[#656D4A]/35 to-[#656D4A]/50" />

          {/* Delicate Serif Monogram M & A */}
          <span className="font-serif text-xs sm:text-sm tracking-[0.28em] text-[#656D4A] font-light uppercase opacity-90 select-none px-1">
            M &amp; A
          </span>

          {/* Right Fine Soft Olive Line */}
          <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent via-[#656D4A]/35 to-[#656D4A]/50" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.9 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center w-full max-w-xs sm:max-w-md px-6"
        >
          {/* Simple Fine Soft Olive Line */}
          <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent via-[#656D4A]/35 to-transparent" />
        </motion.div>
      )}
    </div>
  );
};

