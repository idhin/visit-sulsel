"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  CheckCircle,
  Shield,
  Clock,
  Globe,
  Award,
  Users,
  Calendar,
  Search,
  Landmark,
  Mountain,
  UtensilsCrossed,
  Waves,
  Camera,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";
import guidesData from "@/data/guides.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Landmark,
  Mountain,
  UtensilsCrossed,
  Waves,
  Camera,
};

export default function GuidePage() {
  const [activeArea, setActiveArea] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<typeof guidesData.guides[0] | null>(null);

  const filteredGuides = guidesData.guides.filter((guide) => {
    const matchesArea = activeArea === "semua" || 
      guide.areas.some(a => a.toLowerCase().includes(activeArea.toLowerCase()));
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesArea && matchesSearch;
  });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920"
            alt="Tour Guide"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/80 to-deep-ocean/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6"
              >
                <Shield className="w-4 h-4" />
                Pemandu Wisata Bersertifikat
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Tour Guide{" "}
                <span className="text-gradient">Profesional</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 mb-8 leading-relaxed"
              >
                Jelajahi Sulawesi Selatan bersama pemandu wisata lokal yang 
                berpengalaman. Dapatkan insight mendalam tentang budaya, sejarah, 
                dan tempat-tempat tersembunyi yang tidak ada di buku panduan.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#guides"
                  className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
                >
                  Cari Guide
                </a>
                <Link
                  href="/guide/register"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Daftar Jadi Guide
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Users, value: guidesData.stats.totalGuides, label: "Tour Guide" },
                { icon: Shield, value: guidesData.stats.verifiedGuides, label: "Terverifikasi" },
                { icon: Calendar, value: guidesData.stats.totalTours.toLocaleString(), label: "Tur Selesai" },
                { icon: Star, value: guidesData.stats.averageRating, label: "Rating Rata-rata" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <stat.icon className="w-8 h-8 text-gold mb-3" />
                  <div className="font-heading text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Local Guide */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Keuntungan"
            title="Mengapa Pilih Guide Lokal?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, title: "Pengetahuan Lokal", desc: "Pahami budaya dan sejarah dari perspektif warga asli" },
              { icon: MapPin, title: "Hidden Gems", desc: "Akses ke tempat-tempat yang tidak ada di guide book" },
              { icon: Shield, title: "Keamanan", desc: "Perjalanan lebih aman dengan pendamping berpengalaman" },
              { icon: MessageCircle, title: "Bahasa Daerah", desc: "Komunikasi langsung dengan masyarakat lokal" },
            ].map((item, index) => (
              <MotionWrapper key={item.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-deep-ocean mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="guides" className="py-6 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Cari guide atau area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            {/* Area filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveArea("semua")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeArea === "semua"
                    ? "bg-deep-ocean text-white"
                    : "bg-cream text-deep-ocean hover:bg-cream-dark"
                }`}
              >
                Semua Area
              </button>
              {guidesData.areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeArea === area.name
                      ? "bg-deep-ocean text-white"
                      : "bg-cream text-deep-ocean hover:bg-cream-dark"
                  }`}
                >
                  {area.name} ({area.guides})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <StaggerItem key={guide.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedGuide(guide)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  {/* Cover */}
                  <div className="relative h-40">
                    <Image
                      src={guide.cover}
                      alt={guide.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {guide.verified && (
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Verified
                        </span>
                      )}
                      {guide.certified && (
                        <span className="px-2 py-1 bg-gold text-deep-ocean text-xs font-bold rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3" /> Certified
                        </span>
                      )}
                    </div>

                    {guide.featured && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-maroon text-white text-xs font-bold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative px-5 -mt-12">
                    <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      <Image
                        src={guide.avatar}
                        alt={guide.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 pt-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-deep-ocean group-hover:text-gold transition-colors">
                          {guide.nickname}
                        </h3>
                        <p className="text-sm text-muted">{guide.name}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-cream px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="font-bold text-deep-ocean">{guide.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted mb-3">
                      <MapPin className="w-4 h-4" />
                      {guide.location}
                      <span className="text-deep-ocean">• {guide.experience} tahun pengalaman</span>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.specialization.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-cream text-deep-ocean text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2 text-sm text-muted mb-4">
                      <Globe className="w-4 h-4" />
                      {guide.languages.join(", ")}
                    </div>

                    {/* Price & Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-xs text-muted">Mulai dari</span>
                        <div className="font-heading text-lg font-bold text-gold">
                          {formatPrice(guide.services[0].price)}
                        </div>
                      </div>
                      <div className="text-sm text-muted">
                        {guide.tours} tur selesai
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedGuide(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
          >
            {/* Cover */}
            <div className="relative h-56">
              <Image
                src={selectedGuide.cover}
                alt={selectedGuide.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 to-transparent" />
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Avatar */}
            <div className="relative px-6 -mt-16">
              <div className="flex items-end gap-4">
                <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src={selectedGuide.avatar}
                    alt={selectedGuide.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-heading text-2xl font-bold text-deep-ocean">
                      {selectedGuide.nickname}
                    </h2>
                    {selectedGuide.verified && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {selectedGuide.certified && (
                      <span className="px-2 py-1 bg-gold text-deep-ocean text-xs font-bold rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3" /> Certified
                      </span>
                    )}
                  </div>
                  <p className="text-muted">{selectedGuide.name}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <p className="text-muted">{selectedGuide.bio}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 text-gold fill-gold" />
                    <span className="font-heading text-2xl font-bold text-deep-ocean">
                      {selectedGuide.rating}
                    </span>
                  </div>
                  <div className="text-xs text-muted">{selectedGuide.reviews} ulasan</div>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="font-heading text-2xl font-bold text-deep-ocean">
                    {selectedGuide.tours}
                  </div>
                  <div className="text-xs text-muted">Tur selesai</div>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="font-heading text-2xl font-bold text-deep-ocean">
                    {selectedGuide.experience}
                  </div>
                  <div className="text-xs text-muted">Tahun pengalaman</div>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="font-heading text-lg font-bold text-deep-ocean">
                    {selectedGuide.responseTime}
                  </div>
                  <div className="text-xs text-muted">Waktu respon</div>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Sertifikasi</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGuide.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-full"
                    >
                      <Award className="w-4 h-4" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Layanan & Harga</h3>
                <div className="space-y-2">
                  {selectedGuide.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-cream rounded-xl"
                    >
                      <span className="text-deep-ocean">{service.name}</span>
                      <span className="font-heading font-bold text-gold">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas & Languages */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-deep-ocean mb-3">Area Layanan</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuide.areas.map((area) => (
                      <span
                        key={area}
                        className="flex items-center gap-1 px-3 py-1 bg-cream text-deep-ocean text-sm rounded-full"
                      >
                        <MapPin className="w-3 h-3" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-deep-ocean mb-3">Bahasa</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuide.languages.map((lang) => (
                      <span
                        key={lang}
                        className="flex items-center gap-1 px-3 py-1 bg-cream text-deep-ocean text-sm rounded-full"
                      >
                        <Globe className="w-3 h-3" />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Ketersediaan</h3>
                <div className="flex flex-wrap gap-2">
                  {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
                    <span
                      key={day}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedGuide.availability.includes(day)
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Pesan Sekarang
                </button>
                <button className="px-6 py-4 border-2 border-deep-ocean text-deep-ocean font-semibold rounded-full hover:bg-cream transition-all flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-deep-ocean">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <Shield className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Jadilah Tour Guide Bersertifikat
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Daftarkan diri Anda sebagai tour guide dan dapatkan sertifikasi resmi 
              dari Dinas Pariwisata. Tingkatkan penghasilan sambil mempromosikan 
              keindahan Sulawesi Selatan.
            </p>
            <Link
              href="/guide/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
