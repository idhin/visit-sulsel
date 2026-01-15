"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  TrendingUp,
  BarChart3,
  Users,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Building2,
  PieChart,
  Activity,
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Kontrol Penuh",
    description: "Platform resmi milik Dinas/Pemprov, tidak tergantung pihak ketiga",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    title: "Revenue Langsung",
    description: "Fee booking 10-15%, komisi marketplace 5-15% langsung ke PAD",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Data Real-Time",
    description: "Dashboard analytics kunjungan, transaksi, dan insight kebijakan",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Pemberdayaan Lokal",
    description: "500+ UMKM, 150+ guide & kreator, 200+ lapangan kerja baru",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Megaphone,
    title: "Branding Terpadu",
    description: "Satu platform resmi Visit Sulsel terintegrasi media sosial",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

const mockMetrics = [
  { label: "Pengunjung Hari Ini", value: "12,847", change: "+15.3%", icon: Users },
  { label: "Transaksi", value: "Rp 245.6 Jt", change: "+22.1%", icon: TrendingUp },
  { label: "UMKM Aktif", value: "8,234", change: "+8.7%", icon: Building2 },
];

export default function GovernmentSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-deep-ocean to-deep-ocean/95 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full text-gold text-sm font-semibold mb-4">
            <Building2 className="w-4 h-4" />
            UNTUK DINAS PARIWISATA
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
            Apa yang <span className="text-gradient">Dinas Dapatkan?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Platform Visit Sulsel dirancang untuk memberikan kontrol penuh, revenue langsung, 
            dan data real-time kepada Dinas Pariwisata Sulawesi Selatan
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                      {benefit.title}
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-white/60 text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Revenue Projection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-2xl p-6 border border-gold/30"
            >
              <h4 className="text-gold font-semibold mb-3">Proyeksi Revenue</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">Rp 50M</p>
                  <p className="text-white/50 text-xs">Tahun 1</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Rp 200M</p>
                  <p className="text-white/50 text-xs">Tahun 2</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gold">Rp 1T</p>
                  <p className="text-white/50 text-xs">Tahun 5</p>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-3">*Proyeksi berdasarkan analisis data dan pemodelan AI</p>
            </motion.div>
          </div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Dashboard Analytics</h3>
                  <p className="text-white/50 text-xs">Preview Mode</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Live
              </span>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {mockMetrics.map((metric, index) => (
                <div key={metric.label} className="bg-white/5 rounded-xl p-4">
                  <metric.icon className="w-5 h-5 text-gold mb-2" />
                  <p className="text-white font-bold text-lg">{metric.value}</p>
                  <p className="text-white/50 text-xs">{metric.label}</p>
                  <span className="text-emerald-400 text-xs">{metric.change}</span>
                </div>
              ))}
            </div>

            {/* Mock Chart */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 text-sm">Trend Pengunjung (7 Hari)</span>
                <span className="text-emerald-400 text-xs">+23.5%</span>
              </div>
              <div className="flex items-end gap-2 h-24">
                {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-gold/50 to-gold rounded-t-sm"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-white/40 text-xs">
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
                <span>Min</span>
              </div>
            </div>

            {/* Top Destinations */}
            <div className="bg-white/5 rounded-xl p-4">
              <span className="text-white/80 text-sm mb-3 block">Top Destinasi</span>
              <div className="space-y-2">
                {[
                  { name: "Tana Toraja", visitors: "4,521", percent: 85 },
                  { name: "Pantai Bira", visitors: "3,847", percent: 72 },
                  { name: "Rammang-Rammang", visitors: "2,932", percent: 55 },
                ].map((dest) => (
                  <div key={dest.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{dest.name}</span>
                        <span className="text-white/50">{dest.visitors}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${dest.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 }}
                          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/dashboard"
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              Lihat Dashboard Lengkap
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-left">
              <p className="text-white font-semibold text-lg">Tertarik dengan Platform ini?</p>
              <p className="text-white/60 text-sm">Jadwalkan demo dan diskusi lebih lanjut</p>
            </div>
            <Link
              href="/tentang"
              className="px-6 py-3 bg-white text-deep-ocean font-semibold rounded-xl hover:bg-gold hover:text-deep-ocean transition-colors whitespace-nowrap"
            >
              Jadwalkan Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
