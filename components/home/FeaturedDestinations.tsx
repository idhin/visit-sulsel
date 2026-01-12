"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper from "@/components/animations/MotionWrapper";
import destinations from "@/data/destinations.json";

const featured = destinations.destinations.filter((d) => d.featured).slice(0, 4);

export default function FeaturedDestinations() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            subtitle="Destinasi Populer"
            title="Tempat Wisata Terfavorit"
            description="Jelajahi destinasi wisata paling diminati di Sulawesi Selatan"
            align="left"
            className="mb-0"
          />
          <MotionWrapper delay={0.3}>
            <Link
              href="/destinasi"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
            >
              Lihat Semua
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MotionWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main featured */}
          <MotionWrapper className="lg:row-span-2">
            <Link href={`/destinasi/${featured[0].slug}`} className="block group h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-full min-h-[500px] rounded-3xl overflow-hidden"
              >
                <Image
                  src={featured[0].image}
                  alt={featured[0].name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/90 via-deep-ocean/30 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-4 py-1.5 bg-gold text-deep-ocean text-sm font-semibold rounded-full">
                    Populer
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-sm font-semibold text-deep-ocean">
                    {featured[0].rating}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-gold text-sm font-medium mb-2 block">
                    {featured[0].tagline}
                  </span>
                  <h3 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-3">
                    {featured[0].name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{featured[0].location}</span>
                  </div>
                  <p className="text-white/70 line-clamp-2 mb-6 max-w-lg">
                    {featured[0].description}
                  </p>
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-deep-ocean font-semibold rounded-full group-hover:gap-3 transition-all">
                    Jelajahi Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </MotionWrapper>

          {/* Secondary featured */}
          {featured.slice(1, 4).map((dest, index) => (
            <MotionWrapper key={dest.id} delay={0.1 * (index + 1)}>
              <Link href={`/destinasi/${dest.slug}`} className="block group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-60 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 via-deep-ocean/20 to-transparent" />
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="text-xs font-semibold text-deep-ocean">{dest.rating}</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/70 text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.location}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
