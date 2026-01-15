"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  X,
  MapPin,
  Star,
  Heart,
  ChevronRight,
  Flame,
  Clock,
  Navigation,
} from "lucide-react";
import culinaryData from "@/data/culinary.json";

const categories = [
  { id: "semua", label: "Semua", emoji: "🍽️" },
  { id: "makanan", label: "Makanan", emoji: "🥘" },
  { id: "jajanan", label: "Jajanan", emoji: "🍰" },
  { id: "minuman", label: "Minuman", emoji: "☕" },
];

export default function KulinerPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof culinaryData.culinary[0] | null>(null);
  const [liked, setLiked] = useState<string[]>([]);

  const filteredCulinary = culinaryData.culinary.filter((item) => {
    const matchesCategory = activeCategory === "semua" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCulinary = culinaryData.culinary.filter(item => item.featured);

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
                <h1 className="text-lg font-bold text-gray-900">Kuliner Sulsel</h1>
                <p className="text-xs text-gray-500">{filteredCulinary.length} menu lezat</p>
              </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2.5 rounded-xl transition-colors ${showSearch ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
            >
              <Search className="w-5 h-5" />
            </motion.button>
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
                    placeholder="Cari kuliner favorit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full">
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
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
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30"
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

      {/* Featured Section */}
      {activeCategory === "semua" && !searchQuery && (
        <div className="max-w-7xl mx-auto py-4">
          <div className="px-4 flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <Flame className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="font-bold text-gray-900">Paling Populer</h2>
          </div>
          <div className="px-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {featuredCulinary.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => setSelectedItem(item)}
                  className="flex-none w-[150px] cursor-pointer group"
                >
                  <div className="relative h-[190px] rounded-2xl overflow-hidden shadow-md bg-gray-200">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* HOT Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center gap-1">
                      <Flame className="w-3 h-3 text-white" />
                      <span className="text-[9px] text-white font-bold">HOT</span>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">{item.name}</h3>
                      <p className="text-white/70 text-[11px] flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{item.origin}</span>
                      </p>
                      <p className="text-orange-400 font-bold text-xs mt-1.5">{item.price.split(" - ")[0]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Culinary List */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {activeCategory === "semua" && !searchQuery && (
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-bold text-gray-900">Semua Menu</h2>
          </div>
        )}
        
        <div className="space-y-3">
          {filteredCulinary.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100 cursor-pointer group"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <motion.button 
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                  className={`absolute top-1.5 right-1.5 p-1.5 rounded-full transition-colors ${
                    liked.includes(item.id) ? 'bg-red-500' : 'bg-white/80'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${liked.includes(item.id) ? 'text-white fill-white' : 'text-gray-600'}`} />
                </motion.button>
              </div>
              <div className="flex-1 min-w-0 py-0.5">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{item.name}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {item.origin}
                </p>
                <p className="text-gray-600 text-xs line-clamp-1 mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-bold">{item.price.split(" - ")[0]}</span>
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-medium rounded-full">{item.taste}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCulinary.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tidak ada kuliner</h3>
            <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci</p>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Handle */}
              <div className="sticky top-0 z-10 bg-white pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto" />
              </div>

              <div className="relative h-52">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(selectedItem.id)}
                  className={`absolute top-4 left-4 p-2.5 rounded-full transition-colors ${
                    liked.includes(selectedItem.id) ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked.includes(selectedItem.id) ? 'text-white fill-white' : 'text-white'}`} />
                </motion.button>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full capitalize mb-2">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{selectedItem.origin}</span>
                  </div>
                  <span className="text-red-600 font-bold text-lg">{selectedItem.price}</span>
                </div>

                <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 text-center border border-orange-100">
                    <p className="text-xs text-gray-500 mb-1">Rasa</p>
                    <p className="font-bold text-gray-900">{selectedItem.taste}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center border border-red-100">
                    <p className="text-xs text-gray-500 mb-1">Kategori</p>
                    <p className="font-bold text-gray-900 capitalize">{selectedItem.category}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-red-500" />
                    Tempat Rekomendasi
                  </h3>
                  <div className="space-y-2">
                    {selectedItem.restaurants.map((spot, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-900 font-medium">{spot}</span>
                          <p className="text-xs text-gray-500">Tap untuk lihat lokasi</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl transition-all">
                    Lihat di Peta
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
