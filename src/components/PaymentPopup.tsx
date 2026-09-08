"use client";

import { X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  title?: string;
  message?: string;
}

export function PaymentPopup({ isOpen, onClose, checkoutUrl, title, message }: PaymentPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-brand-50 p-3">
                  <AlertCircle className="h-8 w-8 text-brand-600" />
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-neutral-900">
                  {title || "Aviso Importante"}
                </h3>
                
                <p className="mb-6 text-sm text-neutral-600">
                  {message || "Você está sendo redirecionado para a plataforma de pagamentos (Kiwify)."}
                </p>
                
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl bg-brand-900 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-800 transition-colors"
                    onClick={onClose}
                  >
                    Continuar
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
