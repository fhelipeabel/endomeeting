"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header only after scrolling past 80% of the first fold
      const threshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > threshold);
      setIsScrolled(window.scrollY > window.innerHeight + 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Palestrantes", href: "#palestrantes" },
    { name: "Ingressos", href: "#ingressos" },
    { name: "Localização", href: "#localizacao" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? "bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3 border-b border-white/20" : "bg-white/40 backdrop-blur-md py-5"
      }`}
    >
      {/* Scroll Progress Bar */}
      {isScrolled && (
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-brand-900"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Image 
            src="/logo.png.png" 
            alt="Endomeeting Logo" 
            width={180} 
            height={50} 
            className="h-10 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-bold tracking-tight transition-all hover:text-brand-900 hover:scale-105 ${
                isScrolled ? "text-neutral-500" : "text-neutral-800"
              }`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#ingressos"
            className="rounded-2xl bg-brand-900 px-8 py-3 text-sm font-bold text-white shadow-2xl shadow-brand-900/40 hover:bg-brand-950 transition-all hover:scale-105 active:scale-95"
          >
            Garantir Vaga
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-brand-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col border-t border-neutral-100"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-4 border-b border-neutral-50 text-neutral-600 font-medium hover:bg-neutral-50 hover:text-brand-600"
            >
              {link.name}
            </a>
          ))}
          <div className="p-4">
            <a
              href="#ingressos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center rounded-xl bg-brand-900 px-6 py-3 font-semibold text-white shadow-md"
            >
              Garantir Vaga
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
