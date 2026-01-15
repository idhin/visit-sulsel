"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  X,
  CheckCircle,
  MessageCircle,
  Camera,
  Video,
  Users,
  Heart,
  MapPin,
  Landmark,
  BookOpen,
} from "lucide-react";
import creatorsData from "@/data/creators.json";

const categories = [
  { id: "semua", label: "Semua", icon: Users },
  { id: "photographer", label: "Photographer", icon: Camera },
  { id: "vlogger", label: "Vlogger", icon: Video },
  { id: "guide", label: "Local Guide", icon: MapPin },
  { id: "culture", label: "Culture", icon: Landmark },
  { id: "heritage", label: "Heritage", icon: BookOpen },
];

export default function KreatorPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredCreators = creatorsData.creators.filter((creator) => {
    const matchesCategory = activeCategory === "semua" || creator.category === activeCategory;
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
              <h1 className="text-lg font-bold text-gray-900">Creator Hub</h1>
            </div>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
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
                  placeholder="Cari creator..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Category Chips */}
          <div className="flex gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-500">
          {filteredCreators.length} creator tersedia
        </p>
      </div>

      {/* Creators Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Cover from first post */}
              <div className="relative h-32">
                <Image 
                  src={creator.recentPosts[0]?.image || creator.avatar} 
                  alt={creator.name} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {creator.featured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
              </div>
              
              {/* Avatar */}
              <div className="relative px-4 -mt-10">
                <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{creator.name}</h3>
                  {creator.verified && <CheckCircle className="w-5 h-5 text-blue-500" />}
                </div>
                <p className="text-purple-600 text-sm mb-2">{creator.username}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">{creator.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm mb-3">
                  <div>
                    <span className="font-bold text-gray-900">{(creator.followers / 1000).toFixed(0)}K</span>
                    <span className="text-gray-500 ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">{creator.posts}</span>
                    <span className="text-gray-500 ml-1">posts</span>
                  </div>
                </div>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full mb-3 capitalize">
                  {creator.category}
                </span>

                {/* Recent Posts Preview */}
                <div className="grid grid-cols-3 gap-1 mb-3">
                  {creator.recentPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image src={post.image} alt="Post" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                        <Heart className="w-4 h-4 text-white" />
                        <span className="text-white text-xs ml-1">{(post.likes / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/6281234567890?text=Halo ${creator.name}, saya tertarik untuk kolaborasi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hubungi
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Tidak ada creator</h3>
            <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci</p>
          </div>
        )}
      </div>
    </main>
  );
}
