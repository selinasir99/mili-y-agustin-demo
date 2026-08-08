import React from 'react';
import { motion } from 'motion/react';
import { Music } from 'lucide-react';

export const Playlist: React.FC = () => {
  const spotifyUrl =
    'https://open.spotify.com/playlist/6KaW1a0zauNYmnSF6dMQlK?si=9f59a9f2bea74d6e&pt=dfec41c58c276b7b5aaa568a1519d346';

  return (
    <section
      id="playlist"
      className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain select-none text-center"
    >
      <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
        {/* Monochromatic Fine Outline Musical Note Icon (~30% larger icon badge with subtle olive ring) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          {/* Gentle musical sway animation over 5 seconds */}
          <motion.div
            style={{ transformOrigin: 'bottom center' }}
            whileInView={{
              rotate: [0, -10, 10, -5, 0],
              y: [0, -2, 0, -1, 0],
            }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 5, ease: 'easeInOut' }}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
              {/* Beamed Eighth Musical Notes */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V9l12-3v13" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9l12-3" />
              <circle cx="9" cy="22" r="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="21" cy="19" r="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* 1. Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium">
            PLAYLIST DE LA FIESTA
          </span>
        </motion.div>

        {/* 2. Editorial Serif Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] leading-tight">
            ¿Qué tema no puede faltar en nuestra noche?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6E645A] font-light leading-relaxed max-w-xl mx-auto">
            Ayudanos a crear la banda sonora de este día tan especial agregando tus canciones favoritas a nuestra playlist colaborativa de Spotify.
          </p>
        </motion.div>

        {/* 3. Main Dark Brown Spotify CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="pt-2"
        >
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-4.5 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 shadow-[0_10px_25px_rgba(42,34,30,0.08)] hover:shadow-[0_14px_32px_rgba(42,34,30,0.15)] hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium cursor-pointer"
          >
            <Music className="w-4 h-4 text-[#656D4A]" />
            <span>ABRIR PLAYLIST</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
