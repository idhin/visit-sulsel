"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Heart,
  ChevronRight,
  Wifi,
  Car,
  Coffee,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import accommodationsData from "@/data/accommodations.json";

const types = [
  { id: "semua", label: "Semua" },
  { id: "hotel", label: "Hotel" },
  { id: "resort", label: "Resort" },
  { id: "villa", label: "Villa" },
];

export default function AkomodasiPage() {
  const [activeType, setActiveType] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredAccommodations = accommodationsData.accommodations.filter((acc) => {
    const matchesType = activeType === "semua" || acc.type === activeType;
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <h1 className="text-lg font-bold text-gray-900">Hotel & Penginapan</h1>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="pb-3"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari hotel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Type Chips */}
          <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeType === type.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-500">
          {filteredAccommodations.length} hotel ditemukan
        </p>
      </div>

      {/* Hotels List */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="space-y-3">
          {filteredAccommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <Image src={acc.image} alt={acc.name} fill className="object-cover" />
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {Array.from({ length: acc.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{acc.name}</h3>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded flex-shrink-0">
                    <Star className="w-3 h-3 text-green-600 fill-green-600" />
                    <span className="text-green-700 text-xs font-semibold">{acc.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" />
                  {acc.location}
                </p>
                
                {/* Facilities */}
                <div className="flex gap-3 mb-3">
                  {acc.facilities.slice(0, 3).map((facility) => (
                    <span key={facility} className="text-xs text-gray-500 flex items-center gap-1">
                      {facility === "WiFi" && <Wifi className="w-3 h-3" />}
                      {facility === "Parking" && <Car className="w-3 h-3" />}
                      {facility === "Restaurant" && <Coffee className="w-3 h-3" />}
                      {facility}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500">Mulai dari</span>
                    <p className="text-orange-500 font-bold">{formatPrice(acc.price)}<span className="text-xs text-gray-500 font-normal">/malam</span></p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                    Pilih Kamar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAccommodations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Tidak ada hasil</h3>
            <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci</p>
          </div>
        )}
      </div>
    </main>
  );
}
