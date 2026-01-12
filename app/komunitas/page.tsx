"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MessageSquare,
  Heart,
  Eye,
  Clock,
  Users,
  Star,
  MapPin,
  Calendar,
  Search,
  Plus,
  TrendingUp,
  Lightbulb,
  UtensilsCrossed,
  Compass,
  Calculator,
  ArrowRight,
  ThumbsUp,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import communityData from "@/data/community.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Lightbulb,
  UtensilsCrossed,
  Compass,
  Calculator,
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
  const [activeTab, setActiveTab] = useState<"forum" | "review" | "buddy">("forum");
  const [activeCategory, setActiveCategory] = useState("semua");

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-deep-ocean via-deep-ocean-light to-deep-ocean overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-maroon/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6"
            >
              <Users className="w-4 h-4" />
              Komunitas Traveler
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Berbagi Cerita &{" "}
              <span className="text-gradient">Pengalaman</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 mb-8"
            >
              Bergabung dengan komunitas traveler Sulawesi Selatan. Tanyakan tips, 
              bagikan pengalaman, temukan teman perjalanan, dan baca ulasan autentik.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {[
                { value: communityData.stats.totalMembers.toLocaleString(), label: "Member" },
                { value: communityData.stats.totalDiscussions.toLocaleString(), label: "Diskusi" },
                { value: communityData.stats.totalReviews.toLocaleString(), label: "Review" },
                { value: communityData.stats.activeToday, label: "Online Hari Ini" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-4 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { id: "forum", label: "Forum Diskusi", icon: MessageSquare },
                { id: "review", label: "Review", icon: Star },
                { id: "buddy", label: "Trip Buddy", icon: UserPlus },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-deep-ocean text-white"
                      : "bg-cream text-deep-ocean hover:bg-cream-dark"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              Buat Post
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <input
                    type="text"
                    placeholder="Cari diskusi..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>

              {/* Categories */}
              {activeTab === "forum" && (
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <h3 className="font-semibold text-deep-ocean mb-3">Kategori</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveCategory("semua")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeCategory === "semua"
                          ? "bg-gold/10 text-gold font-medium"
                          : "text-muted hover:bg-cream"
                      }`}
                    >
                      Semua Kategori
                    </button>
                    {communityData.categories.map((cat) => {
                      const IconComponent = iconMap[cat.icon];
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeCategory === cat.id
                              ? "bg-gold/10 text-gold font-medium"
                              : "text-muted hover:bg-cream"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                            {cat.name}
                          </span>
                          <span className="text-xs bg-cream px-2 py-0.5 rounded-full">
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Trending */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-semibold text-deep-ocean mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {["#Toraja2026", "#KulinerMakassar", "#BiraBeach", "#RambuSolo", "#PinisiFestival"].map((tag) => (
                    <button
                      key={tag}
                      className="block w-full text-left px-3 py-2 text-sm text-deep-ocean hover:text-gold hover:bg-cream rounded-lg transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 space-y-4">
              {/* Forum Tab */}
              {activeTab === "forum" && (
                <>
                  {communityData.discussions
                    .filter((d) => activeCategory === "semua" || d.category === activeCategory)
                    .map((discussion) => (
                      <motion.div
                        key={discussion.id}
                        whileHover={{ y: -2 }}
                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex gap-4">
                          {/* Author avatar */}
                          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={discussion.author.avatar}
                              alt={discussion.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h3 className="font-semibold text-deep-ocean hover:text-gold transition-colors line-clamp-1">
                                  {discussion.pinned && (
                                    <span className="text-gold mr-2">📌</span>
                                  )}
                                  {discussion.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted">
                                  <span>{discussion.author.name}</span>
                                  <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">
                                    {discussion.author.badge}
                                  </span>
                                  <span>•</span>
                                  <span>{formatTimeAgo(discussion.createdAt)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Content preview */}
                            <p className="text-muted text-sm line-clamp-2 mb-3">
                              {discussion.content}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {discussion.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-cream text-deep-ocean text-xs rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm text-muted">
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {discussion.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {discussion.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {discussion.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </>
              )}

              {/* Review Tab */}
              {activeTab === "review" && (
                <>
                  {communityData.reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Photos */}
                      {review.photos.length > 0 && (
                        <div className="flex h-48 overflow-hidden">
                          {review.photos.slice(0, 2).map((photo, index) => (
                            <div key={index} className="relative flex-1">
                              <Image
                                src={photo}
                                alt={`Review photo ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-sm text-gold font-medium">{review.destination}</span>
                            <h3 className="font-semibold text-deep-ocean">{review.title}</h3>
                          </div>
                          <div className="flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span className="font-bold text-deep-ocean">{review.rating}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <p className="text-muted text-sm mb-4">{review.content}</p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                              <Image
                                src={review.author.avatar}
                                alt={review.author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-deep-ocean">
                                {review.author.name}
                              </div>
                              <div className="text-xs text-muted">
                                Dikunjungi {new Date(review.visitDate).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
                              </div>
                            </div>
                          </div>
                          <button className="flex items-center gap-1 text-sm text-muted hover:text-gold transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}

              {/* Trip Buddy Tab */}
              {activeTab === "buddy" && (
                <>
                  {communityData.tripBuddies.map((buddy) => (
                    <motion.div
                      key={buddy.id}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex gap-4">
                        {/* Author */}
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={buddy.author.avatar}
                            alt={buddy.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-deep-ocean mb-1">{buddy.title}</h3>
                          
                          <div className="flex flex-wrap gap-3 text-sm text-muted mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {buddy.destination}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(buddy.dates.start).toLocaleDateString("id-ID", { day: "numeric", month: "short" })} - {new Date(buddy.dates.end).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                            </span>
                          </div>

                          <p className="text-muted text-sm mb-4">{buddy.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-cream text-deep-ocean text-sm rounded-full">
                              👤 {buddy.author.name}, {buddy.author.age} ({buddy.author.gender})
                            </span>
                            <span className="px-3 py-1 bg-cream text-deep-ocean text-sm rounded-full">
                              💰 {buddy.budget}
                            </span>
                            <span className="px-3 py-1 bg-cream text-deep-ocean text-sm rounded-full">
                              👥 Cari {buddy.lookingFor}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted">
                              {buddy.interested} orang tertarik
                            </span>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full text-sm hover:shadow-lg transition-all">
                              <UserPlus className="w-4 h-4" />
                              Gabung
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="text-center py-8">
                    <p className="text-muted mb-4">Mau cari teman perjalanan?</p>
                    <button className="px-6 py-3 bg-deep-ocean text-white font-semibold rounded-full hover:bg-deep-ocean-light transition-colors">
                      Buat Trip Buddy Post
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
