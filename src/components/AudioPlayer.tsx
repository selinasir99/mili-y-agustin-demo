import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';
import { audioEngine } from '../utils/audio';

interface AudioPlayerProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isMuted,
  setIsMuted,
  isPlaying,
  setIsPlaying,
}) => {
  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    setIsPlaying(!muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 right-6 z-50 flex items-center gap-3"
    >
      <button
        onClick={handleToggleMute}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E8E2D8] text-[#2A221E] shadow-sm hover:border-[#9C9286] transition-all duration-300 focus:outline-none"
        title={isMuted ? 'Activar sonido de fondo' : 'Silenciar sonido de fondo'}
        aria-label="Alternar Audio"
      >
        {/* Animated Soundwave Bars when active and unmuted */}
        <div className="flex items-center gap-0.5 h-3.5 w-4 justify-center">
          {isPlaying && !isMuted ? (
            <>
              <motion.span
                animate={{ height: ['20%', '100%', '30%', '80%', '20%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="w-0.5 bg-[#2A221E] rounded-full"
              />
              <motion.span
                animate={{ height: ['60%', '30%', '90%', '40%', '60%'] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                className="w-0.5 bg-[#2A221E] rounded-full"
              />
              <motion.span
                animate={{ height: ['30%', '80%', '20%', '100%', '30%'] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="w-0.5 bg-[#2A221E] rounded-full"
              />
            </>
          ) : (
            <Music className="w-3.5 h-3.5 text-[#9C9286] group-hover:text-[#2A221E] transition-colors" />
          )}
        </div>

        <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#6E645A] group-hover:text-[#2A221E] font-medium transition-colors hidden sm:inline-block">
          {isMuted ? 'Música Desactivada' : 'Música Activada'}
        </span>

        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#9C9286] group-hover:text-[#2A221E] transition-colors" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#2A221E]" />
        )}
      </button>
    </motion.div>
  );
};
