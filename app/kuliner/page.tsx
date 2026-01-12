"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, UtensilsCrossed, Soup, Cookie, Coffee, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import culinaryData from "@/data/culinary.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  UtensilsCrossed,
  Soup,
  Cookie,
  Coffee,
};

export default function KulinerPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [selectedItem, setSelectedItem] = useState<typeof culinaryData.culinary[0] | null>(null);

  const filteredCulinary = culinaryData.culinary.filter((item) => {
    return activeCategory === "semua" || item.category === activeCategory;
  });

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1920"
            alt="Kuliner Sulsel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/90 via-deep-ocean/70 to-deep-ocean/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4"
          >
            Wisata Kuliner
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Kuliner Khas Sulsel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Manjakan lidah Anda dengan cita rasa autentik Makassar dan Sulawesi Selatan
            yang kaya akan rempah dan tradisi
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {culinaryData.categories.map((cat) => {
              const IconComponent = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-maroon text-white shadow-lg shadow-maroon/30"
                      : "bg-cream text-deep-ocean hover:bg-cream-dark"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culinary Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCulinary.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/70 via-transparent to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-maroon text-white text-xs font-semibold rounded-full capitalize">
                      {item.category.replace("-", " ")}
                    </span>

                    {/* Featured badge */}
                    {item.featured && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-deep-ocean text-xs font-semibold rounded-full">
                        Populer
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2 group-hover:text-maroon transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted text-sm line-clamp-2 mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <MapPin className="w-4 h-4" />
                        {item.origin}
                      </div>
                      <span className="text-maroon font-semibold">{item.price}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-cream rounded-full text-deep-ocean">
                        {item.taste}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative h-64">
              <Image
                src={selectedItem.image}
                alt={selectedItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/80 to-transparent" />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                ×
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-maroon text-white text-sm font-semibold rounded-full mb-2 capitalize">
                  {selectedItem.category.replace("-", " ")}
                </span>
                <h2 className="font-heading text-3xl font-bold text-white">
                  {selectedItem.name}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-deep-ocean mb-2">Deskripsi</h3>
                <p className="text-muted">{selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Rasa</div>
                  <div className="font-semibold text-deep-ocean">{selectedItem.taste}</div>
                </div>
                <div className="bg-cream rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Harga</div>
                  <div className="font-semibold text-maroon">{selectedItem.price}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-deep-ocean mb-3">Tempat Terbaik</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.restaurants.map((spot, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gold/10 text-deep-ocean text-sm rounded-full"
                    >
                      📍 {spot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Culinary Map Section */}
      <section className="py-16 bg-deep-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Peta Kuliner"
            title="Temukan Kuliner di Sekitar Anda"
            description="Lokasi-lokasi terbaik untuk mencicipi kuliner khas Sulawesi Selatan"
            light
          />

          <MotionWrapper className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
            <div className="text-white/70 mb-4">
              <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-gold" />
              <p className="text-lg">
                Fitur peta interaktif akan segera hadir untuk membantu Anda menemukan
                tempat kuliner terbaik di Sulawesi Selatan.
              </p>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
