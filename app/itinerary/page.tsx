"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  X,
  MapPin,
  Clock,
  Calendar,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Route,
  Users,
  Wallet,
  Check,
  Star,
  Navigation,
  Coffee,
  Utensils,
  Camera,
  Bed,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import itinerariesData from "@/data/itineraries.json";
import destinationsData from "@/data/destinations.json";

const quickTemplates = [
  { id: "1day", label: "1 Hari", days: 1, icon: "☀️" },
  { id: "weekend", label: "Weekend", days: 2, icon: "🌴" },
  { id: "3days", label: "3 Hari", days: 3, icon: "🏝️" },
  { id: "5days", label: "5 Hari", days: 5, icon: "🗺️" },
  { id: "week", label: "1 Minggu", days: 7, icon: "✈️" },
];

const activityTypes = [
  { id: "wisata", label: "Wisata", icon: Camera, color: "bg-blue-500" },
  { id: "kuliner", label: "Kuliner", icon: Utensils, color: "bg-orange-500" },
  { id: "hotel", label: "Hotel", icon: Bed, color: "bg-purple-500" },
  { id: "transport", label: "Transport", icon: Navigation, color: "bg-green-500" },
  { id: "istirahat", label: "Istirahat", icon: Coffee, color: "bg-amber-500" },
];

type Activity = {
  id: string;
  time: string;
  title: string;
  location: string;
  type: string;
  duration: string;
};

type DayPlan = {
  day: number;
  activities: Activity[];
};

export default function ItineraryPage() {
  const [activeTab, setActiveTab] = useState<"templates" | "custom">("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<typeof itinerariesData.itineraries[0] | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  
  // Custom builder state
  const [showBuilder, setShowBuilder] = useState(false);
  const [tripDays, setTripDays] = useState(3);
  const [tripName, setTripName] = useState("");
  const [customPlan, setCustomPlan] = useState<DayPlan[]>([]);
  const [showAddActivity, setShowAddActivity] = useState<number | null>(null);

  const featuredItineraries = itinerariesData.itineraries.filter((i: typeof itinerariesData.itineraries[0]) => i.featured);

  const initializeCustomPlan = (days: number) => {
    const plan: DayPlan[] = [];
    for (let i = 1; i <= days; i++) {
      plan.push({
        day: i,
        activities: []
      });
    }
    setCustomPlan(plan);
    setShowBuilder(true);
  };

  const addActivity = (dayIndex: number, activity: Omit<Activity, 'id'>) => {
    const newPlan = [...customPlan];
    newPlan[dayIndex].activities.push({
      ...activity,
      id: `${dayIndex}-${Date.now()}`
    });
    setCustomPlan(newPlan);
    setShowAddActivity(null);
  };

  const removeActivity = (dayIndex: number, activityId: string) => {
    const newPlan = [...customPlan];
    newPlan[dayIndex].activities = newPlan[dayIndex].activities.filter(a => a.id !== activityId);
    setCustomPlan(newPlan);
  };

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return Sun;
    if (hour >= 12 && hour < 17) return Sun;
    if (hour >= 17 && hour < 20) return Sunset;
    return Moon;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Itinerary Planner</h1>
                <p className="text-xs text-gray-500">Rencanakan perjalananmu</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowBuilder(false);
                setSelectedTemplate(null);
              }}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Route className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 pb-3">
            <button
              onClick={() => setActiveTab("templates")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "templates"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Template Populer
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === "custom"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Buat Sendiri
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "templates" && !selectedTemplate && (
          <div className="px-4 py-4 space-y-6">
            {/* Featured Template */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <h2 className="font-bold text-gray-900">Rekomendasi</h2>
              </div>
              <div className="space-y-3">
                {featuredItineraries.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedTemplate(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-all"
                  >
                    <div className="flex">
                      <div className="relative w-28 h-32 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{item.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            {formatPrice(item.price)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Route className="w-3 h-3" />
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center pr-3">
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* All Templates */}
            <div>
              <h2 className="font-bold text-gray-900 mb-3">Semua Template</h2>
              <div className="grid grid-cols-2 gap-3">
                {itinerariesData.itineraries.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedTemplate(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group"
                  >
                    <div className="relative h-28">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-white font-bold text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-white/80 text-xs">{item.duration} • {item.difficulty}</p>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-blue-600 font-bold text-sm">{formatPrice(item.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Template Detail */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-24"
          >
            {/* Hero */}
            <div className="relative h-48">
              <Image src={selectedTemplate.image} alt={selectedTemplate.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full mb-2">
                  {selectedTemplate.duration}
                </span>
                <h2 className="text-2xl font-bold text-white">{selectedTemplate.name}</h2>
              </div>
            </div>

            {/* Info */}
            <div className="px-4 py-4 bg-white border-b border-gray-100">
              <p className="text-gray-600 text-sm mb-4">{selectedTemplate.description}</p>
              <div className="flex gap-4">
                <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center">
                  <Wallet className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="font-bold text-blue-600">{formatPrice(selectedTemplate.price)}</p>
                </div>
                <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
                  <Calendar className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Durasi</p>
                  <p className="font-bold text-green-600">{selectedTemplate.duration}</p>
                </div>
                <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center">
                  <Route className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Level</p>
                  <p className="font-bold text-purple-600">{selectedTemplate.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="px-4 py-4 bg-white border-b border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.highlights.map((h, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Day by Day */}
            <div className="px-4 py-4">
              <h3 className="font-bold text-gray-900 mb-3">Jadwal Perjalanan</h3>
              <div className="space-y-3">
                {selectedTemplate.days.map((day) => (
                  <div key={day.day} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <button
                      onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {day.day}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">Hari {day.day}</p>
                          <p className="text-sm text-gray-500">{day.title}</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedDay === day.day ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 text-sm mb-3">{day.description}</p>
                            <div className="space-y-2">
                              {day.activities.map((activity, i) => (
                                <div key={i} className="flex gap-3">
                                  <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <Sun className="w-4 h-4 text-blue-500" />
                                    </div>
                                    {i !== day.activities.length - 1 && (
                                      <div className="w-0.5 flex-1 bg-blue-100 my-1" />
                                    )}
                                  </div>
                                  <div className="flex-1 pb-3">
                                    <p className="font-medium text-gray-900">{activity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed CTA */}
            <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:bottom-0">
              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30">
                Gunakan Template Ini
              </button>
            </div>
          </motion.div>
        )}

        {/* Custom Builder Tab */}
        {activeTab === "custom" && !showBuilder && (
          <div className="px-4 py-6">
            {/* Duration Selector */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Berapa lama perjalananmu?
              </h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={() => setTripDays(Math.max(1, tripDays - 1))}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-5 h-5 text-gray-600" />
                </button>
                <div className="text-center">
                  <span className="text-4xl font-bold text-blue-600">{tripDays}</span>
                  <p className="text-gray-500 text-sm">Hari</p>
                </div>
                <button
                  onClick={() => setTripDays(Math.min(14, tripDays + 1))}
                  className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Quick Select */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {quickTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTripDays(t.days)}
                    className={`flex-none px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      tripDays === t.days
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="mr-1">{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Name */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Nama perjalananmu
              </h3>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="Contoh: Liburan Toraja 2026"
                className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => initializeCustomPlan(tripDays)}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Mulai Buat Itinerary
            </motion.button>
          </div>
        )}

        {/* Custom Builder View */}
        {activeTab === "custom" && showBuilder && (
          <div className="pb-24">
            {/* Header */}
            <div className="px-4 py-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-gray-900">{tripName || "Trip Baru"}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                  {tripDays} Hari
                </span>
              </div>
              <p className="text-sm text-gray-500">Tap pada hari untuk menambah aktivitas</p>
            </div>

            {/* Days */}
            <div className="px-4 py-4 space-y-4">
              {customPlan.map((dayPlan, dayIndex) => (
                <div key={dayPlan.day} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {dayPlan.day}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Hari {dayPlan.day}</p>
                          <p className="text-xs text-gray-500">{dayPlan.activities.length} aktivitas</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAddActivity(showAddActivity === dayIndex ? null : dayIndex)}
                        className="p-2 bg-blue-100 rounded-xl text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Activities */}
                  {dayPlan.activities.length > 0 && (
                    <div className="p-4 space-y-3">
                      {dayPlan.activities.map((act) => {
                        const actType = activityTypes.find(t => t.id === act.type);
                        return (
                          <div key={act.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                            <div className={`w-10 h-10 ${actType?.color || 'bg-gray-500'} rounded-xl flex items-center justify-center`}>
                              {actType && <actType.icon className="w-5 h-5 text-white" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{act.title}</p>
                              <p className="text-xs text-gray-500">{act.time} • {act.location}</p>
                            </div>
                            <button
                              onClick={() => removeActivity(dayIndex, act.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Add Activity Form */}
                  <AnimatePresence>
                    {showAddActivity === dayIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="p-4 bg-gray-50 space-y-3">
                          <p className="font-medium text-gray-700 text-sm">Pilih tipe aktivitas</p>
                          <div className="flex gap-2 flex-wrap">
                            {activityTypes.map((type) => (
                              <button
                                key={type.id}
                                onClick={() => {
                                  addActivity(dayIndex, {
                                    time: "08:00",
                                    title: type.label,
                                    location: "Lokasi",
                                    type: type.id,
                                    duration: "2 jam"
                                  });
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                              >
                                <div className={`w-6 h-6 ${type.color} rounded-lg flex items-center justify-center`}>
                                  <type.icon className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{type.label}</span>
                              </button>
                            ))}
                          </div>
                          
                          {/* Quick Add from Destinations */}
                          <p className="font-medium text-gray-700 text-sm mt-4">Atau pilih destinasi</p>
                          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            {destinationsData.destinations.slice(0, 5).map((dest) => (
                              <button
                                key={dest.id}
                                onClick={() => {
                                  addActivity(dayIndex, {
                                    time: "09:00",
                                    title: dest.name,
                                    location: dest.location,
                                    type: "wisata",
                                    duration: "3 jam"
                                  });
                                }}
                                className="flex-none flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm"
                              >
                                <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                                  <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                </div>
                                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">{dest.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Fixed Save Button */}
            <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:bottom-0">
              <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Simpan Itinerary
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
