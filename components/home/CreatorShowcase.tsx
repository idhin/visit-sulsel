"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Camera, Video, Plane, CheckCircle } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import SectionHeader from "@/components/shared/SectionHeader";
import creatorsData from "@/data/creators.json";
import { formatPrice } from "@/lib/utils";

export default function CreatorShowcase() {
  const featuredCreators = creatorsData.creators.filter((c) => c.featured).slice(0, 4);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <MotionWrapper>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-4">
                <Camera className="w-4 h-4" />
                Creator Economy
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-deep-ocean mb-4">
                Abadikan Momen dengan{" "}
                <span className="text-gradient">Kreator Lokal</span>
              </h2>
              <p className="text-muted mb-6">
                Temukan fotografer, videografer, dan content creator berbakat dari 
                Sulawesi Selatan. Mereka mengenal setiap sudut indah tanah ini dan 
                siap mengabadikan perjalanan Anda.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Camera, label: "45 Fotografer" },
                  { icon: Video, label: "32 Videografer" },
                  { icon: Plane, label: "18 Drone Pilot" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-deep-ocean">
                    <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-gold" />
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <Link
                href="/kreator"
                className="inline-flex items-center gap-2 px-6 py-3 bg-deep-ocean text-white font-semibold rounded-full hover:bg-deep-ocean-light transition-all"
              >
                Jelajahi Creator
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MotionWrapper>
          </div>

          {/* Right - Creator cards */}
          <div className="grid grid-cols-2 gap-4">
            {featuredCreators.map((creator, index) => (
              <MotionWrapper key={creator.id} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`bg-cream rounded-2xl p-4 ${
                    index === 1 ? "mt-8" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-deep-ocean text-sm truncate">
                          {creator.name}
                        </h4>
                        {creator.verified && (
                          <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <MapPin className="w-3 h-3" />
                        {creator.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {creator.specialization.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 bg-white text-deep-ocean text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-sm font-medium text-deep-ocean">
                        {creator.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gold font-medium">
                      Mulai {formatPrice(creator.services[0].price)}
                    </span>
                  </div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
