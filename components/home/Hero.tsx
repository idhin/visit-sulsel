"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin, Store, Camera, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { icon: MapPin, label: "Destinasi", href: "/destinasi" },
  { icon: Store, label: "Belanja", href: "/belanja" },
  { icon: Camera, label: "Creator", href: "/kreator" },
  { icon: Users, label: "Guide", href: "/guide" },
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
        <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/70 to-deep-ocean/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 via-transparent to-transparent" />
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
        
        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-32 right-[15%] w-20 h-20 bg-gold/10 rounded-2xl backdrop-blur-sm hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-40 right-[25%] w-16 h-16 bg-maroon/10 rounded-full backdrop-blur-sm hidden lg:block"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Super App Pariwisata Sulawesi Selatan
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Jelajahi, Pesan, Belanja —{" "}
            <span className="text-gradient">Satu Platform</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl"
          >
            Visit Sulsel menghubungkan Anda dengan destinasi wisata, UMKM lokal, 
            kreator berbakat, dan tour guide profesional. Semua kebutuhan perjalanan 
            Anda di Sulawesi Selatan, dalam satu genggaman.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/pesan"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/tentang"
              className="group inline-flex items-center gap-3 px-6 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <span className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Play className="w-4 h-4 fill-white" />
              </span>
              Pelajari Platform
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                >
                  <link.icon className="w-4 h-4 text-gold" />
                  <span className="text-sm text-white/90 group-hover:text-white">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side feature cards - Desktop only */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute right-8 bottom-32 hidden xl:block space-y-4"
      >
        {[
          { title: "500+", subtitle: "Destinasi", color: "from-blue-500/80 to-cyan-500/80" },
          { title: "1500+", subtitle: "Produk UMKM", color: "from-green-500/80 to-emerald-500/80" },
          { title: "150+", subtitle: "Kreator", color: "from-purple-500/80 to-pink-500/80" },
        ].map((card, index) => (
          <motion.div
            key={card.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.15 }}
            className={`bg-gradient-to-r ${card.color} backdrop-blur-md rounded-2xl px-6 py-4 text-white`}
          >
            <div className="font-heading text-2xl font-bold">{card.title}</div>
            <div className="text-sm text-white/80">{card.subtitle}</div>
          </motion.div>
        ))}
      </motion.div>

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
