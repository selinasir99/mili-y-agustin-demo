import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  time: string;
  venueName: string;
  address: string;
  mapQuery: string;
  icon: React.ReactNode;
}

export const Timeline: React.FC = () => {
  const events: EventItem[] = [
    {
      id: 'ceremonia',
      title: 'CEREMONIA',
      time: '15:45 hs',
      venueName: 'Iglesia de Villa Nougués',
      address: 'Villa Nougués, Tucumán',
      mapQuery: 'Iglesia+de+Villa+Nougués+Tucuman',
      icon: (
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
      ),
    },
    {
      id: 'fiesta',
      title: 'FIESTA',
      time: '17:00 hs',
      venueName: 'Villa Nougués',
      address: 'Villa Nougués, Tucumán',
      mapQuery: 'Villa+Nougués+Tucuman',
      icon: (
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
      ),
    },
  ];

  return (
    <section id="programa" className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain select-none">
      <div className="max-w-4xl mx-auto space-y-16 sm:space-y-20">
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

        {/* Minimal Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-3xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-[#FFFFFF] rounded-2xl p-8 sm:p-10 border border-[#E8E2D8] flex flex-col items-center justify-between text-center space-y-8 shadow-[0_8px_30px_rgba(42,34,30,0.03)] transition-all duration-300 hover:border-[#656D4A]/40"
            >
              {/* Event Header & Details */}
              <div className="space-y-6 w-full flex flex-col items-center">
                {/* 30% Larger Icon Badge Container with subtle olive ring */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center shadow-sm">
                  {event.icon}
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#2A221E] tracking-wider">
                  {event.title}
                </h3>

                {/* Venue & Location */}
                <div className="space-y-1 text-sm font-sans">
                  <p className="text-[#2A221E] font-medium">
                    {event.venueName}
                  </p>
                  <p className="text-[#9C9286] text-xs font-light">
                    {event.address}
                  </p>
                </div>

                {/* Time Badge with soft olive accent */}
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#656D4A]/30">
                  <span className="font-sans text-xs font-semibold text-[#656D4A] tracking-widest">
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Action Button: CÓMO LLEGAR */}
              <div className="w-full pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${event.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#3D322C] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium shadow-[0_8px_20px_rgba(42,34,30,0.08)] hover:shadow-[0_12px_28px_rgba(42,34,30,0.14)]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#656D4A]" />
                  <span>CÓMO LLEGAR</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
