"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Plane,
  Calendar,
  MapPin,
  Hotel,
  Check,
  ChevronDown,
  ChevronRight,
  Star,
  Plus,
  Minus,
  X,
  Sparkles,
  Info,
  Download,
  Share2,
  CheckCircle,
  Copy,
  MessageCircle,
  Printer,
  Home,
  Zap,
  AlertCircle,
  Clock,
  Car,
  AlertTriangle,
  Building2,
  Mountain,
  TreePine,
  Waves,
  Landmark,
  Bell,
  Layout,
  Wallet,
  Route,
} from "lucide-react";
import originsData from "@/data/origins.json";
import destinationsData from "@/data/destinations.json";
import accommodationsData from "@/data/accommodations.json";
import itinerariesData from "@/data/itineraries.json";
import { formatPrice } from "@/lib/utils";
import { 
  getPendingDestinations, 
  removePendingDestination, 
  clearPendingDestinations,
  type PendingDestination 
} from "@/lib/tripPlanner";

// Itinerary type
type Itinerary = (typeof itinerariesData.itineraries)[0];

// Types
type Origin = (typeof originsData.origins)[0];
type Destination = (typeof destinationsData.destinations)[0];
type Accommodation = (typeof accommodationsData.accommodations)[0];
type Zone = (typeof destinationsData.zones)[0];

type TripDay = {
  day: number;
  destinations: Destination[];
  accommodation: Accommodation | null;
};

type TripPlan = {
  origin: Origin | null;
  startDate: string;
  duration: number;
  travelers: number;
  days: TripDay[];
};

// Zone icon mapping
const zoneIcons: Record<string, React.ElementType> = {
  "Building2": Building2,
  "Mountain": Mountain,
  "TreePine": TreePine,
  "Waves": Waves,
  "Landmark": Landmark,
};

// Helper: format travel time in minutes to readable string
const formatTravelTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes} menit`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} jam`;
  return `${hours} jam ${mins} menit`;
};

// Helper: calculate total travel time for destinations in a day
const calculateDayTravelTime = (destinations: Destination[]): { totalTime: number; warning: string | null } => {
  if (destinations.length === 0) return { totalTime: 0, warning: null };
  if (destinations.length === 1) {
    return { 
      totalTime: destinations[0].travelTimeFromMakassar + destinations[0].recommendedDuration,
      warning: destinations[0].zone === "utara-jauh" || destinations[0].zone === "selatan-jauh" 
        ? `${destinations[0].name} sangat jauh dari Makassar, disarankan menginap di sana.`
        : null
    };
  }
  
  // Calculate: travel from Makassar + time at each place + travel between places
  let totalTime = 0;
  let warning: string | null = null;
  const zones = new Set(destinations.map(d => d.zone));
  
  // If mixing far zones, give warning
  if ((zones.has("utara-jauh") && zones.size > 1) || (zones.has("selatan-jauh") && zones.size > 1)) {
    warning = "Kombinasi ini tidak realistis! Tana Toraja dan Pantai Bira sangat jauh, tidak bisa dikombinasikan dengan destinasi lain dalam 1 hari.";
  } else if (zones.has("utara-jauh") && zones.has("selatan-jauh")) {
    warning = "TIDAK MUNGKIN! Toraja (utara) dan Bira (selatan) tidak bisa dikunjungi dalam 1 hari.";
  }
  
  // First destination: travel from Makassar
  totalTime += destinations[0].travelTimeFromMakassar;
  totalTime += destinations[0].recommendedDuration;
  
  // Subsequent destinations: travel between zones
  for (let i = 1; i < destinations.length; i++) {
    const fromZone = destinations[i - 1].zone;
    const toZone = destinations[i].zone;
    const travelTime = destinationsData.travelMatrix[fromZone as keyof typeof destinationsData.travelMatrix]?.[toZone as keyof typeof destinationsData.travelMatrix] || 60;
    totalTime += travelTime;
    totalTime += destinations[i].recommendedDuration;
  }
  
  // Return to Makassar (assuming they return to hotel)
  const lastZone = destinations[destinations.length - 1].zone;
  totalTime += destinationsData.travelMatrix[lastZone as keyof typeof destinationsData.travelMatrix]?.["makassar-kota"] || 60;
  
  // Warning if total time exceeds 14 hours (unrealistic for a day trip)
  if (totalTime > 840 && !warning) {
    warning = `Total waktu ${formatTravelTime(totalTime)} terlalu lama untuk 1 hari. Kurangi destinasi.`;
  } else if (totalTime > 600 && !warning) {
    warning = `Hari yang padat (${formatTravelTime(totalTime)}). Pertimbangkan untuk mengurangi 1 destinasi.`;
  }
  
  return { totalTime, warning };
};

// Get destinations grouped by zone
const getDestinationsByZone = () => {
  const grouped: Record<string, Destination[]> = {};
  destinationsData.zones.forEach(zone => {
    grouped[zone.id] = destinationsData.destinations.filter(d => d.zone === zone.id);
  });
  return grouped;
};

// Get recommended accommodations based on the zones of selected destinations
// Also considers next day's destinations for multi-day trips to distant zones
const getRecommendedAccommodations = (
  currentDayDestinations: Destination[], 
  nextDayDestinations?: Destination[]
): Accommodation[] => {
  // Combine relevant destinations for accommodation recommendation
  // Priority: If current day has destinations, use them
  // If current day is empty (travel day), check next day's destinations
  const relevantDestinations = currentDayDestinations.length > 0 
    ? currentDayDestinations 
    : (nextDayDestinations || []);
  
  if (relevantDestinations.length === 0) {
    // If no destinations selected, show Makassar hotels as default
    return accommodationsData.accommodations.filter(
      acc => acc.nearbyZones?.includes("makassar-kota") || acc.nearbyZones?.includes("maros")
    );
  }
  
  // Get all zones from relevant destinations
  const selectedZones = new Set(relevantDestinations.map(d => d.zone));
  
  // Check if any zone is a far zone (utara-jauh or selatan-jauh)
  const hasFarZone = selectedZones.has("utara-jauh") || selectedZones.has("selatan-jauh");
  
  // Find accommodations that are nearby to any of the selected zones
  const recommended = accommodationsData.accommodations.filter(acc => {
    const accZones = acc.nearbyZones || [];
    return accZones.some(zone => selectedZones.has(zone));
  });
  
  // If no specific match but going to far zone, show options for that zone
  if (recommended.length === 0 && hasFarZone) {
    // For Toraja (utara-jauh) or Bira (selatan-jauh), show accommodations in that zone
    const farZone = selectedZones.has("utara-jauh") ? "utara-jauh" : "selatan-jauh";
    const farZoneAccommodations = accommodationsData.accommodations.filter(
      acc => acc.nearbyZones?.includes(farZone)
    );
    if (farZoneAccommodations.length > 0) return farZoneAccommodations;
  }
  
  // If no specific match, return Makassar accommodations as fallback
  if (recommended.length === 0) {
    return accommodationsData.accommodations.filter(
      acc => acc.nearbyZones?.includes("makassar-kota") || acc.nearbyZones?.includes("maros")
    );
  }
  
  return recommended;
};

// Get zone info for accommodation
const getAccommodationZoneInfo = (acc: Accommodation, dayDestinations: Destination[]): string => {
  if (dayDestinations.length === 0) return "Lokasi strategis di Makassar";
  
  const selectedZones = dayDestinations.map(d => d.zone);
  const accZones = acc.nearbyZones || [];
  const matchingZones = accZones.filter(z => selectedZones.includes(z));
  
  if (matchingZones.length > 0) {
    // Find the zone name
    const zone = destinationsData.zones.find(z => z.id === matchingZones[0]);
    return `Dekat dengan destinasi di ${zone?.name || matchingZones[0]}`;
  }
  
  return acc.location;
};

// Helper: Parse destination price correctly
// Handles: "Gratis", "Gratis - Rp50.000", "Rp30.000", "Rp150.000 (penyeberangan)"
const parseDestinationPrice = (priceStr: string): number => {
  const lowerPrice = priceStr.toLowerCase();
  
  // If it starts with "gratis" and has no other price, return 0
  if (lowerPrice === "gratis") return 0;
  
  // If it's "Gratis - RpXX" format, return the maximum (for budget estimation)
  if (lowerPrice.startsWith("gratis")) {
    const match = priceStr.match(/Rp\s*([\d.]+)/i);
    if (match) {
      return parseInt(match[1].replace(/\./g, ""));
    }
    return 0;
  }
  
  // Extract first Rp amount (handles "Rp150.000 (penyeberangan)")
  const match = priceStr.match(/Rp\s*([\d.]+)/i);
  if (match) {
    return parseInt(match[1].replace(/\./g, ""));
  }
  
  return 0;
};

// Steps - Now 6 steps with template selection at start
const steps = [
  { id: 0, title: "Pilih Template", icon: Layout },
  { id: 1, title: "Kota Asal", icon: Plane },
  { id: 2, title: "Tanggal & Durasi", icon: Calendar },
  { id: 3, title: "Destinasi", icon: MapPin },
  { id: 4, title: "Akomodasi", icon: Hotel },
  { id: 5, title: "Ringkasan", icon: Check },
];

// Duration options
const durationOptions = [
  { days: 1, label: "1 Hari", description: "Day trip" },
  { days: 2, label: "2 Hari", description: "Weekend getaway" },
  { days: 3, label: "3 Hari", description: "Long weekend" },
  { days: 4, label: "4 Hari", description: "Short vacation" },
  { days: 5, label: "5 Hari", description: "Full vacation" },
  { days: 7, label: "7 Hari", description: "Grand tour" },
];

// Maximum destinations per day (realistic limit considering travel time)
const MAX_DESTINATIONS_PER_DAY = 3;

// Demo scenario data - realistic itinerary respecting travel times
const createDemoScenario = (): TripPlan => {
  const jakartaOrigin = originsData.origins.find((o) => o.id === "jakarta")!;
  const losari = destinationsData.destinations.find((d) => d.id === "pantai-losari")!;
  const rotterdam = destinationsData.destinations.find((d) => d.id === "benteng-rotterdam")!;
  const bantimurung = destinationsData.destinations.find((d) => d.id === "bantimurung")!;
  const rammang = destinationsData.destinations.find((d) => d.id === "rammang-rammang")!;
  const samalona = destinationsData.destinations.find((d) => d.id === "pulau-samalona")!;

  const aryaduta = accommodationsData.accommodations.find((a) => a.id === "aryaduta-makassar")!;

  // Get date 14 days from now
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);
  const startDate = futureDate.toISOString().split("T")[0];

  // Realistic 3-day itinerary:
  // Day 1: Arrival - explore Makassar city (Losari + Rotterdam) - short travel times
  // Day 2: Day trip to Maros area (Bantimurung + Rammang-Rammang) - same zone, close together
  // Day 3: Departure - morning activity (Samalona) or free time
  return {
    origin: jakartaOrigin,
    startDate,
    duration: 3,
    travelers: 2,
    days: [
      {
        day: 1,
        // Day 1: Makassar city - Losari & Rotterdam are walking distance (~500m)
        destinations: [losari, rotterdam],
        accommodation: aryaduta,
      },
      {
        day: 2,
        // Day 2: Maros zone - Bantimurung & Rammang-Rammang are in same zone (~20 min apart)
        destinations: [bantimurung, rammang],
        accommodation: aryaduta,
      },
      {
        day: 3,
        // Day 3: Morning island trip before flight home
        destinations: [samalona],
        accommodation: null,
      },
    ],
  };
};

export default function RencanakanPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<Itinerary | null>(null);
  const [tripPlan, setTripPlan] = useState<TripPlan>(() => {
    // Initialize with default 3 days
    const defaultDays: TripDay[] = [];
    for (let i = 1; i <= 3; i++) {
      defaultDays.push({
        day: i,
        destinations: [],
        accommodation: null,
      });
    }
    return {
      origin: null,
      startDate: "",
      duration: 3,
      travelers: 2,
      days: defaultDays,
    };
  });
  const [expandedDay, setExpandedDay] = useState<number | null>(null); // null means all expanded
  const [isSuccess, setIsSuccess] = useState(false);
  const [tripCode, setTripCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [showDemoButton, setShowDemoButton] = useState(true);
  
  // Pending destinations from detail pages
  const [pendingDestinations, setPendingDestinations] = useState<PendingDestination[]>([]);
  const [showPendingBanner, setShowPendingBanner] = useState(false);

  // Generate trip code and save to localStorage
  useEffect(() => {
    if (isSuccess && !tripCode) {
      const code = `VSS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setTripCode(code);
      
      // Save trip to localStorage
      try {
        const savedTrips = JSON.parse(localStorage.getItem("visitSulselTrips") || "{}");
        savedTrips[code] = {
          ...tripPlan,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("visitSulselTrips", JSON.stringify(savedTrips));
      } catch (error) {
        console.error("Failed to save trip to localStorage:", error);
      }
    }
  }, [isSuccess, tripCode, tripPlan]);

  // Check for pending destinations (from destination detail page)
  useEffect(() => {
    const pending = getPendingDestinations();
    if (pending.length > 0) {
      setPendingDestinations(pending);
      setShowPendingBanner(true);
      
      // If coming from destination page, skip to step 3 (destinations)
      const fromDestination = searchParams.get("from") === "destination";
      if (fromDestination) {
        // Auto-advance to destination selection step
        setCurrentStep(3);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add pending destination to a specific day
  const addPendingToDay = (pendingDest: PendingDestination, dayIndex: number) => {
    // Find the full destination data
    const fullDestination = destinationsData.destinations.find(d => d.id === pendingDest.id);
    if (!fullDestination) return;
    
    // Check if already at limit or already added
    const currentDay = tripPlan.days[dayIndex];
    if (currentDay.destinations.length >= MAX_DESTINATIONS_PER_DAY) return;
    if (currentDay.destinations.some(d => d.id === pendingDest.id)) return;
    
    // Add to the day
    const newDays = [...tripPlan.days];
    newDays[dayIndex].destinations.push(fullDestination);
    setTripPlan(prev => ({ ...prev, days: newDays }));
    
    // Remove from pending list
    removePendingDestination(pendingDest.id);
    setPendingDestinations(prev => prev.filter(p => p.id !== pendingDest.id));
    
    // Hide banner if no more pending
    if (pendingDestinations.length <= 1) {
      setShowPendingBanner(false);
    }
  };

  // Dismiss pending destination
  const dismissPending = (pendingId: string) => {
    removePendingDestination(pendingId);
    setPendingDestinations(prev => prev.filter(p => p.id !== pendingId));
    if (pendingDestinations.length <= 1) {
      setShowPendingBanner(false);
    }
  };

  // Dismiss all pending
  const dismissAllPending = () => {
    clearPendingDestinations();
    setPendingDestinations([]);
    setShowPendingBanner(false);
  };
  
  // Helper function to retrieve a saved trip by code
  const getSavedTrip = (code: string): TripPlan | null => {
    try {
      const savedTrips = JSON.parse(localStorage.getItem("visitSulselTrips") || "{}");
      return savedTrips[code] || null;
    } catch {
      return null;
    }
  };
  
  // Helper function to get all saved trips
  const getAllSavedTrips = (): { code: string; trip: TripPlan & { createdAt: string } }[] => {
    try {
      const savedTrips = JSON.parse(localStorage.getItem("visitSulselTrips") || "{}");
      return Object.entries(savedTrips).map(([code, trip]) => ({
        code,
        trip: trip as TripPlan & { createdAt: string },
      }));
    } catch {
      return [];
    }
  };

  // Initialize days when duration changes - preserves existing data
  const initializeDays = (duration: number) => {
    setTripPlan((prev) => {
      const newDays: TripDay[] = [];
      
      for (let i = 1; i <= duration; i++) {
        // Check if this day already exists in previous plan
        const existingDay = prev.days.find(d => d.day === i);
        
        if (existingDay) {
          // Preserve existing destinations and accommodation
          newDays.push({
            day: i,
            destinations: existingDay.destinations,
            accommodation: existingDay.accommodation,
          });
        } else {
          // Create new empty day
          newDays.push({
            day: i,
            destinations: [],
            accommodation: null,
          });
        }
      }
      
      return { ...prev, duration, days: newDays };
    });
  };

  // Load demo scenario
  const loadDemoScenario = () => {
    const demoData = createDemoScenario();
    setTripPlan(demoData);
    setCurrentStep(5); // Now step 5 is the summary
    setShowDemoButton(false);
  };

  // Calculate total budget (without meals and souvenirs - those are for "Mode di Lokasi")
  const totalBudget = useMemo(() => {
    let total = 0;

    // Flight cost (round trip)
    if (tripPlan.origin) {
      total += ((tripPlan.origin.flightPriceMin + tripPlan.origin.flightPriceMax) / 2) * tripPlan.travelers * 2;
    }

    // Destinations entry fees
    tripPlan.days.forEach((day) => {
      day.destinations.forEach((dest) => {
        const price = parseDestinationPrice(dest.price);
        total += price * tripPlan.travelers;
      });
    });

    // Accommodations
    tripPlan.days.forEach((day) => {
      if (day.accommodation) {
        total += day.accommodation.price;
      }
    });

    return total;
  }, [tripPlan]);

  // Check if destination is already selected on any day
  const isDestinationSelectedOnAnyDay = (destinationId: string): { selected: boolean; dayNumber: number | null } => {
    for (const day of tripPlan.days) {
      if (day.destinations.find((d) => d.id === destinationId)) {
        return { selected: true, dayNumber: day.day };
      }
    }
    return { selected: false, dayNumber: null };
  };

  // Add destination to day (with limit check and duplicate prevention)
  const addDestinationToDay = (dayIndex: number, destination: Destination) => {
    const newDays = [...tripPlan.days];
    
    // Check if already at max limit for this day
    if (newDays[dayIndex].destinations.length >= MAX_DESTINATIONS_PER_DAY) {
      return; // Don't add if at limit
    }
    
    // Check if this destination is already selected on ANY day (including this one)
    const { selected } = isDestinationSelectedOnAnyDay(destination.id);
    if (selected) {
      return; // Don't add duplicate destination
    }
    
    newDays[dayIndex].destinations.push(destination);
    setTripPlan((prev) => ({ ...prev, days: newDays }));
  };

  // Remove destination from day
  const removeDestinationFromDay = (dayIndex: number, destinationId: string) => {
    const newDays = [...tripPlan.days];
    newDays[dayIndex].destinations = newDays[dayIndex].destinations.filter((d) => d.id !== destinationId);
    setTripPlan((prev) => ({ ...prev, days: newDays }));
  };

  // Set accommodation for day
  const setAccommodationForDay = (dayIndex: number, accommodation: Accommodation | null) => {
    const newDays = [...tripPlan.days];
    newDays[dayIndex].accommodation = accommodation;
    setTripPlan((prev) => ({ ...prev, days: newDays }));
  };

  // Navigation (skip Step 4 for 1-day trips)
  const nextStep = () => {
    if (currentStep < 5) {
      // Skip step 4 (accommodation) for 1-day trips
      if (currentStep === 3 && tripPlan.duration === 1) {
        setCurrentStep(5);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // Skip step 4 (accommodation) for 1-day trips when going back
      if (currentStep === 5 && tripPlan.duration === 1) {
        setCurrentStep(3);
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  // Handle template selection
  const handleSelectTemplate = (template: Itinerary) => {
    setSelectedTemplate(template);
    // Extract duration from template (e.g., "4 Hari 3 Malam" -> 4)
    const durationMatch = template.duration.match(/(\d+)\s*Hari/);
    const duration = durationMatch ? parseInt(durationMatch[1]) : 3;
    
    // Initialize days based on template duration
    const newDays: TripDay[] = [];
    for (let i = 1; i <= duration; i++) {
      newDays.push({
        day: i,
        destinations: [],
        accommodation: null,
      });
    }
    
    setTripPlan(prev => ({
      ...prev,
      duration,
      days: newDays,
    }));
    
    // Move to step 1 (origin selection)
    setCurrentStep(1);
  };

  // Skip template selection and start from scratch
  const handleStartFromScratch = () => {
    setSelectedTemplate(null);
    setCurrentStep(1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true; // Can always proceed from template selection
      case 1:
        return tripPlan.origin !== null;
      case 2:
        // Tanggal wajib diisi
        return tripPlan.duration > 0 && tripPlan.days.length > 0 && tripPlan.startDate !== "";
      case 3:
        return tripPlan.days.some((day) => day.destinations.length > 0);
      case 4:
        // Akomodasi wajib dipilih (kecuali day trip 1 hari)
        if (tripPlan.duration === 1) return true;
        return tripPlan.days.slice(0, -1).every((day) => day.accommodation !== null);
      default:
        return true;
    }
  };

  // Save trip
  const saveTripPlan = () => {
    setIsSuccess(true);
  };

  // Copy to clipboard
  const copyTripCode = () => {
    navigator.clipboard.writeText(tripCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset trip
  const resetTrip = () => {
    // Re-initialize with default 3 days
    const defaultDays: TripDay[] = [];
    for (let i = 1; i <= 3; i++) {
      defaultDays.push({
        day: i,
        destinations: [],
        accommodation: null,
      });
    }
    setTripPlan({
      origin: null,
      startDate: "",
      duration: 3,
      travelers: 2,
      days: defaultDays,
    });
    setCurrentStep(1);
    setIsSuccess(false);
    setTripCode("");
    setShowDemoButton(true);
  };

  // Generate trip summary text for sharing
  const generateTripSummaryText = () => {
    let text = `🌴 *Rencana Trip Sulawesi Selatan*\n`;
    text += `📋 Kode: ${tripCode}\n\n`;
    text += `✈️ Dari: ${tripPlan.origin?.name}\n`;
    text += `📅 Tanggal: ${tripPlan.startDate}\n`;
    text += `⏱️ Durasi: ${tripPlan.duration} Hari ${tripPlan.duration > 1 ? tripPlan.duration - 1 + ' Malam' : ''}\n`;
    text += `👥 Wisatawan: ${tripPlan.travelers} Orang\n`;
    text += `💰 Estimasi: ${formatPrice(totalBudget)}\n\n`;
    
    text += `📍 *Itinerary:*\n`;
    tripPlan.days.forEach((day) => {
      text += `\n*Hari ${day.day}:*\n`;
      if (day.destinations.length > 0) {
        day.destinations.forEach((dest) => {
          text += `  • ${dest.name}\n`;
        });
      } else {
        text += `  • Belum ada destinasi\n`;
      }
      if (day.accommodation && day.day < tripPlan.duration) {
        text += `  🏨 ${day.accommodation.name}\n`;
      }
    });
    
    text += `\n---\nDibuat dengan Visit Sulsel`;
    return text;
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    const text = generateTripSummaryText();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  // Share via Web Share API
  const shareGeneral = async () => {
    const text = generateTripSummaryText().replace(/\*/g, ''); // Remove markdown formatting
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trip Sulawesi Selatan - ${tripCode}`,
          text: text,
        });
      } catch (error) {
        // User cancelled or error
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate and download PDF
  const downloadPDF = () => {
    // Create a printable HTML content
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Trip Sulawesi Selatan - ${tripCode}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #1e40af; margin-top: 30px; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
          .code { background: #f0f9ff; padding: 10px 20px; border-radius: 8px; font-family: monospace; font-size: 18px; color: #2563eb; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 30px; }
          .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; }
          .info-label { color: #64748b; font-size: 12px; }
          .info-value { font-weight: bold; font-size: 16px; }
          .day { margin-bottom: 25px; padding: 20px; background: #f8fafc; border-radius: 12px; border-left: 4px solid #2563eb; }
          .day-title { font-weight: bold; font-size: 18px; margin-bottom: 15px; }
          .destination { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .destination:last-child { border-bottom: none; }
          .accommodation { margin-top: 15px; padding-top: 15px; border-top: 1px dashed #cbd5e1; }
          .total { text-align: right; font-size: 24px; font-weight: bold; color: #2563eb; margin-top: 30px; }
          .footer { text-align: center; color: #94a3b8; margin-top: 50px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌴 Trip Sulawesi Selatan</h1>
          <div class="code">${tripCode}</div>
        </div>
        
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Dari</div>
            <div class="info-value">${tripPlan.origin?.name || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tanggal</div>
            <div class="info-value">${tripPlan.startDate || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Durasi</div>
            <div class="info-value">${tripPlan.duration} Hari ${tripPlan.duration > 1 ? tripPlan.duration - 1 + ' Malam' : ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Wisatawan</div>
            <div class="info-value">${tripPlan.travelers} Orang</div>
          </div>
        </div>
        
        <h2>📍 Itinerary</h2>
        ${tripPlan.days.map(day => `
          <div class="day">
            <div class="day-title">Hari ${day.day}</div>
            ${day.destinations.length > 0 
              ? day.destinations.map(dest => `
                <div class="destination">
                  <strong>${dest.name}</strong><br>
                  <small>${dest.location} • ${formatTravelTime(dest.recommendedDuration)} kunjungan</small>
                </div>
              `).join('')
              : '<div class="destination"><em>Belum ada destinasi</em></div>'
            }
            ${day.accommodation && day.day < tripPlan.duration ? `
              <div class="accommodation">
                🏨 <strong>${day.accommodation.name}</strong><br>
                <small>${day.accommodation.location} • ${formatPrice(day.accommodation.price)}/malam</small>
              </div>
            ` : ''}
          </div>
        `).join('')}
        
        <div class="total">
          Estimasi Total: ${formatPrice(totalBudget)}
        </div>
        
        <div class="footer">
          Dibuat dengan Visit Sulsel • ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([printContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trip-sulsel-${tripCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print trip summary
  const printTrip = () => {
    // Same content as PDF but open in print dialog
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Trip Sulawesi Selatan - ${tripCode}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #1e40af; margin-top: 30px; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
          .code { background: #f0f9ff; padding: 10px 20px; border-radius: 8px; font-family: monospace; font-size: 18px; color: #2563eb; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 30px; }
          .info-item { background: #f8fafc; padding: 15px; border-radius: 8px; }
          .info-label { color: #64748b; font-size: 12px; }
          .info-value { font-weight: bold; font-size: 16px; }
          .day { margin-bottom: 25px; padding: 20px; background: #f8fafc; border-radius: 12px; border-left: 4px solid #2563eb; }
          .day-title { font-weight: bold; font-size: 18px; margin-bottom: 15px; }
          .destination { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
          .destination:last-child { border-bottom: none; }
          .accommodation { margin-top: 15px; padding-top: 15px; border-top: 1px dashed #cbd5e1; }
          .total { text-align: right; font-size: 24px; font-weight: bold; color: #2563eb; margin-top: 30px; }
          .footer { text-align: center; color: #94a3b8; margin-top: 50px; font-size: 12px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌴 Trip Sulawesi Selatan</h1>
          <div class="code">${tripCode}</div>
        </div>
        
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Dari</div>
            <div class="info-value">${tripPlan.origin?.name || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tanggal</div>
            <div class="info-value">${tripPlan.startDate || '-'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Durasi</div>
            <div class="info-value">${tripPlan.duration} Hari ${tripPlan.duration > 1 ? tripPlan.duration - 1 + ' Malam' : ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Wisatawan</div>
            <div class="info-value">${tripPlan.travelers} Orang</div>
          </div>
        </div>
        
        <h2>📍 Itinerary</h2>
        ${tripPlan.days.map(day => `
          <div class="day">
            <div class="day-title">Hari ${day.day}</div>
            ${day.destinations.length > 0 
              ? day.destinations.map(dest => `
                <div class="destination">
                  <strong>${dest.name}</strong><br>
                  <small>${dest.location} • ${formatTravelTime(dest.recommendedDuration)} kunjungan</small>
                </div>
              `).join('')
              : '<div class="destination"><em>Belum ada destinasi</em></div>'
            }
            ${day.accommodation && day.day < tripPlan.duration ? `
              <div class="accommodation">
                🏨 <strong>${day.accommodation.name}</strong><br>
                <small>${day.accommodation.location} • ${formatPrice(day.accommodation.price)}/malam</small>
              </div>
            ` : ''}
          </div>
        `).join('')}
        
        <div class="total">
          Estimasi Total: ${formatPrice(totalBudget)}
        </div>
        
        <div class="footer">
          Dibuat dengan Visit Sulsel • ${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  // Success Screen
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-200">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 text-center mb-2"
            >
              Rencana Perjalanan Tersimpan!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-center"
            >
              Perjalananmu ke Sulawesi Selatan sudah siap
            </motion.p>
          </motion.div>

          {/* Trip Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
          >
            <p className="text-sm text-gray-500 text-center mb-2">Kode Rencana Perjalanan</p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl font-mono font-bold text-blue-600 tracking-wider">{tripCode}</code>
              <button
                onClick={copyTripCode}
                className={`p-2 rounded-lg transition-all ${
                  copied ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Simpan kode ini untuk mengakses rencana perjalananmu</p>
            <div className="flex items-center justify-center gap-1 mt-3 text-xs text-green-600">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Tersimpan di perangkat ini</span>
            </div>
          </motion.div>

          {/* Trip Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 mb-6 text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="font-bold text-lg">Trip ke Sulawesi Selatan</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-white/70 text-sm">Dari</p>
                <p className="font-semibold">{tripPlan.origin?.name}</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Durasi</p>
                <p className="font-semibold">
                  {tripPlan.duration} Hari {tripPlan.duration - 1} Malam
                </p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Wisatawan</p>
                <p className="font-semibold">{tripPlan.travelers} Orang</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">Tanggal</p>
                <p className="font-semibold">
                  {tripPlan.startDate
                    ? new Date(tripPlan.startDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
            </div>
            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Total Estimasi Budget</span>
                <span className="text-2xl font-bold">{formatPrice(totalBudget)}</span>
              </div>
              <p className="text-white/60 text-xs mt-1">*Belum termasuk makan & oleh-oleh (lihat di Mode di Lokasi)</p>
            </div>
          </motion.div>

          {/* Day by Day Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-3 mb-6"
          >
            {tripPlan.days.map((day, index) => (
              <div key={day.day} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {day.day}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hari {day.day}</p>
                    <p className="text-xs text-gray-500">
                      {day.destinations.length} destinasi
                      {day.accommodation && ` • ${day.accommodation.name}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.destinations.map((d) => (
                    <span key={d.id} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                      {d.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Share Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6"
          >
            <p className="font-semibold text-gray-900 mb-3">Bagikan Rencana</p>
            <div className="grid grid-cols-4 gap-3">
              <button 
                onClick={shareViaWhatsApp}
                className="flex flex-col items-center gap-1 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-green-600" />
                <span className="text-xs text-green-700">WhatsApp</span>
              </button>
              <button 
                onClick={shareGeneral}
                className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Share2 className="w-6 h-6 text-blue-600" />
                <span className="text-xs text-blue-700">Share</span>
              </button>
              <button 
                onClick={downloadPDF}
                className="flex flex-col items-center gap-1 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <Download className="w-6 h-6 text-purple-600" />
                <span className="text-xs text-purple-700">PDF</span>
              </button>
              <button 
                onClick={printTrip}
                className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Printer className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-700">Print</span>
              </button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <Link
              href="/"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Link>
            <button
              onClick={resetTrip}
              className="w-full py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Buat Rencana Baru
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Rencanakan Perjalanan</h1>
                <p className="text-xs text-gray-500">
                  {currentStep === 0 ? "Pilih cara memulai" : `Step ${currentStep} dari ${tripPlan.duration === 1 ? 4 : 5}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Estimasi Budget</p>
              <p className="text-sm font-bold text-blue-600">{formatPrice(totalBudget)}</p>
            </div>
          </div>

          {/* Progress Bar - Only show when past step 0 */}
          {currentStep > 0 && (
            <div className="pb-3">
              <div className="flex gap-1">
                {steps
                  .filter(step => step.id !== 0) // Don't show step 0 in progress
                  .filter(step => !(tripPlan.duration === 1 && step.id === 4)) // Skip step 4 for day trips
                  .map((step) => (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{
                        backgroundColor: step.id <= currentStep ? "#3b82f6" : "#e5e7eb",
                      }}
                      className="flex-1 h-1.5 rounded-full"
                    />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Mode Button */}
      <AnimatePresence>
        {showDemoButton && currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 pt-4"
          >
            <button
              onClick={loadDemoScenario}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
            >
              <Zap className="w-5 h-5" />
              Mode Demo - Lihat Skenario Lengkap
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Destinations Banner */}
      <AnimatePresence>
        {showPendingBanner && pendingDestinations.length > 0 && currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="px-4 pt-4"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-600/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold">Destinasi Tertunda</p>
                    <p className="text-sm text-blue-100">Pilih hari untuk menambahkan</p>
                  </div>
                </div>
                <button
                  onClick={dismissAllPending}
                  className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {pendingDestinations.map((pending) => (
                  <div key={pending.id} className="bg-white/10 backdrop-blur rounded-xl p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={pending.image}
                          alt={pending.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{pending.name}</p>
                        <p className="text-xs text-blue-200 truncate">{pending.location}</p>
                      </div>
                      <button
                        onClick={() => dismissPending(pending.id)}
                        className="p-1 hover:bg-white/20 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Day Selection Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {tripPlan.days.map((day, dayIndex) => {
                        const isAtLimit = day.destinations.length >= MAX_DESTINATIONS_PER_DAY;
                        const alreadyAdded = day.destinations.some(d => d.id === pending.id);
                        const disabled = isAtLimit || alreadyAdded;
                        
                        return (
                          <button
                            key={day.day}
                            onClick={() => !disabled && addPendingToDay(pending, dayIndex)}
                            disabled={disabled}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                              disabled
                                ? "bg-white/10 text-white/40 cursor-not-allowed"
                                : "bg-white text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {alreadyAdded ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3 h-3" /> Hari {day.day}
                              </span>
                            ) : (
                              `+ Hari ${day.day}`
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Content */}
      <div className="max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {/* Step 0: Template Selection */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Mulai Rencanakan Trip</h2>
                <p className="text-gray-500 text-sm">Pilih template siap pakai atau buat sendiri dari awal</p>
              </div>

              {/* Start from Scratch Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartFromScratch}
                className="mb-6 p-5 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Buat dari Awal</h3>
                    <p className="text-sm text-gray-600">Susun itinerary sesuai preferensimu sendiri</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                </div>
              </motion.div>

              {/* Template Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-amber-100 rounded-lg">
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-gray-900">Template Populer</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">Itinerary siap pakai yang sudah dioptimasi untuk pengalaman terbaik</p>
              </div>

              {/* Featured Templates */}
              <div className="space-y-3 mb-6">
                {itinerariesData.itineraries.filter(i => i.featured).map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectTemplate(template)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md transition-all"
                  >
                    <div className="flex">
                      <div className="relative w-28 h-32 flex-shrink-0">
                        <Image src={template.image} alt={template.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{template.name}</h4>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full flex-shrink-0 ml-2">
                            {template.duration}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{template.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            {formatPrice(template.price)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {template.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Route className="w-3 h-3" />
                            {template.difficulty}
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

              {/* All Templates */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-3">Semua Template</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {itinerariesData.itineraries.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectTemplate(template)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group"
                  >
                    <div className="relative h-28">
                      <Image src={template.image} alt={template.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-white font-bold text-sm line-clamp-1">{template.name}</h4>
                        <p className="text-white/80 text-xs">{template.duration}</p>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <p className="text-blue-600 font-bold text-sm">{formatPrice(template.price)}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600">{template.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 1: Origin */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Dari mana kamu berangkat?</h2>
                <p className="text-gray-500 text-sm">Pilih kota asalmu untuk melihat estimasi penerbangan ke Makassar</p>
              </div>

              <div className="space-y-3">
                {originsData.origins.slice(0, 6).map((origin, index) => (
                  <motion.div
                    key={origin.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTripPlan((prev) => ({ ...prev, origin }))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      tripPlan.origin?.id === origin.id
                        ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{origin.name}</h3>
                        <p className="text-sm text-gray-500">{origin.province}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Plane className="w-4 h-4" />
                          <span>{origin.flightDuration}</span>
                        </div>
                        <p className="text-sm font-semibold text-blue-600">
                          {formatPrice(origin.flightPriceMin)} - {formatPrice(origin.flightPriceMax)}
                        </p>
                      </div>
                    </div>
                    <AnimatePresence>
                      {tripPlan.origin?.id === origin.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-600">{origin.tips}</p>
                                <p className="text-xs text-gray-500 mt-1">Maskapai: {origin.airlines.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Duration & Date */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Kapan dan berapa lama?</h2>
                <p className="text-gray-500 text-sm">Pilih durasi perjalananmu</p>
              </div>

              {/* Duration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
              >
                <h3 className="font-semibold text-gray-900 mb-3">Durasi Perjalanan</h3>
                <div className="grid grid-cols-3 gap-2">
                  {durationOptions.map((opt) => (
                    <motion.button
                      key={opt.days}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => initializeDays(opt.days)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        tripPlan.duration === opt.days && tripPlan.days.length > 0
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <p className="font-bold">{opt.label}</p>
                      <p
                        className={`text-xs ${tripPlan.duration === opt.days && tripPlan.days.length > 0 ? "text-blue-100" : "text-gray-500"}`}
                      >
                        {opt.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Travelers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
              >
                <h3 className="font-semibold text-gray-900 mb-3">Jumlah Wisatawan</h3>
                <div className="flex items-center justify-center gap-6">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTripPlan((prev) => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <div className="text-center">
                    <motion.span
                      key={tripPlan.travelers}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-bold text-blue-600 block"
                    >
                      {tripPlan.travelers}
                    </motion.span>
                    <p className="text-sm text-gray-500">orang</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTripPlan((prev) => ({ ...prev, travelers: Math.min(10, prev.travelers + 1) }))}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-3">Tanggal Keberangkatan</h3>
                <input
                  type="date"
                  value={tripPlan.startDate}
                  onChange={(e) => setTripPlan((prev) => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Destinations */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Pilih Destinasi</h2>
                <p className="text-gray-500 text-sm">Tambahkan destinasi ke setiap hari perjalananmu</p>
              </div>

              {/* Zone Legend */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 mb-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-900">Panduan Zona & Jarak</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {destinationsData.zones.map((zone) => {
                    const IconComponent = zoneIcons[zone.icon] || MapPin;
                    return (
                      <div key={zone.id} className="flex items-center gap-1.5">
                        <div 
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: zone.color + "20" }}
                        >
                          <IconComponent className="w-2.5 h-2.5" style={{ color: zone.color }} />
                        </div>
                        <span className="text-gray-700">{zone.name}</span>
                        <span className="text-gray-400">({zone.travelTimeRange})</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Days */}
              <div className="space-y-4">
                {tripPlan.days.map((day, dayIndex) => {
                  const isAtLimit = day.destinations.length >= MAX_DESTINATIONS_PER_DAY;
                  const { totalTime, warning } = calculateDayTravelTime(day.destinations);
                  const destinationsByZone = getDestinationsByZone();
                  
                  return (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.1 }}
                      className={`bg-white rounded-2xl overflow-hidden shadow-sm border ${
                        warning?.includes("TIDAK MUNGKIN") || warning?.includes("tidak realistis")
                          ? "border-red-300"
                          : "border-gray-100"
                      }`}
                    >
                      <button
                        onClick={() => setExpandedDay(expandedDay === day.day ? -1 : day.day)}
                        className="w-full flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                            warning?.includes("TIDAK MUNGKIN") || warning?.includes("tidak realistis")
                              ? "bg-gradient-to-br from-red-500 to-red-600 shadow-red-200"
                              : "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-200"
                          }`}>
                            {day.day}
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">Hari {day.day}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {day.destinations.length} destinasi
                              </span>
                              {day.destinations.length > 0 && (
                                <span className={`text-xs flex items-center gap-1 ${
                                  totalTime > 600 ? "text-amber-600" : "text-green-600"
                                }`}>
                                  <Clock className="w-3 h-3" />
                                  ~{formatTravelTime(totalTime)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {warning && (
                            <AlertTriangle className={`w-5 h-5 ${
                              warning.includes("TIDAK MUNGKIN") || warning.includes("tidak realistis")
                                ? "text-red-500"
                                : "text-amber-500"
                            }`} />
                          )}
                          <motion.div animate={{ rotate: (expandedDay === null || expandedDay === day.day) ? 180 : 0 }}>
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {(expandedDay === null || expandedDay === day.day) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4">
                              {/* Warning if combination is not realistic */}
                              {warning && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`rounded-lg p-3 mb-3 flex items-start gap-2 ${
                                    warning.includes("TIDAK MUNGKIN") || warning.includes("tidak realistis")
                                      ? "bg-red-50 border border-red-200"
                                      : "bg-amber-50 border border-amber-100"
                                  }`}
                                >
                                  <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                    warning.includes("TIDAK MUNGKIN") || warning.includes("tidak realistis")
                                      ? "text-red-500"
                                      : "text-amber-500"
                                  }`} />
                                  <p className={`text-xs ${
                                    warning.includes("TIDAK MUNGKIN") || warning.includes("tidak realistis")
                                      ? "text-red-700"
                                      : "text-amber-700"
                                  }`}>
                                    {warning}
                                  </p>
                                </motion.div>
                              )}

                              {/* Limit warning */}
                              {isAtLimit && !warning && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-green-50 border border-green-100 rounded-lg p-2 mb-3 flex items-center gap-2"
                                >
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                  <p className="text-xs text-green-700">
                                    Hari {day.day} sudah lengkap dengan {MAX_DESTINATIONS_PER_DAY} destinasi!
                                  </p>
                                </motion.div>
                              )}

                              {/* Selected Destinations with Timeline */}
                              {day.destinations.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-sm font-medium text-gray-700 mb-2">Rute perjalanan:</p>
                                  <div className="space-y-2">
                                    {/* Starting point */}
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                                        <Plane className="w-3 h-3 text-gray-500" />
                                      </div>
                                      <span>Dari Makassar</span>
                                      <span className="flex items-center gap-0.5 text-blue-600">
                                        <Car className="w-3 h-3" />
                                        {formatTravelTime(day.destinations[0].travelTimeFromMakassar)}
                                      </span>
                                    </div>
                                    
                                    {day.destinations.map((dest, destIndex) => {
                                      const zone = destinationsData.zones.find(z => z.id === dest.zone);
                                      const nextDest = day.destinations[destIndex + 1];
                                      const travelToNext = nextDest 
                                        ? destinationsData.travelMatrix[dest.zone as keyof typeof destinationsData.travelMatrix]?.[nextDest.zone as keyof typeof destinationsData.travelMatrix] || 30
                                        : 0;
                                      
                                      return (
                                        <div key={dest.id}>
                                          <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="flex items-center gap-2 p-2 rounded-lg"
                                            style={{ backgroundColor: (zone?.color || "#3B82F6") + "15" }}
                                          >
                                            <div 
                                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                              style={{ backgroundColor: zone?.color || "#3B82F6" }}
                                            >
                                              {destIndex + 1}
                                            </div>
                                            <div className="flex-1">
                                              <p className="font-medium text-gray-900 text-sm">{dest.name}</p>
                                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                ~{formatTravelTime(dest.recommendedDuration)} di lokasi
                                              </p>
                                            </div>
                                            <button
                                              onClick={() => removeDestinationFromDay(dayIndex, dest.id)}
                                              className="p-1 hover:bg-white/50 rounded-full"
                                            >
                                              <X className="w-4 h-4 text-gray-400" />
                                            </button>
                                          </motion.div>
                                          
                                          {/* Travel time to next destination */}
                                          {nextDest && (
                                            <div className="flex items-center gap-2 text-xs text-gray-400 ml-3 my-1">
                                              <div className="w-0.5 h-3 bg-gray-200"></div>
                                              <Car className="w-3 h-3" />
                                              <span>{formatTravelTime(travelToNext)} ke destinasi berikutnya</span>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                    
                                    {/* Return to Makassar */}
                                    {day.destinations.length > 0 && (
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <div className="w-0.5 h-3 bg-gray-200 ml-2.5"></div>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                                        <Hotel className="w-3 h-3 text-gray-500" />
                                      </div>
                                      <span>Kembali ke hotel</span>
                                      <span className="flex items-center gap-0.5 text-blue-600">
                                        <Car className="w-3 h-3" />
                                        {formatTravelTime(
                                          destinationsData.travelMatrix[day.destinations[day.destinations.length - 1].zone as keyof typeof destinationsData.travelMatrix]?.["makassar-kota"] || 30
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Available Destinations - Grouped by Zone */}
                              <p className="text-sm font-medium text-gray-700 mb-3">Pilih destinasi berdasarkan zona:</p>
                              
                              {destinationsData.zones.map((zone) => {
                                const zoneDestinations = destinationsByZone[zone.id] || [];
                                if (zoneDestinations.length === 0) return null;
                                
                                const IconComponent = zoneIcons[zone.icon] || MapPin;
                                const isFarZone = zone.id === "utara-jauh" || zone.id === "selatan-jauh";
                                
                                // Check if this zone conflicts with already selected destinations
                                const selectedZones = new Set(day.destinations.map(d => d.zone));
                                const hasConflict = isFarZone && day.destinations.length > 0 && !selectedZones.has(zone.id);
                                const otherFarZoneSelected = (zone.id === "utara-jauh" && selectedZones.has("selatan-jauh")) ||
                                                            (zone.id === "selatan-jauh" && selectedZones.has("utara-jauh"));
                                
                                return (
                                  <div key={zone.id} className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div 
                                        className="w-6 h-6 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: zone.color + "20" }}
                                      >
                                        <IconComponent className="w-3.5 h-3.5" style={{ color: zone.color }} />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium" style={{ color: zone.color }}>{zone.name}</p>
                                        <p className="text-xs text-gray-400">{zone.travelTimeRange}</p>
                                      </div>
                                      {isFarZone && (
                                        <span className="ml-auto text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">
                                          Perlu 1 hari penuh
                                        </span>
                                      )}
                                    </div>
                                    
                                    {(hasConflict || otherFarZoneSelected) && (
                                      <div className="text-xs text-red-600 mb-2 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {otherFarZoneSelected 
                                          ? "Tidak bisa dikombinasikan dengan zona jauh lainnya"
                                          : "Zona ini terlalu jauh untuk dikombinasikan"}
                                      </div>
                                    )}
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                      {zoneDestinations.map((dest) => {
                                        const isSelected = day.destinations.some((d) => d.id === dest.id);
                                        // Check if selected on another day
                                        const { selected: isSelectedOnOtherDay, dayNumber: selectedDayNumber } = isDestinationSelectedOnAnyDay(dest.id);
                                        const isSelectedElsewhere = isSelectedOnOtherDay && !isSelected;
                                        const isDisabled = (!isSelected && isAtLimit) || (hasConflict && !isSelected) || (otherFarZoneSelected && !isSelected) || isSelectedElsewhere;
                                        
                                        return (
                                          <motion.button
                                            key={dest.id}
                                            whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                            onClick={() => {
                                              if (isDisabled) return;
                                              if (isSelected) {
                                                removeDestinationFromDay(dayIndex, dest.id);
                                              } else {
                                                addDestinationToDay(dayIndex, dest);
                                              }
                                            }}
                                            disabled={isDisabled}
                                            className={`relative rounded-xl overflow-hidden transition-all ${
                                              isSelected ? "ring-2" : ""
                                            } ${isDisabled ? "opacity-40 cursor-not-allowed grayscale" : ""} ${isSelectedElsewhere ? "ring-1 ring-orange-400" : ""}`}
                                            style={{ 
                                              ringColor: isSelected ? zone.color : undefined 
                                            }}
                                          >
                                            <div className="relative h-24">
                                              <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                              {isSelected && (
                                                <motion.div
                                                  initial={{ scale: 0 }}
                                                  animate={{ scale: 1 }}
                                                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                                  style={{ backgroundColor: zone.color }}
                                                >
                                                  <Check className="w-4 h-4 text-white" />
                                                </motion.div>
                                              )}
                                              {isSelectedElsewhere && (
                                                <motion.div
                                                  initial={{ scale: 0 }}
                                                  animate={{ scale: 1 }}
                                                  className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500 text-white text-xs font-medium rounded-full"
                                                >
                                                  Hari {selectedDayNumber}
                                                </motion.div>
                                              )}
                                              <div className="absolute bottom-2 left-2 right-2">
                                                <p className="text-white font-semibold text-sm line-clamp-1">{dest.name}</p>
                                                <div className="flex items-center gap-1 text-white/80 text-xs">
                                                  <Car className="w-3 h-3" />
                                                  <span>{formatTravelTime(dest.travelTimeFromMakassar)}</span>
                                                  <span className="mx-1">•</span>
                                                  <Clock className="w-3 h-3" />
                                                  <span>{formatTravelTime(dest.recommendedDuration)}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </motion.button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 4: Accommodations */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Pilih Penginapan</h2>
                <p className="text-gray-500 text-sm">Akomodasi yang direkomendasikan berdasarkan destinasi pilihanmu</p>
              </div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-4 flex items-start gap-2"
              >
                <Info className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-purple-800 font-medium">Penginapan disesuaikan dengan destinasi</p>
                  <p className="text-xs text-purple-600">
                    Kami merekomendasikan hotel terdekat dari destinasi yang kamu pilih di setiap hari
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4">
                {tripPlan.days.slice(0, -1).map((day, dayIndex) => {
                  // Get next day's destinations for smarter accommodation recommendation
                  const nextDay = tripPlan.days[dayIndex + 1];
                  const nextDayDestinations = nextDay?.destinations || [];
                  const recommendedAccommodations = getRecommendedAccommodations(day.destinations, nextDayDestinations);
                  const hasDestinations = day.destinations.length > 0;
                  
                  return (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.1 }}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-200">
                            {day.day}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Malam ke-{day.day}</p>
                            <p className="text-xs text-gray-400">
                              Setelah mengunjungi {day.destinations.length > 0 
                                ? day.destinations.map(d => d.name).join(", ") 
                                : "destinasi"}
                            </p>
                          </div>
                        </div>
                        {day.accommodation && (
                          <p className="text-sm font-bold text-blue-600">{formatPrice(day.accommodation.price)}/malam</p>
                        )}
                      </div>

                      {/* Show destinations for context */}
                      {hasDestinations && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {day.destinations.map((dest) => {
                            const zone = destinationsData.zones.find(z => z.id === dest.zone);
                            return (
                              <span 
                                key={dest.id} 
                                className="px-2 py-0.5 text-xs rounded-full"
                                style={{ 
                                  backgroundColor: (zone?.color || "#3B82F6") + "15",
                                  color: zone?.color || "#3B82F6"
                                }}
                              >
                                {dest.name}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* No destinations warning */}
                      {!hasDestinations && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <p className="text-xs text-amber-700">
                            Belum ada destinasi di hari {day.day}. Menampilkan hotel di Makassar.
                          </p>
                        </div>
                      )}

                      {/* Selected Accommodation */}
                      <AnimatePresence>
                        {day.accommodation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-3 bg-purple-50 rounded-xl p-3 mb-3"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={day.accommodation.image}
                                alt={day.accommodation.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm">{day.accommodation.name}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span>{day.accommodation.rating}</span>
                                <span className="text-gray-300">•</span>
                                <MapPin className="w-3 h-3" />
                                <span>{day.accommodation.location}</span>
                              </div>
                              <p className="text-xs text-purple-600 mt-0.5">
                                {getAccommodationZoneInfo(day.accommodation, day.destinations)}
                              </p>
                            </div>
                            <button
                              onClick={() => setAccommodationForDay(dayIndex, null)}
                              className="p-1.5 hover:bg-purple-100 rounded-full"
                            >
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Recommended label */}
                      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                        <Hotel className="w-3 h-3" />
                        Rekomendasi penginapan terdekat ({recommendedAccommodations.length})
                      </p>

                      {/* Accommodation Options */}
                      <div className="space-y-2">
                        {recommendedAccommodations.map((acc) => {
                          const isSelected = day.accommodation?.id === acc.id;
                          const zoneInfo = getAccommodationZoneInfo(acc, day.destinations);
                          const isNearby = day.destinations.some(d => 
                            acc.nearbyZones?.includes(d.zone)
                          );
                          
                          return (
                            <motion.button
                              key={acc.id}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setAccommodationForDay(dayIndex, isSelected ? null : acc)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                isSelected 
                                  ? "border-purple-500 bg-purple-50" 
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                                <Image src={acc.image} alt={acc.name} fill className="object-cover" />
                                {isNearby && hasDestinations && (
                                  <div className="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-bl-lg flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate">{acc.name}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                  <span>{acc.rating}</span>
                                  <span className="text-gray-300">•</span>
                                  <span className="truncate">{acc.location}</span>
                                </div>
                                {isNearby && hasDestinations && (
                                  <p className="text-xs text-green-600 mt-0.5 truncate">{zoneInfo}</p>
                                )}
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm font-bold text-blue-600">{formatPrice(acc.price)}</p>
                                <p className="text-xs text-gray-400">/malam</p>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 5: Summary */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ringkasan Perjalanan</h2>
                <p className="text-gray-500 text-sm">Review rencana perjalananmu ke Sulawesi Selatan</p>
              </div>

              {/* Trip Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 mb-4 text-white"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">Trip ke Sulawesi Selatan</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/70">Dari</p>
                    <p className="font-semibold">{tripPlan.origin?.name || "-"}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Durasi</p>
                    <p className="font-semibold">{tripPlan.duration} Hari</p>
                  </div>
                  <div>
                    <p className="text-white/70">Wisatawan</p>
                    <p className="font-semibold">{tripPlan.travelers} Orang</p>
                  </div>
                  <div>
                    <p className="text-white/70">Tanggal</p>
                    <p className="font-semibold">
                      {tripPlan.startDate
                        ? new Date(tripPlan.startDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Belum dipilih"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Day by Day */}
              <div className="space-y-3 mb-4">
                {tripPlan.days.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {day.day}
                      </div>
                      <p className="font-semibold text-gray-900">Hari {day.day}</p>
                    </div>

                    {/* Destinations */}
                    {day.destinations.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-1">Destinasi:</p>
                        <div className="flex flex-wrap gap-1">
                          {day.destinations.map((d) => (
                            <span key={d.id} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                              {d.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accommodation */}
                    {index < tripPlan.days.length - 1 && day.accommodation && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Menginap:</p>
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">
                          {day.accommodation.name}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Budget Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <p className="font-semibold text-gray-900 mb-3">Estimasi Budget</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Penerbangan (PP x {tripPlan.travelers} orang)</span>
                    <span className="font-medium">
                      {tripPlan.origin
                        ? formatPrice(
                            ((tripPlan.origin.flightPriceMin + tripPlan.origin.flightPriceMax) / 2) *
                              tripPlan.travelers *
                              2
                          )
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Akomodasi ({tripPlan.days.length - 1} malam)</span>
                    <span className="font-medium">
                      {formatPrice(tripPlan.days.reduce((sum, d) => sum + (d.accommodation?.price || 0), 0))}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total Estimasi</span>
                    <span className="font-bold text-blue-600 text-lg">{formatPrice(totalBudget)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    *Biaya makan & oleh-oleh dapat dilihat di &quot;Mode di Lokasi&quot; saat kamu tiba di Sulawesi
                    Selatan
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation - Hide at step 0 */}
      {currentStep > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-[60] lg:bottom-0">
          <div className="max-w-7xl mx-auto flex gap-3">
            {currentStep > 1 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </motion.button>
            )}
            {currentStep === 1 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep(0)}
                className="py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            )}
            {currentStep < 5 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                disabled={!canProceed()}
                className={`flex-1 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors ${
                  canProceed() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Lanjut
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={saveTripPlan}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
              >
                <CheckCircle className="w-5 h-5" />
                Simpan Rencana
              </motion.button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
