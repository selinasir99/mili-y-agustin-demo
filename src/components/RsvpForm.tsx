import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';

export const RsvpForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('');
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [dietary, setDietary] = useState<string>('Ninguno');
  const [comments, setComments] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Ref lock to completely prevent double-click / double-submission
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent concurrent / duplicate submit execution
    if (isSubmittingRef.current || loading) {
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Por favor, ingresá tu nombre y apellido.');
      return;
    }

    if (!attending) {
      setErrorMessage('Por favor, seleccioná si vas a asistir o no.');
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);
    setErrorMessage(null);

    const submissionDate = new Date().toLocaleString('es-AR', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    const uniqueId = Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9);
    const count = attending === 'yes' ? Number(peopleCount || 1) : 0;

    const newRecord = {
      id: uniqueId,
      fullName: fullName.trim(),
      attending: (attending === 'yes' ? 'yes' : 'no') as 'yes' | 'no',
      peopleCount: count,
      dietary: dietary,
      comments: comments.trim() || 'Sin comentarios',
      createdAt: new Date().toISOString(),
    };

    // 1. Save to LocalStorage as immediate client backup
    try {
      const stored = localStorage.getItem('wedding_rsvps_records');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newRecord);
      localStorage.setItem('wedding_rsvps_records', JSON.stringify(list));
    } catch (e) {
      console.warn('LocalStorage backup error', e);
    }

    // 2. Save single record to Server Database via /api/rsvps
    try {
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uniqueId,
          fullName: fullName.trim(),
          attending: attending,
          peopleCount: count,
          dietary: dietary,
          comments: comments.trim(),
        }),
      });
    } catch (err) {
      console.warn('Server API save note:', err);
    }

    // 3. Send email notification copy (best-effort, non-blocking)
    const payload = {
      _subject: `Confirmación de Boda: ${fullName.trim()}`,
      _template: 'table',
      _captcha: 'false',
      'Nombre y apellido': fullName.trim(),
      '¿Confirma asistencia?': attending === 'yes' ? 'Sí, asistirá' : 'No asistirá',
      'Cantidad de personas': count,
      'Requerimientos alimentarios': dietary,
      'Comentarios': comments.trim() || 'Sin comentarios',
      'Fecha y hora de envío': submissionDate,
    };

    try {
      await fetch('https://formsubmit.co/ajax/milagrocamperohauad@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // Ignore external email service issues
    }

    setSubmitted(true);
    setFullName('');
    setAttending('');
    setPeopleCount(1);
    setDietary('Ninguno');
    setComments('');
    setLoading(false);
    isSubmittingRef.current = false;
  };

  return (
    <section id="rsvp" className="py-28 sm:py-36 px-6 bg-[#FAF7F2] bg-grain border-y border-[#E8E2D8]/50 select-none">
      <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10">
        {/* Monochromatic Fine Outline Envelope Icon Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] ring-1 ring-[#656D4A]/15 flex items-center justify-center mx-auto shadow-[0_4px_20px_rgba(42,34,30,0.03)]"
        >
          <motion.div
            whileInView={{
              x: [0, 4, -4, 2, -2, 0],
            }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 5, ease: 'easeInOut' }}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#2A221E] stroke-[1.3]" viewBox="0 0 32 32" fill="none" stroke="currentColor">
              {/* Main Envelope Body */}
              <rect x="5" y="8" width="22" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Closed Flap */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 9l11 8.5L27 9" />
              {/* Interior Creases */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 23l8-6.5M27 23l-8-6.5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Title & Description */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <span className="text-xs font-sans uppercase tracking-[0.38em] text-[#656D4A] font-medium">
            TU PRESENCIA ES NUESTRO MEJOR REGALO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#2A221E] tracking-tight">
            Confirmación de asistencia
          </h2>
        </motion.div>

        {/* Form Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="bg-[#FFFFFF] rounded-2xl p-8 sm:p-12 border border-[#E8E2D8] shadow-[0_8px_30px_rgba(42,34,30,0.03)] text-left"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#656D4A]/30 text-[#656D4A] text-xs font-sans">
                    {errorMessage}
                  </div>
                )}

                {/* 1. Nombre y Apellido */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                    Nombre y apellido *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Escribí tu nombre completo"
                    className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors placeholder:text-[#9C9286]"
                  />
                </div>

                {/* 2. ¿Asistís? (Sí / No) */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                    ¿Asistís? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setAttending('yes');
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        attending === 'yes'
                          ? 'bg-[#2A221E] text-[#FAF7F2] border-[#2A221E] ring-1 ring-[#656D4A]/50'
                          : 'bg-[#FAF7F2] text-[#2A221E] border-[#E8E2D8] hover:border-[#656D4A]/40'
                      }`}
                    >
                      {attending === 'yes' && <Check className="w-3.5 h-3.5 text-[#656D4A]" />}
                      <span>Sí</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAttending('no');
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        attending === 'no'
                          ? 'bg-[#2A221E] text-[#FAF7F2] border-[#2A221E] ring-1 ring-[#656D4A]/50'
                          : 'bg-[#FAF7F2] text-[#2A221E] border-[#E8E2D8] hover:border-[#656D4A]/40'
                      }`}
                    >
                      {attending === 'no' && <Check className="w-3.5 h-3.5 text-[#656D4A]" />}
                      <span>No</span>
                    </button>
                  </div>
                </div>

                {/* 3. Cantidad de personas (solo si corresponde) */}
                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 pt-1"
                  >
                    <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                      ¿Cuántas personas asistirán?
                    </label>
                    <select
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(Number(e.target.value))}
                      className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors cursor-pointer"
                    >
                      <option value={1}>1 persona</option>
                      <option value={2}>2 personas</option>
                      <option value={3}>3 personas</option>
                      <option value={4}>4 personas</option>
                      <option value={5}>5 personas</option>
                      <option value={6}>6 personas</option>
                      <option value={7}>7 personas</option>
                      <option value={8}>8 personas</option>
                    </select>
                  </motion.div>
                )}

                {/* 4. Requerimientos alimentarios */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                    Requerimientos alimentarios
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors cursor-pointer"
                  >
                    <option value="Ninguno">Ninguno</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Vegetariano">Vegetariano</option>
                    <option value="Celíaco">Celíaco</option>
                    <option value="Diabético">Diabético</option>
                  </select>
                </div>

                {/* 5. Comentarios (opcional) */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase tracking-[0.2em] text-[#2A221E] font-medium">
                    Comentarios <span className="text-[#9C9286] font-normal">(opcional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Mensaje o alguna indicación para los novios..."
                    className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xl text-sm text-[#2A221E] focus:outline-none focus:border-[#656D4A] transition-colors resize-none placeholder:text-[#9C9286]"
                  />
                </div>

                {/* Main Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-[#2A221E] text-[#FAF7F2] border border-[#2A221E] hover:border-[#656D4A]/50 hover:bg-[#3D322C] active:scale-[0.99] transition-all duration-300 text-xs font-sans uppercase tracking-[0.25em] font-medium shadow-[0_10px_25px_rgba(42,34,30,0.08)] hover:shadow-[0_14px_32px_rgba(42,34,30,0.15)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#656D4A]" />
                        <span>ENVIANDO...</span>
                      </>
                    ) : (
                      <span>CONFIRMAR ASISTENCIA</span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] ring-1 ring-[#656D4A]/20 flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-5 h-5 text-[#656D4A] stroke-[1.5]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#2A221E]">
                    ¡Muchas gracias!
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#6E645A] font-light leading-relaxed max-w-md mx-auto">
                    Recibimos tu confirmación correctamente y estamos muy felices de poder compartir este día con vos.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] text-[#2A221E] text-xs font-sans uppercase tracking-[0.2em] font-medium hover:border-[#656D4A]/50 hover:bg-[#FFFFFF] transition-all cursor-pointer"
                  >
                    <span>Enviar otra respuesta</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
