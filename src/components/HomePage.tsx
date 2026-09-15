"use client";
// Force refresh 1

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PaymentPopup } from "@/components/PaymentPopup";
import { Sponsors } from "@/components/Sponsors";
import { speakers } from "@/data/speakers";
import { MapPin, Calendar, CheckCircle2, ChevronRight, User, Stethoscope, Sparkles, AlertCircle, Lock, Play, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import SpeakerModal from "@/components/SpeakerModal";
import HeroIndexBanner from "@/components/HeroIndexBanner";
import { Speaker } from "@/data/speakers";

type PromoCategoryKey = "academicos" | "pos" | "dentistas";

interface CategoryInfo {
  id: PromoCategoryKey;
  label: string;
  badge: string;
  price: string;
  installments: string;
  description: string;
  requirement: string;
  url: string;
  audience: string | null;
}

const promoCategories: Record<PromoCategoryKey, CategoryInfo> = {
  academicos: {
    id: "academicos",
    label: "Acadêmicos (Graduação)",
    badge: "Graduação",
    price: "250,00",
    installments: "Em até 10x no cartão",
    description: "Destinado exclusivamente para estudantes de graduação em Odontologia.",
    requirement: "Necessário comprovação de matrícula ativa no credenciamento.",
    url: "https://pay.kiwify.com.br/rrtPxfL",
    audience: "estudantes de graduação em Odontologia"
  },
  pos: {
    id: "pos",
    label: "Alunos de Pós-graduação",
    badge: "Pós-graduação",
    price: "350,00",
    installments: "Em até 10x no cartão",
    description: "Destinado para alunos matriculados em cursos de pós-graduação e especialização.",
    requirement: "Necessário comprovante de matrícula na pós-graduação.",
    url: "https://pay.kiwify.com.br/sQSX4he",
    audience: "alunos de pós-graduação em Odontologia"
  },
  dentistas: {
    id: "dentistas",
    label: "Cirurgiões-dentistas",
    badge: "Profissional",
    price: "550,00",
    installments: "Em até 10x no cartão",
    description: "Destinado a Cirurgiões-dentistas formados que buscam atualização e excelência clínica.",
    requirement: "Acesso completo a todas as palestras e feira comercial.",
    url: "https://pay.kiwify.com.br/7HjGskz",
    audience: null
  }
};

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<{ title: string, message: string, url: string } | undefined>(undefined);
  const [selectedPromoCategory, setSelectedPromoCategory] = useState<PromoCategoryKey | "">("");
  const currentPromo = selectedPromoCategory ? promoCategories[selectedPromoCategory] : null;
  const [currentLot, setCurrentLot] = useState<1 | 2>(1);
  const [mounted, setMounted] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Data de virada de lote: 02 de maio de 2026 às 08:00 (Horário de Brasília)
    const switchDate = new Date('2026-05-02T08:00:00-03:00');
    if (new Date() >= switchDate) {
      setCurrentLot(2);
    }
  }, []);

  const scrollToTickets = () => {
    const section = document.getElementById('ingressos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPopup = (title: string, audience: string | null, url: string) => {
    setPopupContent({
      title: `Ingresso: ${title}`,
      message: audience
        ? `Atenção: Este ingresso é destinado exclusivamente para ${audience}. Será necessário comprovar sua categoria no credenciamento do evento. Caso não haja comprovação, será cobrada a diferença para o valor do ingresso integral no local. Deseja prosseguir?`
        : "Você está sendo redirecionado para a plataforma de pagamentos (Kiwify). Os ingressos são limitados e os lotes podem esgotar rapidamente. Tem certeza que deseja continuar?",
      url: url
    });
    setIsPopupOpen(true);
  };

  const handleOpenSpeakerModal = (speaker: Speaker) => {
    if (speaker.isComingSoon) return;
    setSelectedSpeaker(speaker);
    setIsSpeakerModalOpen(true);
  };

  const handleSelectSpeakerByName = (speakerName: string) => {
    const found = speakers.find(s =>
      s.name.toLowerCase().includes(speakerName.toLowerCase()) ||
      speakerName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (found && !found.isComingSoon) {
      setSelectedSpeaker(found);
      setIsSpeakerModalOpen(true);
    }
  };

  // O link do Kiwify atualizado (pode ser ajustado conforme a necessidade)
  const kiwifyCheckoutUrl = "https://pay.kiwify.com.br/xxxxx";

  const fadeIn = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {mounted && (
        <>
          <PaymentPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            checkoutUrl={popupContent?.url || ""}
            title={popupContent?.title}
            message={popupContent?.message}
          />

          <SpeakerModal
            speaker={selectedSpeaker}
            isOpen={isSpeakerModalOpen}
            onClose={() => setIsSpeakerModalOpen(false)}
          />
        </>
      )}

      {/* INTRO SECTION ORIGINAL (1ª TELA ESCURA) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/intro-dark.png"
            alt="Endomeeting Background"
            fill
            className="object-cover opacity-35 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-neutral-950" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <div className="w-20 h-1 bg-brand-600 mb-8 rounded-full shadow-lg shadow-brand-500/50" />

          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-10"
          >
            <Image
              src="/logo.png.png"
              alt="4º Endomeeting"
              width={520}
              height={160}
              className="w-full max-w-[320px] md:max-w-[480px] h-auto brightness-200 invert grayscale drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              priority
            />
          </motion.div>

          <motion.button
            type="button"
            onClick={() => {
              const el = document.getElementById("painel-info");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] group-hover:tracking-[0.35em] transition-all">Role para entrar</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand-500 via-brand-600 to-transparent group-hover:h-14 transition-all" />
          </motion.button>
        </motion.div>
      </section>

      {/* BANNER INDEX / HUB DE ACESSO RÁPIDO (Versão Dark com Glow Vinho e Informações Desenhadas) */}
      <HeroIndexBanner onSelectSpeaker={handleSelectSpeakerByName} />

      {/* HERO & VIDEO SECTION */}
      <section id="hero" className="relative w-full min-h-screen flex items-center justify-center py-28 md:py-36 overflow-hidden bg-white/50 backdrop-blur-sm border-t border-neutral-100 scroll-mt-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 font-medium text-sm mb-6 border border-brand-100/50">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Inscrições Abertas - Lote Promocional
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-800 tracking-tight leading-[1.05] mb-6">
              Venha aprimorar sua<br />
              <span className="text-brand-700">Endodontia com excelência</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-xl leading-relaxed">
              O evento que reúne os maiores especialistas em endodontia do Brasil para dois dias de imersão tecnológica e científica.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTickets}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-brand-900 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-brand-900/40"
              >
                Garantir Ingresso
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                    if (videoRef.current.paused) {
                      videoRef.current.play();
                      setIsVideoPlaying(true);
                    }
                  }
                }}
                className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-neutral-900 border border-neutral-200 rounded-2xl text-lg font-bold hover:bg-neutral-50 hover:border-brand-300 shadow-sm hover:shadow transition-all group cursor-pointer"
              >
                <span className="w-8 h-8 flex items-center justify-center bg-brand-50 rounded-full text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </span>
                Assistir Vídeo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center items-center w-full"
          >
            {/* Container Vertical Estilo Smartphone / Reels / VSL */}
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.25)] border-4 sm:border-8 border-neutral-900 bg-black group ring-1 ring-white/20">
              {/* Notch superior estético */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-neutral-900/90 rounded-full z-20 pointer-events-none flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-neutral-950 mr-2 border border-white/10" />
                <div className="w-8 h-1 rounded-full bg-neutral-800" />
              </div>

              <video
                ref={videoRef}
                src="/videos/vsl-endomeeting.mp4"
                poster="/images/vsl-cover.jpg"
                controls={isVideoPlaying}
                playsInline
                preload="metadata"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
                onEnded={() => setIsVideoPlaying(false)}
                className="w-full h-full object-cover"
              />

              {!isVideoPlaying && (
                <div
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play();
                      setIsVideoPlaying(true);
                    }
                  }}
                  className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-neutral-950/25 z-10 p-6"
                >
                  <Image
                    src="/images/vsl-cover.jpg"
                    alt="Endomeeting VSL Cover"
                    fill
                    className="object-cover opacity-80 pointer-events-none -z-10"
                    priority
                  />

                  <div className="relative flex flex-col items-center gap-5 text-center">
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-brand-500/60 pointer-events-none"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        className="absolute inset-0 rounded-full bg-brand-600/40 pointer-events-none"
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-20 h-20 bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 hover:from-brand-600 hover:to-brand-400 text-white rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(220,38,38,0.7)] transition-all cursor-pointer ring-4 ring-white/30 hover:ring-white/60 z-10"
                      >
                        <Play className="w-8 h-8 ml-1 fill-current text-white drop-shadow" />
                      </motion.div>
                    </div>

                    <div>
                      <span className="text-white font-black uppercase tracking-widest text-xs sm:text-sm block drop-shadow-md">
                        Vídeo Oficial • 4º Endomeeting
                      </span>
                      <span className="text-neutral-200 text-xs font-semibold mt-1.5 block drop-shadow-sm">
                        Aperte o play para assistir com áudio
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="w-full py-12 bg-neutral-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 flex flex-wrap justify-between gap-8 md:gap-12">
          {[
            { icon: <Calendar className="w-5 h-5" />, label: "DATA", val: "30/04 e 01/05, 2027" },
            { icon: <MapPin className="w-5 h-5" />, label: "LOCAL", val: "CDL Uberlândia" },
            { icon: <User className="w-5 h-5" />, label: "PÚBLICO", val: "CDs e Acadêmicos" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="text-brand-500">{item.icon}</div>
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-neutral-500">{item.label}</p>
                <p className="text-sm font-bold">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="sobre" className="w-full py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 tracking-tight leading-tight">Excelência em <span className="text-brand-900">Foco</span></h2>
            <p className="text-xl text-neutral-500 mb-10 leading-relaxed font-medium">
              Organizado pela Equipe Rodrigo Faria de Endodontia, o Endomeeting é o epicentro da inovação endodôntica no Brasil.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { title: "Alta Tecnologia", desc: "Acesso às mais recentes inovações e microscopia de ponta.", icon: <CheckCircle2 className="w-6 h-6" /> },
              { title: "Networking Elite", desc: "Conexões valiosas com os maiores nomes da endodontia nacional.", icon: <User className="w-6 h-6" /> },
              { title: "Imersão Prática", desc: "Vivencie protocolos clínicos reais com hands-on especializados.", icon: <Stethoscope className="w-6 h-6" /> }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-neutral-50 p-10 rounded-[2.5rem] border border-neutral-100 hover:border-brand-200/50 hover:bg-white hover:shadow-2xl hover:shadow-brand-900/5 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-white shadow-sm border border-neutral-100 rounded-2xl flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-900 group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section id="palestrantes" className="w-full py-32 bg-neutral-50/50 relative overflow-hidden">
        {/* International Badge/Text Highlight */}
        <div className="absolute top-0 left-0 w-full bg-brand-900 text-white py-3 z-20 shadow-lg">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs md:text-sm font-black tracking-[0.2em] uppercase flex items-center justify-center gap-4">
              <MapPin className="w-4 h-4 text-brand-400 animate-pulse" />
              O maior congresso de odontologia do triângulo mineiro, agora se torna <span className="text-brand-400">Internacional!</span>
              <MapPin className="w-4 h-4 text-brand-400 animate-pulse" />
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-12">
          <div className="flex flex-col items-center mb-20 text-center">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
            >
              Mestres da Endodontia
            </motion.h2>
            <p className="text-neutral-500 max-w-2xl text-xl font-medium">Aprenda com professores experientes que aliam alta tecnologia e resultados de excelência.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, scale: 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                onClick={() => handleOpenSpeakerModal(speaker)}
                className={`group bg-white rounded-[2rem] p-8 border border-neutral-100 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden ${speaker.isComingSoon ? 'opacity-60 cursor-default' : 'hover:border-brand-200 hover:shadow-2xl cursor-pointer'}`}
              >
                {!speaker.isComingSoon && (
                  <div className="absolute top-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shadow-md md:shadow-none">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                )}

                <div className={`w-32 h-32 rounded-3xl bg-neutral-100 mb-6 overflow-hidden flex items-center justify-center relative transition-transform duration-500 ${!speaker.isComingSoon && 'group-hover:scale-105'}`}>
                  {speaker.isComingSoon ? (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-neutral-400 animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <Image
                        src={speaker.image || "/placeholder-speaker.webp"}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-500" />
                      {speaker.isInternational && (
                        <div className="absolute top-2 left-2 bg-brand-600 text-white p-1 rounded-lg z-10">
                          <MapPin className="w-4 h-4" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2">{speaker.name}</h3>
                <h4 className="text-sm font-bold text-brand-700 mb-4 tracking-wider uppercase">{speaker.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-medium line-clamp-3">{speaker.description}</p>

                {!speaker.isComingSoon && (
                  <div className="mt-6 pt-6 border-t border-neutral-50 w-full flex justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-600 flex items-center gap-2">
                      Ver Bio Completa <ChevronRight className="w-3 h-3 md:hidden" />
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETS SECTION */}
      <section id="ingressos" className="w-full py-32 bg-neutral-950 relative overflow-hidden">
        {/* Decorator Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square rounded-full bg-brand-900/30 blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/30">
              Lotes Oficiais
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Garanta sua Vaga</h2>
            <p className="text-amber-400 font-bold text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Lote promocional de lançamento durante 30 dias a partir do dia 15/09 (em até 10x no cartão)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Card 1: Lote Promocional de Lançamento (ATIVO / ABERTO) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-brand-900/40 via-brand-950/80 to-neutral-950/90 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-brand-500/50 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_50px_rgba(220,38,38,0.25)] ring-1 ring-brand-500/30"
            >
              {/* Glow & Badge de Destaque */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3 h-3" />
                    Lote Ativo
                  </span>
                  <span className="text-[11px] font-bold text-brand-300/90">
                    Válido por 30 dias
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                  Lote Promocional de Lançamento
                </h3>
                <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                  Início em 15/09. Selecione sua categoria abaixo para visualizar o valor correspondente:
                </p>

                {/* Seletor Suspenso / Menu Suspenso de Categoria */}
                <div className="mb-6 space-y-2">
                  <label htmlFor="promo-category-select" className="text-xs font-bold uppercase tracking-wider text-brand-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-400" />
                    Selecione sua Categoria:
                  </label>
                  <div className="relative">
                    <select
                      id="promo-category-select"
                      value={selectedPromoCategory}
                      onChange={(e) => setSelectedPromoCategory(e.target.value as PromoCategoryKey)}
                      className={`w-full bg-neutral-900/95 font-bold text-sm px-4 py-3.5 rounded-xl border outline-none transition-all cursor-pointer appearance-none shadow-inner ${
                        !selectedPromoCategory
                          ? "text-neutral-400 border-brand-500/60 ring-2 ring-brand-500/20"
                          : "text-white border-brand-500/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
                      }`}
                    >
                      <option value="" disabled className="text-neutral-500 bg-neutral-900">
                        Selecione sua categoria...
                      </option>
                      <option value="academicos" className="text-white bg-neutral-900">Acadêmicos (Graduação) — R$ 250,00</option>
                      <option value="pos" className="text-white bg-neutral-900">Alunos de Pós-graduação — R$ 350,00</option>
                      <option value="dentistas" className="text-white bg-neutral-900">Cirurgiões-dentistas — R$ 550,00</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400 text-xs font-bold">
                      ▼
                    </div>
                  </div>

                  {/* Tabs / Pills para seleção rápida */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    {(["academicos", "pos", "dentistas"] as PromoCategoryKey[]).map((key) => {
                      const isSelected = selectedPromoCategory === key;
                      const cat = promoCategories[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedPromoCategory(key)}
                          className={`py-2 px-2 rounded-lg text-[11px] font-bold transition-all truncate text-center cursor-pointer ${
                            isSelected
                              ? "bg-brand-600 text-white shadow-sm border border-brand-400/50 scale-[1.02]"
                              : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5"
                          }`}
                        >
                          {cat.badge}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Valor de Lançamento
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-neutral-400">R$</span>
                    <span className={`font-black tracking-tight transition-all ${
                      currentPromo ? "text-5xl text-white" : "text-4xl text-neutral-400"
                    }`}>
                      {currentPromo ? currentPromo.price : "---,--"}
                    </span>
                  </div>
                  <span className="text-xs font-bold block mt-2 transition-colors">
                    {currentPromo ? (
                      <span className="text-amber-400">À vista ou em até 10x no cartão</span>
                    ) : (
                      <span className="text-neutral-400">Selecione uma categoria para visualizar</span>
                    )}
                  </span>
                </div>

                {currentPromo ? (
                  <button
                    type="button"
                    onClick={() => handleOpenPopup(currentPromo.label, currentPromo.audience, currentPromo.url)}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-brand-950 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Garantir Ingresso de Lançamento</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("promo-category-select");
                      if (el) el.focus();
                    }}
                    className="w-full py-4 rounded-xl font-bold text-neutral-300 bg-white/10 hover:bg-white/15 border border-white/10 hover:border-brand-500/40 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Selecione sua Categoria</span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Card 2: 1º Lote (BLOQUEADO / APENAS CADEADO NO MEIO) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden group opacity-60 hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-3xl bg-neutral-900/90 border border-white/10 flex items-center justify-center text-neutral-400 shadow-2xl group-hover:border-white/20 transition-all">
                  <Lock className="w-9 h-9 text-neutral-400" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                  1º Lote
                </span>
              </div>
            </motion.div>

            {/* Card 3: 2º Lote (BLOQUEADO / APENAS CADEADO NO MEIO) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden group opacity-60 hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-3xl bg-neutral-900/90 border border-white/10 flex items-center justify-center text-neutral-400 shadow-2xl group-hover:border-white/20 transition-all">
                  <Lock className="w-9 h-9 text-neutral-400" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                  2º Lote
                </span>
              </div>
            </motion.div>
          </div>

          {/* Policy Text */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-brand-900/20 border border-brand-500/20 rounded-3xl p-8 backdrop-blur-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-brand-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Política de Inscrição e Responsabilidade</h4>
                <p className="text-brand-100/70 text-sm leading-relaxed">
                  Ao adquirir seu ingresso, o participante assume a responsabilidade de garantir que sua categoria profissional condiz com o ingresso selecionado.
                  <strong className="text-white"> É obrigatória a comprovação da categoria no momento do credenciamento.</strong>
                  Caso não seja apresentada a documentação comprobatória, será cobrada a diferença de valor para o ingresso integral vigente no dia do evento para a liberação da credencial.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* LOCATION SECTION */}
      <section id="localizacao" className="relative w-full py-32 bg-white overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-brand-50 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 opacity-60 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-8">Local do Evento</h2>
              <div className="flex items-start gap-5 mb-10 p-6 bg-white rounded-3xl shadow-lg shadow-neutral-200/40 border border-neutral-100">
                <div className="p-4 bg-brand-50 rounded-2xl text-brand-600">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">CDL Uberlândia</h3>
                  <p className="text-neutral-500 leading-relaxed text-lg">
                    Câmara de Dirigentes Lojistas de Uberlândia<br />
                    Av. Belo Horizonte, 1261 - Bairro Osvaldo Rezende<br />
                    Uberlândia/MG - CEP 38400-454
                  </p>
                </div>
              </div>


              {/* Convention Photos Gallery */}
              <div className="grid grid-cols-3 gap-4 h-[240px]">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/cdl/cdl-5.jpeg" alt="CDL Uberlândia - Fachada e Estrutura" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/cdl/cdl-6.jpeg" alt="CDL Uberlândia - Auditório Principal" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/cdl/cdl-7.jpeg" alt="CDL Uberlândia - Espaço e Recepção" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-neutral-100 rounded-[3rem] overflow-hidden aspect-square relative shadow-2xl border-4 border-white"
            >
              <iframe
                src="https://maps.google.com/maps?q=CDL%20Uberl%C3%A2ndia%20Av.%20Belo%20Horizonte&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACCOMMODATION SECTION */}
      <section id="hospedagem" className="w-full py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
            >
              Onde se hospedar para o <span className="text-brand-900">Endomeeting</span>
            </motion.h2>
            <p className="text-neutral-500 max-w-2xl text-xl font-medium leading-relaxed">
              Para facilitar sua experiência no evento, reunimos o hotel oficial e algumas opções próximas ao local do Endomeeting em Uberlândia.
            </p>
          </div>

          {/* Featured Hotel: Mercure (Sem foto, foco em informações e contato) */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-neutral-50 border border-neutral-100 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-neutral-200/60">
              <div>
                <span className="inline-block text-brand-700 font-black uppercase tracking-[0.25em] text-xs px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 mb-3">
                  ★ Hotel Oficial do Evento
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 leading-tight">
                  Mercure Uberlândia Plaza Shopping
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mercure+Uberlândia+Plaza+Shopping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-brand-900 hover:bg-brand-950 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-md shadow-brand-900/20"
                >
                  Ver no Google Maps
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=553432398000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 text-sm font-bold rounded-xl border border-neutral-200 transition-all hover:scale-105 shadow-sm"
                >
                  Entrar em Contato
                </a>
              </div>
            </div>

            <p className="text-neutral-600 text-base sm:text-lg mb-8 leading-relaxed max-w-3xl">
              Opção oficial do evento, com localização estratégica e estrutura ideal para quem busca praticidade, conforto e fácil acesso durante os dias do 4º Endomeeting.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block mb-1">Endereço</span>
                <p className="text-neutral-900 font-medium text-sm">Rua da Bandeira, 400, Uberlândia - MG, 38405-174</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block mb-1">E-mail</span>
                <p className="text-neutral-900 font-medium text-sm truncate">h9602-re@accor.com</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 block mb-1">Telefone</span>
                <p className="text-neutral-900 font-medium text-sm">(34) 3239-8000</p>
              </div>
            </div>
          </motion.div>

          {/* Other Hotels Grid (Sem fotos, cartões modernos) */}
          <div className="mt-16 text-center max-w-5xl mx-auto">
            <h4 className="text-xl sm:text-2xl font-black text-neutral-900 mb-8 tracking-tight">
              Outras Opções Próximas ao Evento
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Ibis Uberlândia",
                  desc: "Excelente custo-benefício e localização central com rápido deslocamento.",
                  link: "https://www.google.com/maps/search/?api=1&query=Ibis+Uberlandia"
                },
                {
                  name: "Ibis Budget Uberlândia",
                  desc: "Prático, moderno e com estrutura ideal para estadias funcionais.",
                  link: "https://www.google.com/maps/search/?api=1&query=Ibis+Budget+Uberlandia"
                },
                {
                  name: "Villalba Hotel",
                  desc: "Conforto e comodidade próximo ao centro de Uberlândia e ao evento.",
                  link: "https://www.google.com/maps/search/?api=1&query=Villalba+Hotel+Uberlandia"
                }
              ].map((hotel, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 text-left hover:border-brand-500/30 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold mb-4">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h5 className="text-lg font-bold text-neutral-900 mb-2">{hotel.name}</h5>
                    <p className="text-xs text-neutral-500 leading-relaxed mb-4">{hotel.desc}</p>
                  </div>
                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-700 font-bold hover:text-brand-900 flex items-center gap-1 mt-auto pt-3 border-t border-neutral-100"
                  >
                    <span>Ver localização</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMISSÃO ORGANIZADORA SECTION */}
      <section id="comissao" className="w-full py-28 md:py-36 bg-neutral-950 text-white relative overflow-hidden border-t border-b border-white/10">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-900/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand-800/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-brand-400 font-black uppercase tracking-[0.3em] text-xs sm:text-sm mb-4 px-4 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/50">
              Coordenação Geral & Realização
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
            >
              Comissão Organizadora
            </motion.h2>
            <p className="text-neutral-400 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed">
              Conheça os profissionais dedicados a realizar uma experiência científica, clínica e humana inesquecível no Endomeeting.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Foto Oficial da Equipe */}
              <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-[480px] bg-neutral-950">
                <Image
                  src="/images/coordenadores.jpeg"
                  alt="Comissão Organizadora: Dra. Cristiane Silva, Dr. Rodrigo Faria e Dra. Renata Georjutti"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Informações da Equipe */}
              <div className="lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                    Equipe Rodrigo Faria de Endodontia
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                  Excelência Clínica e Compromisso Científico
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                  Com vasta trajetória na endodontia e no ensino odontológico de alto nível, a comissão coordenadora atua em cada detalhe do congresso: da curadoria científica e recepção de palestrantes de renome à infraestrutura de excelência para todos os congressistas.
                </p>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-950 text-brand-400 flex items-center justify-center font-black text-sm border border-brand-800/60 shrink-0">
                      CS
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white leading-tight">
                        Dra. Cristiane da Cruz Silva
                      </p>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        Coordenação Geral & Organizadora
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-950 text-brand-400 flex items-center justify-center font-black text-sm border border-brand-800/60 shrink-0">
                      RF
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white leading-tight">
                        Dr. Rodrigo Antonio de Faria
                      </p>
                      <span className="text-[11px] text-brand-400 font-bold uppercase tracking-wider">
                        Coordenação Científica & Geral
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-500/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-950 text-brand-400 flex items-center justify-center font-black text-sm border border-brand-800/60 shrink-0">
                      RG
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white leading-tight">
                        Dra. Renata Pereira Georjutti
                      </p>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        Coordenação Geral & Organizadora
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPONSORS SECTION */}
      <Sponsors />
    </div>
  );
}
