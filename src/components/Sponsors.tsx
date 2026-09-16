"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface SponsorItem {
  name: string;
  logo: string;
  href?: string;
}

const sponsorsData: {
  diamante: SponsorItem[];
  ouro: SponsorItem[];
  prata: SponsorItem[];
  apoiadores: SponsorItem[];
} = {
  diamante: [
    { name: "Ceddro Diagnóstico por Imagem", logo: "/images/patrocinadores/diamante/ceddro.png" },
    { name: "Easy Bassi", logo: "/images/patrocinadores/diamante/easy-bassi.png" },
    { name: "Helse", logo: "/images/patrocinadores/diamante/Helse.webp" },
    { name: "Ricardo Oliveira", logo: "/images/patrocinadores/diamante/ricardo-oliveira.png" },
    { name: "Solla", logo: "/images/patrocinadores/diamante/solla.png" },
    { name: "Uniodonto", logo: "/images/patrocinadores/diamante/uniodonto.png" },
  ],
  ouro: [
    { name: "AM Equipamentos", logo: "/images/patrocinadores/ouro/am-equipamentos.png" },
    { name: "Gnatus", logo: "/images/patrocinadores/ouro/gnatus.png" },
    { name: "Univy", logo: "/images/patrocinadores/ouro/univy.png" },
  ],
  prata: [],
  apoiadores: [
    { name: "Equipe Rodrigo Faria", logo: "/images/patrocinadores/apoiadores/equipe-rodrigo-faria-logo.png" },
    { name: "IQO", logo: "/images/patrocinadores/apoiadores/iqo.png" },
    { name: "SBEndo", logo: "/images/patrocinadores/apoiadores/sbendo.png" },
  ],
};

export function Sponsors() {
  return (
    <section id="patrocinadores" className="w-full py-28 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-50/30 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-neutral-900 mb-6 tracking-tight"
          >
            Patrocinadores
          </motion.h2>
          <p className="text-neutral-500 max-w-2xl text-lg sm:text-xl font-medium">
            Parceiros que tornam o <span className="text-brand-900 font-bold">4º Endomeeting TM</span> uma grande realidade.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-20 max-w-6xl mx-auto">
          {/* Cota Diamante */}
          {sponsorsData.diamante.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-8 sm:mb-10">
                <span className="text-xs sm:text-sm font-black text-cyan-700 tracking-[0.25em] uppercase bg-cyan-50 border border-cyan-200/80 px-7 py-2 rounded-full shadow-sm">
                  💎 Cota Diamante
                </span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 w-full max-w-5xl">
                {sponsorsData.diamante.map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="w-64 h-32 sm:w-72 sm:h-36 bg-gradient-to-b from-white to-cyan-50/20 rounded-3xl border-2 border-cyan-100 shadow-[0_15px_35px_rgba(6,182,212,0.08)] hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 p-5 flex items-center justify-center group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/0 via-cyan-100/20 to-cyan-200/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 250px, 300px"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Cota Ouro */}
          {sponsorsData.ouro.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <h3 className="text-xs font-bold text-amber-600 tracking-[0.25em] uppercase mb-8 sm:mb-10 bg-amber-50 border border-amber-200/80 px-6 py-2 rounded-full shadow-sm">
                ⭐ Cota Ouro
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 w-full max-w-4xl">
                {sponsorsData.ouro.map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="w-56 h-28 sm:w-64 sm:h-32 bg-white rounded-2xl border-2 border-amber-100 shadow-[0_10px_25px_rgba(245,158,11,0.06)] hover:shadow-xl hover:border-amber-300 transition-all duration-300 p-4 flex items-center justify-center group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/0 to-amber-50/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 200px, 250px"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Cota Prata (condicional quando houver patrocinadores prata) */}
          {sponsorsData.prata.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <h3 className="text-xs font-bold text-slate-500 tracking-[0.25em] uppercase mb-8 bg-slate-50 border border-slate-200/80 px-6 py-2 rounded-full shadow-sm">
                Cota Prata
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 w-full max-w-4xl">
                {sponsorsData.prata.map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -4 }}
                    className="w-48 h-24 sm:w-56 sm:h-28 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-4 flex items-center justify-center group relative overflow-hidden"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 180px, 220px"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Apoiadores */}
          {sponsorsData.apoiadores.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center pt-8 border-t border-neutral-100"
            >
              <h3 className="text-xs font-bold text-neutral-400 tracking-[0.25em] uppercase mb-8">
                Apoiadores
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-5xl">
                {sponsorsData.apoiadores.map((item, i) => {
                  const isRodrigo = item.name.toLowerCase().includes("rodrigo");
                  return (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05 }}
                      className={`${
                        isRodrigo ? "w-52 h-26 sm:w-64 sm:h-32 shadow-sm" : "w-44 h-22 sm:w-52 sm:h-26"
                      } bg-neutral-50/90 rounded-2xl border border-neutral-200/80 hover:bg-white hover:border-brand-300 hover:shadow-md transition-all duration-300 ${
                        isRodrigo ? "p-2 sm:p-3" : "p-4"
                      } flex items-center justify-center group relative overflow-hidden`}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={item.logo}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 180px, 240px"
                          className={`object-contain transition-transform duration-300 group-hover:scale-105 ${
                            isRodrigo ? "p-0.5 scale-110 sm:scale-115" : "p-2"
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
