"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  ChevronRight, 
  CheckCircle,
  Clock,
  User
} from "lucide-react";

interface HeroIndexBannerProps {
  onSelectSpeaker?: (speakerName: string) => void;
}

export default function HeroIndexBanner({ onSelectSpeaker }: HeroIndexBannerProps) {
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const speakersList = [
    { 
      name: "Rui Pereira Costa", 
      shortName: "Rui Pereira", 
      origin: "Portugal", 
      isInternational: true,
      image: "/images/img-rui.jpeg"
    },
    { 
      name: "Mário Zuolo", 
      shortName: "Mário Zuolo", 
      origin: "São Paulo",
      image: "/images/img-mario-zuolo.jpeg"
    },
    { 
      name: "Carlos Eduardo Bueno", 
      shortName: "Carlos E. Bueno", 
      origin: "Campinas",
      image: "/images/img-bueno.jpeg"
    },
    { 
      name: "Patrícia Ferrari", 
      shortName: "Patrícia Ferrari", 
      origin: "São Paulo",
      image: "/images/img-patricia.webp"
    },
    { 
      name: "Paulo Vinícius", 
      shortName: "Paulo Vinícius", 
      origin: "Uberlândia",
      initials: "PV"
    },
    { 
      name: "Alexandre Capelli", 
      shortName: "Alexandre Capelli", 
      origin: "Ribeirão Preto",
      initials: "AC"
    },
    { 
      name: "Amanda Leal", 
      shortName: "Amanda Leal", 
      origin: "Belo Horizonte",
      initials: "AL"
    },
    { 
      name: "Maria Ilma", 
      shortName: "Maria Ilma", 
      origin: "Minas Gerais",
      initials: "MI"
    },
    { 
      name: "Juliana Vilela", 
      shortName: "Juliana Vilela", 
      origin: "Goiás",
      initials: "JV"
    },
    { 
      name: "Samuel Nogueira", 
      shortName: "Samuel Nogueira", 
      origin: "São Paulo",
      initials: "SN"
    },
  ];

  const committeeMembers = [
    {
      name: "Cristiane da Cruz Silva",
      shortName: "Cristiane Silva",
      role: "Comissão",
      initials: "CS",
      image: "" // adicione aqui o caminho ex: "/images/comissao/cristiane.jpg"
    },
    {
      name: "Rodrigo Antonio de Faria",
      shortName: "Rodrigo Faria",
      role: "Coordenação",
      initials: "RF",
      image: "" // adicione aqui o caminho ex: "/images/comissao/rodrigo.jpg"
    },
    {
      name: "Renata Pereira Georjutti",
      shortName: "Renata Georjutti",
      role: "Comissão",
      initials: "RG",
      image: "" // adicione aqui o caminho ex: "/images/comissao/renata.jpg"
    },
  ];

  const pastEditionsData = [
    { year: "2024", image: "/images/convention-1.png" },
    { year: "2025", image: "/images/centerconvention/salao-cadeiras.webp" },
    { year: "2026", image: "/images/centerconvention/img-desfocada-palestra.webp" },
  ];

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 text-white overflow-hidden flex flex-col justify-between py-6 md:py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      {/* BACKGROUND AMBIENCE & LIGHTING (Fundo Escuro Premium) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Imagem de Fundo Original com Opacidade e Escala Suave */}
        <Image
          src="/intro-dark.png"
          alt="Endomeeting Background"
          fill
          className="object-cover opacity-25 scale-105"
          priority
        />

        {/* Gradiente Vignette Cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/70 to-neutral-950" />

        {/* Glows Radiais Tons Vinho / Brand Red de Alta Sofisticação */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-brand-900/35 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-brand-800/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 -left-20 w-[550px] h-[500px] bg-brand-600/15 rounded-full blur-[150px]" />

        {/* Microgrid de Precisão Tecnológica */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(rgba(220,38,38,0.25) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between flex-1">
        
        {/* MAIN TWO-COLUMN GRID: Logo e conteúdo da esquerda alinhados com o conteúdo da direita */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start mb-6">
          
          {/* LEFT COLUMN (Logo + Quick Info + Palestrantes Compactados) */}
          <div
            className="lg:col-span-7 flex flex-col gap-4 sm:gap-5"
          >
            {/* Quick Info Bar: Logo à Esquerda dos Dois Cards (Data e Local) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* LOGO À ESQUERDA (Centralizada verticalmente com os 2 cards adjacentes) */}
              <div className="md:col-span-4 flex items-center justify-center md:justify-start relative py-2">
                <div className="absolute left-1/2 md:left-24 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 bg-brand-600/20 rounded-full blur-2xl -z-10" />
                <div className="relative transition-transform duration-500 hover:scale-105 flex items-center justify-center">
                  <Image
                    src="/logo.png.png"
                    alt="4º Endomeeting"
                    width={280}
                    height={75}
                    className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] h-auto object-contain brightness-200 invert grayscale transition-all duration-500 hover:brightness-250 drop-shadow-[0_4px_25px_rgba(220,38,38,0.35)]"
                    priority
                  />
                </div>
              </div>

              {/* Card Data (Centro / Adjacente à Logo) */}
              <div className="md:col-span-4 h-full bg-neutral-950/80 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 border border-white/10 shadow-2xl hover:border-brand-500/40 transition-all duration-300 group relative overflow-hidden flex flex-col justify-center">
                {/* Imagem de Fundo Temática Gerada */}
                <Image
                  src="/images/card-date-bg.jpg"
                  alt="Data e Cronograma"
                  fill
                  className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                />
                {/* Overlay Gradiente Escuro para Legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/75 to-neutral-950/50 pointer-events-none" />

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-transparent z-10" />
                <div className="relative z-10 flex items-center gap-3 mb-1.5">
                  <div className="p-2.5 rounded-xl bg-brand-950/90 text-brand-400 border border-brand-800/60 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                    <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300 block">Data Oficial</span>
                    <h3 className="text-sm sm:text-base font-black text-white leading-tight drop-shadow-sm">30/04 e 01/05/2027</h3>
                  </div>
                </div>
                <p className="relative z-10 text-[11px] text-neutral-300 pl-10 font-medium flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-brand-400" />
                  Sexta e Sábado
                </p>
              </div>

              {/* Card Local: CDL (Direita / Adjacente ao Card Data) */}
              <button
                type="button"
                onClick={() => scrollTo("localizacao")}
                className="md:col-span-4 h-full bg-neutral-950/80 rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 text-left border border-white/10 shadow-2xl hover:border-brand-500/40 transition-all duration-300 group cursor-pointer relative overflow-hidden flex flex-col justify-center"
              >
                {/* Imagem de Fundo Real do Local / CDL & Centro de Convenções */}
                <Image
                  src="/images/convention-2.png"
                  alt="Local do Evento CDL Uberlândia"
                  fill
                  className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                />
                {/* Overlay Gradiente Escuro para Legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/75 to-neutral-950/50 pointer-events-none" />

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="relative z-10 flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-brand-950/90 text-brand-400 border border-brand-800/60 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                      <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-300 block">Local do Evento</span>
                      <h3 className="text-sm sm:text-base font-black text-white leading-tight group-hover:text-brand-300 transition-colors drop-shadow-sm">
                        CDL Uberlândia
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="relative z-10 text-[11px] text-brand-400 font-bold pl-10 flex items-center gap-1">
                  (clique para informações)
                </p>
              </button>
            </div>

            {/* Card Palestrantes (Mais compacto e equilibrado em altura) */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-950/80 flex items-center justify-center text-brand-400 border border-brand-800/50">
                    <span className="text-sm font-black">★</span>
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black tracking-tight text-white uppercase">
                      Palestrantes
                    </h2>
                    <span className="text-[10px] text-brand-400 font-semibold">10 grandes nomes confirmados</span>
                  </div>
                </div>
              </div>

              {/* Grid de Fotos Compactas de Cada Palestrante */}
              <div className="grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
                {speakersList.map((speaker, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (onSelectSpeaker) {
                        onSelectSpeaker(speaker.name);
                      }
                      scrollTo("palestrantes");
                    }}
                    className="flex flex-col items-center p-2 rounded-xl bg-white/[0.025] hover:bg-brand-950/50 border border-white/5 hover:border-brand-500/50 hover:shadow-md transition-all duration-250 group cursor-pointer text-center relative"
                  >
                    {/* Fotinha do Palestrante otimizada para ocupar menos altura */}
                    <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden border border-white/15 group-hover:border-brand-500 transition-all duration-300 shadow-sm group-hover:scale-105 bg-neutral-900 flex items-center justify-center shrink-0">
                      {speaker.image ? (
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 flex flex-col items-center justify-center text-brand-300">
                          <span className="font-black text-[10px] tracking-wider">{speaker.initials}</span>
                          <User className="w-3 h-3 text-brand-400 mt-0.5" />
                        </div>
                      )}

                      {speaker.isInternational && (
                        <div 
                          className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-500 border border-neutral-950 ring-1 ring-brand-400" 
                          title="Convidado Internacional" 
                        />
                      )}
                    </div>

                    {/* Nome compacto */}
                    <span className="text-[10px] sm:text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors mt-1.5 leading-tight line-clamp-1">
                      {speaker.shortName || speaker.name}
                    </span>

                    {/* Origem */}
                    {speaker.origin && (
                      <span className="text-[8.5px] text-neutral-400 group-hover:text-brand-300 transition-colors uppercase tracking-wider font-semibold mt-0.5 truncate max-w-full">
                        {speaker.origin}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Subindo no topo alinhado com a Logo */}
          <div
            className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4"
          >
            {/* Comissão Organizadora */}
            <button
              type="button"
              onClick={() => scrollTo("sobre")}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-left border border-white/10 shadow-2xl hover:border-brand-500/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-950/80 text-brand-400 border border-brand-800/50 shadow-inner">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                    Comissão Organizadora
                  </h3>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Membros na Horizontal (Grid de 3 Colunas) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-2.5">
                {committeeMembers.map((member, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-2 rounded-xl bg-white/[0.025] hover:bg-brand-950/40 border border-white/5 hover:border-brand-500/30 transition-all duration-200 group/member">
                    {/* Foto ou Avatar com Iniciais */}
                    <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/15 group-hover/member:border-brand-500/50 bg-neutral-900 flex items-center justify-center shrink-0 shadow-sm mb-1.5 transition-transform duration-200 group-hover/member:scale-105">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-brand-950 to-neutral-900 flex items-center justify-center text-brand-300 font-bold text-xs tracking-wider">
                          {member.initials}
                        </div>
                      )}
                    </div>
                    
                    {/* Informações do Membro */}
                    <span className="text-[10px] sm:text-[11px] font-bold text-neutral-200 group-hover:text-white transition-colors leading-tight line-clamp-2">
                      {member.shortName || member.name}
                    </span>
                    <span className="text-[9px] text-brand-400 font-medium tracking-wide mt-0.5">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-brand-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                (clique para mais informações)
              </p>
            </button>

            {/* Patrocinadores */}
            <button
              type="button"
              onClick={() => scrollTo("patrocinadores")}
              className="bg-neutral-950/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-left border border-white/10 shadow-2xl hover:border-brand-500/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Imagem de Fundo Temática de Feira & Stands */}
              <Image
                src="/images/card-sponsors-bg.jpg"
                alt="Feira Comercial e Patrocinadores"
                fill
                className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 pointer-events-none"
              />
              {/* Overlay Gradiente Escuro */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/85 to-neutral-950/60 group-hover:via-neutral-950/75 transition-all pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-950/90 text-brand-400 border border-brand-800/60 shadow-inner">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white drop-shadow-sm">
                      Patrocinadores
                    </h3>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </div>

              <p className="relative z-10 text-xs text-neutral-300 mb-2 leading-relaxed font-medium">
                Marcas e empresas que impulsionam o congresso com tecnologia e inovação clínica.
              </p>

              <p className="relative z-10 text-[11px] text-brand-400 font-bold flex items-center gap-1">
                (clique para ver marcas)
              </p>
            </button>

            {/* Eventos Anteriores (2024, 2025, 2026) */}
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-6 h-6 rounded-lg bg-brand-950/80 flex items-center justify-center text-brand-400 border border-brand-800/50">
                  <span className="text-xs font-black">★</span>
                </div>
                <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-white">
                  Eventos Anteriores
                </h3>
              </div>

              <p className="text-xs text-neutral-400 mb-3 leading-relaxed font-medium">
                Trajetória e registros marcantes das edições anteriores:
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {pastEditionsData.map((edition) => (
                  <button
                    key={edition.year}
                    type="button"
                    onClick={() => {
                      if (edition.year === "2026") {
                        scrollTo("hero");
                      } else {
                        scrollTo("sobre");
                      }
                    }}
                    className="relative overflow-hidden py-3 px-2 rounded-xl bg-neutral-900 border border-white/10 hover:border-brand-500/60 text-center transition-all duration-300 group/btn cursor-pointer hover:scale-105 shadow-lg flex flex-col items-center justify-center min-h-[64px]"
                  >
                    {/* Imagem de Fundo da Respectiva Edição */}
                    <Image
                      src={edition.image}
                      alt={`Edição ${edition.year}`}
                      fill
                      className="object-cover opacity-35 group-hover/btn:opacity-65 group-hover/btn:scale-115 transition-all duration-500 pointer-events-none"
                    />
                    {/* Overlay Escuro com Glow ao passar o mouse */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/50 group-hover/btn:from-brand-950/80 group-hover/btn:via-neutral-950/60 group-hover/btn:to-neutral-950/30 transition-all pointer-events-none" />

                    <span className="relative z-10 text-sm font-black text-white group-hover/btn:text-brand-300 transition-colors block drop-shadow-md">
                      {edition.year}
                    </span>
                    <span className="relative z-10 text-[9px] text-neutral-300 group-hover/btn:text-white uppercase tracking-widest font-bold block mt-0.5 drop-shadow-xs">
                      Edição
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM CENTER: CTA Inscrições */}
        <div
          className="flex flex-col items-center text-center w-full max-w-lg mx-auto mt-1 mb-2"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 20px 45px rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollTo("ingressos")}
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-4.5 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 hover:from-brand-600 hover:to-brand-700 text-white rounded-2xl text-base sm:text-lg font-black tracking-wide shadow-2xl shadow-brand-900/60 border border-brand-500/40 flex items-center justify-center gap-3 group cursor-pointer transition-all"
          >
            <span>Inscrições</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>

          <p className="text-xs text-neutral-400 mt-2.5 flex items-center gap-1.5 font-semibold">
            <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
            Lotes especiais de lançamento por tempo limitado
          </p>
        </div>

      </div>
    </section>
  );
}
