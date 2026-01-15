"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Grid3X3,
  List,
  Sparkles,
} from "lucide-react";
import destinationsData from "@/data/destinations.json";

const categories = [
  { id: "semua", label: "Semua", emoji: "✨" },
  { id: "alam", label: "Alam", emoji: "🏔️" },
  { id: "budaya", label: "Budaya", emoji: "🎭" },
  { id: "sejarah", label: "Sejarah", emoji: "🏛️" },
  { id: "pantai", label: "Pantai", emoji: "🏖️" },
];

const sortOptions = [
  { id: "popular", label: "Terpopuler" },
  { id: "rating", label: "Rating Tertinggi" },
  { id: "newest", label: "Terbaru" },
];

export default function DestinasiPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [liked, setLiked] = useState<string[]>([]);

  const filteredDestinations = destinationsData.destinations.filter((dest) => {
    const matchesCategory = activeCategory === "semua" || dest.category === activeCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id: string) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Destinasi Wisata</h1>
                <p className="text-xs text-gray-500">{filteredDestinations.length} tempat menarik</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2.5 rounded-xl transition-colors ${showSearch ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilter(!showFilter)}
                className={`p-2.5 rounded-xl transition-colors ${showFilter ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                {viewMode === "list" ? <Grid3X3 className="w-5 h-5 text-gray-600" /> : <List className="w-5 h-5 text-gray-600" />}
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pb-3 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari destinasi impianmu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilter && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pb-3 overflow-hidden"
              >
                <div className="bg-gray-50 rounded-2xl p-3">
                  <p className="text-xs font-medium text-gray-500 mb-2">Urutkan</p>
                  <div className="flex gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          sortBy === option.id
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Chips */}
          <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {viewMode === "list" ? (
          /* List View */
          <div className="space-y-3">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/destinasi/${dest.slug}`}
                  className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={(e) => { e.preventDefault(); toggleLike(dest.id); }}
                      className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                        liked.includes(dest.id) ? 'bg-red-500' : 'bg-white/80 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${liked.includes(dest.id) ? 'text-white fill-white' : 'text-gray-600'}`} />
                    </motion.button>
                    {dest.featured && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-[10px] text-white font-bold">TOP</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{dest.name}</h3>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
                        <span className="text-green-700 text-sm font-bold">{dest.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {dest.location}
                    </p>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-2">{dest.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold">{dest.price}</span>
                      <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-2 gap-3">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/destinasi/${dest.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                    <div className="relative h-36">
                      <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => { e.preventDefault(); toggleLike(dest.id); }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                          liked.includes(dest.id) ? 'bg-red-500' : 'bg-white/80'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${liked.includes(dest.id) ? 'text-white fill-white' : 'text-gray-600'}`} />
                      </motion.button>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-xs font-medium">{dest.rating}</span>
                        </div>
                        <h3 className="text-white font-bold text-sm line-clamp-1">{dest.name}</h3>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                        <MapPin className="w-3 h-3" />
                        {dest.location}
                      </p>
                      <span className="text-blue-600 font-bold text-sm">{dest.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {filteredDestinations.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tidak ada hasil</h3>
            <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci pencarian</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
