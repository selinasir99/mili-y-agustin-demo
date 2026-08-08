import React from 'react';
import { motion } from 'motion/react';

export const DressCode: React.FC = () => {
  return (
    <section id="dress-code" className="py-28 sm:py-36 px-6 bg-[#F5F0E6] bg-grain border-y border-[#E8E2D8]/60 text-center select-none">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Monochromatic Fine Outline Hanger Icon ONLY (~30% larger icon badge with subtle olive ring) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          {/* Hanger subtle hanging sway/pendulum animation from top hook over 5s */}
          <motion.div
            style={{ transformOrigin: '16px 4px' }}
            whileInView={{
              rotate: [0, -6, 6, -3, 0],
            }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 5, ease: 'easeInOut' }}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
              {/* Top Curved Hook */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.5a3 3 0 013 3c0 1.8-1.2 3.2-2.5 3.5" />
              {/* Elegant Hanger Shoulders & Crossbar */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10L4 18.5a1.5 1.5 0 00.8 2.7h22.4a1.5 1.5 0 00.8-2.7L16 10z" />
              {/* Inner Notch / Bar line */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 21.2h19" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Label: CÓDIGO DE VESTIMENTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium">
            CÓDIGO DE VESTIMENTA
          </span>
        </motion.div>

        {/* Value: Formal Elegante in Editorial Serif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#2A221E] tracking-tight leading-none">
            Formal Elegante
          </h2>
        </motion.div>
      </div>
    </section>
  );
};
