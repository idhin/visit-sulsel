"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mountain,
  Waves,
  Landmark,
  UtensilsCrossed,
  Calendar,
  Hotel,
  Map,
  Compass,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

const categories = [
  {
    icon: Mountain,
    title: "Wisata Alam",
    description: "Pegunungan, air terjun, dan keindahan alam yang memukau",
    href: "/destinasi?category=alam",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Waves,
    title: "Pantai & Laut",
    description: "Pantai berpasir putih dan terumbu karang yang eksotis",
    href: "/destinasi?category=pantai",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: Landmark,
    title: "Budaya & Sejarah",
    description: "Warisan budaya dan situs bersejarah yang kaya",
    href: "/budaya",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: UtensilsCrossed,
    title: "Kuliner Khas",
    description: "Cita rasa autentik masakan Sulawesi Selatan",
    href: "/kuliner",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: Calendar,
    title: "Event & Festival",
    description: "Perayaan tradisional dan event modern",
    href: "/event",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: Hotel,
    title: "Akomodasi",
    description: "Penginapan nyaman dari budget hingga mewah",
    href: "/akomodasi",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: Map,
    title: "Paket Wisata",
    description: "Itinerary lengkap untuk perjalanan Anda",
    href: "/itinerary",
    color: "from-teal-500 to-green-600",
  },
  {
    icon: Compass,
    title: "Panduan Wisata",
    description: "Tips dan informasi perjalanan lengkap",
    href: "/panduan",
    color: "from-pink-500 to-rose-600",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-deep-ocean/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Jelajahi Kategori"
          title="Temukan Pengalaman Terbaik"
          description="Sulawesi Selatan menawarkan beragam pengalaman wisata yang tak terlupakan. Pilih kategori favorit Anda dan mulai petualangan."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <StaggerItem key={category.title}>
              <Link href={category.href} className="block group">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  
                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300`}
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-deep-ocean group-hover:text-white transition-colors duration-300 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted group-hover:text-white/80 transition-colors duration-300 line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
