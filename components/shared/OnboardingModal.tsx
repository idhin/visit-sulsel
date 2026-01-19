"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  X,
  Plane,
  MapPin,
  Sparkles,
  ChevronRight,
  Clock,
  Wallet,
  Users,
  Star,
  Route,
  Compass,
} from "lucide-react";

const ONBOARDING_KEY = "visitsulsel_onboarded";

interface OnboardingModalProps {
  forceShow?: boolean;
}

export default function OnboardingModal({ forceShow = false }: OnboardingModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has already seen onboarding
    if (forceShow) {
      setIsOpen(true);
      return;
    }

    const hasOnboarded = localStorage.getItem(ONBOARDING_KEY);
    if (!hasOnboarded) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  const handleClose = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setIsOpen(false);
  };

  const handleSelectMode = (mode: "planning" | "onlocation") => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    localStorage.setItem("visitsulsel_mode", mode);
    setIsOpen(false);
    
    if (mode === "planning") {
      router.push("/rencanakan");
    } else {
      router.push("/jelajahi");
    }
  };

  const highlights = [
    { icon: Star, text: "500+ Destinasi Wisata", color: "text-yellow-500" },
    { icon: Users, text: "40M+ Wisatawan/Tahun", color: "text-blue-500" },
    { icon: Wallet, text: "Mulai Rp500rb/Trip", color: "text-green-500" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {step === 0 && (
              <>
                {/* Hero Image */}
                <div className="relative h-48 sm:h-56">
                  <Image
                    src="https://www.gotravelaindonesia.com/wp-content/uploads/Tana-Toraja-Sulawesi.jpg"
                    alt="Sulawesi Selatan"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full"
                    >
                      <Sparkles className="w-4 h-4" />
                      Selamat Datang
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Jelajahi Sulawesi Selatan
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-6"
                  >
                    Dari keindahan Tana Toraja hingga pantai eksotis Bira, temukan petualangan tak terlupakan.
                  </motion.p>

                  {/* Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-around mb-6 py-4 bg-gray-50 rounded-2xl"
                  >
                    {highlights.map((item, index) => (
                      <div key={index} className="text-center">
                        <item.icon className={`w-6 h-6 mx-auto mb-1 ${item.color}`} />
                        <p className="text-xs text-gray-600 font-medium">{item.text}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                  >
                    Mulai Sekarang
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    onClick={handleClose}
                    className="w-full py-3 text-gray-500 text-sm mt-2"
                  >
                    Lewati untuk sekarang
                  </motion.button>
                </div>
              </>
            )}

            {step === 1 && (
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Di mana kamu sekarang?</h2>
                  <p className="text-gray-500 text-sm">Kami akan sesuaikan pengalaman untukmu</p>
                </motion.div>

                {/* Options */}
                <div className="space-y-3">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectMode("planning")}
                    className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl text-left hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <Plane className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Belum di Sulawesi Selatan</h3>
                        <p className="text-sm text-gray-500">Saya ingin merencanakan perjalanan</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100">
                        <Route className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Rencanakan trip
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="w-3 h-3" />
                          Estimasi budget
                        </span>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectMode("onlocation")}
                    className="w-full p-4 bg-white border-2 border-gray-200 rounded-2xl text-left hover:border-green-500 hover:bg-green-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors">
                        <MapPin className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Sudah di Sulawesi Selatan</h3>
                        <p className="text-sm text-gray-500">Saya ingin jelajahi sekitar</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100">
                        <Compass className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Kuliner terdekat
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Rekomendasi
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => setStep(0)}
                  className="w-full py-3 text-gray-500 text-sm mt-4 flex items-center justify-center gap-1"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Kembali
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to check if user has been onboarded
export function useOnboarding() {
  const [hasOnboarded, setHasOnboarded] = useState(true);

  useEffect(() => {
    const onboarded = localStorage.getItem(ONBOARDING_KEY);
    setHasOnboarded(!!onboarded);
  }, []);

  const resetOnboarding = () => {
    localStorage.removeItem(ONBOARDING_KEY);
    setHasOnboarded(false);
  };

  return { hasOnboarded, resetOnboarding };
}
