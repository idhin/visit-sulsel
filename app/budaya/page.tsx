"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users, Music, Palette, ChevronRight, Play } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import cultureData from "@/data/culture.json";

export default function BudayaPage() {
  const [activeEthnic, setActiveEthnic] = useState(cultureData.ethnicGroups[0]);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1920"
            alt="Budaya Sulsel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/70 to-deep-ocean/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4"
          >
            Warisan Leluhur
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl"
          >
            Kekayaan Budaya <span className="text-gradient">Sulawesi Selatan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl"
          >
            Jelajahi keberagaman budaya empat suku besar yang hidup harmonis:
            Bugis, Makassar, Toraja, dan Mandar
          </motion.p>
        </div>
      </section>

      {/* Ethnic Groups Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Empat Suku Besar"
            title="Mosaik Budaya yang Memukau"
            description="Setiap suku memiliki bahasa, adat istiadat, dan tradisi yang unik namun hidup berdampingan dalam harmoni"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ethnic selector */}
            <div className="space-y-3">
              {cultureData.ethnicGroups.map((group) => (
                <motion.button
                  key={group.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveEthnic(group)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    activeEthnic.id === group.id
                      ? "bg-deep-ocean text-white shadow-lg"
                      : "bg-white hover:bg-cream-dark"
                  }`}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={group.image}
                      alt={group.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold">{group.name}</h3>
                    <p
                      className={`text-sm ${
                        activeEthnic.id === group.id ? "text-white/70" : "text-muted"
                      }`}
                    >
                      {group.region}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 ${
                      activeEthnic.id === group.id ? "text-gold" : "text-muted"
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {/* Selected ethnic detail */}
            <motion.div
              key={activeEthnic.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-64 lg:h-80">
                <Image
                  src={activeEthnic.image}
                  alt={activeEthnic.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-heading text-3xl font-bold text-white mb-2">
                    {activeEthnic.name}
                  </h2>
                  <p className="text-gold">{activeEthnic.region}</p>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-muted leading-relaxed">{activeEthnic.description}</p>
                <div>
                  <h4 className="font-semibold text-deep-ocean mb-3">Tradisi Khas</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeEthnic.traditions.map((tradition, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gold/10 text-deep-ocean rounded-full text-sm"
                      >
                        {tradition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traditions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Upacara Adat"
            title="Tradisi yang Masih Lestari"
            description="Berbagai upacara adat yang masih dijalankan hingga saat ini"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureData.traditions.map((tradition) => (
              <StaggerItem key={tradition.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-cream rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tradition.image}
                      alt={tradition.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-maroon text-white text-xs font-semibold rounded-full">
                      {tradition.type}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2 group-hover:text-gold transition-colors">
                      {tradition.name}
                    </h3>
                    <p className="text-muted text-sm line-clamp-3 mb-3">
                      {tradition.description}
                    </p>
                    <span className="text-sm text-gold">📍 {tradition.region}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Traditional Dances */}
      <section className="py-20 bg-deep-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Tarian Tradisional"
            title="Gerak dan Irama Sulsel"
            description="Tarian-tarian yang merepresentasikan jiwa dan budaya masyarakat"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureData.dances.map((dance, index) => (
              <MotionWrapper key={dance.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={dance.image}
                      alt={dance.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-gold rounded-full flex items-center justify-center"
                      >
                        <Play className="w-6 h-6 text-deep-ocean fill-deep-ocean ml-1" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-gold text-sm font-medium">{dance.origin}</span>
                    <h3 className="font-heading text-xl font-bold text-white mb-2 mt-1">
                      {dance.name}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {dance.description}
                    </p>
                  </div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Crafts Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Kerajinan Tangan"
            title="Karya Seni Tradisional"
            description="Kerajinan khas yang diwariskan turun-temurun"
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureData.crafts.map((craft) => (
              <StaggerItem key={craft.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={craft.image}
                      alt={craft.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2 group-hover:text-gold transition-colors">
                      {craft.name}
                    </h3>
                    <p className="text-muted text-sm">{craft.description}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Sejarah"
            title="Perjalanan Sejarah Sulsel"
            description="Dari kerajaan-kerajaan besar hingga era modern"
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {cultureData.timeline.map((item, index) => (
                <MotionWrapper
                  key={index}
                  delay={index * 0.1}
                  variant={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                >
                  <div
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="bg-cream rounded-xl p-6 inline-block">
                        <span className="text-gold font-bold text-lg">{item.year}</span>
                        <p className="text-deep-ocean mt-1">{item.event}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex w-4 h-4 bg-gold rounded-full relative z-10 flex-shrink-0">
                      <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-50" />
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
