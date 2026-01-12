"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import WishlistButton from "@/components/shared/WishlistButton";
import ShareButton from "@/components/shared/ShareButton";
import WeatherWidget from "@/components/shared/WeatherWidget";

interface Destination {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  category: string;
  image: string;
  gallery: string[];
  highlights: string[];
  rating: number;
  reviews: number;
  price: string;
  bestTime: string;
  featured: boolean;
}

interface Props {
  destination: Destination;
  relatedDestinations: Destination[];
}

export default function DestinationClient({ destination, relatedDestinations }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = [destination.image, ...destination.gallery];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <main className="pt-20">
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/90 via-deep-ocean/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-8 left-4 sm:left-8 z-10">
          <Link
            href="/destinasi"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </Link>
        </div>

        {/* Actions */}
        <div className="absolute top-8 right-4 sm:right-8 z-10 flex gap-2">
          <WishlistButton
            id={destination.id}
            type="destinasi"
            name={destination.name}
            image={destination.image}
            location={destination.location}
          />
          <ShareButton
            title={`${destination.name} - Visit Sulsel`}
            description={destination.description}
          />
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-gold text-deep-ocean text-sm font-semibold rounded-full mb-4 capitalize"
            >
              {destination.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2"
            >
              {destination.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gold mb-4"
            >
              {destination.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 text-white/80"
            >
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {destination.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-gold fill-gold" />
                {destination.rating} ({destination.reviews} ulasan)
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <MotionWrapper>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-deep-ocean mb-4">
                    Tentang Destinasi
                  </h2>
                  <p className="text-muted leading-relaxed">{destination.description}</p>
                </div>
              </MotionWrapper>

              {/* Highlights */}
              <MotionWrapper delay={0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-deep-ocean mb-6">
                    Yang Bisa Dilihat & Dilakukan
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-gold" />
                        </div>
                        <span className="text-deep-ocean">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>

              {/* Gallery */}
              <MotionWrapper delay={0.2}>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-deep-ocean mb-6">
                    Galeri Foto
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openLightbox(index)}
                        className={`relative rounded-xl overflow-hidden cursor-pointer ${
                          index === 0 ? "col-span-2 row-span-2 h-64" : "h-32"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${destination.name} ${index + 1}`}
                          fill
                          className="object-cover hover:opacity-90 transition-opacity"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather Widget */}
              <MotionWrapper>
                <WeatherWidget location={destination.location} />
              </MotionWrapper>

              {/* Quick info card */}
              <MotionWrapper delay={0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32">
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted">Harga Tiket Masuk</span>
                    <div className="font-heading text-2xl font-bold text-gold">
                      {destination.price}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                      <Calendar className="w-5 h-5 text-gold" />
                      <div>
                        <div className="text-sm text-muted">Waktu Terbaik</div>
                        <div className="font-medium text-deep-ocean">
                          {destination.bestTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                      <Clock className="w-5 h-5 text-gold" />
                      <div>
                        <div className="text-sm text-muted">Jam Operasional</div>
                        <div className="font-medium text-deep-ocean">08:00 - 17:00</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-cream rounded-xl">
                      <Users className="w-5 h-5 text-gold" />
                      <div>
                        <div className="text-sm text-muted">Ulasan Pengunjung</div>
                        <div className="font-medium text-deep-ocean">
                          {destination.reviews} ulasan
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/itinerary"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
                  >
                    Tambah ke Itinerary
                  </Link>
                </div>
              </MotionWrapper>
            </div>
          </div>

          {/* Related destinations */}
          {relatedDestinations.length > 0 && (
            <MotionWrapper delay={0.3} className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-deep-ocean mb-8">
                Destinasi Serupa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedDestinations.map((dest) => (
                  <Link key={dest.id} href={`/destinasi/${dest.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-bold text-deep-ocean group-hover:text-gold transition-colors">
                          {dest.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted text-sm">
                          <MapPin className="w-4 h-4" />
                          {dest.location}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </MotionWrapper>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] mx-4">
            <Image
              src={allImages[lightboxIndex]}
              alt={`${destination.name} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </motion.div>
      )}
    </main>
  );
}
