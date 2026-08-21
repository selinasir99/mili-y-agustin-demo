import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { Timeline } from './components/Timeline';
import { DressCode } from './components/DressCode';
import { Playlist } from './components/Playlist';
import { Gifts } from './components/Gifts';
import { Photos } from './components/Photos';
import { Accommodations } from './components/Accommodations';
import { AccommodationsPage } from './components/AccommodationsPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Memories } from './components/Memories';
import { RsvpForm } from './components/RsvpForm';
import { FooterHero } from './components/FooterHero';
import { SectionTransitionBlock } from './components/SectionTransitionBlock';
import { WeddingDetails } from './types';
import { audioEngine } from './utils/audio';

export default function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [currentView, setCurrentView] = useState<'main' | 'accommodations' | 'admin'>('main');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Real Wedding Metadata: Mili & Agus
  const wedding: WeddingDetails = {
    couple: {
      bride: 'Mili',
      groom: 'Agus',
    },
    date: '2026-09-26T16:00:00',
    formattedDate: '26 de septiembre de 2026',
    time: '16:00 hs',
    venue: {
      name: 'Villa Nougués',
      location: 'Tucumán',
      city: 'Tucumán, Argentina',
    },
  };

  const handleOpenInvitation = () => {
    // 1. Start synthesized romantic audio
    audioEngine.start();
    setIsPlaying(true);
    setIsMuted(false);

    // 2. Open invitation view
    setIsOpened(true);
    sessionStorage.setItem('invitation_opened', 'true');
  };

  const handleOpenAccommodations = () => {
    setCurrentView('accommodations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromAccommodations = () => {
    setCurrentView('main');
    setTimeout(() => {
      const element = document.getElementById('hospedaje');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A221E] font-sans relative selection:bg-[#E8E2D8] selection:text-[#2A221E]">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <WelcomeScreen
            key="welcome-screen"
            onOpen={handleOpenInvitation}
            onOpenAdmin={() => {
              setIsOpened(true);
              handleOpenAdmin();
            }}
          />
        ) : currentView === 'admin' ? (
          <AdminDashboard
            key="admin-dashboard"
            onBackToMain={handleBackToMain}
          />
        ) : currentView === 'accommodations' ? (
          <AccommodationsPage
            key="accommodations-page"
            onBack={handleBackFromAccommodations}
          />
        ) : (
          <motion.div
            key="main-invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            {/* Sticky Navigation Bar */}
            <Navigation
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onOpenAdmin={handleOpenAdmin}
            />

            {/* Section 1: Hero */}
            <Hero />

            {/* Section 2: Countdown */}
            <Countdown targetDate={wedding.date} />

            {/* Editorial Transition Block 1: Olive Section Transition with Single Fine Line */}
            <SectionTransitionBlock variant="olive-line" />

            {/* Section 3: Confirmación de asistencia (RSVP) */}
            <RsvpForm />

            {/* Section 4: Dónde (Ceremonia y Fiesta) */}
            <Timeline />

            {/* Editorial Transition Block 2: Olive Monogram M & A */}
            <SectionTransitionBlock variant="olive-monogram" />

            {/* Section 5: Regalos (Datos bancarios y Lista de regalos) */}
            <Gifts />

            {/* Section 6: Código de vestimenta (Formal Elegante) */}
            <DressCode />

            {/* Section 7: Playlist */}
            <Playlist />

            {/* Section 8: Fotos */}
            <Photos />

            {/* Section 9: Hospedaje (Accommodations) */}
            <Accommodations onOpenAccommodations={handleOpenAccommodations} />

            {/* Section 10: Nuestros Recuerdos (Memories Carousel) */}
            <Memories />

            {/* Editorial Transition Block 3: Olive Section Transition */}
            <SectionTransitionBlock variant="olive-line" />

            {/* Section 11: Footer Hero (Mensaje final) */}
            <FooterHero wedding={wedding} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
