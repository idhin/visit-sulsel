"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe, UtensilsCrossed, Hotel, Calendar, ArrowRight, X } from "lucide-react";
import InteractiveMap from "@/components/shared/InteractiveMap";

// Import data
import destinationsData from "@/data/destinations.json";
import culinaryData from "@/data/culinary.json";
import accommodationsData from "@/data/accommodations.json";
import eventsData from "@/data/events.json";

// Location coordinates for South Sulawesi
const locationCoords: Record<string, { lat: number; lng: number }> = {
  "Makassar": { lat: -5.1477, lng: 119.4327 },
  "Tana Toraja": { lat: -3.0458, lng: 119.8547 },
  "Toraja Utara": { lat: -2.9500, lng: 119.9000 },
  "Bulukumba": { lat: -5.5499, lng: 120.1956 },
  "Maros": { lat: -5.0095, lng: 119.5724 },
  "Gowa": { lat: -5.3125, lng: 119.4464 },
  "Palopo": { lat: -2.9923, lng: 120.1967 },
  "Bone": { lat: -4.5342, lng: 120.3306 },
  "Soppeng": { lat: -4.3454, lng: 119.8787 },
  "Bantimurung": { lat: -4.9905, lng: 119.6731 },
};

const getCoords = (location: string) => {
  const key = Object.keys(locationCoords).find((k) =>
    location.toLowerCase().includes(k.toLowerCase())
  );
  if (key) return locationCoords[key];
  // Add some randomness to Makassar coords if not found
  return {
    lat: -5.1477 + (Math.random() - 0.5) * 0.5,
    lng: 119.4327 + (Math.random() - 0.5) * 0.5,
  };
};

type FilterType = "semua" | "destinasi" | "kuliner" | "akomodasi" | "event";

const filterOptions: { id: FilterType; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { id: "semua", label: "Semua", icon: Globe, color: "bg-gray-500" },
  { id: "destinasi", label: "Destinasi", icon: MapPin, color: "bg-blue-500" },
  { id: "kuliner", label: "Kuliner", icon: UtensilsCrossed, color: "bg-orange-500" },
  { id: "akomodasi", label: "Akomodasi", icon: Hotel, color: "bg-green-500" },
  { id: "event", label: "Event", icon: Calendar, color: "bg-purple-500" },
];

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "destinasi" | "kuliner" | "akomodasi" | "event";
  description?: string;
  image?: string;
  href: string;
}

export default function PetaPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("semua");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Convert all data to map locations
  const allLocations = useMemo<MapLocation[]>(() => {
    const locations: MapLocation[] = [];

    // Destinations
    destinationsData.destinations.forEach((d) => {
      const coords = getCoords(d.location);
      locations.push({
        id: d.id,
        name: d.name,
        lat: coords.lat,
        lng: coords.lng,
        type: "destinasi",
        description: d.description,
        image: d.image,
        href: `/destinasi/${d.slug}`,
      });
    });

    // Culinary
    culinaryData.culinary.forEach((c) => {
      const coords = getCoords(c.origin);
      locations.push({
        id: c.id,
        name: c.name,
        lat: coords.lat + (Math.random() - 0.5) * 0.1,
        lng: coords.lng + (Math.random() - 0.5) * 0.1,
        type: "kuliner",
        description: c.description,
        image: c.image,
        href: `/kuliner#${c.id}`,
      });
    });

    // Accommodations
    accommodationsData.accommodations.forEach((a) => {
      const coords = getCoords(a.location);
      locations.push({
        id: a.id,
        name: a.name,
        lat: coords.lat + (Math.random() - 0.5) * 0.05,
        lng: coords.lng + (Math.random() - 0.5) * 0.05,
        type: "akomodasi",
        description: a.description,
        image: a.image,
        href: `/akomodasi#${a.id}`,
      });
    });

    // Events
    eventsData.events.forEach((e) => {
      const coords = getCoords(e.location);
      locations.push({
        id: e.id,
        name: e.name,
        lat: coords.lat + (Math.random() - 0.5) * 0.08,
        lng: coords.lng + (Math.random() - 0.5) * 0.08,
        type: "event",
        description: e.description,
        image: e.image,
        href: `/event#${e.id}`,
      });
    });

    return locations;
  }, []);

  const filteredLocations = useMemo(() => {
    if (activeFilter === "semua") return allLocations;
    return allLocations.filter((l) => l.type === activeFilter);
  }, [allLocations, activeFilter]);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-16 bg-gradient-to-br from-deep-ocean to-deep-ocean-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-4"
          >
            <MapPin className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium">Peta Interaktif</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Jelajahi Sulawesi Selatan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Temukan destinasi wisata, kuliner, akomodasi, dan event menarik di peta interaktif
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-4 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === option.id
                      ? `${option.color} text-white shadow-lg`
                      : "bg-cream text-deep-ocean hover:bg-cream-dark"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                  {option.id !== "semua" && (
                    <span className="px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                      {allLocations.filter((l) => l.type === option.id).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <InteractiveMap
                locations={filteredLocations}
                center={[-4.5, 119.8]}
                zoom={7}
                height="600px"
                onMarkerClick={(location) => setSelectedLocation(location as MapLocation)}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              <h3 className="font-heading text-lg font-bold text-deep-ocean sticky top-0 bg-cream py-2">
                {filteredLocations.length} Lokasi Ditemukan
              </h3>
              
              {filteredLocations.slice(0, 10).map((location) => (
                <motion.div
                  key={`${location.type}-${location.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                    selectedLocation?.id === location.id ? "ring-2 ring-gold" : ""
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={location.image || ""}
                        alt={location.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-deep-ocean truncate">
                        {location.name}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        location.type === "destinasi" ? "bg-blue-100 text-blue-600" :
                        location.type === "kuliner" ? "bg-orange-100 text-orange-600" :
                        location.type === "akomodasi" ? "bg-green-100 text-green-600" :
                        "bg-purple-100 text-purple-600"
                      }`}>
                        {location.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredLocations.length > 10 && (
                <p className="text-center text-sm text-muted py-2">
                  + {filteredLocations.length - 10} lokasi lainnya
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Location Modal */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedLocation(null)}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={selectedLocation.image || ""}
                alt={selectedLocation.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold capitalize ${
                selectedLocation.type === "destinasi" ? "bg-blue-500" :
                selectedLocation.type === "kuliner" ? "bg-orange-500" :
                selectedLocation.type === "akomodasi" ? "bg-green-500" :
                "bg-purple-500"
              }`}>
                {selectedLocation.type}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold text-deep-ocean mb-2">
                {selectedLocation.name}
              </h3>
              <p className="text-muted mb-6 line-clamp-3">
                {selectedLocation.description}
              </p>
              <Link
                href={selectedLocation.href}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Lihat Detail
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
