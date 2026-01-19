"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  UtensilsCrossed,
  ShoppingBag,
  Compass,
  Sun,
  Clock,
  Star,
  ChevronRight,
  Calendar,
  CheckCircle,
  Sunrise,
  Sunset,
  Moon,
  Route,
  Locate,
  ChevronDown,
  MapPinned,
  Loader2,
  Search,
  X,
  Ticket,
  Hotel,
  Users,
  Camera,
  Map,
  Heart,
  Percent,
  MessageCircle,
  Play,
} from "lucide-react";
import destinationsData from "@/data/destinations.json";
import culinaryData from "@/data/culinary.json";

// Types
type UserLocation = {
  id?: string;
  lat: number;
  lng: number;
  name: string;
  zone: string;
};

// Preset locations for demo
const presetLocations: UserLocation[] = [
  { id: "makassar", name: "Makassar Kota", lat: -5.1477, lng: 119.4327, zone: "makassar-kota" },
  { id: "losari", name: "Pantai Losari", lat: -5.1432, lng: 119.4073, zone: "makassar-kota" },
  { id: "rotterdam", name: "Fort Rotterdam", lat: -5.1339, lng: 119.4058, zone: "makassar-kota" },
  { id: "maros", name: "Bantimurung, Maros", lat: -4.9833, lng: 119.6667, zone: "maros" },
  { id: "rammang", name: "Rammang-Rammang", lat: -4.9333, lng: 119.6500, zone: "maros" },
  { id: "toraja", name: "Rantepao, Toraja", lat: -2.9696, lng: 119.8974, zone: "utara-jauh" },
  { id: "kete-kesu", name: "Kete Kesu, Toraja", lat: -2.9850, lng: 119.9100, zone: "utara-jauh" },
  { id: "bira", name: "Pantai Bira", lat: -5.6167, lng: 120.4500, zone: "selatan-jauh" },
];

// Demo itineraries by location
const demoItineraries: Record<string, {
  tripCode: string;
  day: number;
  location: string;
  schedule: Array<{
    time: string;
    activity: string;
    type: string;
    completed: boolean;
    destinationId?: string;
  }>;
}> = {
  "makassar-kota": {
    tripCode: "VSS-MKS001",
    day: 1,
    location: "Makassar",
    schedule: [
      { time: "08:00", activity: "Sarapan Coto Makassar", type: "meal", completed: true, destinationId: "coto-makassar" },
      { time: "09:30", activity: "Kunjungi Pantai Losari", type: "destination", completed: true, destinationId: "pantai-losari" },
      { time: "12:00", activity: "Makan siang - Sop Konro", type: "meal", completed: false, destinationId: "konro" },
      { time: "14:00", activity: "Jelajahi Benteng Rotterdam", type: "destination", completed: false, destinationId: "benteng-rotterdam" },
      { time: "17:00", activity: "Sunset di Pantai Losari", type: "destination", completed: false, destinationId: "pantai-losari" },
      { time: "19:00", activity: "Makan malam - Pisang Epe", type: "meal", completed: false, destinationId: "pisang-epe" },
    ],
  },
  "maros": {
    tripCode: "VSS-MRS001",
    day: 1,
    location: "Maros",
    schedule: [
      { time: "07:00", activity: "Berangkat dari Makassar", type: "travel", completed: true },
      { time: "08:30", activity: "Tiba di Bantimurung", type: "destination", completed: true, destinationId: "bantimurung" },
      { time: "12:00", activity: "Makan siang - Sop Saudara", type: "meal", completed: false, destinationId: "sop-saudara" },
      { time: "14:00", activity: "Jelajahi Rammang-Rammang", type: "destination", completed: false, destinationId: "rammang-rammang" },
      { time: "17:30", activity: "Kembali ke Makassar", type: "travel", completed: false },
    ],
  },
  "utara-jauh": {
    tripCode: "VSS-TRJ001",
    day: 1,
    location: "Tana Toraja",
    schedule: [
      { time: "08:00", activity: "Sarapan di hotel", type: "meal", completed: true },
      { time: "09:00", activity: "Kunjungi Kete Kesu", type: "destination", completed: true, destinationId: "tana-toraja" },
      { time: "12:00", activity: "Makan siang - Pa'piong", type: "meal", completed: false, destinationId: "piong-toraja" },
      { time: "14:00", activity: "Jelajahi Londa Burial Site", type: "destination", completed: false, destinationId: "tana-toraja" },
      { time: "16:00", activity: "Kopi sore - Kopi Toraja", type: "meal", completed: false, destinationId: "kopi-toraja" },
      { time: "18:00", activity: "Sunset di Batutumonga", type: "destination", completed: false },
    ],
  },
  "selatan-jauh": {
    tripCode: "VSS-BIR001",
    day: 1,
    location: "Pantai Bira",
    schedule: [
      { time: "08:00", activity: "Sunrise di pantai", type: "destination", completed: true, destinationId: "bira" },
      { time: "09:30", activity: "Sarapan seafood", type: "meal", completed: true },
      { time: "11:00", activity: "Snorkeling di Bira", type: "destination", completed: false, destinationId: "bira" },
      { time: "13:00", activity: "Makan siang - Pa'lu Butung", type: "meal", completed: false, destinationId: "palubutung" },
      { time: "15:00", activity: "Lihat pembuatan perahu Pinisi", type: "destination", completed: false },
      { time: "17:30", activity: "Sunset di Bira", type: "destination", completed: false, destinationId: "bira" },
    ],
  },
};

// Service menu items
const serviceMenuItems = [
  { id: "tiket", name: "Tiket", icon: Ticket, color: "bg-blue-500", href: "/layanan" },
  { id: "hotel", name: "Hotel", icon: Hotel, color: "bg-amber-500", href: "/akomodasi" },
  { id: "belanja", name: "Belanja", icon: ShoppingBag, color: "bg-green-500", href: "/belanja" },
  { id: "guide", name: "Guide", icon: Users, color: "bg-purple-500", href: "/layanan/pemandu" },
  { id: "creator", name: "Creator", icon: Camera, color: "bg-gray-200 text-gray-600", href: "/kreator" },
  { id: "kuliner", name: "Kuliner", icon: UtensilsCrossed, color: "bg-red-100 text-red-500", href: "/kuliner" },
  { id: "event", name: "Event", icon: Calendar, color: "bg-indigo-100 text-indigo-500", href: "/event" },
  { id: "peta", name: "Peta", icon: Map, color: "bg-teal-100 text-teal-500", href: "/peta" },
  { id: "itinerary", name: "Itinerary", icon: Route, color: "bg-orange-100 text-orange-500", href: "/rencanakan" },
  { id: "wishlist", name: "Wishlist", icon: Heart, color: "bg-pink-100 text-pink-500", href: "/wishlist" },
  { id: "promo", name: "Promo", icon: Percent, color: "bg-emerald-100 text-emerald-500", href: "/promo" },
  { id: "komunitas", name: "Komunitas", icon: MessageCircle, color: "bg-cyan-100 text-cyan-500", href: "/komunitas" },
];

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function JelajahiPage() {
  const [userLocation, setUserLocation] = useState<UserLocation>(presetLocations[0]);
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasActiveTrip, setHasActiveTrip] = useState(true); // Demo: user has active trip
  const [showRecommendationBanner, setShowRecommendationBanner] = useState(true);
  const [showTripDetails, setShowTripDetails] = useState(false);

  // Get current itinerary based on location zone
  const currentItinerary = useMemo(() => {
    return demoItineraries[userLocation.zone] || demoItineraries["makassar-kota"];
  }, [userLocation.zone]);

  // Filter and sort kuliner items by distance
  const nearbyKuliner = useMemo(() => {
    return culinaryData.culinary
      .filter((item) => item.coordinates)
      .map((item) => ({
        ...item,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          item.coordinates.lat,
          item.coordinates.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);
  }, [userLocation]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Detect GPS location
  const detectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let nearestPreset = presetLocations[0];
          let minDist = Infinity;
          presetLocations.forEach((preset) => {
            const dist = calculateDistance(latitude, longitude, preset.lat, preset.lng);
            if (dist < minDist) {
              minDist = dist;
              nearestPreset = preset;
            }
          });
          
          setUserLocation({
            lat: latitude,
            lng: longitude,
            name: "Lokasi Anda",
            zone: nearestPreset.zone,
          });
          setIsLocating(false);
          setShowLocationPicker(false);
        },
        () => {
          alert("Tidak dapat mengakses lokasi. Silakan pilih lokasi manual.");
          setIsLocating(false);
          setShowLocationPicker(true);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Browser tidak mendukung GPS. Silakan pilih lokasi manual.");
      setIsLocating(false);
      setShowLocationPicker(true);
    }
  };

  // Get time of day greeting and contextual message
  const getGreetingAndContext = () => {
    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const timeStr = `${hour.toString().padStart(2, "0")}.${minutes}`;
    
    if (hour < 11) {
      return {
        greeting: "Selamat Pagi",
        emoji: "👋",
        icon: <Sunrise className="w-5 h-5" />,
        contextTitle: "Selamat Pagi!",
        contextMessage: "Awali hari dengan sarapan khas Sulsel",
        contextSubMessage: "Berikut rekomendasi tempat sarapan terdekat dari lokasimu",
        time: timeStr,
        mealType: "sarapan",
      };
    }
    if (hour < 15) {
      return {
        greeting: "Selamat Siang",
        emoji: "☀️",
        icon: <Sun className="w-5 h-5" />,
        contextTitle: "Selamat Siang!",
        contextMessage: "Waktunya makan siang yang nikmat",
        contextSubMessage: "Temukan kuliner lezat untuk makan siangmu",
        time: timeStr,
        mealType: "makan-siang",
      };
    }
    if (hour < 18) {
      return {
        greeting: "Selamat Sore",
        emoji: "🌅",
        icon: <Sunset className="w-5 h-5" />,
        contextTitle: "Selamat Sore!",
        contextMessage: "Nikmati camilan sore khas Sulsel",
        contextSubMessage: "Rekomendasi jajanan dan minuman segar untukmu",
        time: timeStr,
        mealType: "snack",
      };
    }
    return {
      greeting: "Selamat Malam",
      emoji: "🌙",
      icon: <Moon className="w-5 h-5" />,
      contextTitle: "Selamat Malam!",
      contextMessage: "Tutup hari dengan makan malam istimewa",
      contextSubMessage: "Kuliner malam terbaik di sekitarmu",
      time: timeStr,
      mealType: "makan-malam",
    };
  };

  const context = getGreetingAndContext();

  // Get next activity from itinerary
  const getNextActivity = () => {
    const nextItem = currentItinerary.schedule.find((item) => !item.completed);
    return nextItem;
  };

  const nextActivity = getNextActivity();

  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      {/* Header - Greeting Card */}
      <div className="bg-white rounded-b-3xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              {context.greeting} {context.emoji}
            </h1>
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="max-w-[120px] truncate">{userLocation.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showLocationPicker ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Location Picker Dropdown */}
      <AnimatePresence>
        {showLocationPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-100"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <button
                onClick={detectLocation}
                disabled={isLocating}
                className="w-full mb-3 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mendeteksi lokasi...
                  </>
                ) : (
                  <>
                    <Locate className="w-5 h-5" />
                    Gunakan Lokasi Saya (GPS)
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mb-3">atau pilih lokasi demo:</p>
              <div className="grid grid-cols-2 gap-2">
                {presetLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setUserLocation(location);
                      setShowLocationPicker(false);
                    }}
                    className={`p-3 rounded-xl text-left transition-all ${
                      userLocation.name === location.name
                        ? "bg-emerald-50 border-2 border-emerald-500"
                        : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPinned className={`w-4 h-4 ${userLocation.name === location.name ? "text-emerald-600" : "text-gray-400"}`} />
                      <span className={`text-sm font-medium ${userLocation.name === location.name ? "text-emerald-700" : "text-gray-700"}`}>
                        {location.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 mt-4">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-3 mb-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari destinasi, kuliner, event..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="bg-blue-500 text-white p-2 rounded-xl">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Panduan Hari Ini - Highlighted if has active trip */}
        {hasActiveTrip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 mb-4 text-white relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Panduan Hari Ini</p>
                    <p className="text-xs text-white/80">
                      {currentItinerary.location} - Hari {currentItinerary.day}
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {currentItinerary.tripCode}
                </span>
              </div>

              {/* Next Activity */}
              {nextActivity && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3">
                  <p className="text-xs text-white/70 mb-1">Aktivitas selanjutnya:</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      {nextActivity.type === "meal" ? (
                        <UtensilsCrossed className="w-4 h-4" />
                      ) : nextActivity.type === "travel" ? (
                        <Route className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{nextActivity.activity}</p>
                      <p className="text-xs text-white/70">{nextActivity.time}</p>
                    </div>
                    <button className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium">
                      Mulai
                    </button>
                  </div>
                </div>
              )}

              {/* Progress */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {currentItinerary.schedule.slice(0, 4).map((item, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center text-xs ${
                          item.completed ? "bg-green-400" : "bg-white/20"
                        }`}
                      >
                        {item.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-white/80">
                    {currentItinerary.schedule.filter((i) => i.completed).length}/{currentItinerary.schedule.length} selesai
                  </span>
                </div>
                <button
                  onClick={() => setShowTripDetails(!showTripDetails)}
                  className="text-xs text-white/80 flex items-center gap-1 hover:text-white"
                >
                  Lihat Detail <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trip Details Dropdown */}
              <AnimatePresence>
                {showTripDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/20 space-y-2"
                  >
                    {currentItinerary.schedule.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 ${item.completed ? "opacity-60" : ""}`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            item.completed
                              ? "bg-green-400"
                              : item.type === "meal"
                                ? "bg-orange-400"
                                : "bg-white/20"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${item.completed ? "line-through" : ""}`}>
                            {item.activity}
                          </p>
                        </div>
                        <span className="text-xs text-white/70">{item.time}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Contextual Recommendation Banner */}
        {showRecommendationBanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 rounded-2xl p-4 mb-4 text-white relative overflow-hidden"
          >
            <button
              onClick={() => setShowRecommendationBanner(false)}
              className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              {context.icon}
              <span className="font-bold">{context.contextTitle}</span>
              <span className="text-white/80 text-sm">⏰ {context.time}</span>
            </div>

            <h3 className="text-lg font-bold mb-1">{context.contextMessage}</h3>
            <p className="text-sm text-white/80 mb-4 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {context.contextSubMessage}
            </p>

            {/* Food Recommendations */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {nearbyKuliner.slice(0, 2).map((food) => (
                <div
                  key={food.id}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center gap-2 min-w-[180px]"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={food.image} alt={food.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{food.name}</p>
                    <p className="text-xs text-white/70 truncate">{food.restaurants?.[0] || "Restoran"}</p>
                    <p className="text-xs">
                      Rp{(food.priceMin / 1000).toFixed(0)}rb • {food.distance.toFixed(1)} km
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/kuliner"
              className="mt-3 flex items-center gap-1 text-sm font-medium hover:underline"
            >
              Lihat Semua Kuliner <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Service Menu Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="grid grid-cols-4 gap-4">
            {serviceMenuItems.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 my-4" />

          <div className="grid grid-cols-4 gap-4">
            {serviceMenuItems.slice(4, 8).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-700">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 my-4" />

          <div className="grid grid-cols-4 gap-4">
            {serviceMenuItems.slice(8, 12).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-700">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Nearby Destinations Quick View */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">Destinasi Terdekat</h2>
            <Link href="/destinasi" className="text-sm text-blue-600 font-medium flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {destinationsData.destinations
              .filter((d) => d.coordinates)
              .slice(0, 4)
              .map((dest) => {
                const distance = calculateDistance(
                  userLocation.lat,
                  userLocation.lng,
                  dest.coordinates.lat,
                  dest.coordinates.lng
                );
                return (
                  <Link
                    key={dest.id}
                    href={`/destinasi/${dest.slug}`}
                    className="min-w-[140px] flex-shrink-0"
                  >
                    <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                      <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white font-semibold text-sm line-clamp-1">{dest.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Navigation className="w-3 h-3" />
                      <span>{distance.toFixed(1)} km</span>
                      <span className="mx-1">•</span>
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{dest.rating}</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Belum punya rencana?</p>
              <p className="text-sm text-white/80">Buat itinerary perjalananmu sekarang</p>
            </div>
            <Link
              href="/rencanakan"
              className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold"
            >
              Mulai
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
