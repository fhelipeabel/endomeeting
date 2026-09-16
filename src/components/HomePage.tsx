"use client";
// Force refresh 1

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PaymentPopup } from "@/components/PaymentPopup";
import { Sponsors } from "@/components/Sponsors";
import { speakers } from "@/data/speakers";
import { MapPin, ChevronRight, User, Sparkles, AlertCircle, Lock, Play, Building2 } from "lucide-react";
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
    url: "https://pay.kiwify.com.br/HK8eGlB?afid=oSUqXXjK",
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
    url: "https://pay.kiwify.com.br/pZjGeTV?afid=oSUqXXjK",
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
    url: "https://pay.kiwify.com.br/Pv8qrvV?afid=oSUqXXjK",
    audience: null
  }
};

const coordinatorsData: Speaker[] = [
  {
    name: "Cristiane da Cruz Silva",
    title: "Coordenação Geral • Especialista e Professora em Endodontia",
    location: "Uberlândia - MG",
    description: "Cirurgiã-dentista, professora de cursos de Endodontia e Diretora Clínica da Odontologia Nossa Clínica.",
    fullBio: "Cirurgiã-dentista graduada em Odontologia com formação e atuação dedicada à Endodontia e Dentística Restauradora em Uberlândia (MG).\n\nProfessora de cursos na área de Endodontia e Diretora Clínica da Odontologia Nossa Clínica. Possui sólida trajetória clínica voltada para diagnósticos de precisão, preservação biológica e tratamentos endodônticos avançados.\n\nCoordenadora Geral do Endomeeting do Triângulo Mineiro, integrando a comissão organizadora e científica desde as primeiras edições para promover o intercâmbio de conhecimento de alto nível.",
    image: "/images/coordenadores.jpeg"
  },
  {
    name: "Rodrigo Antonio de Faria",
    title: "Coordenação Geral • Mestre em Endodontia pela UFMG",
    location: "Uberlândia - MG",
    description: "Mestre pela UFMG e Especialista pela PUC Minas, com mais de 30 anos de atuação clínica e docente em Endodontia.",
    fullBio: "Graduado em Odontologia pela Universidade Federal de Uberlândia (UFU) em 1993.\n\nMestre em Endodontia pela Universidade Federal de Minas Gerais (UFMG), com aperfeiçoamento pela mesma instituição e Especialista em Endodontia pela Pontifícia Universidade Católica de Minas Gerais (PUC Minas).\n\nProfessor do curso de Odontologia do Centro Universitário do Triângulo (Unitri), onde coordena a pós-graduação e especialização em Endodontia ininterruptamente desde 2006, completando 20 anos de formação e liderança acadêmica contínua. Atua também como docente em cursos de aperfeiçoamento clínico (Dental Hall, IQO e INPES) e mantém prática clínica exclusiva em Endodontia em Uberlândia desde 1993.\n\nCoordenador Geral e idealizador do Endomeeting do Triângulo Mineiro.",
    image: "/images/coordenadores.jpeg"
  },
  {
    name: "Renata Pereira Georjutti",
    title: "Coordenação Geral • Doutora pela UFU & Mestre pela SLMandic",
    location: "Uberlândia - MG",
    description: "Doutora em Clínica Odontológica pela UFU, Mestre pela SLMandic e coordenadora do curso de Odontologia da UNITRI.",
    fullBio: "Cirurgiã-dentista com Doutorado em Clínica Odontológica Integrada pela Universidade Federal de Uberlândia (UFU) e Mestrado em Endodontia pela Faculdade de Odontologia São Leopoldo Mandic (Campinas).\n\nDocente e Coordenadora do curso de Odontologia do Centro Universitário do Triângulo (Unitri). Possui ampla experiência acadêmica e clínica com ênfase em instrumentação mecanizada, medicamentos intracanais, prevenção de reabsorções radiculares e novos materiais em Endodontia.\n\nAutora de publicações científicas e artigos em periódicos especializados. Atua na clínica privada e é Coordenadora Geral do Endomeeting do Triângulo Mineiro.",
    image: "/images/coordenadores.jpeg"
  }
];

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
      title: `Inscrição: ${title}`,
      message: audience
        ? `Atenção: Esta inscrição é destinada exclusivamente para ${audience}. Será necessário comprovar sua categoria no credenciamento do evento. Caso não haja comprovação, será cobrada a diferença para o valor da inscrição integral no local. Deseja prosseguir?`
        : "Você está sendo redirecionado para a plataforma de pagamentos (Kiwify). As inscrições são limitadas e os lotes podem esgotar rapidamente. Tem certeza que deseja continuar?",
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

      {/* INTRO SECTION ORIGINAL (1ª TELA - FUNDO CLAREADO) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/intro-dark.png"
            alt="Endomeeting Background"
            fill
            className="object-cover opacity-65 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-neutral-950/75" />
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
              alt="4º Endomeeting TM"
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
                Garantir Inscrição
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
                        Vídeo Oficial • 4º Endomeeting TM
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


      {/* SPEAKERS SECTION */}
      <section id="palestrantes" className="w-full py-32 bg-neutral-50/50 relative overflow-hidden">
        {/* International Badge/Text Highlight */}
        <div className="absolute top-0 left-0 w-full bg-brand-900 text-white py-3 z-20 shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs md:text-sm font-black tracking-wide uppercase text-neutral-100 max-w-4xl mx-auto leading-relaxed flex items-center justify-center gap-2.5 flex-wrap">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 animate-pulse inline-block" />
              <span>
                O maior congresso de odontologia do triângulo mineiro, agora se torna{" "}
                <span className="text-brand-400 font-black inline-block">Internacional!</span>
              </span>
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 animate-pulse inline-block" />
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 mt-12">
          <div className="flex flex-col items-center mb-16 text-center max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight"
            >
              Palestrantes de renome internacional que alinham alta tecnologia e resultados de relevância científica.
            </motion.h2>
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

                <div className={`w-48 h-48 rounded-[2rem] bg-neutral-100 mb-6 overflow-hidden flex items-center justify-center relative transition-transform duration-500 shadow-md ${!speaker.isComingSoon && 'group-hover:scale-105'}`}>
                  {speaker.isComingSoon ? (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-neutral-400 animate-pulse" />
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
                        <div
                          className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-xl z-10 shadow-lg border border-white/30 flex items-center justify-center"
                          title="Portugal - Convidado Internacional"
                        >
                          <svg viewBox="0 0 600 400" className="w-6 h-4 rounded-xs shadow-xs" aria-label="Bandeira de Portugal">
                            <rect width="600" height="400" fill="#DA291C" />
                            <rect width="240" height="400" fill="#046A38" />
                            <circle cx="240" cy="200" r="80" fill="#FFCC00" stroke="#000000" strokeWidth="4" />
                            <rect x="212" y="165" width="56" height="70" rx="8" fill="#FFFFFF" stroke="#003399" strokeWidth="4" />
                          </svg>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <h3 className="text-2xl font-black text-neutral-900 mb-3 leading-tight">{speaker.name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-medium line-clamp-3">{speaker.description}</p>

                {!speaker.isComingSoon && (
                  <div className="mt-6 pt-6 border-t border-neutral-50 w-full flex justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-black uppercase tracking-widest text-brand-600 group-hover:text-brand-700 flex items-center gap-2">
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

                <h3 className="text-2xl font-black text-white mb-6 leading-tight">
                  Lote Promocional de Lançamento
                </h3>

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
                    <span>Garantir Inscrição de Lançamento</span>
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

            {/* Card 2: 1º Lote (BLOQUEADO / CARD CLARO / CADEADO DOBRADO) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[2rem] p-8 border-2 border-neutral-200/80 shadow-2xl flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden group hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <div className="w-40 h-40 rounded-[2.5rem] bg-neutral-100 border-2 border-neutral-200/80 shadow-inner flex items-center justify-center text-neutral-500 group-hover:scale-105 transition-all duration-300">
                  <Lock className="w-20 h-20 text-neutral-500 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-base font-black uppercase tracking-widest text-neutral-900 block">
                    1º Lote
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1 block">
                    Em Breve
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: 2º Lote (BLOQUEADO / TOM INTERMEDIÁRIO / CADEADO DOBRADO) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-neutral-800/95 backdrop-blur-xl rounded-[2rem] p-8 border-2 border-neutral-700/80 shadow-xl flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden group hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <div className="w-40 h-40 rounded-[2.5rem] bg-neutral-900/90 border-2 border-neutral-700/70 shadow-2xl flex items-center justify-center text-neutral-400 group-hover:scale-105 transition-all duration-300">
                  <Lock className="w-20 h-20 text-neutral-400 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-base font-black uppercase tracking-widest text-neutral-200 block">
                    2º Lote
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1 block">
                    Em Breve
                  </span>
                </div>
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
                  Ao realizar sua inscrição, o participante assume a responsabilidade de garantir que sua categoria profissional condiz com a inscrição selecionada.
                  <strong className="text-white"> É obrigatória a comprovação da categoria no momento do credenciamento.</strong>
                  Caso não seja apresentada a documentação comprobatória, será cobrada a diferença de valor para a inscrição integral vigente no dia do evento para a liberação da credencial.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* LOCATION SECTION */}
      <section id="localizacao" className="relative w-full py-28 md:py-36 bg-neutral-50/60 overflow-hidden border-t border-neutral-100">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-brand-50 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 opacity-60 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <span className="text-brand-700 font-black uppercase tracking-[0.25em] text-xs px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 mb-4 inline-block w-fit">
                Estrutura & Acesso
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
                Local do Evento
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium">
                O 4º Endomeeting do Triângulo Mineiro será sediado no moderno complexo de convenções da CDL Uberlândia, com auditório climatizado de alta capacidade, infraestrutura tecnológica e localização privilegiada.
              </p>

              <div className="flex items-start gap-5 p-6 bg-white rounded-3xl shadow-lg shadow-neutral-200/50 border border-neutral-200/80">
                <div className="p-4 bg-brand-50 rounded-2xl text-brand-700 shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">CDL Uberlândia</h3>
                  <p className="text-neutral-600 leading-relaxed text-base">
                    Câmara de Dirigentes Lojistas de Uberlândia<br />
                    Av. Belo Horizonte, 1261 - Bairro Osvaldo Rezende<br />
                    Uberlândia/MG - CEP 38400-454
                  </p>
                  <a
                    href="https://maps.google.com/maps?q=CDL+Uberlândia+Av.+Belo+Horizonte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 mt-3 pt-3 border-t border-neutral-100"
                  >
                    <span>Abrir rota no Google Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-neutral-100 rounded-[2.5rem] overflow-hidden aspect-video lg:aspect-[4/3] relative shadow-2xl border-4 border-white"
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

          {/* Convention Photos Gallery: Fotos Maiores em Quadrado (Aspect Square) */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200/80">
              <div>
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
                  Conheça o Espaço do CDL Uberlândia
                </h3>
                <p className="text-sm text-neutral-500 font-medium mt-1">
                  Ambiente planejado para proporcionar máximo conforto, imersão acústica e integração aos participantes.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white group">
                <Image
                  src="/images/cdl/cdl-6.jpeg"
                  alt="CDL Uberlândia - Auditório Principal"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <h4 className="text-lg sm:text-xl font-bold leading-tight">
                    Palco & Auditório Climatizado
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 opacity-90">
                    Capacidade ampla, acústica de ponta e visibilidade total das apresentações.
                  </p>
                </div>
              </div>

              <div className="relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white group">
                <Image
                  src="/images/cdl/cdl-7.jpeg"
                  alt="CDL Uberlândia - Espaço e Recepção"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <h4 className="text-lg sm:text-xl font-bold leading-tight">
                    Estandes & Networking
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 opacity-90">
                    Área integrada para circulação, estandes de patrocinadores e coffee breaks.
                  </p>
                </div>
              </div>

              <div className="relative aspect-square rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white group">
                <Image
                  src="/images/cdl/cdl-5.jpeg"
                  alt="CDL Uberlândia - Fachada e Estrutura"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <h4 className="text-lg sm:text-xl font-bold leading-tight">
                    Estrutura & Recepção
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1 opacity-90">
                    Acessibilidade completa, recepção moderna e fácil estacionamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOMMODATION SECTION */}
      <section id="hospedagem" className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-14">
            <span className="text-brand-700 font-black uppercase tracking-[0.25em] text-xs px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 mb-3">
              Hospedagem & Conforto
            </span>
            <motion.h2
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-neutral-900 mb-4 tracking-tight"
            >
              Onde se hospedar para o <span className="text-brand-900">4º Endomeeting TM</span>
            </motion.h2>
            <p className="text-neutral-500 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
              Selecionamos as melhores opções de hotéis em Uberlândia, garantindo alto padrão, praticidade e fácil acesso ao evento.
            </p>
          </div>

          {/* Hotéis Principais: Novotel & Hotel San Diego (Nobile Suites) em Grid de Destaque */}
          <div className="grid lg:grid-cols-2 gap-6 mb-10">
            {/* Novotel Uberlândia */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-50 border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden hover:border-brand-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-neutral-800 font-black uppercase tracking-wider text-[11px] px-3 py-1 rounded-full bg-neutral-200/70 border border-neutral-300">
                    ◆ Conforto & Padrão Internacional
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-2">
                  Novotel Uberlândia
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                  Infraestrutura moderna e sofisticada de padrão internacional, excelente para quem busca conforto, alta gastronomia e fácil acesso ao evento.
                </p>
              </div>

              <div>
                <div className="p-4 bg-white rounded-2xl border border-neutral-100 text-xs text-neutral-700 mb-6 space-y-1">
                  <p><strong className="text-neutral-900">Endereço:</strong> Av. Rondon Pacheco, 2465 - Saraiva</p>
                  <p><strong className="text-neutral-900">Telefone:</strong> (34) 3230-9000</p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Novotel+Uberlandia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-950 text-white text-xs font-bold rounded-xl text-center transition-all shadow-sm"
                  >
                    Ver no Maps
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=553432309000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold rounded-xl border border-neutral-300 text-center transition-all"
                  >
                    Contato WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Hotel San Diego (Nobile Suites) */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-50 border border-neutral-200/80 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden hover:border-brand-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-neutral-800 font-black uppercase tracking-wider text-[11px] px-3 py-1 rounded-full bg-neutral-200/70 border border-neutral-300">
                    ◆ Executivo & Sofisticação
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mb-2">
                  Hotel San Diego (Nobile Suites)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                  Estrutura executiva de alto padrão na Av. Rondon Pacheco, com suítes amplas, serviços completos e localização estratégica em Uberlândia.
                </p>
              </div>

              <div>
                <div className="p-4 bg-white rounded-2xl border border-neutral-100 text-xs text-neutral-700 mb-6 space-y-1">
                  <p><strong className="text-neutral-900">Endereço:</strong> Av. Rondon Pacheco, 3500 - Santa Maria</p>
                  <p><strong className="text-neutral-900">Telefone:</strong> (34) 3233-4000</p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Hotel+San+Diego+Suites+Uberlandia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-neutral-950 text-white text-xs font-bold rounded-xl text-center transition-all shadow-sm"
                  >
                    Ver no Maps
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=553432334000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-bold rounded-xl border border-neutral-300 text-center transition-all"
                  >
                    Contato WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Outras Opções em Grid Limpo e Compacto */}
          <div className="mt-8">
            <h4 className="text-center text-lg font-black text-neutral-900 mb-6 tracking-tight uppercase">
              Outras Excelentes Opções Próximas
            </h4>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  name: "Ibis Uberlândia",
                  badge: "Custo-Benefício",
                  address: "Av. João Naves de Ávila, 1590 - Santa Mônica",
                  link: "https://www.google.com/maps/search/?api=1&query=Ibis+Uberlandia"
                },
                {
                  name: "Lym Flat Hotel",
                  badge: "Praticidade & Conforto",
                  address: "Rua José Rezende dos Santos, 1140 - Brasil",
                  link: "https://www.google.com/maps/search/?api=1&query=Lym+Flat+Hotel+Uberlandia"
                },
                {
                  name: "B&B Hotels (Praça Tubal Vilela)",
                  badge: "Central & Prático",
                  address: "Praça Tubal Vilela, 192 - Centro",
                  link: "https://www.google.com/maps/search/?api=1&query=BB+Hotels+Uberlandia+Tubal+Vilela"
                }
              ].map((hotel, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200/60 text-left hover:bg-white hover:border-brand-500/30 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center font-bold shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        {hotel.badge}
                      </span>
                    </div>
                    <h5 className="text-base font-bold text-neutral-900 mb-1">{hotel.name}</h5>
                    <p className="text-xs text-neutral-500 mb-3 truncate">{hotel.address}</p>
                  </div>
                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-700 font-bold hover:text-brand-900 flex items-center gap-1 pt-2 border-t border-neutral-200/50"
                  >
                    <span>Ver localização no Maps</span>
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight"
            >
              Coordenação Geral & Realização
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row items-center">
              {/* Foto Oficial da Equipe sem alteração de proporção */}
              <div className="lg:w-1/2 w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-neutral-950">
                <div className="relative w-full max-w-[540px] aspect-[627/481] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/images/coordenadores.jpeg"
                    alt="Equipe de coordenadores do 4º Endomeeting TM"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Informações da Equipe */}
              <div className="lg:w-1/2 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                    Equipe de coordenadores do 4º Endomeeting TM
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                  Excelência Clínica e Compromisso Científico
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                  Com vasta trajetória na Endodontia e no ensino odontológico de alto nível, os coordenadores deste evento estão à frente de cada detalhe, para a excelência do 4º Endomeeting do Triângulo Mineiro em 2027.
                </p>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  {coordinatorsData.map((coord, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOpenSpeakerModal(coord)}
                      className="w-full text-left p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-500/60 hover:bg-white/[0.07] transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                    >
                      <div>
                        <p className="text-base font-bold text-white leading-tight group-hover:text-brand-300 transition-colors">
                          {coord.name}
                        </p>
                        <span className="text-xs text-neutral-400 font-medium mt-1 block">
                          Coordenação Geral
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-400 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <span>Conheça</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
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
