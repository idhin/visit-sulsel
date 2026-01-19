"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  MapPin,
  Navigation,
  UtensilsCrossed,
  ShoppingBag,
  Compass,
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Clock,
  Star,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Sunrise,
  Sunset,
  Moon,
  Phone,
  Route,
  Sparkles,
  Locate,
  ChevronDown,
  MapPinned,
  Loader2,
} from "lucide-react";
import destinationsData from "@/data/destinations.json";
import culinaryData from "@/data/culinary.json";

// Dynamic import for Leaflet map (client-side only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Types
type UserLocation = {
  lat: number;
  lng: number;
  name: string;
  zone: string;
};

type CulinaryItem = (typeof culinaryData.culinary)[0];
type DestinationItem = (typeof destinationsData.destinations)[0];

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

// Souvenir shops data with coordinates
const souvenirShops = [
  {
    id: "toko-oleh-oleh-losari",
    name: "Toko Oleh-oleh Losari",
    address: "Jl. Penghibur No. 12, Makassar",
    zone: "makassar-kota",
    coordinates: { lat: -5.1445, lng: 119.4085 },
    rating: 4.5,
    openHours: "08:00 - 22:00",
    products: ["Kopi Toraja", "Dodol Maros", "Markisa"],
    image: "https://upload.wikimedia.org/wikipedia/commons/7/72/Losari_Beach%2C_Makassar%2C_Indonesia.jpg",
    phone: "+62411123456",
  },
  {
    id: "pusat-oleh-oleh-sulsel",
    name: "Pusat Oleh-oleh Sulsel",
    address: "Jl. Somba Opu No. 88, Makassar",
    zone: "makassar-kota",
    coordinates: { lat: -5.1489, lng: 119.4198 },
    rating: 4.7,
    openHours: "09:00 - 21:00",
    products: ["Sutra Sengkang", "Kerajinan Toraja", "Songkok Recca"],
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Tongkonan_traditionnal_Toraja_house.jpg",
    phone: "+62411234567",
  },
  {
    id: "mall-ratu-indah",
    name: "Mall Ratu Indah - Oleh-oleh Corner",
    address: "Jl. Dr. Sam Ratulangi, Makassar",
    zone: "makassar-kota",
    coordinates: { lat: -5.1567, lng: 119.4234 },
    rating: 4.3,
    openHours: "10:00 - 22:00",
    products: ["Kopi Toraja", "Cokelat Sulsel", "Kerajinan"],
    image: "https://ik.imagekit.io/tvlk/blog/2024/08/eP8o7huA-image-3.png?tr=q-70,c-at_max,w-1000,h-600",
    phone: "+62411345678",
  },
  {
    id: "toko-toraja-art",
    name: "Toraja Art Shop",
    address: "Jl. Mappanyukki No. 5, Rantepao",
    zone: "utara-jauh",
    coordinates: { lat: -2.9712, lng: 119.8956 },
    rating: 4.6,
    openHours: "08:00 - 18:00",
    products: ["Ukiran Toraja", "Kain Tenun", "Kopi Kalosi"],
    image: "https://www.gotravelaindonesia.com/wp-content/uploads/Tana-Toraja-Sulawesi.jpg",
    phone: "+62411456789",
  },
  {
    id: "maros-souvenir",
    name: "Toko Oleh-oleh Bantimurung",
    address: "Jl. Poros Bantimurung, Maros",
    zone: "maros",
    coordinates: { lat: -4.9845, lng: 119.6678 },
    rating: 4.2,
    openHours: "08:00 - 17:00",
    products: ["Kupu-kupu Frame", "Madu Hutan", "Gula Aren"],
    image: "https://ik.imagekit.io/tvlk/blog/2024/08/eP8o7huA-image-3.png?tr=q-70,c-at_max,w-1000,h-600",
    phone: "+62411567890",
  },
];

// Demo itineraries by location
const demoItineraries: Record<string, typeof demoTodayPlanMakassar> = {
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

const demoTodayPlanMakassar = demoItineraries["makassar-kota"];

// Weather icons mapping
const weatherIcons: Record<string, React.ReactNode> = {
  sunny: <Sun className="w-8 h-8 text-yellow-500" />,
  cloudy: <Cloud className="w-8 h-8 text-gray-500" />,
  rainy: <CloudRain className="w-8 h-8 text-blue-500" />,
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
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
  const [activeTab, setActiveTab] = useState<"kuliner" | "oleh-oleh" | "destinasi">("kuliner");
  const [userLocation, setUserLocation] = useState<UserLocation>(presetLocations[0]);
  const [isLocating, setIsLocating] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [weather, setWeather] = useState({
    condition: "sunny",
    temp: 32,
    humidity: 75,
    wind: 12,
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get current itinerary based on location zone
  const currentItinerary = useMemo(() => {
    return demoItineraries[userLocation.zone] || demoItineraries["makassar-kota"];
  }, [userLocation.zone]);

  // Filter and sort items by distance
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
      .slice(0, 8);
  }, [userLocation]);

  const nearbyShops = useMemo(() => {
    return souvenirShops
      .map((shop) => ({
        ...shop,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          shop.coordinates.lat,
          shop.coordinates.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  const nearbyDestinations = useMemo(() => {
    return destinationsData.destinations
      .filter((dest) => dest.coordinates)
      .map((dest) => ({
        ...dest,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          dest.coordinates.lat,
          dest.coordinates.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 6);
  }, [userLocation]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Load Leaflet CSS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
      setMapReady(true);
    }
  }, []);

  // Detect GPS location
  const detectLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Find nearest preset location to determine zone
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
        (error) => {
          console.error("GPS error:", error);
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

  // Open Google Maps for directions
  const openGoogleMapsDirection = (destLat: number, destLng: number, destName: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destLat},${destLng}&destination_place_id=${encodeURIComponent(destName)}&travelmode=driving`;
    window.open(url, "_blank");
  };

  // Get time of day greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return { text: "Selamat Pagi", icon: <Sunrise className="w-5 h-5 text-orange-400" /> };
    if (hour < 15) return { text: "Selamat Siang", icon: <Sun className="w-5 h-5 text-yellow-500" /> };
    if (hour < 18) return { text: "Selamat Sore", icon: <Sunset className="w-5 h-5 text-orange-500" /> };
    return { text: "Selamat Malam", icon: <Moon className="w-5 h-5 text-indigo-400" /> };
  };

  const greeting = getGreeting();

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Mode Di Lokasi</span>
            </div>
          </div>

          {/* Greeting & Weather */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {greeting.icon}
                <span className="text-white/80 text-sm">{greeting.text}</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">Jelajahi Sekitar</h1>
              
              {/* Location Selector */}
              <button
                onClick={() => setShowLocationPicker(!showLocationPicker)}
                className="flex items-center gap-1 text-white/90 text-sm hover:text-white transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>{userLocation.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showLocationPicker ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Weather Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              {weatherIcons[weather.condition]}
              <p className="text-2xl font-bold">{weather.temp}°C</p>
              <p className="text-xs text-white/70">Cerah</p>
            </div>
          </div>

          {/* Weather Details */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Thermometer className="w-4 h-4" />
              <span>Terasa {weather.temp + 2}°C</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Wind className="w-4 h-4" />
              <span>{weather.wind} km/jam</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Picker Dropdown */}
      <AnimatePresence>
        {showLocationPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* GPS Button */}
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

              {/* Preset Locations */}
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

      <div className="max-w-7xl mx-auto px-4">
        {/* Today's Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 -mt-4 mb-4 relative z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Panduan Hari Ini</p>
                <p className="text-xs text-gray-500">
                  {currentItinerary.location} - Hari {currentItinerary.day}
                </p>
              </div>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
              {currentItinerary.tripCode}
            </span>
          </div>

          {/* Schedule Timeline */}
          <div className="space-y-3">
            {currentItinerary.schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start gap-3 ${item.completed ? "opacity-60" : ""}`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.completed
                        ? "bg-green-100 text-green-600"
                        : item.type === "meal"
                          ? "bg-orange-100 text-orange-600"
                          : item.type === "travel"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : item.type === "meal" ? (
                      <UtensilsCrossed className="w-3 h-3" />
                    ) : item.type === "travel" ? (
                      <Route className="w-3 h-3" />
                    ) : (
                      <MapPin className="w-3 h-3" />
                    )}
                  </div>
                  {index < currentItinerary.schedule.length - 1 && (
                    <div className={`w-0.5 h-6 ${item.completed ? "bg-green-200" : "bg-gray-200"}`} />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                    {item.completed && <span className="text-xs text-green-600">Selesai</span>}
                  </div>
                  <p className={`text-sm ${item.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {item.activity}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mini Map Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowMap(!showMap)}
            className="w-full py-3 bg-white rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <MapPinned className="w-5 h-5 text-emerald-600" />
            {showMap ? "Sembunyikan Peta" : "Tampilkan Peta Sekitar"}
          </button>
        </div>

        {/* Mini Map */}
        <AnimatePresence>
          {showMap && mapReady && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 250 }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 rounded-2xl overflow-hidden border border-gray-200"
            >
              <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={14}
                style={{ height: "250px", width: "100%" }}
                key={`${userLocation.lat}-${userLocation.lng}`}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* User Location Marker */}
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>
                    <div className="text-center">
                      <p className="font-semibold">{userLocation.name}</p>
                      <p className="text-xs text-gray-500">Lokasi Anda</p>
                    </div>
                  </Popup>
                </Marker>
                {/* Nearby places markers based on active tab */}
                {activeTab === "kuliner" &&
                  nearbyKuliner.slice(0, 5).map((item) => (
                    <Marker key={item.id} position={[item.coordinates.lat, item.coordinates.lng]}>
                      <Popup>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.distance.toFixed(1)} km</p>
                          <button
                            onClick={() => openGoogleMapsDirection(item.coordinates.lat, item.coordinates.lng, item.name)}
                            className="mt-1 text-xs text-blue-600 hover:underline"
                          >
                            Petunjuk Arah →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                {activeTab === "oleh-oleh" &&
                  nearbyShops.slice(0, 5).map((shop) => (
                    <Marker key={shop.id} position={[shop.coordinates.lat, shop.coordinates.lng]}>
                      <Popup>
                        <div>
                          <p className="font-semibold">{shop.name}</p>
                          <p className="text-xs text-gray-500">{shop.distance.toFixed(1)} km</p>
                          <button
                            onClick={() => openGoogleMapsDirection(shop.coordinates.lat, shop.coordinates.lng, shop.name)}
                            className="mt-1 text-xs text-blue-600 hover:underline"
                          >
                            Petunjuk Arah →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                {activeTab === "destinasi" &&
                  nearbyDestinations.slice(0, 5).map((dest) => (
                    <Marker key={dest.id} position={[dest.coordinates.lat, dest.coordinates.lng]}>
                      <Popup>
                        <div>
                          <p className="font-semibold">{dest.name}</p>
                          <p className="text-xs text-gray-500">{dest.distance.toFixed(1)} km</p>
                          <button
                            onClick={() => openGoogleMapsDirection(dest.coordinates.lat, dest.coordinates.lng, dest.name)}
                            className="mt-1 text-xs text-blue-600 hover:underline"
                          >
                            Petunjuk Arah →
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("kuliner")}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeTab === "kuliner"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-gray-700 border border-gray-100"
            }`}
          >
            <UtensilsCrossed className="w-6 h-6" />
            <span className="text-sm font-medium">Kuliner</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("oleh-oleh")}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeTab === "oleh-oleh"
                ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                : "bg-white text-gray-700 border border-gray-100"
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-sm font-medium">Oleh-oleh</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("destinasi")}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all ${
              activeTab === "destinasi"
                ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                : "bg-white text-gray-700 border border-gray-100"
            }`}
          >
            <Compass className="w-6 h-6" />
            <span className="text-sm font-medium">Destinasi</span>
          </motion.button>
        </div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {/* Kuliner Tab */}
          {activeTab === "kuliner" && (
            <motion.div
              key="kuliner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Kuliner Terdekat</h2>
                <Link href="/kuliner" className="text-sm text-orange-600 font-medium flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {nearbyKuliner.map((food, index) => (
                  <motion.div
                    key={food.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={food.image} alt={food.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{food.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {food.rating}
                        </span>
                        <span>•</span>
                        <span>{food.address}</span>
                      </div>
                      <p className="text-sm font-semibold text-orange-600">{food.price}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Navigation className="w-3 h-3" />
                        <span>{food.distance.toFixed(1)} km</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{food.openHours}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => openGoogleMapsDirection(food.coordinates.lat, food.coordinates.lng, food.name)}
                      className="self-center p-2 bg-orange-50 rounded-full hover:bg-orange-100 transition-colors"
                    >
                      <Route className="w-5 h-5 text-orange-600" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Oleh-oleh Tab */}
          {activeTab === "oleh-oleh" && (
            <motion.div
              key="oleh-oleh"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Toko Oleh-oleh Terdekat</h2>
              </div>

              <div className="space-y-3">
                {nearbyShops.map((shop, index) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={shop.image} alt={shop.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{shop.name}</h3>
                        <p className="text-xs text-gray-500">{shop.address}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-0.5 text-xs">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {shop.rating}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs text-gray-500">
                            <Navigation className="w-3 h-3" />
                            {shop.distance.toFixed(1)} km
                          </span>
                          <span className="flex items-center gap-0.5 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {shop.openHours}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {shop.products.map((product) => (
                        <span key={product} className="px-2 py-0.5 bg-pink-50 text-pink-700 text-xs rounded-full">
                          {product}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <a
                        href={`tel:${shop.phone}`}
                        className="flex-1 py-2 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Phone className="w-4 h-4" />
                        Telepon
                      </a>
                      <button
                        onClick={() => openGoogleMapsDirection(shop.coordinates.lat, shop.coordinates.lng, shop.name)}
                        className="flex-1 py-2 bg-pink-500 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-pink-600"
                      >
                        <Route className="w-4 h-4" />
                        Petunjuk Arah
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Destinasi Tab */}
          {activeTab === "destinasi" && (
            <motion.div
              key="destinasi"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Destinasi Sekitar</h2>
                <Link href="/destinasi" className="text-sm text-blue-600 font-medium flex items-center gap-1">
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {nearbyDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                  >
                    <Link href={`/destinasi/${dest.slug}`}>
                      <div className="relative h-28">
                        <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-medium">{dest.rating}</span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-semibold text-sm line-clamp-1">{dest.name}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="p-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <Navigation className="w-3 h-3" />
                        <span>{dest.distance.toFixed(1)} km</span>
                        <span className="mx-1">•</span>
                        <span className="truncate">{dest.location}</span>
                      </div>
                      <button
                        onClick={() => openGoogleMapsDirection(dest.coordinates.lat, dest.coordinates.lng, dest.name)}
                        className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 flex items-center justify-center gap-1"
                      >
                        <Route className="w-3 h-3" />
                        Petunjuk Arah
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA for trip planning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center"
        >
          <Sparkles className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
          <h3 className="text-lg font-bold mb-2">Ingin jelajahi lebih banyak?</h3>
          <p className="text-white/80 text-sm mb-4">
            Buat itinerary lengkap untuk perjalananmu di Sulawesi Selatan!
          </p>
          <Link
            href="/rencanakan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl"
          >
            <Route className="w-5 h-5" />
            Rencanakan Perjalanan
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
