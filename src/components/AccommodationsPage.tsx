import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';

interface AccommodationItem {
  id: string;
  name: string;
  address: string;
  distance?: string;
  phone?: string;
  mapUrl: string;
}

interface AccommodationsPageProps {
  onBack: () => void;
}

export const AccommodationsPage: React.FC<AccommodationsPageProps> = ({ onBack }) => {
  const hotels: AccommodationItem[] = [
    {
      id: 'hostal-villa-nougues',
      name: 'Hostal Villa Nougués',
      address: 'RP338, Villa Nougués, Tucumán',
      distance: 'A 2 minutos del evento',
      phone: '+543814921020',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hostal+Villa+Nougu%C3%A9s+Tucuman',
    },
    {
      id: 'howard-johnson-yb',
      name: 'Howard Johnson Yerba Buena',
      address: 'Av. Aconquija 1130, Yerba Buena, Tucumán',
      distance: 'A 20 minutos del evento',
      phone: '+543814253000',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Howard+Johnson+Yerba+Buena+Tucuman',
    },
    {
      id: 'sol-san-javier',
      name: 'Hotel Sol San Javier',
      address: 'Ruta 340 Km 19, San Javier, Tucumán',
      distance: 'A 15 minutos del evento',
      phone: '+543814929000',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Sol+San+Javier+Tucuman',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen w-full bg-[#FAF7F2] bg-grain text-[#2A221E] px-6 py-12 sm:py-16 select-none"
    >
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Back Button Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#FAF7F2] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-medium shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#656D4A] stroke-[1.5]" />
            <span>Volver</span>
          </button>

          <span className="font-serif text-sm italic text-[#656D4A]">
            Mili & Agustín
          </span>
        </div>

        {/* Single Page Title */}
        <div className="text-center pt-2 space-y-2">
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium block">
            VILLA NOUGUÉS Y ALREDEDORES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
            Hospedaje Recomendado
          </h1>
        </div>

        {/* Hotel Cards List */}
        <div className="grid grid-cols-1 gap-6 pt-2">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(42,34,30,0.03)] space-y-6 hover:border-[#656D4A]/40 transition-all duration-300"
            >
              {/* Info Block */}
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#2A221E]">
                  {hotel.name}
                </h2>
                <div className="space-y-1 text-xs sm:text-sm font-sans text-[#6E645A]">
                  <p className="font-medium text-[#2A221E]">{hotel.address}</p>
                  {hotel.distance && (
                    <p className="text-[#656D4A] font-medium">{hotel.distance}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={hotel.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#3D322C] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-medium shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#656D4A] stroke-[1.5]" />
                  <span>VER UBICACIÓN</span>
                </a>

                {hotel.phone && (
                  <a
                    href={`tel:${hotel.phone}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#FFFFFF] transition-all duration-300 text-xs font-sans uppercase tracking-[0.2em] font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 stroke-[1.5] text-[#656D4A]" />
                    <span>LLAMAR</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="pt-8 text-center border-t border-[#E8E2D8]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#FFFFFF] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#656D4A] stroke-[1.5]" />
            <span>Volver a la invitación</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
