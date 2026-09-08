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
                className="absolute right-6 top-6 z-20 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/40 transition-colors md:text-neutral-400 md:bg-neutral-100 md:hover:bg-neutral-200"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Speaker Visual Side (Image or Video) */}
              <div className="relative w-full md:w-2/5 aspect-[3/4] md:aspect-auto min-h-[380px] md:min-h-0 bg-neutral-900 overflow-hidden">
                {(() => {
                  const name = speaker.name.toLowerCase();
                  const isTopFocus = name.includes("patrícia") || name.includes("zuolo");
                  const objectPositionClass = isTopFocus ? "object-top" : "object-center";

                  return speaker.video ? (
                    <video 
                      src={speaker.video}
                      className={`w-full h-full object-cover ${objectPositionClass} opacity-90`}
                      autoPlay
                      loop
                      playsInline
                      onError={(e) => {
                        console.error("Video error:", e);
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Image
                      src={speaker.image || "/placeholder-speaker.webp"}
                      alt={speaker.name || "Palestrante"}
                      fill
                      className={`object-cover ${objectPositionClass} opacity-80`}
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  {speaker.isInternational && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold uppercase tracking-wider mb-4">
                      <MapPin className="w-3 h-3" /> Convidado Internacional
                    </div>
                  )}
                  <h3 className="text-3xl font-black text-white leading-tight">{speaker.name}</h3>
                  <p className="text-brand-400 font-bold uppercase tracking-widest text-xs mt-2">{speaker.title}</p>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white">
                <div className="mb-8">
                  <h4 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-4">Currículo & Biografia</h4>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-600 leading-relaxed text-lg whitespace-pre-wrap">
                      {speaker.fullBio || speaker.description || "Biografia em breve."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto pt-8 border-t border-neutral-100">
                  {speaker.socials?.instagram && (
                    <a
                      href={speaker.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 text-neutral-700 hover:bg-neutral-100 transition-colors text-sm font-bold"
                    >
                      Instagram
                    </a>
                  )}
                  {speaker.socials?.website && (
                    <a
                      href={speaker.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 text-neutral-700 hover:bg-neutral-100 transition-colors text-sm font-bold"
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
