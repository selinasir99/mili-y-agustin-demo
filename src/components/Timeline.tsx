import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, MessageCircle, Bus } from 'lucide-react';

export const Timeline: React.FC = () => {
  const [transportModalOpen, setTransportModalOpen] = useState(false);
  const mapQuery = 'Iglesia+de+Villa+Nougués+Tucuman';

  const ceremonyIcon = (
    /* Bride & Groom icon: hands slowly reach towards each other to hold hands over 5s */
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
        {/* Groom head & shoulders (Left) */}
        <circle cx="9" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 25v-7a4 4 0 014-4h2" />
        {/* Suit Lapel Detail */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l2 4-2 2" />

        {/* Bride head & gown silhouette (Right) */}
        <circle cx="23" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M28 25l-2-7a4 4 0 00-4-4h-2" />
        {/* Veil / Hair detail */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M24.5 9.5c1.5 2 1.5 5 1 8" />

        {/* Groom's arm & hand reaching right */}
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          whileInView={{
            d: [
              "M10 18c2 1 2 3 2 3",
              "M10 18c3 1 4.5 1 5.5 0",
              "M10 18c3 1 4.5 1 5.5 0",
              "M10 18c2 1 2 3 2 3",
            ],
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />

        {/* Bride's arm & hand reaching left */}
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          whileInView={{
            d: [
              "M22 18c-2 1-2 3-2 3",
              "M22 18c-3 1-4.5 1-5.5 0",
              "M22 18c-3 1-4.5 1-5.5 0",
              "M22 18c-2 1-2 3-2 3",
            ],
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />

        {/* Heart sparkling gently between them when hands join */}
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 13.2a1.2 1.2 0 00-2 0 1.2 1.2 0 000 1.6l2 2 2-2a1.2 1.2 0 000-1.6 1.2 1.2 0 00-2 0z"
          whileInView={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.6, 0.8, 1.1, 1, 0.6],
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );

  const fiestaIcon = (
    /* Disco Ball with 3D Y-axis rotation + subtle sparkles over 5 seconds */
    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
      {/* Subtle sparkles flickering around */}
      <motion.svg
        whileInView={{ opacity: [0.2, 1, 0.3, 1, 0.2] }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 5, ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full text-[#2A221E] pointer-events-none"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 6l1 1M5 5l-1 1M27 7l1 1M28 6l-1 1M5 25l1 1M6 24l-1 1M26 26l1 1M27 25l-1 1" />
      </motion.svg>

      {/* 3D Rotating Sphere Ball */}
      <div style={{ perspective: '400px' }} className="w-full h-full flex items-center justify-center">
        <motion.div
          whileInView={{ rotateY: [0, 360] }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full flex items-center justify-center"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
            {/* Hanging Wire */}
            <path strokeLinecap="round" d="M16 2v4" />
            {/* Ball Outer Circle */}
            <circle cx="16" cy="18" r="10" strokeLinecap="round" strokeLinejoin="round" />
            {/* Latitudinal Mirror Lines */}
            <path strokeLinecap="round" d="M6.5 14h19M6.5 22h19M8.5 11h15M8.5 25h15" />
            {/* Curved Longitudinal Ellipses */}
            <path strokeLinecap="round" d="M16 8c-3.5 3-3.5 17 0 20M16 8c3.5 3 3.5 17 0 20" />
            <path strokeLinecap="round" d="M16 8c-7 4-7 16 0 20M16 8c7 4 7 16 0 20" />
          </svg>
        </motion.div>
      </div>
    </div>
  );

  return (
    <section id="programa" className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain select-none">
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium">
            ITINERARIO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E]">
            Nuestro Gran Día
          </h2>
        </motion.div>

        {/* Single Integrated Horizontal Card for Ceremonia & Fiesta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-14 border border-[#E8E2D8] flex flex-col items-center text-center space-y-8 sm:space-y-10 shadow-[0_8px_30px_rgba(42,34,30,0.03)] transition-all duration-300 hover:border-[#656D4A]/40 max-w-3xl mx-auto w-full"
        >
          {/* Top: Paired Ceremony and Fiesta Icons side-by-side */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Ceremony Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center shadow-sm">
              {ceremonyIcon}
            </div>

            {/* Fiesta Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center shadow-sm">
              {fiestaIcon}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-5 w-full flex flex-col items-center max-w-xl">
            {/* Main Title */}
            <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#2A221E] tracking-wider sm:tracking-tight">
              CEREMONIA &amp; FIESTA
            </h3>

            {/* Venue & Location */}
            <div className="space-y-1.5 font-sans">
              <p className="font-serif text-2xl sm:text-3xl text-[#2A221E] font-normal tracking-wide">
                Villa Nougués
              </p>
              <p className="text-[#6E645A] text-xs sm:text-sm font-light tracking-wide">
                Iglesia de Villa Nougués · Villa Nougués, Tucumán
              </p>
            </div>

            {/* Single Time Badge: 16:00 hs */}
            <div className="pt-1">
              <div className="inline-block px-5 py-2 rounded-full bg-[#FAF7F2] border border-[#656D4A]/30 shadow-xs">
                <span className="font-sans text-xs sm:text-sm font-semibold text-[#656D4A] tracking-widest">
                  16:00 hs
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: CÓMO LLEGAR and CONTRATÁ TU TRANSPORTE PRIVADO */}
          <div className="w-full pt-2 sm:pt-4 max-w-xl space-y-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:py-4.5 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium shadow-[0_8px_20px_rgba(42,34,30,0.08)] hover:shadow-[0_12px_28px_rgba(42,34,30,0.14)] cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#656D4A]" />
              <span>CÓMO LLEGAR</span>
            </a>

            <button
              type="button"
              onClick={() => setTransportModalOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:py-4.5 rounded-full bg-[#FAF7F2] text-[#2A221E] border border-[#E8E2D8] hover:border-[#656D4A]/50 hover:bg-[#FFFFFF] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-medium shadow-sm hover:shadow-md cursor-pointer"
            >
              <Bus className="w-4 h-4 text-[#656D4A]" />
              <span>Contratá tu transporte privado</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal: Transporte para llegar a Villa Nougués */}
      <AnimatePresence>
        {transportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2A221E]/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-[#FFFFFF] rounded-2xl p-8 sm:p-10 border border-[#E8E2D8] shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setTransportModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#9C9286] hover:text-[#2A221E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 text-center">
                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-3 border-b border-[#E8E2D8] pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center">
                    <Bus className="w-4 h-4 text-[#2A221E] stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2A221E] text-center leading-tight">
                    Transporte para llegar<br />a Villa Nougués
                  </h3>
                </div>

                {/* Message Body */}
                <div className="space-y-3 font-sans text-[#6E645A] leading-relaxed text-center">
                  <p className="font-medium text-[#2A221E] text-base sm:text-lg text-center leading-snug">
                    ¿Necesitás transporte para llegar<br />a Villa Nougués?
                  </p>
                  <p className="text-sm text-[#6E645A] max-w-sm mx-auto text-center">
                    Te dejamos este contacto de transporte privado para que puedas consultar y coordinar tu traslado.
                  </p>
                </div>

                {/* Contact Card & WhatsApp Action */}
                <div className="pt-2 space-y-4 text-center">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-1 text-center">
                    <p className="text-xs uppercase tracking-wider text-[#9C9286] font-medium text-center">CONTACTO DIRECTO</p>
                    <p className="font-mono text-base font-semibold text-[#2A221E] tracking-wider text-center">+54 9 381 554-0950</p>
                  </div>

                  <a
                    href="https://wa.me/5493815540950?text=Hola!%20Quería%20consultar%20por%20el%20transporte%20para%20el%20casamiento%20de%20Mili%20y%20Agus"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-medium shadow-[0_8px_20px_rgba(42,34,30,0.08)] hover:shadow-[0_12px_28px_rgba(42,34,30,0.14)] cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-[#656D4A]" />
                    <span>Contactar por WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
