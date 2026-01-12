"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Star,
  Search,
  Building,
  Hotel,
  Palmtree,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";
import accommodationsData from "@/data/accommodations.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Building,
  Hotel,
  Palmtree,
};

const facilityIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  WiFi: Wifi,
  Parking: Car,
  Restaurant: Coffee,
  Pool: Waves,
  Gym: Dumbbell,
  "Beach Access": Waves,
  Spa: Waves,
};

export default function AkomodasiPage() {
  const [activeType, setActiveType] = useState("semua");
  const [activeLocation, setActiveLocation] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAccommodations = useMemo(() => {
    let results = accommodationsData.accommodations.filter((acc) => {
      const matchesType = activeType === "semua" || acc.type === activeType;
      const matchesLocation =
        activeLocation === "semua" ||
        acc.location.toLowerCase().includes(activeLocation.toLowerCase());
      const matchesSearch =
        acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = acc.price >= priceRange[0] && acc.price <= priceRange[1];
      return matchesType && matchesLocation && matchesSearch && matchesPrice;
    });

    // Sort
    results.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "stars":
          return b.stars - a.stars;
        default:
          return 0;
      }
    });

    return results;
  }, [activeType, activeLocation, searchQuery, priceRange, sortBy]);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
            alt="Akomodasi Sulsel"
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
            Penginapan Nyaman
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Akomodasi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Temukan hotel dan resort terbaik untuk menginap selama berlibur di
            Sulawesi Selatan
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Cari hotel atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Type filter */}
              {accommodationsData.types.map((type) => {
                const IconComponent = iconMap[type.icon];
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeType === type.id
                        ? "bg-deep-ocean text-white"
                        : "bg-cream text-deep-ocean hover:bg-cream-dark"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {type.name}
                  </button>
                );
              })}

              {/* More filters toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showFilters
                    ? "bg-gold text-deep-ocean"
                    : "bg-cream text-deep-ocean hover:bg-cream-dark"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          {/* Extended filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-deep-ocean mb-2 block">
                    Lokasi
                  </label>
                  <select
                    value={activeLocation}
                    onChange={(e) => setActiveLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    {accommodationsData.locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-deep-ocean mb-2 block">
                    Urutkan
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
                  >
                    <option value="rating">Rating Tertinggi</option>
                    <option value="price-low">Harga Terendah</option>
                    <option value="price-high">Harga Tertinggi</option>
                    <option value="stars">Bintang Tertinggi</option>
                  </select>
                </div>

                {/* Price range */}
                <div>
                  <label className="text-sm font-medium text-deep-ocean mb-2 block">
                    Rentang Harga: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={2000000}
                    step={100000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-gold"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Accommodations List */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-muted">
              Menampilkan{" "}
              <span className="font-semibold text-deep-ocean">
                {filteredAccommodations.length}
              </span>{" "}
              akomodasi
            </p>
          </div>

          {filteredAccommodations.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((acc) => (
                <StaggerItem key={acc.id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={acc.image}
                        alt={acc.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/60 via-transparent to-transparent" />

                      {/* Type badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-deep-ocean text-white text-xs font-semibold rounded-full capitalize">
                        {acc.type}
                      </span>

                      {/* Featured badge */}
                      {acc.featured && (
                        <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-deep-ocean text-xs font-semibold rounded-full">
                          Rekomendasi
                        </span>
                      )}

                      {/* Stars */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1">
                        {Array.from({ length: acc.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                        ))}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading text-xl font-bold text-deep-ocean group-hover:text-gold transition-colors line-clamp-1">
                          {acc.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-cream px-2 py-1 rounded-lg flex-shrink-0">
                          <Star className="w-4 h-4 text-gold fill-gold" />
                          <span className="text-sm font-bold text-deep-ocean">
                            {acc.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-muted text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {acc.location}
                      </div>

                      <p className="text-muted text-sm line-clamp-2 mb-4">
                        {acc.description}
                      </p>

                      {/* Facilities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {acc.facilities.slice(0, 4).map((facility) => {
                          const FacilityIcon = facilityIcons[facility];
                          return (
                            <span
                              key={facility}
                              className="flex items-center gap-1 px-2 py-1 bg-cream text-deep-ocean text-xs rounded-full"
                            >
                              {FacilityIcon && <FacilityIcon className="w-3 h-3" />}
                              {facility}
                            </span>
                          );
                        })}
                        {acc.facilities.length > 4 && (
                          <span className="px-2 py-1 bg-cream text-muted text-xs rounded-full">
                            +{acc.facilities.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <span className="text-xs text-muted">Mulai dari</span>
                          <div className="font-heading text-xl font-bold text-gold">
                            {formatPrice(acc.price)}
                          </div>
                          <span className="text-xs text-muted">/malam</span>
                        </div>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-gold/30 transition-all">
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <Hotel className="w-16 h-16 text-muted mx-auto mb-4" />
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

      {/* CTA */}
      <section className="py-16 bg-deep-ocean">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Butuh Bantuan Memilih Akomodasi?
            </h2>
            <p className="text-white/70 mb-8">
              Tim kami siap membantu Anda menemukan akomodasi yang sesuai dengan
              kebutuhan dan budget Anda
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all">
              Hubungi Kami
            </button>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
