"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, UtensilsCrossed, Calendar, Hotel, ArrowRight, Command } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Import data
import destinationsData from "@/data/destinations.json";
import culinaryData from "@/data/culinary.json";
import eventsData from "@/data/events.json";
import accommodationsData from "@/data/accommodations.json";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "destinasi" | "kuliner" | "event" | "akomodasi";
  href: string;
  image: string;
}

const typeConfig = {
  destinasi: { icon: MapPin, color: "text-blue-500", bg: "bg-blue-500/10" },
  kuliner: { icon: UtensilsCrossed, color: "text-orange-500", bg: "bg-orange-500/10" },
  event: { icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10" },
  akomodasi: { icon: Hotel, color: "text-green-500", bg: "bg-green-500/10" },
};

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Combine all data into searchable format
  const allItems = useMemo<SearchResult[]>(() => {
    const items: SearchResult[] = [];

    destinationsData.destinations.forEach((d) => {
      items.push({
        id: d.id,
        title: d.name,
        subtitle: d.location,
        type: "destinasi",
        href: `/destinasi/${d.id}`,
        image: d.image,
      });
    });

    culinaryData.culinary.forEach((c) => {
      items.push({
        id: c.id,
        title: c.name,
        subtitle: c.origin,
        type: "kuliner",
        href: `/kuliner#${c.id}`,
        image: c.image,
      });
    });

    eventsData.events.forEach((e) => {
      items.push({
        id: e.id,
        title: e.name,
        subtitle: e.location,
        type: "event",
        href: `/event#${e.id}`,
        image: e.image,
      });
    });

    accommodationsData.accommodations.forEach((a) => {
      items.push({
        id: a.id,
        title: a.name,
        subtitle: a.location,
        type: "akomodasi",
        href: `/akomodasi#${a.id}`,
        image: a.image,
      });
    });

    return items;
  }, []);

  // Filter results based on query
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          item.subtitle.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
  }, [query, allItems]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }

      // Navigate results
      if (isOpen && results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        }
        if (e.key === "Enter" && results[selectedIndex]) {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleSelect = useCallback((item: SearchResult) => {
    // Save to recent searches
    const newRecent = [item.title, ...recentSearches.filter((r) => r !== item.title)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem("recentSearches", JSON.stringify(newRecent));

    setIsOpen(false);
    setQuery("");
    window.location.href = item.href;
  }, [recentSearches]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <Search className="w-4 h-4 text-white/70" />
        <span className="text-sm text-white/70 hidden sm:inline">Cari...</span>
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-white/10 rounded text-xs text-white/50">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari destinasi, kuliner, event, akomodasi..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-lg"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-500">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query ? (
                  results.length > 0 ? (
                    <div className="p-2">
                      {results.map((item, index) => {
                        const config = typeConfig[item.type];
                        const Icon = config.icon;
                        return (
                          <button
                            key={`${item.type}-${item.id}`}
                            onClick={() => handleSelect(item)}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors ${
                              index === selectedIndex
                                ? "bg-gold/10"
                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-2">
                                <span className={`flex items-center gap-1 ${config.color}`}>
                                  <Icon className="w-3 h-3" />
                                  {item.type}
                                </span>
                                <span>•</span>
                                <span>{item.subtitle}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>Tidak ada hasil untuk &quot;{query}&quot;</p>
                    </div>
                  )
                ) : (
                  <div className="p-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pencarian Terakhir
                          </span>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-gray-400 hover:text-gray-600"
                          >
                            Hapus
                          </button>
                        </div>
                        <div className="space-y-1">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => setQuery(search)}
                              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                            >
                              <Search className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jelajahi
                      </span>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {Object.entries(typeConfig).map(([type, config]) => {
                          const Icon = config.icon;
                          const labels = {
                            destinasi: "Destinasi",
                            kuliner: "Kuliner",
                            event: "Event",
                            akomodasi: "Akomodasi",
                          };
                          return (
                            <Link
                              key={type}
                              href={`/${type}`}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 p-3 rounded-xl ${config.bg} hover:opacity-80 transition-opacity`}
                            >
                              <Icon className={`w-5 h-5 ${config.color}`} />
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {labels[type as keyof typeof labels]}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑↓</kbd>
                    navigasi
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
                    pilih
                  </span>
                </div>
                <span>Powered by Visit Sulsel</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
