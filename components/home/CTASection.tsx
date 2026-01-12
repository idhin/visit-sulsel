"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Store, Camera, Users, Building } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";

const forVisitors = [
  "Booking tiket, hotel & paket wisata",
  "Belanja produk UMKM lokal",
  "Hire kreator & tour guide profesional",
  "Komunitas traveler Sulsel",
];

const forPartners = [
  { icon: Store, label: "UMKM", desc: "Jual produk ke wisatawan" },
  { icon: Camera, label: "Creator", desc: "Tawarkan jasa kreatif" },
  { icon: Users, label: "Guide", desc: "Jadi pemandu terverifikasi" },
  { icon: Building, label: "Bisnis", desc: "Listing usaha Anda" },
];

export default function CTASection() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - For Visitors */}
          <div>
            <MotionWrapper>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-medium rounded-full mb-6">
                Untuk Wisatawan
              </span>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-ocean mb-6 leading-tight">
                Siap Menjelajahi{" "}
                <span className="text-gradient">Sulawesi Selatan?</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <p className="text-lg text-muted mb-8 leading-relaxed">
                Semua yang Anda butuhkan untuk perjalanan sempurna ke Sulsel, 
                tersedia dalam satu platform.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <ul className="space-y-3 mb-8">
                {forVisitors.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-deep-ocean">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </MotionWrapper>

            <MotionWrapper delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/pesan"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/destinasi"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-deep-ocean text-deep-ocean font-semibold rounded-full hover:bg-deep-ocean hover:text-white transition-all duration-300"
                >
                  Jelajahi Destinasi
                </Link>
              </div>
            </MotionWrapper>
          </div>

          {/* Right side - For Partners */}
          <div className="bg-deep-ocean rounded-3xl p-8 lg:p-10">
            <MotionWrapper>
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6">
                Untuk Mitra & Pelaku Usaha
              </span>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">
                Bergabung dengan Ekosistem Visit Sulsel
              </h3>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <p className="text-white/70 mb-8">
                Jangkau ribuan wisatawan dan tingkatkan penghasilan dengan bergabung 
                di platform pariwisata terbesar Sulawesi Selatan.
              </p>
            </MotionWrapper>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {forPartners.map((partner, index) => (
                <MotionWrapper key={partner.label} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <partner.icon className="w-8 h-8 text-gold mb-2" />
                    <div className="font-semibold text-white">{partner.label}</div>
                    <div className="text-xs text-white/60">{partner.desc}</div>
                  </motion.div>
                </MotionWrapper>
              ))}
            </div>

            <MotionWrapper delay={0.7}>
              <Link
                href="/tentang"
                className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-deep-ocean font-semibold rounded-full hover:bg-cream transition-all"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon/10 rounded-full blur-3xl" />
    </section>
  );
}
