"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("id");

  const handleChange = (code: string) => {
    setCurrentLang(code);
    localStorage.setItem("locale", code);
    setIsOpen(false);
    // Trigger page refresh or state update
    window.dispatchEvent(new CustomEvent("localeChange", { detail: code }));
  };

  const current = languages.find((l) => l.code === currentLang);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <span className="text-lg">{current?.flag}</span>
        <Globe className="w-4 h-4 text-white/70" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleChange(lang.code)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium text-deep-ocean flex-1 text-left">
                    {lang.name}
                  </span>
                  {currentLang === lang.code && (
                    <Check className="w-4 h-4 text-gold" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
