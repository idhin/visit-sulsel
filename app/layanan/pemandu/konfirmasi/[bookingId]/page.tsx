"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  Clock,
  Phone,
  MessageCircle,
  Copy,
  Share2,
  Home,
  Download,
  Star,
  Shield,
  Globe,
} from "lucide-react";
import guidesData from "@/data/guides.json";
import { formatPrice } from "@/lib/utils";

type Guide = (typeof guidesData.guides)[0];

type BookingData = {
  id: string;
  service: {
    id: string;
    area: string;
    image: string;
    meetingPoint: string;
  };
  duration: {
    id: string;
    label: string;
  };
  date: string;
  groupSize: number;
  totalPrice: number;
  createdAt: string;
  status: string;
};

export default function KonfirmasiPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [assignedGuide, setAssignedGuide] = useState<Guide | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load booking from localStorage
    const savedBooking = localStorage.getItem(`booking_${bookingId}`);
    
    if (savedBooking) {
      const parsedBooking = JSON.parse(savedBooking) as BookingData;
      setBooking(parsedBooking);
      
      // "Assign" a guide based on the area (in real app, this would be backend logic)
      const areaGuide = guidesData.guides.find(g => 
        g.location.toLowerCase().includes(parsedBooking.service.area.toLowerCase().split(" ")[0]) ||
        parsedBooking.service.area.toLowerCase().includes(g.location.toLowerCase().split(" ")[0])
      );
      
      // If no exact match, pick first available guide
      setAssignedGuide(areaGuide || guidesData.guides.find(g => g.available) || guidesData.guides[0]);
    }
    
    setIsLoading(false);
  }, [bookingId]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Booking Pemandu Wisata",
        text: `Saya sudah booking pemandu wisata di ${booking?.service.area}! Kode: ${bookingId}`,
        url: window.location.href,
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat data booking...</p>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">😕</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Booking Tidak Ditemukan</h1>
          <p className="text-gray-500 mb-6">Kode booking tidak valid atau sudah kadaluarsa</p>
          <Link
            href="/layanan/pemandu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl"
          >
            <Home className="w-5 h-5" />
            Booking Baru
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold mb-2"
          >
            Booking Berhasil!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80"
          >
            Pemandu wisata telah ditugaskan untuk Anda
          </motion.p>
        </div>
      </div>

      {/* Booking Code */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
        >
          <p className="text-gray-500 text-sm text-center mb-2">Kode Booking</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl font-mono font-bold text-gray-900">{bookingId}</span>
            <button
              onClick={handleCopyCode}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Assigned Guide */}
      {assignedGuide && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Pemandu Anda</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image src={assignedGuide.photo} alt={assignedGuide.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{assignedGuide.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">{assignedGuide.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{assignedGuide.reviews} ulasan</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                    <Globe className="w-4 h-4" />
                    <span>{assignedGuide.languages.join(", ")}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-4">{assignedGuide.bio}</p>
              
              {/* Contact Buttons */}
              <div className="flex gap-3 mt-4">
                <a
                  href={`tel:+6281234567890`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl"
                >
                  <Phone className="w-5 h-5" />
                  Telepon
                </a>
                <a
                  href={`https://wa.me/6281234567890?text=Halo, saya sudah booking pemandu wisata dengan kode ${bookingId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-semibold rounded-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Booking Details */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Detail Booking</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Area Wisata</p>
                <p className="font-medium text-gray-900">{booking.service.area}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="font-medium text-gray-900">
                  {new Date(booking.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Durasi</p>
                <p className="font-medium text-gray-900">{booking.duration.label}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Jumlah Orang</p>
                <p className="font-medium text-gray-900">{booking.groupSize} orang</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Meeting Point</p>
                <p className="font-medium text-gray-900">{booking.service.meetingPoint}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Total Pembayaran</span>
              <span className="text-xl font-bold text-blue-600">{formatPrice(booking.totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Sudah dibayar</p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Bagikan
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
            <Download className="w-5 h-5" />
            Unduh PDF
          </button>
        </div>
      </div>

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200"
        >
          <Home className="w-5 h-5" />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
