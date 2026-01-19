"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin, Store, Camera, Users, Shield, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { icon: MapPin, label: "Destinasi", href: "/destinasi" },
  { icon: Store, label: "Belanja", href: "/belanja" },
  { icon: Camera, label: "Creator", href: "/kreator" },
  { icon: Users, label: "Pemandu", href: "/layanan/pemandu" },
];

const stats = [
  { value: "40+", unit: "Juta", label: "Wisnus/Tahun", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
  { value: "15K+", unit: "", label: "UMKM Terdaftar", icon: Store, color: "from-blue-500 to-cyan-500" },
  { value: "150+", unit: "", label: "Tour Guide", icon: Users, color: "from-purple-500 to-pink-500" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Toraja Tongkonan */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920"
          alt="Tana Toraja - Rumah Tongkonan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/75 to-deep-ocean/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/90 via-transparent to-deep-ocean/30" />
      </div>

      {/* Animated patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 right-20 w-96 h-96 border border-gold/30 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-40 right-40 w-64 h-64 border border-gold/20 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Official Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
                <Shield className="w-4 h-4 text-gold" />
                Platform Resmi Pariwisata Sulawesi Selatan
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-sm font-medium">
                <Building2 className="w-4 h-4" />
                Kerjasama Dinas Pariwisata
              </span>
            </motion.div>

            {/* Main Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              <span className="text-gold font-semibold text-lg tracking-wide">VISIT SULSEL</span>
            </motion.div>

            {/* Heading - Explore The Easiest Way */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Explore The{" "}
              <span className="text-gradient">Easiest Way</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-white/70 mb-4 font-light"
            >
              Platform Pariwisata Digital Terintegrasi
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed max-w-xl"
            >
              Satu platform untuk destinasi wisata, UMKM lokal, kreator berbakat, 
              dan tour guide profesional. Jelajahi Sulawesi Selatan dengan mudah.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/jelajahi"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
              >
                Mulai Jelajahi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/tentang"
                className="group inline-flex items-center gap-3 px-6 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <span className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 fill-white" />
                </span>
                Tentang Platform
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all border border-white/10"
                  >
                    <link.icon className="w-4 h-4 text-gold" />
                    <span className="text-sm text-white/90 group-hover:text-white">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Stats Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <h3 className="text-white font-semibold text-lg mb-2">Data Pariwisata Sul-Sel 2025</h3>
                  <p className="text-white/60 text-sm">Sumber: BPS Sulawesi Selatan</p>
                </div>

                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.15 }}
                      className={`bg-gradient-to-r ${stat.color} rounded-2xl p-5 flex items-center gap-4`}
                    >
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-3xl font-bold text-white">{stat.value}</span>
                          {stat.unit && <span className="text-white/80 text-lg">{stat.unit}</span>}
                        </div>
                        <div className="text-white/80 text-sm">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom highlight */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <div className="flex items-center justify-center gap-2 text-gold">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">75% UMKM Sudah Digital (QRIS)</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
              >
                Data Real-Time
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
