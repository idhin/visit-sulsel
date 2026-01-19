"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Ticket,
  ShoppingCart,
  Camera,
  Users,
  MessageSquare,
  ArrowRight,
  Check,
} from "lucide-react";

const services = [
  {
    id: "pesan",
    icon: Ticket,
    title: "PESAN",
    subtitle: "Booking & Reservasi",
    description: "Tiket destinasi, akomodasi, paket wisata, dan transportasi dalam satu tempat",
    features: ["Tiket Masuk Destinasi", "Hotel & Penginapan", "Paket Wisata", "Transportasi"],
    color: "from-blue-600 to-cyan-500",
    bgGlow: "bg-blue-500/20",
    href: "/pesan",
    stats: "500+ Layanan",
  },
  {
    id: "belanja",
    icon: ShoppingCart,
    title: "BELANJA",
    subtitle: "Marketplace UMKM",
    description: "Produk UMKM lokal: tenun, kerajinan, kuliner, dan oleh-oleh khas Sulsel",
    features: ["Tenun Toraja", "Kerajinan Lokal", "Kuliner Khas", "Oleh-oleh"],
    color: "from-emerald-600 to-teal-500",
    bgGlow: "bg-emerald-500/20",
    href: "/belanja",
    stats: "15.000+ Produk",
  },
  {
    id: "kreator",
    icon: Camera,
    title: "CREATOR HUB",
    subtitle: "Kreator Lokal",
    description: "Temukan fotografer, videografer, dan content creator lokal berbakat",
    features: ["Fotografer", "Videografer", "Content Creator", "Drone Pilot"],
    color: "from-purple-600 to-pink-500",
    bgGlow: "bg-purple-500/20",
    href: "/kreator",
    stats: "150+ Creator",
  },
  {
    id: "guide",
    icon: Users,
    title: "TOUR GUIDE",
    subtitle: "Pemandu Wisata",
    description: "Pemandu wisata lokal bersertifikat dengan pengetahuan mendalam",
    features: ["Guide Budaya", "Guide Adventure", "Guide Kuliner", "Guide Sejarah"],
    color: "from-orange-500 to-amber-500",
    bgGlow: "bg-orange-500/20",
    href: "/layanan/pemandu",
    stats: "100+ Guide",
  },
  {
    id: "komunitas",
    icon: MessageSquare,
    title: "KOMUNITAS",
    subtitle: "Forum & Review",
    description: "Forum diskusi, review autentik, dan cari teman perjalanan",
    features: ["Forum Diskusi", "Review Autentik", "Trip Buddy", "Tips Lokal"],
    color: "from-rose-600 to-red-500",
    bgGlow: "bg-rose-500/20",
    href: "/komunitas",
    stats: "12K+ Member",
  },
];

export default function SuperAppServices() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23172554' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold tracking-wide mb-4">
            5 PILAR LAYANAN
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-deep-ocean mb-4">
            Satu Platform, <span className="text-gradient">Semua Terintegrasi</span>
          </h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            Visit Sulsel bukan hanya portal wisata — ini adalah ekosistem lengkap yang 
            menghubungkan wisatawan dengan seluruh layanan pariwisata Sulawesi Selatan
          </p>
        </motion.div>

        {/* Services Grid - Featured Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* First two services - larger cards */}
          {services.slice(0, 2).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={index === 0 ? "lg:col-span-2" : ""}
            >
              <Link href={service.href}>
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all h-full border border-gray-100">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                        {service.stats}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl font-bold text-deep-ocean group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted text-sm">{service.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted mb-6">{service.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-deep-ocean font-semibold group-hover:text-gold transition-colors">
                      Jelajahi {service.title}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Remaining services - 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(2).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Link href={service.href}>
                <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all h-full border border-gray-100">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {service.stats}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-deep-ocean mb-1 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted text-sm mb-3">{service.subtitle}</p>

                    {/* Description */}
                    <p className="text-muted text-sm mb-4">{service.description}</p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-deep-ocean font-semibold text-sm group-hover:text-gold transition-colors">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-deep-ocean/5 rounded-2xl">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light border-2 border-white flex items-center justify-center"
                >
                  <span className="text-deep-ocean font-bold text-xs">
                    {["P", "B", "C", "G"][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-deep-ocean">Semua dalam Satu Platform</p>
              <p className="text-sm text-muted">Revenue kembali ke PAD Sulawesi Selatan</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
