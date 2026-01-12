"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper from "@/components/animations/MotionWrapper";
import cultureData from "@/data/culture.json";

export default function CultureHighlight() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A2540' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Budaya & Tradisi"
          title="Kekayaan Budaya Sulsel"
          description="Empat suku besar dengan tradisi dan adat istiadat yang unik"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Image grid */}
          <MotionWrapper className="grid grid-cols-2 gap-4">
            {cultureData.ethnicGroups.slice(0, 4).map((group, index) => (
              <motion.div
                key={group.id}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`relative rounded-2xl overflow-hidden shadow-lg ${
                  index === 0 ? "col-span-2 h-48" : "h-40"
                }`}
              >
                <Image
                  src={group.image}
                  alt={group.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 via-deep-ocean/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-heading text-lg font-bold text-white">
                    {group.name}
                  </h4>
                  <p className="text-white/70 text-sm">{group.region}</p>
                </div>
              </motion.div>
            ))}
          </MotionWrapper>

          {/* Right side - Content */}
          <div>
            <MotionWrapper delay={0.2}>
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-deep-ocean mb-6">
                Mosaik Budaya yang Memukau
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Sulawesi Selatan adalah rumah bagi empat suku besar: Bugis, Makassar, 
                Toraja, dan Mandar. Masing-masing memiliki bahasa, adat istiadat, dan 
                tradisi yang kaya, namun hidup berdampingan dalam harmoni.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Dari upacara pemakaman megah Rambu Solo&apos; di Toraja hingga tradisi 
                pelayaran Pinisi yang diakui UNESCO, setiap sudut Sulsel menyimpan 
                cerita dan keajaiban tersendiri.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <div className="space-y-3 mb-8">
                {cultureData.traditions.slice(0, 3).map((tradition) => (
                  <div
                    key={tradition.id}
                    className="flex items-center gap-3 p-3 bg-cream rounded-xl hover:bg-cream-dark transition-colors"
                  >
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-deep-ocean">{tradition.name}</h5>
                      <p className="text-sm text-muted">{tradition.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
              <Link
                href="/budaya"
                className="inline-flex items-center gap-2 px-6 py-3 bg-deep-ocean text-white font-semibold rounded-full hover:bg-deep-ocean-light transition-colors hover:gap-3"
              >
                Pelajari Lebih Lanjut
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MotionWrapper>
          </div>
        </div>

        {/* Timeline teaser */}
        <MotionWrapper delay={0.5}>
          <div className="bg-gradient-to-r from-deep-ocean to-deep-ocean-light rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Sejarah Sulawesi Selatan
              </h3>
              <p className="text-white/70">
                Perjalanan panjang dari Kerajaan Gowa hingga era modern
              </p>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {cultureData.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[200px] border border-white/10 hover:border-gold/30 transition-colors"
                >
                  <div className="text-gold font-bold mb-2">{item.year}</div>
                  <div className="text-white text-sm">{item.event}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
