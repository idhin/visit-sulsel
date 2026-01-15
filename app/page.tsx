"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Ticket,
  Hotel,
  ShoppingBag,
  Users,
  Camera,
  UtensilsCrossed,
  Calendar,
  Map,
  Star,
  ChevronRight,
  Flame,
  Percent,
  Heart,
  Navigation,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Coffee,
  Utensils,
  Compass,
  Route,
  CloudRain,
  Cloud,
  CloudSun,
  Loader2,
  X,
  LocateFixed,
} from "lucide-react";
import destinationsData from "@/data/destinations.json";
import eventsData from "@/data/events.json";
import culinaryData from "@/data/culinary.json";

type LocationState = {
  status: "checking" | "idle" | "requesting" | "granted" | "denied" | "error";
  latitude: number | null;
  longitude: number | null;
  district: string; // Kecamatan
  city: string;
  error?: string;
};

type WeatherState = {
  temperature: number | null;
  weatherCode: number | null;
  isLoading: boolean;
};

const mainServices = [
  { icon: Ticket, label: "Tiket", href: "/destinasi", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
  { icon: Hotel, label: "Hotel", href: "/akomodasi", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50" },
  { icon: ShoppingBag, label: "Belanja", href: "/belanja", color: "from-pink-500 to-pink-600", bgColor: "bg-pink-50" },
  { icon: Users, label: "Guide", href: "/guide", color: "from-green-500 to-green-600", bgColor: "bg-green-50" },
];

const moreServices = [
  { icon: Camera, label: "Creator", href: "/kreator", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: UtensilsCrossed, label: "Kuliner", href: "/kuliner", color: "text-red-500", bg: "bg-red-50" },
  { icon: Calendar, label: "Event", href: "/event", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: Map, label: "Peta", href: "/peta", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Route, label: "Itinerary", href: "/itinerary", color: "text-cyan-500", bg: "bg-cyan-50" },
  { icon: Heart, label: "Wishlist", href: "/wishlist", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: Percent, label: "Promo", href: "/promo", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Users, label: "Komunitas", href: "/komunitas", color: "text-emerald-500", bg: "bg-emerald-50" },
];

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

const getTimeContext = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) {
    return {
      greeting: "Selamat Pagi",
      icon: Sun,
      message: "Awali hari dengan sarapan khas Sulsel",
      subtitle: "Berikut rekomendasi tempat sarapan terdekat dari lokasimu",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      type: "breakfast",
      foodTypes: ["Coto Makassar", "Pallubasa", "Kopi Toraja"],
    };
  } else if (hour >= 10 && hour < 14) {
    return {
      greeting: "Selamat Siang",
      icon: Sun,
      message: "Waktunya makan siang!",
      subtitle: "Kami rekomendasikan resto terdekat dari lokasimu",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      type: "lunch",
      foodTypes: ["Sop Konro", "Coto Makassar", "Pa'lu Butung"],
    };
  } else if (hour >= 14 && hour < 17) {
    return {
      greeting: "Selamat Sore",
      icon: Sunset,
      message: "Waktunya ngemil sore!",
      subtitle: "Berikut camilan khas Makassar di sekitarmu",
      color: "from-orange-400 to-pink-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      type: "snack",
      foodTypes: ["Pisang Epe", "Es Pisang Ijo", "Kopi Toraja"],
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: "Selamat Malam",
      icon: Sunset,
      message: "Sudah waktunya makan malam!",
      subtitle: "Berikut rekomendasi resto terdekat dari lokasimu",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      type: "dinner",
      foodTypes: ["Sop Konro", "Pallubasa", "Kapurung"],
    };
  } else {
    return {
      greeting: "Selamat Malam",
      icon: Moon,
      message: "Lapar tengah malam?",
      subtitle: "Cari makanan yang masih buka di sekitarmu",
      color: "from-indigo-600 to-purple-700",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      type: "night",
      foodTypes: ["Coto Makassar", "Pisang Epe", "Es Pisang Ijo"],
    };
  }
};

export default function Home() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const [timeContext, setTimeContext] = useState(getTimeContext());
  const [showContextBanner, setShowContextBanner] = useState(true);
  
  const [location, setLocation] = useState<LocationState>({
    status: "checking", // Start with checking localStorage
    latitude: null,
    longitude: null,
    district: "",
    city: "Makassar",
  });
  
  const [hasAskedPermission, setHasAskedPermission] = useState(true); // Default true to hide popup initially
  
  const [weather, setWeather] = useState<WeatherState>({
    temperature: null,
    weatherCode: null,
    isLoading: false,
  });

  const topDestinations = destinationsData.destinations
    .filter((d) => d.featured)
    .slice(0, 6);
  
  const recommendedFood = culinaryData.culinary
    .filter(food => timeContext.foodTypes.some(type => food.name.includes(type.split(" ")[0])))
    .slice(0, 3);

  const upcomingEvents = eventsData.events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Fetch weather data
  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setWeather(prev => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
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

  // Reverse geocoding to get location details
  const getLocationDetails = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=id&zoom=18`
      );
      const data = await res.json();
      const address = data.address || {};
      
      // Get district (kecamatan) - try multiple fields
      const district = address.suburb || address.village || address.neighbourhood || address.district || "";
      
      // Get city
      const city = address.city || address.town || address.county || address.state || "Sulawesi Selatan";
      
      setLocation(prev => ({ 
        ...prev, 
        district: district,
        city: city,
      }));
    } catch {
      // Keep default values
    }
  }, []);

  // Request location permission
  const requestLocation = useCallback((fromPopup = false) => {
    if (fromPopup) {
      // Mark that we've asked permission
      localStorage.setItem("visitsulsel_location_asked", "true");
      setHasAskedPermission(true);
    }
    
    setLocation(prev => ({ ...prev, status: "requesting" }));
    
    if (!navigator.geolocation) {
      setLocation(prev => ({ 
        ...prev, 
        status: "error", 
        error: "Geolocation tidak didukung browser Anda" 
      }));
      fetchWeather(-5.1477, 119.4327);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(prev => ({
          ...prev,
          status: "granted",
          latitude,
          longitude,
        }));
        // Always fetch Makassar weather
        fetchWeather(-5.1477, 119.4327);
        getLocationDetails(latitude, longitude);
      },
      (error) => {
        let errorMsg = "Tidak dapat mengakses lokasi";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Akses lokasi ditolak";
        }
        setLocation(prev => ({ 
          ...prev, 
          status: "denied", 
          error: errorMsg 
        }));
        // Use default Makassar coordinates
        fetchWeather(-5.1477, 119.4327);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, [fetchWeather, getLocationDetails]);

  // Check localStorage and handle location on mount
  useEffect(() => {
    const hasAsked = localStorage.getItem("visitsulsel_location_asked") === "true";
    setHasAskedPermission(hasAsked);
    
    // Always fetch Makassar weather first
    fetchWeather(-5.1477, 119.4327);
    
    if (hasAsked) {
      // Already asked before, try to get location silently
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(prev => ({
              ...prev,
              status: "granted",
              latitude,
              longitude,
            }));
            getLocationDetails(latitude, longitude);
          },
          () => {
            // Permission denied or error, just set to denied silently
            setLocation(prev => ({ ...prev, status: "denied" }));
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 300000 }
        );
      } else {
        setLocation(prev => ({ ...prev, status: "denied" }));
      }
    } else {
      // First time, show popup after a short delay
      const timer = setTimeout(() => {
        setLocation(prev => ({ ...prev, status: "idle" }));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [fetchWeather, getLocationDetails]);

  // Get weather icon based on weather code
  const getWeatherIcon = (code: number | null) => {
    if (code === null) return Sun;
    if (code === 0) return Sun; // Clear sky
    if (code >= 1 && code <= 3) return CloudSun; // Partly cloudy
    if (code >= 45 && code <= 48) return Cloud; // Foggy
    if (code >= 51 && code <= 67) return CloudRain; // Drizzle/Rain
    if (code >= 71 && code <= 77) return Cloud; // Snow
    if (code >= 80 && code <= 99) return CloudRain; // Rain showers
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(weather.weatherCode);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update time context every minute
    const interval = setInterval(() => {
      setTimeContext(getTimeContext());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Location Permission Modal - Only show once */}
        <AnimatePresence>
          {location.status === "idle" && !hasAskedPermission && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Aktifkan Lokasi
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Izinkan akses lokasi untuk rekomendasi destinasi, cuaca, dan pengalaman yang lebih personal
                  </p>
                  <button 
                    onClick={() => requestLocation(true)}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity mb-3"
                  >
                    Izinkan Lokasi
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.setItem("visitsulsel_location_asked", "true");
                      setHasAskedPermission(true);
                      setLocation(prev => ({ ...prev, status: "denied" }));
                    }}
                    className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                  >
                    Nanti saja
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Requesting Location Overlay - Only show when user clicks the button */}
        <AnimatePresence>
          {location.status === "requesting" && !hasAskedPermission && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-2xl"
              >
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                <p className="text-gray-600 font-medium">Mengakses lokasi...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="px-4 pt-5 pb-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Top Row: Brand + Weather */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Visit Sulsel</h1>
                <p className="text-[11px] text-gray-400 font-medium">
                  Dinas Pariwisata Provinsi Sulawesi Selatan
                </p>
              </div>
              
              {/* Weather - Compact */}
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

            {/* Greeting Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 border border-blue-100/50">
              <p className="text-[15px] text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">{timeContext.greeting}</span> 👋
                {location.status === "granted" && (location.district || location.city) && (
                  <>
                    <br />
                    <span className="text-gray-500 text-sm">Kamu sekarang berada di </span>
                    <span className="font-semibold text-blue-600 text-sm">
                      {location.district ? `${location.district}, ${location.city}` : location.city}
                    </span>
                  </>
                )}
                {location.status === "requesting" && (
                  <>
                    <br />
                    <span className="text-gray-400 text-sm">Mengakses lokasi...</span>
                  </>
                )}
              </p>
            </div>

            {/* Search Bar */}
            <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
              <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
                <Search className="w-4 h-4 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Cari destinasi, kuliner, event..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="flex-1 px-3 py-3.5 text-sm text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
                <button className="mr-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contextual Time Banner */}
        <AnimatePresence>
          {showContextBanner && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 mb-4"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${timeContext.color} p-4`}>
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -right-2 -bottom-8 w-20 h-20 bg-white/10 rounded-full" />
                
                <button 
                  onClick={() => setShowContextBanner(false)}
                  className="absolute top-2 right-2 p-1 bg-white/20 rounded-full text-white/80 hover:bg-white/30"
                >
                  <span className="text-xs">✕</span>
                </button>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <timeContext.icon className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold">{timeContext.greeting}!</span>
                    <span className="text-white/80 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-white font-medium mb-1">{timeContext.message}</p>
                  <p className="text-white/80 text-xs mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {timeContext.subtitle}
                  </p>
                  
                  {/* Food Recommendations */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {recommendedFood.map((food, index) => (
                      <Link 
                        key={food.id} 
                        href="/kuliner"
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 flex-shrink-0 hover:bg-white/30 transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <Image src={food.image} alt={food.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold line-clamp-1">{food.name}</p>
                          <p className="text-white/70 text-[10px]">{food.restaurants[0]}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-white/90 text-[10px] font-medium">{food.price.split(" - ")[0]}</span>
                            <span className="text-white/60 text-[10px]">• {(index + 1) * 0.5 + 0.3} km</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link 
                    href="/kuliner" 
                    className="inline-flex items-center gap-1 mt-3 text-white text-xs font-medium hover:underline"
                  >
                    Lihat Semua Kuliner <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            {/* Main Services Row */}
            <div className="grid grid-cols-4 gap-2 mb-4 pb-4 border-b border-gray-100">
              {mainServices.map((service, index) => (
                <Link key={service.label} href={service.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md mb-2`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-800">{service.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* More Services Grid */}
            <div className="grid grid-cols-4 gap-2">
              {moreServices.map((service, index) => (
                <Link key={service.label} href={service.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * (index + 4) }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 ${service.bg} rounded-xl flex items-center justify-center mb-1.5`}>
                      <service.icon className={`w-5 h-5 ${service.color}`} />
                    </div>
                    <span className="text-[10px] text-gray-600 text-center leading-tight">{service.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Promo Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-4 mb-6"
        >
          <div className="relative overflow-hidden rounded-2xl h-40">
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
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-2">
                      <Percent className="w-3 h-3" />
                      PROMO
                    </span>
                    <h3 className="text-xl font-bold text-white">{promos[currentPromo].title}</h3>
                    <p className="text-white/80 text-sm">{promos[currentPromo].subtitle}</p>
                  </div>
                  <button className="self-start px-4 py-2 bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Klaim Sekarang
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Indicators */}
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

        {/* Trending Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-100 rounded-lg">
                <Flame className="w-4 h-4 text-red-500" />
              </div>
              <h2 className="font-bold text-gray-900">Trending</h2>
            </div>
            <Link href="/destinasi" className="text-sm text-blue-500 font-medium flex items-center gap-1">
              Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {topDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/destinasi/${dest.slug}`}>
                  <div className="relative w-36 h-48 rounded-2xl overflow-hidden flex-shrink-0 group">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Rank badge */}
                    <div className="absolute top-2 left-2 w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-gray-900">#{index + 1}</span>
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-2 right-2 p-1.5 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-white" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs font-medium">{dest.rating}</span>
                      </div>
                      <h3 className="text-white font-semibold text-sm line-clamp-1">{dest.name}</h3>
                      <p className="text-white/70 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {dest.location}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="px-4 mb-6"
        >
          <div className="grid grid-cols-2 gap-3">
            {/* Tour Guide Card */}
            <Link href="/guide" className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-green-500 to-emerald-600 h-32">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/10 rounded-full" />
              <div className="relative z-10">
                <Users className="w-8 h-8 text-white mb-2" />
                <h3 className="text-white font-bold">Tour Guide</h3>
                <p className="text-white/80 text-xs">150+ guide berpengalaman</p>
              </div>
            </Link>

            {/* UMKM Card */}
            <Link href="/belanja" className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-pink-500 to-rose-600 h-32">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/10 rounded-full" />
              <div className="relative z-10">
                <ShoppingBag className="w-8 h-8 text-white mb-2" />
                <h3 className="text-white font-bold">UMKM Lokal</h3>
                <p className="text-white/80 text-xs">15.000+ produk tersedia</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 rounded-lg">
                <Calendar className="w-4 h-4 text-indigo-500" />
              </div>
              <h2 className="font-bold text-gray-900">Event Mendatang</h2>
            </div>
            <Link href="/event" className="text-sm text-blue-500 font-medium flex items-center gap-1">
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
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded-full capitalize">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 self-center" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
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
                  <p className="text-2xl font-bold text-white">15K+</p>
                  <p className="text-white/70 text-xs">UMKM Terdaftar</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">150+</p>
                  <p className="text-white/70 text-xs">Tour Guide</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* Bottom Spacing */}
        <div className="h-8" />
      </div>
    </main>
  );
}
