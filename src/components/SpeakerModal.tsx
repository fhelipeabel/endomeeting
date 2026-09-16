"use client";

import { X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Speaker } from "@/data/speakers";
import Image from "next/image";

interface SpeakerModalProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SpeakerModal({ speaker, isOpen, onClose }: SpeakerModalProps) {
  if (!speaker) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
          >
            <div className="relative flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-30 rounded-full bg-black/40 md:bg-neutral-100 p-2.5 text-white md:text-neutral-600 hover:bg-black/60 md:hover:bg-neutral-200 transition-colors shadow-md backdrop-blur-sm cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Speaker Visual Side (Image or Video) - 1:1 Aspect Ratio Quadrado Padrão */}
              <div className="relative w-full md:w-1/2 aspect-square bg-neutral-950 overflow-hidden shrink-0 flex items-center justify-center">
                {(() => {
                  const name = speaker.name.toLowerCase();
                  const isTopFocus = name.includes("patrícia") || name.includes("zuolo") || name.includes("paulo") || name.includes("capelli") || name.includes("rui");
                  const objectPositionClass = isTopFocus ? "object-top" : "object-center";

                  return speaker.video ? (
                    <video 
                      src={speaker.video}
                      className={`w-full h-full object-cover ${objectPositionClass}`}
                      autoPlay
                      loop
                      playsInline
                      onError={(e) => {
                        console.error("Video error:", e);
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name || "Palestrante"}
                      fill
                      className={`w-full h-full object-cover ${objectPositionClass}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 flex flex-col items-center justify-center text-brand-300">
                      <span className="font-black text-5xl tracking-widest">
                        {speaker.name.replace(/Profª?\.|Drª?\./g, "").trim().slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-xs uppercase font-bold text-neutral-400 mt-3">Foto em breve</span>
                    </div>
                  );
                })()}
              </div>

              {/* Content Side */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto bg-white flex flex-col justify-between">
                <div>
                  {/* Cabeçalho do Palestrante / Coordenador */}
                  <div className="mb-6 pb-6 border-b border-neutral-100 pr-8">
                    {speaker.isInternational && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
                        <span className="w-4 h-3 rounded-xs overflow-hidden inline-flex items-center justify-center shadow-xs">
                          <svg viewBox="0 0 600 400" className="w-full h-full" aria-label="Bandeira de Portugal">
                            <rect width="600" height="400" fill="#DA291C" />
                            <rect width="240" height="400" fill="#046A38" />
                            <circle cx="240" cy="200" r="80" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
                            <rect x="212" y="165" width="56" height="70" rx="8" fill="#FFFFFF" stroke="#003399" strokeWidth="4" />
                          </svg>
                        </span>
                        Convidado Internacional
                      </div>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 leading-tight">
                      {speaker.name}
                    </h3>
                    <p className="text-brand-700 font-bold text-sm sm:text-base mt-2">
                      {speaker.title}
                    </p>
                    {speaker.location && (
                      <p className="text-xs text-neutral-400 font-semibold mt-1">
                        {speaker.location}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">
                      Currículo & Biografia
                    </h4>
                    <div className="prose prose-neutral max-w-none">
                      <p className="text-neutral-600 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                        {speaker.fullBio || speaker.description || "Biografia em breve."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-neutral-100 mt-4">
                  {speaker.socials?.instagram && (
                    <a
                      href={speaker.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-brand-50 hover:text-brand-700 text-neutral-700 transition-colors text-xs font-bold"
                    >
                      Instagram
                    </a>
                  )}
                  {speaker.socials?.website && (
                    <a
                      href={speaker.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-brand-50 hover:text-brand-700 text-neutral-700 transition-colors text-xs font-bold"
                    >
                      Website Profissional
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
