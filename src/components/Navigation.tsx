import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX, Music } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface NavigationProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isMuted,
  setIsMuted,
  isPlaying,
  setIsPlaying,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    setIsPlaying(!muted);
  };

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Cuenta Regresiva', href: '#cuenta-regresiva' },
    { name: 'Programa', href: '#programa' },
    { name: 'Confirmar', href: '#rsvp' },
    { name: 'Dress Code', href: '#dress-code' },
    { name: 'Playlist', href: '#playlist' },
    { name: 'Regalos', href: '#regalos' },
    { name: 'Fotos', href: '#fotos' },
    { name: 'Hospedaje', href: '#hospedaje' },
    { name: 'Recuerdos', href: '#recuerdos' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D8] py-4 shadow-[0_4px_20px_rgba(42,34,30,0.03)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Monogram Link */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-serif text-lg tracking-[0.3em] text-[#2A221E] font-medium hover:opacity-75 transition-opacity"
          >
            M & A
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-sans uppercase tracking-[0.2em] text-[#6E645A] hover:text-[#656D4A] transition-colors font-medium relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#656D4A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Controls: Audio Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleMute}
              className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[#2A221E] hover:border-[#656D4A]/50 transition-all shadow-sm cursor-pointer"
              title={isMuted ? 'Activar música' : 'Silenciar música'}
              aria-label="Audio Control"
            >
              <div className="flex items-center gap-0.5 h-3 w-3.5 justify-center">
                {isPlaying && !isMuted ? (
                  <>
                    <span className="w-0.5 h-full bg-[#656D4A] rounded-full animate-bounce" />
                    <span className="w-0.5 h-2/3 bg-[#656D4A] rounded-full animate-bounce delay-100" />
                    <span className="w-0.5 h-full bg-[#656D4A] rounded-full animate-bounce delay-200" />
                  </>
                ) : (
                  <Music className="w-3.5 h-3.5 text-[#656D4A]" />
                )}
              </div>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#6E645A] font-medium hidden sm:inline">
                {isMuted ? 'Música Off' : 'Música On'}
              </span>
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-[#9C9286]" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#656D4A]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[#2A221E] focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#FAF7F2] bg-grain pt-28 px-8 pb-12 flex flex-col justify-between lg:hidden"
          >
            <div className="space-y-6 text-center my-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="py-1">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-serif text-2xl text-[#2A221E] hover:text-[#9C9286] transition-colors"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center pt-8 border-t border-[#E8E2D8]">
              <p className="font-serif text-lg text-[#2A221E]">Mili & Agustín</p>
              <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#9C9286] mt-1">
                26 de Septiembre de 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
