import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Heart, Instagram } from 'lucide-react';
import { WeddingDetails } from '../types';

interface FooterHeroProps {
  wedding: WeddingDetails;
}

export const FooterHero: React.FC<FooterHeroProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* 1. Minimalist Editorial Farewell Section */}
      <section className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain text-center select-none border-t border-[#E8E2D8]/50">
        <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
          {/* Main Farewell Message in Editorial Serif Italic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-4"
          >
            <p className="font-serif italic text-xl sm:text-3xl font-light text-[#2A221E] leading-relaxed">
              Gracias por acompañarnos en uno de los días más importantes de nuestras vidas.
            </p>
            <p className="font-serif italic text-xl sm:text-3xl font-light text-[#2A221E] leading-relaxed">
              Los esperamos con muchísima ilusión.
            </p>
          </motion.div>

          {/* Couples' Signature in Main Serif with Olive Emblem */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="pt-4 space-y-4"
          >
            {/* Subtle Olive Heart Emblem */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#656D4A]/25" />
              <Heart className="w-4 h-4 text-[#656D4A] stroke-[1.2] opacity-85" />
              <span className="h-px w-8 bg-[#656D4A]/25" />
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
              Mili & Agustín
            </h3>
          </motion.div>
        </div>
      </section>

      {/* 2. Three-Column Editorial Dark Footer */}
      <footer className="py-16 sm:py-20 px-6 sm:px-12 bg-[#2F241F] text-[#FAF7F2] select-none relative border-t border-[#656D4A]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 text-center md:text-left items-start">
            
            {/* COLUMNA 1: Boda Info */}
            <div className="flex flex-col items-center md:items-start space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF7F2] tracking-tight">
                Mili & Agustín
              </h3>
              <p className="font-serif text-lg sm:text-xl font-light tracking-[0.2em] text-[#E8E2D8]">
                26 · 09 · 2026
              </p>
              <p className="font-sans text-xs sm:text-sm tracking-[0.25em] text-[#656D4A] font-medium uppercase">
                Villa Nougués · Tucumán
              </p>
            </div>

            {/* COLUMNA 2: Seguinos */}
            <div className="flex flex-col items-center md:items-start space-y-4 md:border-l md:border-[#656D4A]/25 md:pl-8 lg:pl-12">
              <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-[#656D4A] font-medium">
                SEGUINOS
              </h4>
              <div className="flex flex-col items-center md:items-start space-y-2.5">
                <a
                  href="https://instagram.com/milicamperocossio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-sans tracking-wide text-[#E8E2D8]/90 hover:text-[#FAF7F2] transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4 text-[#656D4A] stroke-[1.5]" />
                  <span>@milicamperocossio</span>
                </a>
                <a
                  href="https://instagram.com/agustinzavaleta1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-sans tracking-wide text-[#E8E2D8]/90 hover:text-[#FAF7F2] transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4 text-[#656D4A] stroke-[1.5]" />
                  <span>@agustinzavaleta1</span>
                </a>
              </div>
            </div>

            {/* COLUMNA 3: Hashtag & Volver Arriba */}
            <div className="flex flex-col items-center md:items-start space-y-4 md:border-l md:border-[#656D4A]/25 md:pl-8 lg:pl-12">
              <h4 className="font-sans text-xs uppercase tracking-[0.3em] text-[#656D4A] font-medium">
                NUESTRO HASHTAG
              </h4>
              <p className="font-sans text-sm tracking-[0.2em] text-[#E8E2D8]/90 font-light">
                #MiliYAgus2026
              </p>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#E8E2D8]/70 hover:text-[#FAF7F2] transition-colors duration-300 cursor-pointer group"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#656D4A] stroke-[1.5] group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>VOLVER ARRIBA</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* 3. Subtle Studio Signature Section */}
      <div className="w-full bg-[#FAF7F2] bg-grain py-8 px-6 text-center border-t border-[#E8E2D8] select-none">
        <div className="max-w-xl mx-auto flex items-center justify-center">
          <p className="font-sans text-[12px] sm:text-[13px] font-light text-[#6E645A]/70 tracking-wide">
            Diseñado con <span className="text-[#656D4A] opacity-80">♥</span> por{' '}
            <a
              href="https://www.instagram.com/suma_marketingstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#656D4A]/80 hover:text-[#2A221E] hover:underline underline-offset-2 transition-all font-medium"
            >
              @suma_marketingstudio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

