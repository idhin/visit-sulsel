"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Store,
  Camera,
  MapPin,
  DollarSign,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Building,
  ArrowUp,
  ArrowRight,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  CheckCircle,
  Calendar,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";

const liveStats = {
  totalVisitors: 1247856,
  monthlyGrowth: 23.5,
  totalTransactions: 89456,
  transactionValue: 12500000000,
  umkmOnboarded: 234,
  creatorsActive: 156,
  guidesVerified: 89,
  jobsCreated: 127,
  padContribution: 890000000,
};

const monthlyData = [
  { month: "Jan", visitors: 145000, transactions: 8500, value: 980000000 },
  { month: "Feb", visitors: 162000, transactions: 9200, value: 1100000000 },
  { month: "Mar", visitors: 178000, transactions: 10100, value: 1250000000 },
  { month: "Apr", visitors: 195000, transactions: 11200, value: 1420000000 },
  { month: "Mei", visitors: 218000, transactions: 12800, value: 1650000000 },
  { month: "Jun", visitors: 245000, transactions: 14500, value: 1890000000 },
];

const impactStories = [
  {
    name: "Tenun Andi Mappanyukki",
    type: "UMKM",
    location: "Sengkang, Wajo",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    story: "Sejak bergabung dengan Visit Sulsel, penjualan tenun kami meningkat 340%. Kini kami bisa mempekerjakan 8 penenun tambahan dari desa sekitar.",
    metric: "+340%",
    metricLabel: "Peningkatan Penjualan",
  },
  {
    name: "Pak Rahman",
    type: "Tour Guide",
    location: "Tana Toraja",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    story: "Platform ini memudahkan wisatawan menemukan saya. Booking meningkat drastis, dan rating system membuat saya terus meningkatkan kualitas layanan.",
    metric: "4.9",
    metricLabel: "Rating",
  },
  {
    name: "Nurul Fadilah",
    type: "Content Creator",
    location: "Makassar",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    story: "Visit Sulsel memberikan platform bagi kreator lokal untuk berkarya. Penghasilan dari jasa fotografi saya meningkat dan stabil setiap bulan.",
    metric: "Rp 8jt+",
    metricLabel: "Penghasilan/Bulan",
  },
];

const sdgGoals = [
  { number: 1, title: "Tanpa Kemiskinan", contribution: "Menciptakan lapangan kerja dan income baru bagi masyarakat" },
  { number: 8, title: "Pekerjaan Layak", contribution: "Profesionalisasi sektor pariwisata informal" },
  { number: 9, title: "Industri & Inovasi", contribution: "Digitalisasi UMKM dan ekonomi kreatif" },
  { number: 11, title: "Kota Berkelanjutan", contribution: "Pariwisata yang ramah lingkungan dan budaya" },
  { number: 12, title: "Konsumsi Bertanggung Jawab", contribution: "Produk lokal dan berkelanjutan" },
];

export default function DampakPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-deep-ocean via-deep-ocean-light to-deep-ocean overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/20 text-green-400 text-sm font-medium rounded-full mb-6"
            >
              <TrendingUp className="w-4 h-4" />
              Impact Dashboard
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Dampak Nyata untuk{" "}
              <span className="text-gradient">Sulawesi Selatan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80"
            >
              Transparansi penuh tentang dampak ekonomi, sosial, dan budaya 
              yang dihasilkan oleh platform Visit Sulsel
            </motion.p>
          </div>

          {/* Live Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Users, value: liveStats.totalVisitors.toLocaleString(), label: "Total Pengunjung", growth: `+${liveStats.monthlyGrowth}%` },
              { icon: DollarSign, value: formatPrice(liveStats.transactionValue), label: "Nilai Transaksi", growth: "+28%" },
              { icon: Store, value: liveStats.umkmOnboarded, label: "UMKM Terdaftar", growth: "+45" },
              { icon: Briefcase, value: liveStats.jobsCreated, label: "Lapangan Kerja Baru", growth: "+32" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-8 h-8 text-gold" />
                  <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                    <ArrowUp className="w-3 h-3" />
                    {stat.growth}
                  </span>
                </div>
                <div className="font-heading text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Economic Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Dampak Ekonomi"
            title="Pertumbuhan yang Terukur"
            description="Data real-time kontribusi ekonomi Visit Sulsel"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart placeholder */}
            <div className="lg:col-span-2 bg-cream rounded-2xl p-6">
              <h3 className="font-semibold text-deep-ocean mb-6 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-gold" />
                Tren Transaksi Bulanan
              </h3>
              <div className="h-64 flex items-end justify-between gap-4">
                {monthlyData.map((data, index) => (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(data.value / 2000000000) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-1 bg-gradient-to-t from-gold to-gold-light rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {formatPrice(data.value)}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-deep-ocean">
                      {data.month}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="space-y-4">
              {[
                { label: "Rata-rata Transaksi/Hari", value: "298", icon: BarChart3 },
                { label: "Nilai Transaksi Tertinggi", value: formatPrice(15000000), icon: TrendingUp },
                { label: "Kontribusi PAD", value: formatPrice(liveStats.padContribution), icon: Building },
                { label: "Growth YoY", value: "+156%", icon: ArrowUp },
              ].map((stat, index) => (
                <MotionWrapper key={stat.label} delay={index * 0.1}>
                  <div className="bg-cream rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <stat.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <div className="font-heading text-xl font-bold text-deep-ocean">{stat.value}</div>
                      <div className="text-sm text-muted">{stat.label}</div>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Impact */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Dampak per Stakeholder"
            title="Memberdayakan Seluruh Ekosistem"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "UMKM & Pengrajin",
                icon: Store,
                color: "from-green-500 to-emerald-500",
                stats: [
                  { label: "UMKM Terdaftar", value: "234" },
                  { label: "Total Penjualan", value: formatPrice(3500000000) },
                  { label: "Rata-rata Peningkatan", value: "+180%" },
                  { label: "Produk Terjual", value: "8,945" },
                ],
              },
              {
                title: "Content Creator",
                icon: Camera,
                color: "from-purple-500 to-pink-500",
                stats: [
                  { label: "Creator Aktif", value: "156" },
                  { label: "Total Penghasilan", value: formatPrice(890000000) },
                  { label: "Proyek Selesai", value: "1,247" },
                  { label: "Rating Rata-rata", value: "4.7" },
                ],
              },
              {
                title: "Tour Guide",
                icon: MapPin,
                color: "from-blue-500 to-cyan-500",
                stats: [
                  { label: "Guide Terverifikasi", value: "89" },
                  { label: "Total Penghasilan", value: formatPrice(560000000) },
                  { label: "Tur Selesai", value: "4,567" },
                  { label: "Rating Rata-rata", value: "4.8" },
                ],
              },
            ].map((stakeholder, index) => (
              <MotionWrapper key={stakeholder.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className={`bg-gradient-to-r ${stakeholder.color} p-6 text-white`}>
                    <stakeholder.icon className="w-10 h-10 mb-3" />
                    <h3 className="font-heading text-xl font-bold">{stakeholder.title}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {stakeholder.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-muted text-sm">{stat.label}</span>
                        <span className="font-semibold text-deep-ocean">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Cerita Dampak"
            title="Kisah Sukses dari Lapangan"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStories.map((story, index) => (
              <MotionWrapper key={story.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-cream rounded-2xl p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-ocean">{story.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <span className="px-2 py-0.5 bg-gold/10 text-gold rounded-full text-xs">
                          {story.type}
                        </span>
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted text-sm mb-4">&ldquo;{story.story}&rdquo;</p>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="font-heading text-2xl font-bold text-gold">{story.metric}</div>
                    <div className="text-sm text-muted">{story.metricLabel}</div>
                  </div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20 bg-deep-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Dampak Sosial"
            title="Lebih dari Sekadar Ekonomi"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Briefcase, value: "127+", label: "Lapangan Kerja Langsung", desc: "Tim internal & mitra" },
              { icon: GraduationCap, value: "45", label: "Pelatihan Digital", desc: "Untuk UMKM & guide" },
              { icon: Heart, value: "12", label: "Desa Dampingan", desc: "Pemberdayaan komunitas" },
              { icon: Globe, value: "8.9K", label: "Konten Budaya", desc: "Dokumentasi digital" },
            ].map((stat, index) => (
              <MotionWrapper key={stat.label} delay={index * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
                  <stat.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <div className="font-heading text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-white/60">{stat.desc}</div>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {/* SDG Alignment */}
          <MotionWrapper delay={0.4}>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="font-heading text-xl font-bold text-deep-ocean mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-gold" />
                Alignment dengan SDGs (Tujuan Pembangunan Berkelanjutan)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {sdgGoals.map((goal, index) => (
                  <motion.div
                    key={goal.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-cream rounded-xl p-4 text-center"
                  >
                    <div className="w-12 h-12 bg-gold text-deep-ocean font-heading text-xl font-bold rounded-full flex items-center justify-center mx-auto mb-3">
                      {goal.number}
                    </div>
                    <h4 className="font-semibold text-deep-ocean text-sm mb-2">{goal.title}</h4>
                    <p className="text-xs text-muted">{goal.contribution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Government Dashboard Preview */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionWrapper>
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-medium rounded-full mb-4">
                Untuk Pemerintah
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-ocean mb-6">
                Dashboard Analytics Real-Time
              </h2>
              <p className="text-muted mb-6">
                Akses dashboard khusus untuk pemerintah dengan data real-time yang 
                mendukung pengambilan keputusan berbasis data:
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Statistik kunjungan wisatawan real-time",
                  "Peta heatmap destinasi populer",
                  "Analisis tren dan musim wisata",
                  "Monitoring pertumbuhan UMKM",
                  "Laporan kontribusi PAD otomatis",
                  "Early warning system krisis pariwisata",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-deep-ocean">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 px-6 py-3 bg-deep-ocean text-white font-semibold rounded-full hover:bg-deep-ocean-light transition-all"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-deep-ocean">Dashboard Preview</h3>
                  <span className="flex items-center gap-1 text-green-500 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
                
                {/* Mini dashboard */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cream rounded-xl p-4">
                      <div className="text-xs text-muted mb-1">Hari Ini</div>
                      <div className="font-heading text-2xl font-bold text-deep-ocean">4,328</div>
                      <div className="text-xs text-green-500">+12% dari kemarin</div>
                    </div>
                    <div className="bg-cream rounded-xl p-4">
                      <div className="text-xs text-muted mb-1">Transaksi</div>
                      <div className="font-heading text-2xl font-bold text-deep-ocean">156</div>
                      <div className="text-xs text-green-500">Rp 189jt</div>
                    </div>
                  </div>
                  
                  <div className="bg-cream rounded-xl p-4">
                    <div className="text-xs text-muted mb-2">Top Destinasi Hari Ini</div>
                    {[
                      { name: "Tana Toraja", visitors: 1245 },
                      { name: "Pantai Bira", visitors: 892 },
                      { name: "Fort Rotterdam", visitors: 756 },
                    ].map((dest, index) => (
                      <div key={dest.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-gold/10 text-gold font-bold text-xs rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-sm text-deep-ocean">{dest.name}</span>
                        </div>
                        <span className="text-sm font-medium text-deep-ocean">{dest.visitors}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-ocean mb-6">
              Mari Wujudkan Dampak Lebih Besar
            </h2>
            <p className="text-deep-ocean/80 text-lg mb-8 max-w-2xl mx-auto">
              Visit Sulsel siap menjadi mitra strategis Pemerintah Provinsi 
              Sulawesi Selatan dalam memajukan sektor pariwisata dan ekonomi kreatif.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/tentang"
                className="px-8 py-4 bg-deep-ocean text-white font-semibold rounded-full hover:bg-deep-ocean-light transition-all flex items-center gap-2"
              >
                Tentang Platform
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-deep-ocean text-deep-ocean font-semibold rounded-full hover:bg-deep-ocean/10 transition-all"
              >
                Jelajahi Visit Sulsel
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
