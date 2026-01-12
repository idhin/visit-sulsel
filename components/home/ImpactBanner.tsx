"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Users, Store, Briefcase, ArrowRight } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";

const impactStats = [
  { icon: Users, value: "1.2M+", label: "Wisatawan Terlayani" },
  { icon: Store, value: "234", label: "UMKM Diberdayakan" },
  { icon: Briefcase, value: "127+", label: "Lapangan Kerja Baru" },
  { icon: TrendingUp, value: formatPrice(12500000000), label: "Nilai Transaksi" },
];

export default function ImpactBanner() {
  return (
    <section className="py-16 bg-deep-ocean relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-maroon/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-2">
            <MotionWrapper>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/20 text-green-400 text-sm font-medium rounded-full mb-4">
                <TrendingUp className="w-4 h-4" />
                Dampak Nyata
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">
                Bukan Sekadar Platform,
                <br />
                Ini Gerakan Ekonomi
              </h2>
              <p className="text-white/70 mb-6">
                Visit Sulsel dirancang sebagai BUMD Digital yang memberdayakan 
                ekonomi lokal dan menciptakan dampak nyata bagi masyarakat.
              </p>
              <Link
                href="/dampak"
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Lihat Dashboard Dampak
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MotionWrapper>
          </div>

          {/* Right - Stats */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((stat, index) => (
              <MotionWrapper key={stat.label} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 text-center"
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <div className="font-heading text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
