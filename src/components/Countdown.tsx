import React from 'react';
import { motion } from 'motion/react';

interface CountdownProps {
  targetDate: string; // '2026-09-26T17:00:00'
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <section id="cuenta-regresiva" className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F5F0E6] bg-grain border-y border-[#E8E2D8]/60 select-none">
      <div className="max-w-3xl mx-auto text-center space-y-10 sm:space-y-14">
        {/* Monochromatic Fine Outline Icon Container (~30% larger icon badge with subtle olive ring) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          {/* Hourglass Icon with Falling Sand Stream over 5 seconds */}
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
          >
            {/* Top & Bottom Plates */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h18M7 28h18" />

            {/* Glass Body Contour */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v5a7 7 0 003.5 6L16 17.5l4.5-2.5A7 7 0 0024 9V4M8 28v-5a7 7 0 013.5-6L16 14.5l4.5 2.5A7 7 0 0124 23v5" />

            {/* Upper Sand Chamber Level (diminishes over 5s) */}
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.15"
              whileInView={{
                d: [
                  "M9 6h14v2a5 5 0 01-2.5 4.3L16 15l-4.5-2.7A5 5 0 019 8V6z",
                  "M11 9h10v1a3 3 0 01-1.5 2.6L16 14.5l-3.5-1.9A3 3 0 0111 10V9z",
                  "M13 12h6v0.5L16 14l-3-1.5V12z",
                ],
              }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 5, ease: 'linear' }}
            />

            {/* Falling Sand Stream (dripping dots down the center over 5s) */}
            <motion.line
              x1="16"
              y1="15"
              x2="16"
              y2="25"
              strokeDasharray="2 3"
              strokeLinecap="round"
              whileInView={{
                strokeDashoffset: [0, -25],
                opacity: [0.3, 1, 1, 0.4],
              }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 5, ease: 'linear' }}
            />

            {/* Bottom Sand Chamber Mound (grows over 5s) */}
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.15"
              whileInView={{
                d: [
                  "M15 27.5h2L16 26.5z",
                  "M11 27.5h10a4 4 0 00-2-3L16 22.5l-3 2a4 4 0 00-2 3z",
                  "M9 27.5h14v-1a5 5 0 00-2.5-4.3L16 20l-4.5 2.2A5 5 0 009 26.5v1z",
                ],
              }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </svg>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium">
            FALTA CADA VEZ MENOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E]">
            Cuenta Regresiva
          </h2>
        </motion.div>

        {/* Minimal Editorial Horizontal Countdown Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="grid grid-cols-4 gap-2 sm:gap-8 max-w-2xl mx-auto items-center text-center my-6 sm:my-10"
        >
          {timeBlocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center justify-center">
              <span className="font-serif text-4xl sm:text-7xl font-light text-[#2A221E] leading-none mb-3 tracking-tight">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#6E645A] font-medium">
                {block.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Date & Location Footer Lines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-2 pt-2"
        >
          <p className="font-sans text-sm sm:text-base text-[#2A221E] font-normal tracking-wide">
            Sábado 26 de septiembre de 2026
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#9C9286] uppercase tracking-[0.3em] font-medium">
            Villa Nougués · Tucumán
          </p>
        </motion.div>
      </div>
    </section>
  );
};
