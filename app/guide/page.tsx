"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Star,
  MapPin,
  MessageCircle,
  CheckCircle,
  Globe,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import guidesData from "@/data/guides.json";

const areas = [
  { id: "semua", label: "Semua" },
  { id: "toraja", label: "Toraja" },
  { id: "makassar", label: "Makassar" },
  { id: "bulukumba", label: "Bulukumba" },
  { id: "maros", label: "Maros" },
  { id: "bone", label: "Bone" },
  { id: "palopo", label: "Palopo" },
];

export default function GuidePage() {
  const [activeArea, setActiveArea] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredGuides = guidesData.guides.filter((guide) => {
    const matchesArea = activeArea === "semua" || 
      guide.location.toLowerCase().includes(activeArea.toLowerCase());
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesSearch;
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
              <h1 className="text-lg font-bold text-gray-900">Tour Guide</h1>
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
                  placeholder="Cari guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Area Chips */}
          <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveArea(area.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeArea === area.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-500">
          {filteredGuides.length} guide tersedia
        </p>
      </div>

      {/* Guides List */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="space-y-3">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-xl p-4 shadow-sm"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={guide.photo} alt={guide.name} fill className="object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                        {guide.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-gray-500 text-xs">{guide.tours} tours completed</p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 text-green-600 fill-green-600" />
                      <span className="text-green-700 text-xs font-semibold">{guide.rating}</span>
                      <span className="text-gray-400 text-xs">({guide.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {guide.location}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${guide.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {guide.available ? 'Tersedia' : 'Tidak Tersedia'}
                    </span>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-1 mt-2">
                    <Globe className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{guide.languages.join(", ")}</span>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {guide.specialties.slice(0, 3).map((spec) => (
                      <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500">{guide.priceUnit}</span>
                  <p className="text-green-600 font-bold">{formatPrice(guide.price)}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/6281234567890?text=Halo ${guide.name}, saya tertarik dengan layanan tour guide Anda`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 ${guide.available ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Tidak ada guide</h3>
            <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci</p>
          </div>
        )}
      </div>
    </main>
  );
}
