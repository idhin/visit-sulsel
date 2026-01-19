"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Clock,
  Check,
  Shield,
  Star,
  ChevronRight,
  CreditCard,
  CheckCircle,
  Building2,
  Globe,
  Minus,
  Plus,
} from "lucide-react";
import guideServicesData from "@/data/guideServices.json";
import { formatPrice } from "@/lib/utils";

type GuideService = (typeof guideServicesData.services)[0];
type Duration = (typeof guideServicesData.durations)[0];

// Steps for the booking flow
const steps = [
  { id: 1, title: "Pilih Area", icon: MapPin },
  { id: 2, title: "Tanggal & Detail", icon: Calendar },
  { id: 3, title: "Pembayaran", icon: CreditCard },
];

export default function PemanduBookingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<GuideService | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<Duration>(guideServicesData.durations[1]); // Full day default
  const [selectedDate, setSelectedDate] = useState("");
  const [groupSize, setGroupSize] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!selectedService) return 0;
    const priceKey = selectedDuration.multiplier as keyof GuideService;
    return selectedService[priceKey] as number;
  }, [selectedService, selectedDuration]);

  // Handle booking submission
  const handleBooking = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking ID
    const bookingId = `VSS-PW-${Date.now()}`;
    
    // Save booking to localStorage (in real app, this would be API call)
    const booking = {
      id: bookingId,
      service: selectedService,
      duration: selectedDuration,
      date: selectedDate,
      groupSize,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };
    
    localStorage.setItem(`booking_${bookingId}`, JSON.stringify(booking));
    
    // Redirect to confirmation page
    router.push(`/layanan/pemandu/konfirmasi/${bookingId}`);
  };

  // Check if can proceed to next step
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== "";
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Get minimum date (tomorrow)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

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
                <h1 className="text-lg font-bold text-gray-900">Jasa Pemandu Wisata</h1>
                <p className="text-xs text-gray-500">Layanan Resmi Pemerintah</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-full">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">Terverifikasi</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="pb-3">
            <div className="flex gap-1">
              {steps.map((step) => (
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
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-1 text-xs ${
                    step.id <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <step.icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {/* Step 1: Pilih Area */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              {/* Government Info */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 mb-6 text-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{guideServicesData.governmentInfo.title}</h3>
                    <p className="text-white/80 text-sm">{guideServicesData.governmentInfo.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {guideServicesData.governmentInfo.guarantees.map((g, i) => (
                    <span key={i} className="px-2 py-1 bg-white/20 rounded-full text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-2">Pilih Area Wisata</h2>
              <p className="text-gray-500 text-sm mb-4">Pemandu akan ditugaskan sesuai area yang Anda pilih</p>

              <div className="space-y-3">
                {guideServicesData.services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedService(service)}
                    className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 cursor-pointer transition-all ${
                      selectedService?.id === service.id
                        ? "border-blue-500 shadow-lg shadow-blue-100"
                        : "border-transparent hover:shadow-md"
                    }`}
                  >
                    <div className="flex">
                      <div className="relative w-24 h-28 flex-shrink-0">
                        <Image src={service.image} alt={service.area} fill className="object-cover" />
                        {selectedService?.id === service.id && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-gray-900">{service.area}</h3>
                          <ChevronRight className={`w-5 h-5 transition-colors ${
                            selectedService?.id === service.id ? "text-blue-500" : "text-gray-300"
                          }`} />
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-2">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Globe className="w-3 h-3" />
                            <span>{service.languages.join(", ")}</span>
                          </div>
                          <p className="text-blue-600 font-bold text-sm">
                            {formatPrice(service.pricePerDay)}<span className="text-gray-400 font-normal">/hari</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Tanggal & Detail */}
          {currentStep === 2 && selectedService && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              {/* Selected Service Summary */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={selectedService.image} alt={selectedService.area} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Area terpilih</p>
                    <h3 className="font-bold text-gray-900">{selectedService.area}</h3>
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <MapPin className="w-3 h-3" />
                      <span>{selectedService.meetingPoint}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Tanggal Wisata
                </h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={minDateStr}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Duration Selection */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Durasi
                </h3>
                <div className="flex gap-2">
                  {guideServicesData.durations.map((duration) => (
                    <button
                      key={duration.id}
                      onClick={() => setSelectedDuration(duration)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        selectedDuration.id === duration.id
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {duration.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Jumlah Orang
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-blue-600">{groupSize}</span>
                    <p className="text-gray-500 text-sm">orang</p>
                  </div>
                  <button
                    onClick={() => setGroupSize(Math.min(selectedService.maxGroupSize, groupSize + 1))}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Maksimal {selectedService.maxGroupSize} orang per pemandu
                </p>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Termasuk dalam layanan:</h3>
                <div className="space-y-2">
                  {selectedService.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pembayaran */}
          {currentStep === 3 && selectedService && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Pembayaran</h2>
              <p className="text-gray-500 text-sm mb-6">Periksa detail pesanan Anda sebelum melanjutkan</p>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
                <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={selectedService.image} alt={selectedService.area} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Pemandu {selectedService.area}</h4>
                    <p className="text-sm text-gray-500">{selectedDuration.label}</p>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tanggal</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(selectedDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Jumlah Orang</span>
                    <span className="text-gray-900 font-medium">{groupSize} orang</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Meeting Point</span>
                    <span className="text-gray-900 font-medium text-right max-w-[200px]">{selectedService.meetingPoint}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">Total Pembayaran</span>
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Harga standar Dinas Pariwisata Sul-Sel</p>
                </div>
              </div>

              {/* Government Badge */}
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Pembayaran Aman</h4>
                    <p className="text-blue-700 text-sm">
                      Pembayaran Anda diproses melalui sistem resmi pemerintah. 
                      Pemandu akan ditugaskan dan informasinya akan dikirimkan setelah pembayaran berhasil.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-[60] lg:bottom-0">
        <div className="max-w-7xl mx-auto">
          {/* Price Display */}
          {selectedService && currentStep > 1 && (
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="text-xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
            </div>
          )}
          
          <div className="flex gap-3">
            {currentStep > 1 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali
              </motion.button>
            )}
            
            {currentStep < 3 ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className={`flex-1 py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors ${
                  canProceed()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Lanjut
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBooking}
                disabled={isProcessing}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Bayar Sekarang
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
