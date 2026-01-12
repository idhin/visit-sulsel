"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

interface WishlistItem {
  id: string;
  type: "destinasi" | "kuliner" | "event" | "akomodasi";
  name: string;
  image: string;
  location?: string;
  addedAt: number;
}

const STORAGE_KEY = "visitsulsel_wishlist";

const typeConfig = {
  destinasi: { label: "Destinasi", href: "/destinasi", color: "bg-blue-500" },
  kuliner: { label: "Kuliner", href: "/kuliner", color: "bg-orange-500" },
  event: { label: "Event", href: "/event", color: "bg-purple-500" },
  akomodasi: { label: "Akomodasi", href: "/akomodasi", color: "bg-green-500" },
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        console.error("Failed to parse wishlist");
      }
    }
    setIsLoaded(true);

    // Listen for wishlist updates
    const handleUpdate = (e: CustomEvent<WishlistItem[]>) => {
      setItems(e.detail);
    };
    window.addEventListener("wishlistUpdate", handleUpdate as EventListener);
    return () => window.removeEventListener("wishlistUpdate", handleUpdate as EventListener);
  }, []);

  const removeItem = (id: string, type: string) => {
    const newItems = items.filter((i) => !(i.id === id && i.type === type));
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: newItems }));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: [] }));
  };

  const getItemHref = (item: WishlistItem) => {
    if (item.type === "destinasi") {
      return `/destinasi/${item.id}`;
    }
    return `/${item.type}#${item.id}`;
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-deep-ocean to-deep-ocean-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-4"
          >
            <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            <span className="text-red-300 font-medium">Wishlist Anda</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Destinasi Impian
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Simpan dan kelola tempat-tempat yang ingin Anda kunjungi di Sulawesi Selatan
          </motion.p>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-16 bg-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoaded ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length > 0 ? (
            <>
              {/* Header with clear button */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted">
                  <span className="font-semibold text-deep-ocean">{items.length}</span> item di wishlist
                </p>
                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Hapus Semua</span>
                </button>
              </div>

              {/* Grid */}
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const config = typeConfig[item.type];
                  return (
                    <StaggerItem key={`${item.type}-${item.id}`}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/60 via-transparent to-transparent" />
                          
                          {/* Type badge */}
                          <span className={`absolute top-4 left-4 px-3 py-1 ${config.color} text-white text-xs font-semibold rounded-full`}>
                            {config.label}
                          </span>

                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id, item.type)}
                            className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-5">
                          <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2 group-hover:text-gold transition-colors">
                            {item.name}
                          </h3>
                          
                          {item.location && (
                            <div className="flex items-center gap-1 text-muted text-sm mb-4">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className="text-xs text-muted">
                              Ditambahkan {new Date(item.addedAt).toLocaleDateString("id-ID")}
                            </span>
                            <Link
                              href={getItemHref(item)}
                              className="flex items-center gap-1 text-gold font-medium text-sm hover:gap-2 transition-all"
                            >
                              Lihat Detail
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </>
          ) : (
            <MotionWrapper className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-deep-ocean mb-3">
                Wishlist Masih Kosong
              </h2>
              <p className="text-muted mb-8 max-w-md mx-auto">
                Jelajahi destinasi, kuliner, dan event menarik di Sulawesi Selatan 
                dan simpan favorit Anda di sini
              </p>
              <Link
                href="/destinasi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                Jelajahi Destinasi
                <ExternalLink className="w-4 h-4" />
              </Link>
            </MotionWrapper>
          )}
        </div>
      </section>
    </main>
  );
}
