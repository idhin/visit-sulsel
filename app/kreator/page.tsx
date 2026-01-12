"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Video,
  Plane,
  Sparkles,
  PenTool,
  UtensilsCrossed,
  Star,
  MapPin,
  CheckCircle,
  Trophy,
  Users,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";
import creatorsData from "@/data/creators.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Camera,
  Video,
  Plane,
  Sparkles,
  PenTool,
  UtensilsCrossed,
};

export default function KreatorPage() {
  const [activeSpec, setActiveSpec] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<typeof creatorsData.creators[0] | null>(null);

  const filteredCreators = creatorsData.creators.filter((creator) => {
    const matchesSpec = activeSpec === "semua" || 
      creator.specialization.some(s => s.toLowerCase().includes(activeSpec.toLowerCase()));
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpec && matchesSearch;
  });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920"
            alt="Creator Hub"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/80 to-deep-ocean/60" />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-32 right-20 w-20 h-20 bg-gold/20 rounded-2xl backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-32 right-40 w-16 h-16 bg-maroon/20 rounded-full backdrop-blur-sm"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Ekonomi Kreator Lokal
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Creator Hub{" "}
                <span className="text-gradient">Sulawesi Selatan</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/80 mb-8 leading-relaxed"
              >
                Temukan fotografer, videografer, dan content creator berbakat 
                dari Sulawesi Selatan. Abadikan momen perjalanan Anda dengan 
                sentuhan lokal yang autentik.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#creators"
                  className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
                >
                  Cari Creator
                </a>
                <Link
                  href="/kreator/register"
                  className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                >
                  Daftar Jadi Creator
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
                { icon: Users, value: creatorsData.stats.totalCreators, label: "Creator Aktif" },
                { icon: Briefcase, value: creatorsData.stats.totalJobs.toLocaleString(), label: "Proyek Selesai" },
                { icon: TrendingUp, value: formatPrice(creatorsData.stats.totalEarnings), label: "Total Penghasilan" },
                { icon: Star, value: creatorsData.stats.averageRating, label: "Rating Rata-rata" },
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

      {/* Challenges Section */}
      <section className="py-16 bg-maroon">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-gold" />
                Challenge Aktif
              </h2>
              <p className="text-white/70">Ikuti kompetisi dan menangkan hadiah!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creatorsData.challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-xl font-bold text-white">{challenge.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-deep-ocean text-sm font-bold rounded-full">
                    {formatPrice(challenge.prize)}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-muted text-sm mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted">
                      <span className="font-semibold text-deep-ocean">{challenge.participants}</span> peserta
                    </div>
                    <button className="px-4 py-2 bg-maroon text-white text-sm font-semibold rounded-full hover:bg-maroon-light transition-colors">
                      Ikut Challenge
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialization Filter */}
      <section id="creators" className="py-8 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Cari creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            {/* Specialization filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSpec("semua")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSpec === "semua"
                    ? "bg-deep-ocean text-white"
                    : "bg-cream text-deep-ocean hover:bg-cream-dark"
                }`}
              >
                Semua
              </button>
              {creatorsData.specializations.map((spec) => {
                const IconComponent = iconMap[spec.icon];
                return (
                  <button
                    key={spec.id}
                    onClick={() => setActiveSpec(spec.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeSpec === spec.name
                        ? "bg-deep-ocean text-white"
                        : "bg-cream text-deep-ocean hover:bg-cream-dark"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {spec.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Creators Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <StaggerItem key={creator.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedCreator(creator)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
                >
                  {/* Cover */}
                  <div className="relative h-32">
                    <Image
                      src={creator.cover}
                      alt={creator.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/60 to-transparent" />
                    
                    {/* Featured badge */}
                    {creator.featured && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-gold text-deep-ocean text-xs font-bold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative px-5 -mt-10">
                    <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {creator.verified && (
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 pt-3">
                    <h3 className="font-heading text-xl font-bold text-deep-ocean group-hover:text-gold transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-muted mb-2">@{creator.username}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted mb-3">
                      <MapPin className="w-4 h-4" />
                      {creator.location}
                    </div>

                    <p className="text-sm text-muted line-clamp-2 mb-4">
                      {creator.bio}
                    </p>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.specialization.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-1 bg-cream text-deep-ocean text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="font-semibold text-deep-ocean">{creator.rating}</span>
                        <span className="text-muted text-sm">({creator.reviews})</span>
                      </div>
                      <div className="text-sm text-muted">
                        {creator.completedJobs} proyek
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCreator(null)}
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
            <div className="relative h-48">
              <Image
                src={selectedCreator.cover}
                alt={selectedCreator.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 to-transparent" />
              <button
                onClick={() => setSelectedCreator(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Avatar & Basic Info */}
            <div className="relative px-6 -mt-16">
              <div className="flex items-end gap-4">
                <div className="relative w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src={selectedCreator.avatar}
                    alt={selectedCreator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading text-2xl font-bold text-deep-ocean">
                      {selectedCreator.name}
                    </h2>
                    {selectedCreator.verified && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-muted">@{selectedCreator.username}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <p className="text-muted">{selectedCreator.bio}</p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-5 h-5 text-gold fill-gold" />
                    <span className="font-heading text-2xl font-bold text-deep-ocean">
                      {selectedCreator.rating}
                    </span>
                  </div>
                  <div className="text-sm text-muted">{selectedCreator.reviews} ulasan</div>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="font-heading text-2xl font-bold text-deep-ocean">
                    {selectedCreator.completedJobs}
                  </div>
                  <div className="text-sm text-muted">Proyek selesai</div>
                </div>
                <div className="bg-cream rounded-xl p-4 text-center">
                  <div className="font-heading text-lg font-bold text-deep-ocean">
                    {selectedCreator.responseTime}
                  </div>
                  <div className="text-sm text-muted">Waktu respon</div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Layanan & Harga</h3>
                <div className="space-y-2">
                  {selectedCreator.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-cream rounded-xl"
                    >
                      <span className="text-deep-ocean">{service.name}</span>
                      <span className="font-semibold text-gold">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Bahasa</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCreator.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-cream text-deep-ocean text-sm rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Portfolio</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedCreator.portfolio.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`Portfolio ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all">
                  Hubungi Creator
                </button>
                <button className="px-6 py-4 border-2 border-deep-ocean text-deep-ocean font-semibold rounded-full hover:bg-cream transition-all">
                  Pesan Jasa
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
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Jadilah Bagian dari Ekonomi Kreator Sulsel
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Daftarkan diri Anda sebagai creator dan mulai dapatkan penghasilan 
              dari passion Anda. Bergabung dengan ratusan creator berbakat lainnya.
            </p>
            <Link
              href="/kreator/register"
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
