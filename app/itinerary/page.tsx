"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Calculator,
  Download,
  Share2,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";
import itinerariesData from "@/data/itineraries.json";

export default function ItineraryPage() {
  const [selectedItinerary, setSelectedItinerary] = useState<typeof itinerariesData.itineraries[0] | null>(null);
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderDays, setBuilderDays] = useState(3);
  const [builderInterests, setBuilderInterests] = useState<string[]>([]);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const interests = [
    { id: "alam", label: "Wisata Alam", icon: "🏔️" },
    { id: "pantai", label: "Pantai & Laut", icon: "🏖️" },
    { id: "budaya", label: "Budaya & Sejarah", icon: "🏛️" },
    { id: "kuliner", label: "Kuliner", icon: "🍜" },
    { id: "adventure", label: "Petualangan", icon: "🎒" },
    { id: "relaksasi", label: "Relaksasi", icon: "🧘" },
  ];

  const toggleInterest = (id: string) => {
    setBuilderInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
            alt="Itinerary Sulsel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/90 via-deep-ocean/70 to-deep-ocean/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4"
          >
            Rencanakan Perjalanan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Paket Wisata & Itinerary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
          >
            Pilih paket wisata siap pakai atau buat itinerary custom sesuai
            keinginan Anda
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => setShowBuilder(true)}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Buat Itinerary Custom
            </button>
            <a
              href="#paket"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              Lihat Paket Wisata
            </a>
          </motion.div>
        </div>
      </section>

      {/* Itinerary Builder Modal */}
      <AnimatePresence>
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBuilder(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-deep-ocean to-deep-ocean-light p-8 text-white">
                <h2 className="font-heading text-2xl font-bold mb-2">
                  Buat Itinerary Custom
                </h2>
                <p className="text-white/70">
                  Sesuaikan perjalanan impian Anda di Sulawesi Selatan
                </p>
              </div>

              <div className="p-8 space-y-8">
                {/* Duration */}
                <div>
                  <label className="font-semibold text-deep-ocean mb-4 block">
                    Durasi Perjalanan
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setBuilderDays(Math.max(1, builderDays - 1))}
                      className="w-12 h-12 rounded-full bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <div className="font-heading text-4xl font-bold text-deep-ocean">
                        {builderDays}
                      </div>
                      <div className="text-muted text-sm">Hari</div>
                    </div>
                    <button
                      onClick={() => setBuilderDays(Math.min(14, builderDays + 1))}
                      className="w-12 h-12 rounded-full bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="font-semibold text-deep-ocean mb-4 block">
                    Minat Wisata (Pilih beberapa)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interests.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          builderInterests.includes(interest.id)
                            ? "border-gold bg-gold/10 text-deep-ocean"
                            : "border-border hover:border-gold/50"
                        }`}
                      >
                        <span className="text-xl">{interest.icon}</span>
                        <span className="text-sm font-medium">{interest.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Budget */}
                <div className="bg-cream rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-6 h-6 text-gold" />
                    <span className="font-semibold text-deep-ocean">Estimasi Budget</span>
                  </div>
                  <div className="font-heading text-3xl font-bold text-gold mb-2">
                    {formatPrice(builderDays * 1500000)}
                  </div>
                  <p className="text-sm text-muted">
                    *Termasuk akomodasi, transportasi, dan tiket masuk
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setShowBuilder(false);
                      alert("Fitur ini akan segera hadir! Terima kasih atas minat Anda.");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate Itinerary
                  </button>
                  <button
                    onClick={() => setShowBuilder(false)}
                    className="px-6 py-4 border-2 border-border text-deep-ocean font-semibold rounded-full hover:bg-cream transition-all"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ready-made Packages */}
      <section id="paket" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Paket Siap Pakai"
            title="Pilih Paket Wisata"
            description="Itinerary yang sudah dirancang dengan sempurna untuk pengalaman terbaik"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {itinerariesData.itineraries.map((itinerary) => (
              <StaggerItem key={itinerary.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer ${
                    selectedItinerary?.id === itinerary.id
                      ? "ring-2 ring-gold"
                      : ""
                  }`}
                  onClick={() => setSelectedItinerary(itinerary)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={itinerary.image}
                      alt={itinerary.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/70 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-deep-ocean text-sm font-semibold rounded-full">
                      {itinerary.duration} Hari
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-xl font-bold text-white">
                        {itinerary.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-muted text-sm line-clamp-2 mb-4">
                      {itinerary.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {itinerary.highlights.slice(0, 3).map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-cream text-deep-ocean text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-xs text-muted">Estimasi Budget</span>
                        <div className="font-heading text-xl font-bold text-gold">
                          {formatPrice(itinerary.budget)}
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-deep-ocean font-medium text-sm group-hover:text-gold transition-colors">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Selected Itinerary Detail */}
          <AnimatePresence>
            {selectedItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                {/* Header */}
                <div className="relative h-64">
                  <Image
                    src={selectedItinerary.image}
                    alt={selectedItinerary.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/90 via-deep-ocean/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-4 py-1.5 bg-gold text-deep-ocean text-sm font-semibold rounded-full mb-3">
                      {selectedItinerary.duration} Hari Perjalanan
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-white mb-2">
                      {selectedItinerary.title}
                    </h2>
                    <p className="text-white/80">{selectedItinerary.description}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-deep-ocean text-deep-ocean font-semibold rounded-full hover:bg-cream transition-all">
                      <Share2 className="w-4 h-4" />
                      Bagikan
                    </button>
                  </div>

                  {/* Days */}
                  <div className="space-y-4">
                    {selectedItinerary.days.map((day) => (
                      <div
                        key={day.day}
                        className="border border-border rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleDay(day.day)}
                          className="w-full flex items-center justify-between p-5 bg-cream hover:bg-cream-dark transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-deep-ocean text-white rounded-xl flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                            <div className="text-left">
                              <div className="font-heading text-lg font-bold text-deep-ocean">
                                Hari {day.day}
                              </div>
                              <div className="text-sm text-muted">{day.title}</div>
                            </div>
                          </div>
                          {expandedDays.includes(day.day) ? (
                            <ChevronUp className="w-5 h-5 text-muted" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedDays.includes(day.day) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 space-y-4">
                                {day.activities.map((activity, index) => (
                                  <div
                                    key={index}
                                    className="flex gap-4 items-start"
                                  >
                                    <div className="flex-shrink-0">
                                      <div className="w-20 text-center">
                                        <div className="text-sm font-semibold text-deep-ocean">
                                          {activity.time}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gold mt-1.5 relative">
                                      {index < day.activities.length - 1 && (
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gold/30" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-deep-ocean">
                                        {activity.activity}
                                      </div>
                                      <div className="flex items-center gap-1 text-sm text-muted">
                                        <MapPin className="w-3 h-3" />
                                        {activity.location}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Budget Summary */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-deep-ocean to-deep-ocean-light rounded-2xl text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="text-sm text-white/70 mb-1">Total Estimasi Budget</div>
                        <div className="font-heading text-3xl font-bold">
                          {formatPrice(selectedItinerary.budget)}
                        </div>
                        <div className="text-sm text-white/70">
                          *Termasuk akomodasi, transportasi, dan tiket masuk
                        </div>
                      </div>
                      <button className="px-8 py-4 bg-gold text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all">
                        Pesan Paket Ini
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Mengapa Memilih Kami"
            title="Keuntungan Paket Wisata Kami"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "Itinerary Terencana",
                desc: "Setiap menit perjalanan Anda sudah diatur dengan baik",
              },
              {
                icon: Calculator,
                title: "Harga Transparan",
                desc: "Tidak ada biaya tersembunyi, semua sudah termasuk",
              },
              {
                icon: MapPin,
                title: "Lokasi Terbaik",
                desc: "Destinasi pilihan yang tidak boleh dilewatkan",
              },
              {
                icon: Calendar,
                title: "Fleksibel",
                desc: "Bisa disesuaikan dengan jadwal Anda",
              },
            ].map((feature, index) => (
              <MotionWrapper key={feature.title} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-deep-ocean mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted text-sm">{feature.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
