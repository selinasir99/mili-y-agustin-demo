import React from 'react';
import { motion } from 'motion/react';

interface AccommodationsProps {
  onOpenAccommodations: () => void;
}

export const Accommodations: React.FC<AccommodationsProps> = ({ onOpenAccommodations }) => {
  return (
    <section
      id="hospedaje"
      className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain select-none text-center border-y border-[#E8E2D8]/50"
    >
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Monochromatic Fine Outline Minimalist Hotel Icon (~30% larger badge with subtle olive ring, 5s sway animation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          <motion.div
            whileInView={{
              x: [0, 4, -4, 2, -2, 0],
            }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 5, ease: 'easeInOut' }}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
              {/* Ground line & Main Building Outline */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 28h24M7 28V8a2 2 0 012-2h14a2 2 0 012 2v20" />
              {/* Hotel Windows Grid */}
              <rect x="11" y="10" width="3" height="3" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18" y="10" width="3" height="3" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="11" y="15" width="3" height="3" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="18" y="15" width="3" height="3" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Entrance Door */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 28v-4a1 1 0 011-1h4a1 1 0 011 1v4" />
              {/* Hotel Canopy Bar */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 23h10" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Single Editorial Serif Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-2"
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium block">
            DÓNDE ALOJARSE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
            Hospedaje
          </h2>
        </motion.div>

        {/* Subtitle Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="font-sans text-sm sm:text-base text-[#6E645A] font-light leading-relaxed max-w-lg mx-auto">
            Si viajás para acompañarnos, acá vas a encontrar algunas opciones recomendadas.
          </p>
        </motion.div>

        {/* Action Button: VER HOSPEDAJES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="pt-2"
        >
          <button
            onClick={onOpenAccommodations}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 shadow-[0_10px_25px_rgba(42,34,30,0.08)] hover:shadow-[0_14px_32px_rgba(42,34,30,0.15)] hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium cursor-pointer"
          >
            <span>VER HOSPEDAJES</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
