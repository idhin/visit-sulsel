"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  ChevronRight,
  Percent,
  Heart,
  Calendar,
  Mountain,
  Waves,
  Landmark,
  TreePine,
  Plane,
  Hotel,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Map,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Loader2,
  Navigation,
  Route,
  Sparkles,
  Compass,
} from "lucide-react";
import destinationsData from "@/data/destinations.json";
import eventsData from "@/data/events.json";
import itinerariesData from "@/data/itineraries.json";
import { formatPrice } from "@/lib/utils";
import OnboardingModal from "@/components/shared/OnboardingModal";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

type WeatherState = {
  temperature: number | null;
  weatherCode: number | null;
  isLoading: boolean;
};

// Kota asal untuk trip planning
const originCities = [
  { id: "jakarta", name: "Jakarta", flightDuration: "2 jam 15 menit", flightPrice: "Rp800.000 - Rp1.500.000" },
  { id: "bandung", name: "Bandung", flightDuration: "2 jam 30 menit", flightPrice: "Rp850.000 - Rp1.600.000" },
  { id: "surabaya", name: "Surabaya", flightDuration: "1 jam 30 menit", flightPrice: "Rp600.000 - Rp1.200.000" },
  { id: "yogyakarta", name: "Yogyakarta", flightDuration: "1 jam 45 menit", flightPrice: "Rp700.000 - Rp1.300.000" },
  { id: "bali", name: "Bali", flightDuration: "1 jam 20 menit", flightPrice: "Rp550.000 - Rp1.100.000" },
  { id: "semarang", name: "Semarang", flightDuration: "1 jam 40 menit", flightPrice: "Rp650.000 - Rp1.200.000" },
];

// Kategori wisata
const categories = [
  { id: "alam", name: "Alam", icon: Mountain, color: "from-green-500 to-emerald-600", bgColor: "bg-green-50" },
  { id: "pantai", name: "Pantai", icon: Waves, color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-50" },
  { id: "budaya", name: "Budaya", icon: Landmark, color: "from-amber-500 to-orange-600", bgColor: "bg-amber-50" },
  { id: "sejarah", name: "Sejarah", icon: TreePine, color: "from-purple-500 to-indigo-600", bgColor: "bg-purple-50" },
];

// Promo tetap ada
const promos = [
  {
    id: 1,
    title: "Diskon 50% Hotel Toraja",
    subtitle: "Khusus pengguna baru",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    title: "Gratis Tour Guide",
    subtitle: "Min. booking 3 hari",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "Cashback 25% UMKM",
    subtitle: "Belanja produk lokal",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800",
    gradient: "from-pink-500 to-rose-600",
  },
];

// Hero carousel slides
const heroSlides = [
  {
    image: "https://www.gotravelaindonesia.com/wp-content/uploads/Tana-Toraja-Sulawesi.jpg",
    title: "Tana Toraja",
    description: "Destinasi budaya dengan rumah adat Tongkonan dan tradisi unik",
    badge: "Warisan Budaya",
  },
  {
    image: "https://satyawinnie.com/wp-content/uploads/elementor/thumbs/67FA112C-0367-4AED-970B-8B38BD5D5EF7-oyx0zo4xsweejstfi4wpewcfwuwt2yxcaauwadsj9c.jpg",
    title: "Pantai Bira",
    description: "Surga tersembunyi dengan pasir putih dan pembuatan perahu Pinisi",
    badge: "Pantai Eksotis",
  },
  {
    image: "https://ik.imagekit.io/tvlk/blog/2024/08/eP8o7huA-image-3.png?tr=q-70,c-at_max,w-1000,h-600",
    title: "Bantimurung",
    description: "Kerajaan kupu-kupu dengan air terjun spektakuler",
    badge: "Wisata Alam",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Fort_Rotterdam%2C_Makassar%2C_Indonesia_-_20100227-02.jpg",
    title: "Fort Rotterdam",
    description: "Benteng bersejarah peninggalan Kerajaan Gowa",
    badge: "Situs Sejarah",
  },
];

// Layanan lainnya (di bawah)
const otherServices = [
  { icon: Hotel, label: "Akomodasi", href: "/akomodasi", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: UtensilsCrossed, label: "Kuliner", href: "/kuliner", color: "text-red-500", bg: "bg-red-50" },
  { icon: ShoppingBag, label: "Oleh-oleh", href: "/belanja", color: "text-pink-500", bg: "bg-pink-50" },
  { icon: Users, label: "Pemandu", href: "/layanan/pemandu", color: "text-green-500", bg: "bg-green-50" },
  { icon: Map, label: "Peta Wisata", href: "/peta", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Calendar, label: "Event", href: "/event", color: "text-indigo-500", bg: "bg-indigo-50" },
];

export default function Home() {
  const [selectedOrigin, setSelectedOrigin] = useState(originCities[0]);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [weather, setWeather] = useState<WeatherState>({
    temperature: null,
    weatherCode: null,
    isLoading: true,
  });
  const [activeMode, setActiveMode] = useState<"planning" | "onlocation">("planning");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Hero carousel auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Load saved mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem("visitsulsel_mode") as "planning" | "onlocation" | null;
    if (savedMode) {
      setActiveMode(savedMode);
    }
  }, []);

  // Handle mode change
  const handleModeChange = (mode: "planning" | "onlocation") => {
    setActiveMode(mode);
    localStorage.setItem("visitsulsel_mode", mode);
  };

  // Get destinations
  const featuredDestinations = destinationsData.destinations.filter((d) => d.featured);
  const allDestinations = destinationsData.destinations;

  // Get itineraries
  const featuredItineraries = itinerariesData.itineraries.filter((i) => i.featured).slice(0, 3);

  // Get upcoming events
  const upcomingEvents = eventsData.events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Fetch weather
  const fetchWeather = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=-5.1477&longitude=119.4327&current=temperature_2m,weather_code`
      );
      const data = await res.json();
      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        isLoading: false,
      });
    } catch {
      setWeather({ temperature: 29, weatherCode: 0, isLoading: false });
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Promo slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Weather icon
  const getWeatherIcon = (code: number | null) => {
    if (code === null) return Sun;
    if (code === 0) return Sun;
    if (code >= 1 && code <= 3) return CloudSun;
    if (code >= 45 && code <= 48) return Cloud;
    if (code >= 51 && code <= 99) return CloudRain;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(weather.weatherCode);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Onboarding Modal for New Visitors */}
      <OnboardingModal />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Visit Sulsel</h1>
              <p className="text-[10px] text-gray-400">Dinas Pariwisata Sulawesi Selatan</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <LanguageSwitcher variant="light" />
              
              {/* Weather */}
              <div className="flex items-center gap-1.5 bg-white border border-gray-100 shadow-sm px-2.5 py-1.5 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-md flex items-center justify-center">
                  {weather.isLoading ? (
                    <Loader2 className="w-3 h-3 text-white animate-spin" />
                  ) : (
                    <WeatherIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-400 leading-tight">Makassar</p>
                  <p className="text-xs font-semibold text-gray-700 leading-tight">
                    {weather.isLoading ? "--" : `${weather.temperature ?? 29}°C`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Toggle - Switch between Planning and On-Location */}
        <div className="px-4 mb-4">
          <div className="bg-gray-100 rounded-xl p-1 flex relative">
            {/* Animated Background Indicator */}
            <motion.div
              layout
              className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
              style={{ width: "calc(50% - 4px)" }}
              animate={{
                left: activeMode === "planning" ? "4px" : "calc(50%)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            
            <button
              onClick={() => handleModeChange("planning")}
              className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all relative z-10 ${
                activeMode === "planning" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <Route className={`w-4 h-4 ${activeMode === "planning" ? "text-blue-600" : "text-gray-400"}`} />
              Perencanaan
            </button>
            <Link
              href="/jelajahi"
              onClick={() => handleModeChange("onlocation")}
              className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all relative z-10 ${
                activeMode === "onlocation" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              <Compass className={`w-4 h-4 ${activeMode === "onlocation" ? "text-green-600" : "text-gray-400"}`} />
              Di Lokasi
            </Link>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            {activeMode === "planning" 
              ? "Rencanakan perjalanan dari kota asalmu ke Sulawesi Selatan"
              : "Sudah di Sulsel? Temukan kuliner & oleh-oleh terdekat"}
          </p>
        </div>

        {/* Hero Section - Trip Planning CTA with Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 mb-6"
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background Image Carousel */}
            <div className="absolute inset-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroSlides[currentHeroSlide].image}
                    alt={heroSlides[currentHeroSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 min-h-[320px] flex flex-col justify-between">
              {/* Top Section */}
              <div>
                <motion.div
                  key={`badge-${currentHeroSlide}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    {heroSlides[currentHeroSlide].badge}
                  </span>
                </motion.div>
                
                <motion.h2
                  key={`title-${currentHeroSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {heroSlides[currentHeroSlide].title}
                </motion.h2>
                <motion.p
                  key={`desc-${currentHeroSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/80 text-sm max-w-[280px]"
                >
                  {heroSlides[currentHeroSlide].description}
                </motion.p>
              </div>

              {/* Bottom Section */}
              <div>
                {/* Slide Indicators */}
                <div className="flex gap-1.5 mb-4">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroSlide(index)}
                      className={`h-1 rounded-full transition-all ${
                        index === currentHeroSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Origin Selector */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
                  <p className="text-white/70 text-xs mb-2">Dari mana kamu akan berkunjung?</p>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {originCities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => setSelectedOrigin(city)}
                        className={`flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedOrigin.id === city.id
                            ? "bg-white text-blue-600 shadow-lg"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                  {selectedOrigin && (
                    <div className="flex items-center gap-4 mt-3 text-white/80 text-xs">
                      <span className="flex items-center gap-1">
                        <Plane className="w-3 h-3" />
                        {selectedOrigin.flightDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">{selectedOrigin.flightPrice}</span>
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href="/rencanakan"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                >
                  <Route className="w-5 h-5" />
                  Mulai Rencanakan Trip
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Destinasi Populer - Bento Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Destinasi Populer</h2>
              <p className="text-gray-500 text-xs">Tempat wisata terfavorit di Sul-Sel</p>
            </div>
            <Link href="/destinasi" className="text-sm text-blue-600 font-medium flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-2 gap-3">
            {/* Featured Large Card - Spans 2 columns */}
            {featuredDestinations[0] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="col-span-2"
              >
                <Link href={`/destinasi/${featuredDestinations[0].slug}`}>
                  <div className="relative h-44 rounded-2xl overflow-hidden group">
                    <Image
                      src={featuredDestinations[0].image}
                      alt={featuredDestinations[0].name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-900">{featuredDestinations[0].rating}</span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize">
                        {featuredDestinations[0].category}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{featuredDestinations[0].name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-white/90 text-sm flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {featuredDestinations[0].location}
                        </p>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                          {featuredDestinations[0].price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid Cards - 2x2 Layout */}
            {featuredDestinations.slice(1, 5).map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <Link href={`/destinasi/${dest.slug}`}>
                  <div className="relative h-40 rounded-xl overflow-hidden group">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Rating */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-white/95 backdrop-blur-sm rounded-full">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-gray-900">{dest.rating}</span>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-bold text-sm mb-0.5 line-clamp-1">{dest.name}</h3>
                      <p className="text-white/80 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{dest.location}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* View More Card */}
            {featuredDestinations.length > 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="col-span-2"
              >
                <Link href="/destinasi">
                  <div className="relative h-20 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 group hover:from-blue-600 hover:to-indigo-700 transition-all">
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                      <div>
                        <p className="text-white font-semibold">Jelajahi {allDestinations.length - 5}+ destinasi lainnya</p>
                        <p className="text-white/80 text-sm">Temukan tempat wisata impianmu</p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <ChevronRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Paket Perjalanan Rekomendasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Paket Perjalanan</h2>
              <p className="text-gray-500 text-xs">Itinerary siap pakai untuk liburanmu</p>
            </div>
            <Link href="/rencanakan" className="text-sm text-blue-600 font-medium flex items-center gap-1">
              Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {featuredItineraries.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href="/rencanakan">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex">
                      <div className="relative w-28 h-28 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full flex-shrink-0">
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-medium text-gray-700">{item.rating}</span>
                            <span className="text-xs text-gray-400">({item.reviews})</span>
                          </div>
                          <p className="text-blue-600 font-bold text-sm">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Kategori Wisata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 mb-6"
        >
          <h2 className="font-bold text-gray-900 text-lg mb-3">Jelajahi Berdasarkan Kategori</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link href={`/destinasi?category=${cat.id}`}>
                  <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md mb-2`}>
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Promo Slider - Tetap Ada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">Promo & Penawaran</h2>
          </div>
          <div className="relative overflow-hidden rounded-2xl h-36">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromo}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${promos[currentPromo].gradient}`} />
                <Image
                  src={promos[currentPromo].image}
                  alt={promos[currentPromo].title}
                  fill
                  className="object-cover mix-blend-overlay opacity-30"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-2">
                      <Percent className="w-3 h-3" />
                      PROMO
                    </span>
                    <h3 className="text-lg font-bold text-white">{promos[currentPromo].title}</h3>
                    <p className="text-white/80 text-sm">{promos[currentPromo].subtitle}</p>
                  </div>
                  <button className="self-start px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {promos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromo(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentPromo ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Event Mendatang */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="px-4 flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 rounded-lg">
                <Calendar className="w-4 h-4 text-indigo-500" />
              </div>
              <h2 className="font-bold text-gray-900">Event Mendatang</h2>
            </div>
            <Link href="/event" className="text-sm text-blue-600 font-medium flex items-center gap-1">
              Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="px-4 space-y-3">
            {upcomingEvents.map((event, index) => {
              const date = new Date(event.date);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link href="/event" className="flex gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                      <span className="text-lg font-bold leading-none">{date.getDate()}</span>
                      <span className="text-[10px] uppercase">{date.toLocaleDateString("id-ID", { month: "short" })}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{event.name}</h3>
                      <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                      <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded-full mt-1 capitalize">
                        {event.category}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 self-center" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Layanan Lainnya - Di Bawah */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-4 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-3">Layanan Lainnya</h2>
          <div className="grid grid-cols-3 gap-3">
            {otherServices.map((service, index) => (
              <Link key={service.label} href={service.href}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`w-10 h-10 ${service.bg} rounded-xl flex items-center justify-center mb-2`}>
                    <service.icon className={`w-5 h-5 ${service.color}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{service.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-4 mb-6"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-semibold">Platform Resmi Pariwisata Sul-Sel</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">40M+</p>
                  <p className="text-white/70 text-xs">Wisatawan/tahun</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-white/70 text-xs">Destinasi Wisata</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-white/70 text-xs">Kabupaten/Kota</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-20" />
      </div>
    </main>
  );
}
