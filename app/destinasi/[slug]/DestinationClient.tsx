"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Heart,
  Share2,
  Navigation,
  Ticket,
  Camera,
  Phone,
  MessageCircle,
  Check,
} from "lucide-react";
import WishlistButton from "@/components/shared/WishlistButton";
import ShareButton from "@/components/shared/ShareButton";
import { addPendingDestination } from "@/lib/tripPlanner";

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
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  const allImages = [destination.image, ...destination.gallery];

  // Handle add to trip
  const handleAddToTrip = () => {
    // Add destination to pending list
    addPendingDestination({
      id: destination.id,
      name: destination.name,
      slug: destination.slug,
      image: destination.image,
      location: destination.location,
      addedAt: new Date().toISOString(),
    });

    // Show toast
    setShowAddedToast(true);

    // Redirect to rencanakan page after short delay
    setTimeout(() => {
      router.push("/rencanakan?from=destination&dest=" + destination.slug);
    }, 1000);
  };

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
    <main className="min-h-screen bg-gray-50 pb-40">
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href="/destinasi" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <h1 className="font-semibold text-gray-900 line-clamp-1 max-w-[200px]">{destination.name}</h1>
            <div className="flex items-center gap-1">
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
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="pt-14">
        <div className="relative">
          {/* Main Image */}
          <div 
            className="relative h-64 sm:h-80 cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{allImages.length}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-1 p-1 bg-white overflow-x-auto scrollbar-hide">
            {allImages.slice(0, 5).map((img, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer ${
                  index === 0 ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={img}
                  alt={`${destination.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 4 && allImages.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">+{allImages.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4 space-y-4">
          {/* Title & Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full capitalize">
                {destination.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-gray-900">{destination.rating}</span>
                <span className="text-gray-500 text-sm">({destination.reviews})</span>
              </div>
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mb-1">{destination.name}</h1>
            <p className="text-blue-600 font-medium text-sm mb-3">{destination.tagline}</p>
            
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{destination.location}</span>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <Ticket className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Harga Tiket</p>
              <p className="font-bold text-gray-900 text-sm">{destination.price}</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Jam Buka</p>
              <p className="font-bold text-gray-900 text-sm">08:00 - 17:00</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <Calendar className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Waktu Terbaik</p>
              <p className="font-bold text-gray-900 text-sm truncate">{destination.bestTime.split('-')[0]}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-2">Tentang Destinasi</h2>
            <p className={`text-gray-600 text-sm leading-relaxed ${!showFullDesc ? 'line-clamp-3' : ''}`}>
              {destination.description}
            </p>
            {destination.description.length > 150 && (
              <button 
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-600 text-sm font-medium mt-2"
              >
                {showFullDesc ? 'Tampilkan lebih sedikit' : 'Baca selengkapnya'}
              </button>
            )}
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">Yang Bisa Dilakukan</h2>
            <div className="space-y-2">
              {destination.highlights.map((highlight, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Related Destinations */}
          {relatedDestinations.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Destinasi Serupa</h2>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {relatedDestinations.map((dest, index) => (
                  <Link key={dest.id} href={`/destinasi/${dest.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-40 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm"
                    >
                      <div className="relative h-24">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{dest.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-600">{dest.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Harga tiket mulai</p>
            <p className="text-lg font-bold text-blue-600">{destination.price}</p>
          </div>
          <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Navigation className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleAddToTrip}
            disabled={showAddedToast}
            className={`flex-1 py-3 font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2 ${
              showAddedToast
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {showAddedToast ? (
              <>
                <Check className="w-5 h-5" />
                Ditambahkan!
              </>
            ) : (
              "Tambah ke Trip"
            )}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-36 left-4 right-4 z-50 pointer-events-none"
          >
            <div className="bg-green-600 text-white rounded-2xl p-4 shadow-lg shadow-green-600/30 flex items-center gap-3 max-w-md mx-auto">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{destination.name}</p>
                <p className="text-sm text-green-100">Ditambahkan ke rencana trip</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4">
              <button
                onClick={closeLightbox}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <span className="text-white font-medium">
                {lightboxIndex + 1} / {allImages.length}
              </span>
              <div className="w-10" />
            </div>

            {/* Image Container */}
            <div className="flex-1 relative flex items-center justify-center">
              <button
                onClick={prevImage}
                className="absolute left-2 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="relative w-full h-full max-w-4xl mx-4">
                <Image
                  src={allImages[lightboxIndex]}
                  alt={`${destination.name} ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              <button
                onClick={nextImage}
                className="absolute right-2 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="p-4">
              <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setLightboxIndex(index)}
                    className={`relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      index === lightboxIndex ? 'ring-2 ring-white scale-110' : 'opacity-50'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
