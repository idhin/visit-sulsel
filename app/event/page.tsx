"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  X,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import eventsData from "@/data/events.json";

const categories = [
  { id: "semua", label: "Semua" },
  { id: "budaya", label: "Budaya" },
  { id: "musik", label: "Musik" },
  { id: "olahraga", label: "Olahraga" },
  { id: "kuliner", label: "Kuliner" },
];

export default function EventPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const upcomingEvents = eventsData.events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesCategory = activeCategory === "semua" || event.category === activeCategory;
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("id-ID", { month: "short" }),
      full: date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    };
  };

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
              <h1 className="text-lg font-bold text-gray-900">Event & Festival</h1>
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
                  placeholder="Cari event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    ? "bg-indigo-500 text-white"
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
          {filteredEvents.length} event mendatang
        </p>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="space-y-3">
          {filteredEvents.map((event) => {
            const date = formatDate(event.date);
            return (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  {/* Date Badge */}
                  <div className="w-16 flex-shrink-0 bg-indigo-500 text-white flex flex-col items-center justify-center py-4">
                    <span className="text-2xl font-bold">{date.day}</span>
                    <span className="text-xs uppercase">{date.month}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={event.image} alt={event.name} fill className="object-cover" />
                        {event.featured && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-yellow-400 text-[8px] font-bold rounded">
                            HOT
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{event.name}</h3>
                        <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </p>
                        <p className="text-gray-600 text-xs line-clamp-2 mt-1">{event.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] font-medium rounded-full capitalize">
                            {event.category}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Tidak ada event</h3>
            <p className="text-gray-500 text-sm">Belum ada event untuk kategori ini</p>
          </div>
        )}
      </div>
    </main>
  );
}
