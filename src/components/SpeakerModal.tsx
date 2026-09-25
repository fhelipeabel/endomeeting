"use client";

import { useEffect, useRef, useState } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Speaker } from "@/data/speakers";
import Image from "next/image";

interface SpeakerModalProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

export default function SpeakerModal({ speaker, isOpen, onClose, audioRef }: SpeakerModalProps) {
  const speakerVideoRef = useRef<HTMLVideoElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);

  // Whether the user has explicitly unlocked audio via a tap/click
  const [isMuted, setIsMuted] = useState(true);

  // Fix #3: lock body scroll when modal is open so the background page doesn't scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // When modal opens: try to play with audio right away (the click that opened
  // the modal is a valid user gesture, so browsers should allow it).
  useEffect(() => {
    if (isOpen && speakerVideoRef.current) {
      setIsMuted(false);
      const video = speakerVideoRef.current;
      video.muted = false;
      video.currentTime = 0;

      // Pause background music since speaker video will have audio
      if (audioRef?.current) {
        audioRef.current.pause();
      }

      const timer = setTimeout(() => {
        video.play().catch(() => {
          // Browser still blocked audio (rare on strict iOS) — fall back to muted
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }, 100);

      return () => clearTimeout(timer);
    }

    if (!isOpen && speakerVideoRef.current) {
      speakerVideoRef.current.pause();
      speakerVideoRef.current.currentTime = 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, speaker]);

  // Sync ambient video
  useEffect(() => {
    if (!ambientVideoRef.current) return;
    ambientVideoRef.current.muted = true;
    if (isOpen) {
      ambientVideoRef.current.play().catch(() => {});
    } else {
      ambientVideoRef.current.pause();
    }
  }, [isOpen]);

  if (!speaker) return null;

  const name = speaker.name.toLowerCase();
  const isTopFocus =
    name.includes("patrícia") ||
    name.includes("zuolo") ||
    name.includes("paulo") ||
    name.includes("capelli") ||
    name.includes("rui");
  const objectPositionClass = isTopFocus ? "object-top" : "object-center";

  const hasVideo = Boolean(speaker.video);
  const hasImage = Boolean(speaker.image);

  /** Called when the user taps the sound button — browser requires a user gesture to unmute */
  const handleUnlockAudio = () => {
    const video = speakerVideoRef.current;
    if (!video) return;

    // Pause → unmute → play is the reliable pattern to re-engage audio on iOS/Android
    video.pause();
    video.muted = false;
    video.play().then(() => {
      setIsMuted(false);
      // Pause background music when speaker video audio is enabled
      if (audioRef?.current) {
        audioRef.current.pause();
      }
    }).catch(() => {
      // Still blocked — gracefully fall back to muted
      video.muted = true;
      setIsMuted(true);
    });
  };

  const handleToggleMute = () => {
    const video = speakerVideoRef.current;
    if (!video) return;

    if (isMuted) {
      handleUnlockAudio();
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/*
            Fix #3: overflow-y-auto + overscroll-contain → modal scrolls internally,
            scroll does NOT chain to the page behind it.
            Fix #2: max-h-[90vh] keeps modal bounded; video is max-h-[48vh] on mobile
            so text below peeks out hinting the user can scroll.
            style touchAction pan-y allows the modal itself to capture touch scroll.
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{ touchAction: "pan-y" }}
            className="fixed left-1/2 top-1/2 z-[101] w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto overscroll-contain rounded-[2.5rem] bg-white shadow-2xl"
          >
            <div className="relative flex flex-col md:flex-row">
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-30 rounded-full bg-black/40 md:bg-neutral-100 p-2.5 text-white md:text-neutral-600 hover:bg-black/60 md:hover:bg-neutral-200 transition-colors shadow-md backdrop-blur-sm cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/*
                Media side:
                - Efeito ambient/espelhado: vídeo/imagem duplicado no fundo com blur e escala,
                  preenchendo as bordas com as cores vivas e movimento em vez do fundo preto estático.
                - Foreground: vídeo/imagem nítido com drop-shadow e proporções preservadas.
              */}
              <div className="relative w-full md:w-1/2 bg-neutral-950 overflow-hidden shrink-0 flex items-center justify-center rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-tr-none min-h-[240px]">
                {hasVideo ? (
                  <>
                    {/* Efeito espelhado/ambient blur de fundo — sempre muted */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                      <video
                        ref={ambientVideoRef}
                        src={speaker.video}
                        aria-hidden="true"
                        tabIndex={-1}
                        className="w-full h-full object-cover scale-135 blur-2xl opacity-78 brightness-105 saturate-125"
                        autoPlay
                        loop
                        playsInline
                        muted
                      />
                      <div className="absolute inset-0 bg-black/15 backdrop-blur-xs" />
                    </div>

                    {/* Vídeo principal — inicia muted, usuário ativa áudio pelo botão */}
                    <video
                      ref={speakerVideoRef}
                      src={speaker.video}
                      className={`relative z-10 w-full h-auto max-h-[48vh] md:max-h-none md:h-full object-contain ${objectPositionClass} drop-shadow-2xl`}
                      autoPlay
                      loop
                      playsInline
                      muted
                      onError={(e) => {
                        console.error("Video error:", e);
                        (e.target as HTMLVideoElement).style.display = "none";
                      }}
                    />

                    {/* Botão de som — fixado no canto inferior direito do vídeo */}
                    <button
                      onClick={handleToggleMute}
                      aria-label={isMuted ? "Ativar áudio do vídeo" : "Mutar vídeo"}
                      title={isMuted ? "Toque para ouvir o vídeo" : "Mutar vídeo"}
                      className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-bold shadow-lg hover:bg-black/80 active:scale-95 transition-all cursor-pointer border border-white/20"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 shrink-0" />
                          <span className="whitespace-nowrap">Ouvir vídeo</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 shrink-0 text-green-400" />
                          <span className="whitespace-nowrap">Áudio ativo</span>
                        </>
                      )}
                    </button>
                  </>
                ) : hasImage ? (
                  <>
                    {/* Efeito espelhado/ambient blur para imagem */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                      <Image
                        src={speaker.image!}
                        alt=""
                        fill
                        aria-hidden="true"
                        className="object-cover scale-135 blur-2xl opacity-70 brightness-90 saturate-110"
                      />
                      <div className="absolute inset-0 bg-black/15" />
                    </div>

                    {/* Imagem principal — object-contain igual ao vídeo, sem zoom */}
                    <div className="relative z-10 w-full h-auto max-h-[48vh] md:max-h-none md:h-full md:absolute md:inset-0 flex items-center justify-center min-h-[240px]">
                      <Image
                        src={speaker.image!}
                        alt={speaker.name || "Palestrante"}
                        fill
                        className={`object-contain ${objectPositionClass} drop-shadow-2xl`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full aspect-square flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 text-brand-300">
                    <span className="font-black text-5xl tracking-widest">
                      {speaker.name
                        .replace(/Profª?\.|\bDrª?\.|\bProf\./g, "")
                        .trim()
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span className="text-xs uppercase font-bold text-neutral-400 mt-3">
                      Foto em breve
                    </span>
                  </div>
                )}
              </div>

              {/* Content side */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 bg-white flex flex-col justify-between md:overflow-y-auto">
                <div>
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
                      Currículo &amp; Biografia
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

