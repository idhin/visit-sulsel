"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight, Search, Globe, Mountain, Waves, Landmark } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import destinationsData from "@/data/destinations.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Globe,
  Mountain,
  Waves,
  Landmark,
};

export default function DestinasiPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinationsData.destinations.filter((dest) => {
    const matchesCategory =
      activeCategory === "semua" || dest.category === activeCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
            alt="Destinasi Sulsel"
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
            Jelajahi Keindahan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Destinasi Wisata
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Temukan tempat-tempat menakjubkan di Sulawesi Selatan, dari pegunungan
            yang megah hingga pantai yang memesona
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Cari destinasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {destinationsData.categories.map((cat) => {
                const IconComponent = iconMap[cat.icon];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-deep-ocean text-white"
                        : "bg-cream text-deep-ocean hover:bg-cream-dark"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-muted">
              Menampilkan{" "}
              <span className="font-semibold text-deep-ocean">
                {filteredDestinations.length}
              </span>{" "}
              destinasi
            </p>
          </div>

          {filteredDestinations.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => (
                <StaggerItem key={dest.id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <Link href={`/destinasi/${dest.slug}`}>
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/70 via-transparent to-transparent" />

                        {/* Category badge */}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-deep-ocean text-xs font-semibold rounded-full capitalize">
                          {dest.category}
                        </span>

                        {/* Rating */}
                        <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-xs font-semibold text-deep-ocean">
                            {dest.rating}
                          </span>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                            {dest.name}
                          </h3>
                          <div className="flex items-center gap-1 text-white/80 text-sm">
                            <MapPin className="w-4 h-4" />
                            {dest.location}
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-muted text-sm line-clamp-2 mb-4">
                          {dest.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {dest.highlights.slice(0, 3).map((highlight) => (
                            <span
                              key={highlight}
                              className="px-2 py-1 bg-cream text-deep-ocean text-xs rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-gold font-semibold text-sm">
                            {dest.price}
                          </span>
                          <span className="flex items-center gap-1 text-deep-ocean font-medium text-sm group-hover:text-gold group-hover:gap-2 transition-all">
                            Lihat Detail
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-cream-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-muted" />
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2">
                Tidak ada hasil
              </h3>
              <p className="text-muted">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
