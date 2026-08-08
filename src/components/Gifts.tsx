import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Copy, Check, X, Gift, ExternalLink } from 'lucide-react';
import { BankDetails } from '../types';

export const Gifts: React.FC = () => {
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [registryModalOpen, setRegistryModalOpen] = useState(false);
  const [copiedCbu, setCopiedCbu] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);

  const bankData: BankDetails = {
    bankName: 'Banco BBVA',
    accountType: 'Caja de Ahorro',
    accountHolder: 'Milagro Campero Cossio',
    cbu: '0170070140000081670727',
    alias: 'choza.luz.vocecilla',
  };

  const copyToClipboard = (text: string, type: 'cbu' | 'alias') => {
    navigator.clipboard.writeText(text);
    if (type === 'cbu') {
      setCopiedCbu(true);
      setTimeout(() => setCopiedCbu(false), 2500);
    } else {
      setCopiedAlias(true);
      setTimeout(() => setCopiedAlias(false), 2500);
    }
  };

  return (
    <section
      id="regalos"
      className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain select-none text-center border-y border-[#E8E2D8]/50"
    >
      <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
        {/* Monochromatic Fine Outline Gift Icon (~30% larger badge with subtle olive ring, 5s lid opening animation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
            {/* Box Base Container */}
            <rect x="6" y="15" width="20" height="13" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Vertical Ribbon */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v13" />

            {/* Lid & Bow: Smoothly lifts up 6px, stays open a moment, and closes back over 5s */}
            <motion.g
              whileInView={{ y: [0, -6, -6, 0] }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 5, ease: 'easeInOut' }}
            >
              {/* Lid Box */}
              <rect x="4" y="10" width="24" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" />
              {/* Ribbon Bow on Lid */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V6a3 3 0 00-6-2.5c-2 0-2.5 1.5-2.5 2.5 0 2 2.5 4 8.5 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10V6a3 3 0 016-2.5c2 0 2.5 1.5 2.5 2.5 0 2-2.5 4-8.5 4z" />
            </motion.g>
          </svg>
        </motion.div>

        {/* Single Editorial Serif Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
            Regalos
          </h2>
        </motion.div>

        {/* Clean Message Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="font-serif text-xl sm:text-2xl text-[#2A221E] font-light leading-relaxed">
            Nuestro mejor regalo es compartir este momento con ustedes.
          </p>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {/* Button 1: DATOS BANCARIOS */}
          <button
            onClick={() => setBankModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 shadow-[0_10px_25px_rgba(42,34,30,0.08)] hover:shadow-[0_14px_32px_rgba(42,34,30,0.15)] hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium cursor-pointer"
          >
            <span>DATOS BANCARIOS</span>
          </button>

          {/* Button 2: LISTA DE REGALOS */}
          <button
            onClick={() => setRegistryModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 shadow-[0_10px_25px_rgba(42,34,30,0.08)] hover:shadow-[0_14px_32px_rgba(42,34,30,0.15)] hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium cursor-pointer"
          >
            <span>LISTA DE REGALOS</span>
          </button>
        </motion.div>
      </div>

      {/* Modal 1: Bank Details */}
      <AnimatePresence>
        {bankModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2A221E]/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#FFFFFF] rounded-2xl p-8 sm:p-10 border border-[#E8E2D8] shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setBankModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#9C9286] hover:text-[#2A221E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#E8E2D8] pb-4">
                  <CreditCard className="w-5 h-5 text-[#2A221E] stroke-[1.5]" />
                  <h3 className="font-serif text-2xl font-light text-[#2A221E]">
                    Datos Bancarios
                  </h3>
                </div>

                <div className="space-y-4 text-sm font-sans">
                  {/* Titular Box */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-1">
                    <p className="text-xs uppercase tracking-wider text-[#9C9286] font-medium">Titular</p>
                    <p className="font-serif text-lg font-light text-[#2A221E]">{bankData.accountHolder}</p>
                  </div>

                  {/* Alias Box */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#9C9286] font-medium">Alias</p>
                      <p className="font-mono text-base font-semibold text-[#2A221E] tracking-wider">{bankData.alias}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankData.alias, 'alias')}
                      className="px-4 py-2.5 rounded-full bg-[#2A221E] text-[#FAF7F2] hover:bg-[#3D322C] transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs font-medium tracking-wider uppercase shadow-sm"
                    >
                      {copiedAlias ? <Check className="w-3.5 h-3.5 text-[#656D4A]" /> : <Copy className="w-3.5 h-3.5 stroke-[1.5]" />}
                      <span>{copiedAlias ? '¡Alias copiado!' : 'Copiar Alias'}</span>
                    </button>
                  </div>

                  {/* CBU Box */}
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#9C9286] font-medium">CBU</p>
                      <p className="font-mono text-sm sm:text-base font-semibold text-[#2A221E] tracking-wider select-all">{bankData.cbu}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankData.cbu, 'cbu')}
                      className="px-4 py-2.5 rounded-full bg-[#2A221E] text-[#FAF7F2] hover:bg-[#3D322C] transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs font-medium tracking-wider uppercase shadow-sm shrink-0"
                    >
                      {copiedCbu ? <Check className="w-3.5 h-3.5 text-[#656D4A]" /> : <Copy className="w-3.5 h-3.5 stroke-[1.5]" />}
                      <span>{copiedCbu ? '¡CBU copiado!' : 'Copiar CBU'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Lista de Regalos */}
      <AnimatePresence>
        {registryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2A221E]/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#FFFFFF] rounded-2xl p-8 sm:p-10 border border-[#E8E2D8] shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setRegistryModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-[#9C9286] hover:text-[#2A221E] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-[#E8E2D8] pb-4">
                  <Gift className="w-5 h-5 text-[#2A221E] stroke-[1.5]" />
                  <h3 className="font-serif text-2xl font-light text-[#2A221E]">
                    Lista de Regalos
                  </h3>
                </div>

                <div className="space-y-4 text-sm font-sans text-[#6E645A]">
                  <p className="leading-relaxed">
                    Podés consultar nuestra lista de novios o hacer tu obsequio en el local asignado:
                  </p>

                  <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8] space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#9C9286] font-medium">Código de Novios</p>
                      <p className="font-serif text-xl font-medium text-[#2A221E]">MILI-AGUS-2026</p>
                    </div>
                    <p className="text-xs text-[#9C9286]">
                      Mencioná este código en el local o al ingresar en la tienda online.
                    </p>
                  </div>

                  <a
                    href="https://www.falabella.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2A221E] text-[#FAF7F2] hover:bg-[#4A3F39] transition-all text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    <span>Ir a la Tienda Online</span>
                    <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
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
