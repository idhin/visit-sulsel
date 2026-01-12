"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  Hotel,
  Map,
  Car,
  Camera,
  Users,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  Clock,
  Shield,
  CreditCard,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";

const bookingCategories = [
  {
    id: "tiket",
    icon: Ticket,
    title: "Tiket Destinasi",
    description: "Tiket masuk wisata, museum, dan taman nasional",
    color: "from-blue-500 to-cyan-500",
    count: 45,
    featured: [
      { name: "Taman Nasional Bantimurung", price: 30000, image: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=400" },
      { name: "Rammang-Rammang", price: 50000, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
      { name: "Benteng Rotterdam", price: 10000, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400" },
    ]
  },
  {
    id: "akomodasi",
    icon: Hotel,
    title: "Akomodasi",
    description: "Hotel, resort, homestay, dan villa",
    color: "from-purple-500 to-pink-500",
    count: 234,
    featured: [
      { name: "Aryaduta Makassar", price: 1500000, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
      { name: "Toraja Heritage Hotel", price: 950000, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" },
      { name: "Bira Beach Resort", price: 650000, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400" },
    ]
  },
  {
    id: "paket",
    icon: Map,
    title: "Paket Wisata",
    description: "Tur lengkap dengan guide dan transportasi",
    color: "from-green-500 to-emerald-500",
    count: 56,
    featured: [
      { name: "Toraja 3D2N", price: 2500000, image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400" },
      { name: "Makassar City Tour", price: 450000, image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400" },
      { name: "Bira Snorkeling Trip", price: 750000, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400" },
    ]
  },
  {
    id: "transportasi",
    icon: Car,
    title: "Transportasi",
    description: "Rental mobil, motor, dan penyeberangan",
    color: "from-orange-500 to-amber-500",
    count: 78,
    featured: [
      { name: "Rental Avanza + Driver", price: 650000, image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400" },
      { name: "Penyeberangan Samalona", price: 150000, image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400" },
      { name: "Rental Motor Harian", price: 100000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
    ]
  },
  {
    id: "kreator",
    icon: Camera,
    title: "Jasa Kreator",
    description: "Fotografer, videografer, dan content creator",
    color: "from-red-500 to-rose-500",
    count: 156,
    featured: [
      { name: "Foto Half Day", price: 750000, image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400" },
      { name: "Video Cinematic", price: 1500000, image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400" },
      { name: "Drone Aerial", price: 1000000, image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400" },
    ]
  },
  {
    id: "guide",
    icon: Users,
    title: "Tour Guide",
    description: "Pemandu wisata lokal bersertifikat",
    color: "from-indigo-500 to-violet-500",
    count: 138,
    featured: [
      { name: "Guide Toraja Full Day", price: 700000, image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400" },
      { name: "Guide Makassar City", price: 300000, image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400" },
      { name: "Guide Karst Maros", price: 500000, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
    ]
  },
];

const benefits = [
  { icon: Shield, title: "Pembayaran Aman", desc: "Transaksi terproteksi dengan escrow system" },
  { icon: CheckCircle, title: "Konfirmasi Instan", desc: "E-ticket langsung dikirim ke email" },
  { icon: CreditCard, title: "Bayar Fleksibel", desc: "Transfer, QRIS, kartu kredit, cicilan" },
  { icon: Clock, title: "Support 24/7", desc: "Tim kami siap membantu kapan saja" },
];

export default function PesanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-deep-ocean via-deep-ocean-light to-deep-ocean">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-maroon/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Booking Hub Terintegrasi
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Pesan Semua dalam{" "}
            <span className="text-gradient">Satu Tempat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Tiket destinasi, akomodasi, paket wisata, transportasi, hingga jasa 
            kreator dan guide - semua bisa dipesan dengan mudah di sini.
          </motion.p>

          {/* Quick search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl p-4 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                <MapPin className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <div className="text-xs text-muted">Destinasi</div>
                  <select className="bg-transparent font-medium text-deep-ocean focus:outline-none">
                    <option>Semua Sulsel</option>
                    <option>Makassar</option>
                    <option>Tana Toraja</option>
                    <option>Bulukumba</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                <Calendar className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <div className="text-xs text-muted">Tanggal</div>
                  <input 
                    type="date" 
                    className="bg-transparent font-medium text-deep-ocean focus:outline-none"
                    defaultValue="2026-02-01"
                  />
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-xl hover:shadow-lg transition-all">
                Cari
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 bg-cream border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-semibold text-deep-ocean text-sm">{benefit.title}</div>
                  <div className="text-xs text-muted">{benefit.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Kategori Booking"
            title="Pilih yang Anda Butuhkan"
            description="Semua kebutuhan perjalanan Anda tersedia dalam satu platform"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingCategories.map((category) => (
              <StaggerItem key={category.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-cream rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <category.icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {category.count} tersedia
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>

                  {/* Featured items */}
                  <div className="p-4 space-y-3">
                    {category.featured.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-white rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-deep-ocean text-sm truncate">
                            {item.name}
                          </div>
                          <div className="text-gold font-semibold text-sm">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted group-hover:text-gold transition-colors" />
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="p-4 pt-0">
                    <button className="w-full py-3 border-2 border-deep-ocean text-deep-ocean font-semibold rounded-xl hover:bg-deep-ocean hover:text-white transition-all">
                      Lihat Semua
                    </button>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Paling Diminati"
            title="Paket Populer Minggu Ini"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Toraja Explorer 4D3N",
                image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600",
                price: 4500000,
                originalPrice: 5500000,
                rating: 4.9,
                reviews: 234,
                includes: ["Hotel 3 malam", "Tour guide", "Transportasi", "Makan 3x sehari"],
              },
              {
                title: "Makassar + Bira 5D4N",
                image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600",
                price: 5200000,
                originalPrice: 6000000,
                rating: 4.8,
                reviews: 189,
                includes: ["Hotel 4 malam", "Snorkeling trip", "City tour", "Seafood dinner"],
              },
              {
                title: "Grand Tour Sulsel 7D6N",
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
                price: 8500000,
                originalPrice: 10000000,
                rating: 4.9,
                reviews: 156,
                includes: ["Hotel 6 malam", "Semua destinasi", "Guide", "All meals"],
              },
            ].map((pkg, index) => (
              <MotionWrapper key={pkg.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-48">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-maroon text-white text-sm font-bold rounded-full">
                      {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-medium text-deep-ocean">{pkg.rating}</span>
                      <span className="text-muted text-sm">({pkg.reviews} ulasan)</span>
                    </div>
                    <div className="space-y-1 mb-4">
                      {pkg.includes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-muted text-sm line-through">{formatPrice(pkg.originalPrice)}</span>
                        <div className="font-heading text-xl font-bold text-gold">
                          {formatPrice(pkg.price)}
                        </div>
                      </div>
                      <button className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all">
                        Pesan
                      </button>
                    </div>
                  </div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-ocean">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Butuh Bantuan Merencanakan Trip?
            </h2>
            <p className="text-white/70 mb-8">
              Tim travel consultant kami siap membantu menyusun perjalanan impian Anda
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/itinerary"
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Buat Itinerary Custom
              </Link>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                Hubungi Konsultan
              </button>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
