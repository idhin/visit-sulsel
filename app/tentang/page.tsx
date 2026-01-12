"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Store,
  Camera,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Building,
  Briefcase,
  PieChart,
  Target,
  Award,
  Lightbulb,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";

const revenueStreams = [
  { name: "Komisi Transaksi", percentage: 50, desc: "Booking hotel, tiket, paket wisata, jasa" },
  { name: "Langganan Premium", percentage: 25, desc: "UMKM Pro, Creator Pro, Travel Agent" },
  { name: "Iklan & Promosi", percentage: 20, desc: "Featured listing, banner, sponsored content" },
  { name: "Data & Analytics", percentage: 5, desc: "Insight untuk pelaku usaha & pemerintah" },
];

const projections = [
  { year: "Tahun 1", umkm: "500+", creators: "200+", guides: "100+", transactions: "Rp 2M/bulan", jobs: 50 },
  { year: "Tahun 3", umkm: "2.000+", creators: "1.000+", guides: "500+", transactions: "Rp 25M/bulan", jobs: 200 },
  { year: "Tahun 5", umkm: "5.000+", creators: "3.000+", guides: "1.000+", transactions: "Rp 100M/bulan", jobs: 500 },
];

const advantages = [
  { icon: Zap, title: "First Mover", desc: "BUMD digital pariwisata pertama di Indonesia" },
  { icon: Globe, title: "Ecosystem Play", desc: "Bukan hanya booking, tapi ekosistem lengkap" },
  { icon: Users, title: "Creator Economy", desc: "Memberdayakan ekonomi kreator lokal" },
  { icon: PieChart, title: "Data-Driven", desc: "Keputusan berbasis data untuk pemerintah" },
  { icon: MapPin, title: "Local First", desc: "Prioritas untuk pelaku usaha lokal" },
  { icon: TrendingUp, title: "Sustainable", desc: "Model bisnis mandiri, tidak bergantung APBD" },
];

export default function TentangPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920"
            alt="Visit Sulsel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/85 to-deep-ocean/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-deep-ocean" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">Visit Sulsel</h2>
                <p className="text-gold">Super App Pariwisata</p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              BUMD Digital Pariwisata{" "}
              <span className="text-gradient">Pertama di Indonesia</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 mb-8 leading-relaxed"
            >
              Platform ekosistem pariwisata terintegrasi yang menghubungkan wisatawan, 
              content creator, UMKM, tour guide, dan pemerintah dalam satu super app. 
              Menciptakan lapangan kerja, meningkatkan PAD, dan menjadi model percontohan nasional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/dampak"
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all flex items-center gap-2"
              >
                Lihat Dampak Ekonomi
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#model-bisnis"
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                Model Bisnis
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionWrapper>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-medium rounded-full mb-4">
                Visi & Misi
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-ocean mb-6">
                Menjadi Legacy Digital untuk Sulawesi Selatan
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-ocean mb-1">Visi</h3>
                    <p className="text-muted">
                      Menjadi super app pariwisata daerah terdepan di Indonesia yang 
                      berdampak nyata bagi ekonomi dan kesejahteraan masyarakat Sulawesi Selatan.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-ocean mb-1">Misi</h3>
                    <ul className="text-muted space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        Mendigitalisasi ekosistem pariwisata Sulsel secara menyeluruh
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        Memberdayakan UMKM, kreator, dan tour guide lokal
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        Menyediakan data & insight untuk pengambilan kebijakan
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                        Menjadi model percontohan untuk daerah lain
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: "Destinasi", value: "500+" },
                  { icon: Store, label: "UMKM", value: "Target 5.000" },
                  { icon: Camera, label: "Creator", value: "Target 3.000" },
                  { icon: Users, label: "Guide", value: "Target 1.000" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <stat.icon className="w-8 h-8 text-gold mb-3" />
                    <div className="font-heading text-2xl font-bold text-deep-ocean">{stat.value}</div>
                    <div className="text-sm text-muted">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Ekosistem Terintegrasi"
            title="Satu Platform, Seluruh Sulawesi Selatan"
            description="Visit Sulsel menghubungkan semua stakeholder pariwisata dalam satu ekosistem digital"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: Users, title: "Wisatawan", desc: "Akses mudah ke semua layanan wisata", color: "from-blue-500 to-cyan-500" },
              { icon: Camera, title: "Creator", desc: "Platform untuk monetisasi konten", color: "from-purple-500 to-pink-500" },
              { icon: Store, title: "UMKM", desc: "Marketplace produk lokal", color: "from-green-500 to-emerald-500" },
              { icon: MapPin, title: "Guide", desc: "Jaringan pemandu bersertifikat", color: "from-orange-500 to-amber-500" },
              { icon: Building, title: "Pemerintah", desc: "Dashboard data & analytics", color: "from-red-500 to-rose-500" },
            ].map((item, index) => (
              <MotionWrapper key={item.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-deep-ocean mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section id="model-bisnis" className="py-20 bg-deep-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Model Bisnis"
            title="Revenue Streams"
            description="Model bisnis berkelanjutan yang tidak bergantung APBD"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {revenueStreams.map((stream, index) => (
              <MotionWrapper key={stream.name} delay={index * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60 text-sm">{stream.name}</span>
                    <span className="font-heading text-2xl font-bold text-gold">{stream.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stream.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-gold to-gold-light"
                    />
                  </div>
                  <p className="text-white/60 text-sm">{stream.desc}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {/* Projections */}
          <MotionWrapper delay={0.4}>
            <div className="bg-white rounded-2xl p-8 overflow-x-auto">
              <h3 className="font-heading text-xl font-bold text-deep-ocean mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-gold" />
                Proyeksi Pertumbuhan
              </h3>
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted font-medium">Periode</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">UMKM</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Creator</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Guide</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Transaksi</th>
                    <th className="text-left py-3 px-4 text-muted font-medium">Lapangan Kerja</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((proj, index) => (
                    <tr key={proj.year} className={index < projections.length - 1 ? "border-b border-border" : ""}>
                      <td className="py-4 px-4 font-semibold text-deep-ocean">{proj.year}</td>
                      <td className="py-4 px-4 text-deep-ocean">{proj.umkm}</td>
                      <td className="py-4 px-4 text-deep-ocean">{proj.creators}</td>
                      <td className="py-4 px-4 text-deep-ocean">{proj.guides}</td>
                      <td className="py-4 px-4 text-gold font-semibold">{proj.transactions}</td>
                      <td className="py-4 px-4 text-deep-ocean">{proj.jobs}+</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Keunggulan"
            title="Mengapa Visit Sulsel Berbeda"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <MotionWrapper key={adv.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <adv.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2">{adv.title}</h3>
                  <p className="text-muted">{adv.desc}</p>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-maroon to-deep-ocean">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <Award className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6">
              Siap Menjadi Model Percontohan Nasional
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Visit Sulsel dirancang untuk dapat direplikasi ke provinsi lain di Indonesia. 
              Bersama, kita membangun ekosistem pariwisata digital nasional.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/dampak"
                className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2"
              >
                Lihat Dampak Ekonomi
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                Jelajahi Platform
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
