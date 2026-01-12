"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  ShoppingCart,
  Camera,
  Users,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import SectionHeader from "@/components/shared/SectionHeader";

const services = [
  {
    id: "pesan",
    icon: Ticket,
    title: "Pesan",
    description: "Tiket destinasi, akomodasi, paket wisata, dan transportasi dalam satu tempat",
    color: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
    href: "/pesan",
    stats: "500+ Layanan",
  },
  {
    id: "belanja",
    icon: ShoppingCart,
    title: "Belanja",
    description: "Produk UMKM lokal: tenun, kerajinan, kuliner, dan oleh-oleh khas Sulsel",
    color: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400",
    href: "/belanja",
    stats: "1500+ Produk",
  },
  {
    id: "kreator",
    icon: Camera,
    title: "Creator Hub",
    description: "Temukan fotografer, videografer, dan content creator lokal berbakat",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400",
    href: "/kreator",
    stats: "150+ Creator",
  },
  {
    id: "guide",
    icon: Users,
    title: "Tour Guide",
    description: "Pemandu wisata lokal bersertifikat dengan pengetahuan mendalam",
    color: "from-orange-500 to-amber-500",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
    href: "/guide",
    stats: "100+ Guide",
  },
  {
    id: "komunitas",
    icon: MessageSquare,
    title: "Komunitas",
    description: "Forum diskusi, review autentik, dan cari teman perjalanan",
    color: "from-red-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
    href: "/komunitas",
    stats: "12K+ Member",
  },
];

export default function SuperAppServices() {
  return (
    <section className="py-20 bg-cream relative overflow-hidden">
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
        <SectionHeader
          subtitle="Super App"
          title="Satu Platform, Semua Kebutuhan"
          description="Visit Sulsel bukan hanya portal wisata - ini adalah ekosistem lengkap yang menghubungkan wisatawan dengan seluruh layanan pariwisata Sulawesi Selatan"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <Link href={service.href}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all ${
                    index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Image background */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80`} />
                    
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Stats badge */}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      {service.stats}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2 group-hover:text-gold transition-colors flex items-center justify-between">
                      {service.title}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-muted text-sm">{service.description}</p>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <MotionWrapper delay={0.6}>
          <div className="mt-12 text-center">
            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 text-deep-ocean font-semibold hover:text-gold transition-colors"
            >
              Pelajari lebih lanjut tentang platform
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
