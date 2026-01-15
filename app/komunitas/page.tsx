"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MessageSquare,
  Heart,
  Eye,
  Users,
  Star,
  MapPin,
  Search,
  Plus,
  TrendingUp,
  Lightbulb,
  UtensilsCrossed,
  Compass,
  Camera,
  Landmark,
  Share2,
  MessageCircle,
} from "lucide-react";
import communityData from "@/data/community.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Lightbulb,
  UtensilsCrossed,
  Compass,
  MapPin,
  Camera,
  Landmark,
  Heart,
};

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));

  if (days > 0) return `${days} hari lalu`;
  if (hours > 0) return `${hours} jam lalu`;
  return `${minutes} menit lalu`;
}

export default function KomunitasPage() {
  const [activeTopic, setActiveTopic] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = communityData.posts.filter((post) => {
    const matchesTopic = activeTopic === "semua" || post.tags.includes(activeTopic);
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4"
            >
              <Users className="w-4 h-4" />
              Komunitas Traveler
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Berbagi Cerita & Pengalaman
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-green-100 max-w-2xl mx-auto"
            >
              Bergabung dengan komunitas traveler Sulawesi Selatan. Temukan inspirasi dan tips perjalanan.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search & Create */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari postingan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Buat Post</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Topics */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Topik</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTopic("semua")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTopic === "semua"
                      ? "bg-green-100 text-green-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Semua Postingan
                </button>
                {communityData.topics.map((topic) => {
                  const IconComponent = iconMap[topic.icon];
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setActiveTopic(topic.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTopic === topic.id
                          ? "bg-green-100 text-green-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                        {topic.name}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {topic.posts}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Trending
              </h3>
              <div className="space-y-2">
                {communityData.trending.map((item) => (
                  <button
                    key={item.tag}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-medium">#{item.tag}</span>
                    <span className="text-gray-400 text-xs ml-2">{item.posts} posts</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3 space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Post Header */}
                <div className="p-4 pb-0">
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={post.user.avatar}
                        alt={post.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                        {post.user.verified && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{post.location}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(post.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-green-100 hover:text-green-700 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                {post.images.length > 0 && (
                  <div className={`grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                    {post.images.slice(0, 2).map((image, idx) => (
                      <div key={idx} className="relative aspect-video">
                        <Image
                          src={image}
                          alt={`Post image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-1">Tidak ada postingan</h3>
                <p className="text-gray-500 text-sm">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
