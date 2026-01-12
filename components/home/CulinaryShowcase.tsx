"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import culinaryData from "@/data/culinary.json";

const featured = culinaryData.culinary.filter((c) => c.featured).slice(0, 6);

export default function CulinaryShowcase() {
  return (
    <section className="py-24 bg-deep-ocean relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-maroon rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Wisata Kuliner"
          title="Nikmati Cita Rasa Sulsel"
          description="Manjakan lidah Anda dengan kelezatan kuliner khas Makassar dan Sulawesi Selatan yang menggugah selera"
          light
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {featured.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-gold/90 text-deep-ocean text-xs font-semibold rounded-full capitalize">
                    {item.category.replace("-", " ")}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-semibold text-sm">
                      {item.price}
                    </span>
                    <span className="flex items-center gap-1 text-white/50 text-xs">
                      <MapPin className="w-3 h-3" />
                      {item.origin}
                    </span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <MotionWrapper delay={0.5} className="text-center">
          <Link
            href="/kuliner"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:gap-3"
          >
            Jelajahi Semua Kuliner
            <ArrowRight className="w-5 h-5" />
          </Link>
        </MotionWrapper>
      </div>
    </section>
  );
}
