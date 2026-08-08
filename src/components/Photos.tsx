import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export const Photos: React.FC = () => {
  const albumUrl = 'https://photos.app.goo.gl/qoeoHYKUHo9eZnjk7';

  return (
    <section
      id="fotos"
      className="py-28 sm:py-36 px-6 bg-[#F5F0E6] bg-grain select-none text-center border-y border-[#E8E2D8]/60"
    >
      <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
        {/* Monochromatic Fine Outline Vintage Camera Icon (~30% larger icon badge with subtle olive ring) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          {/* Vintage Camera SVG with gentle lens flash shimmer effect over 5s */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
              {/* Camera Body */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 9.5h5l2-3h8l2 3h5a2.5 2.5 0 012.5 2.5v13a2.5 2.5 0 01-2.5 2.5H5A2.5 2.5 0 012.5 25v-13A2.5 2.5 0 015 9.5z" />
              {/* Outer Lens Circle */}
              <circle cx="16" cy="18.5" r="5.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Inner Lens Glass */}
              <circle cx="16" cy="18.5" r="3" strokeLinecap="round" strokeLinejoin="round" />
              {/* Vintage Rangefinder / Viewfinder Window */}
              <rect x="22" y="12.5" width="3" height="2" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Lens Flash Rays - Triggers subtle flash light shimmer over 5s */}
              <motion.g
                whileInView={{
                  opacity: [0, 1, 0.1, 0.8, 0],
                  scale: [0.6, 1.2, 0.8, 1.1, 0.6],
                }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 5, ease: 'easeInOut' }}
                style={{ transformOrigin: '16px 18.5px' }}
              >
                <line x1="16" y1="11" x2="16" y2="10" strokeLinecap="round" />
                <line x1="21.5" y1="13" x2="22.5" y2="12" strokeLinecap="round" />
                <line x1="23.5" y1="18.5" x2="24.5" y2="18.5" strokeLinecap="round" />
                <circle cx="17.5" cy="17" r="1.2" fill="currentColor" opacity="0.6" />
              </motion.g>
            </svg>
          </div>
        </motion.div>

        {/* Serif Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-2"
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium block">
            RECUERDOS COMPARTIDOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
            Fotos
          </h2>
        </motion.div>

        {/* Text Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#2A221E] font-light leading-relaxed">
            Queremos ver tus fotos.
          </p>
          <div className="font-sans text-sm sm:text-base text-[#6E645A] font-light leading-relaxed max-w-lg mx-auto space-y-2">
            <p>Nos encantaría que compartas los mejores momentos de este día con nosotros.</p>
            <p>Podés subir todas las fotos y videos del casamiento a nuestro álbum compartido.</p>
          </div>
        </motion.div>

        {/* Action Button: IR AL ÁLBUM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-2"
        >
          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 shadow-[0_10px_25px_rgba(42,34,30,0.08)] hover:shadow-[0_14px_32px_rgba(42,34,30,0.15)] hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium cursor-pointer"
          >
            <span>IR AL ÁLBUM</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[1.5] text-[#656D4A]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
