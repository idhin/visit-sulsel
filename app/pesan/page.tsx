"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Ticket,
  Clock,
  CheckCircle,
  MapPin,
  Calendar,
  ChevronRight,
  Package,
  AlertCircle,
  History,
  Star,
  MoreHorizontal,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

const tabs = [
  { id: "aktif", label: "Aktif", count: 2 },
  { id: "selesai", label: "Selesai", count: 5 },
  { id: "dibatalkan", label: "Dibatalkan", count: 1 },
];

const activeOrders = [
  {
    id: "ORD001",
    type: "tiket",
    title: "Taman Nasional Bantimurung",
    image: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=400",
    date: "15 Jan 2026",
    time: "09:00",
    quantity: 2,
    total: 60000,
    status: "confirmed",
    statusText: "Dikonfirmasi",
  },
  {
    id: "ORD002",
    type: "hotel",
    title: "Aryaduta Makassar",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    date: "20-22 Jan 2026",
    time: "Check-in 14:00",
    quantity: 1,
    total: 3000000,
    status: "pending",
    statusText: "Menunggu Pembayaran",
  },
];

const completedOrders = [
  {
    id: "ORD003",
    type: "paket",
    title: "Toraja Explorer 3D2N",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
    date: "10-12 Des 2025",
    total: 2500000,
    status: "completed",
    rating: 5,
  },
  {
    id: "ORD004",
    type: "tiket",
    title: "Benteng Rotterdam",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400",
    date: "5 Des 2025",
    total: 20000,
    status: "completed",
    rating: 4,
  },
];

const quickActions = [
  { icon: Ticket, label: "Tiket", href: "/destinasi", color: "bg-blue-500" },
  { icon: Package, label: "Paket", href: "/rencanakan", color: "bg-green-500" },
  { icon: History, label: "Riwayat", href: "#riwayat", color: "bg-purple-500" },
];

export default function PesanPage() {
  const [activeTab, setActiveTab] = useState("aktif");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "pending": return "bg-amber-100 text-amber-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return CheckCircle;
      case "pending": return Clock;
      case "completed": return CheckCircle;
      case "cancelled": return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Pesanan Saya</h1>
                <p className="text-xs text-gray-500">Kelola semua pesananmu</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === tab.id ? "bg-white/20" : "bg-gray-300 text-gray-700"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Active Orders */}
        {activeTab === "aktif" && (
          <div className="space-y-3">
            {activeOrders.length > 0 ? (
              activeOrders.map((order, index) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                  >
                    {/* Order Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">{order.id}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.statusText}
                      </span>
                    </div>

                    {/* Order Content */}
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={order.image} alt={order.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{order.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{order.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-sm text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{order.time}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">{order.quantity}x</span>
                            <span className="font-bold text-blue-600">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="flex gap-2 px-4 pb-4">
                      {order.status === "pending" ? (
                        <>
                          <button className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl">
                            Bayar Sekarang
                          </button>
                          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl">
                            Batalkan
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="flex-1 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl">
                            Lihat E-Ticket
                          </button>
                          <button className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Arah
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <EmptyState 
                title="Belum ada pesanan aktif" 
                description="Pesan tiket, hotel, atau paket wisata untuk memulai"
              />
            )}
          </div>
        )}

        {/* Completed Orders */}
        {activeTab === "selesai" && (
          <div className="space-y-3" id="riwayat">
            {completedOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={order.image} alt={order.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{order.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{order.date}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < order.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 px-4 pb-4">
                  <button className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl">
                    Pesan Lagi
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-xl">
                    Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cancelled Orders */}
        {activeTab === "dibatalkan" && (
          <EmptyState 
            title="Tidak ada pesanan dibatalkan" 
            description="Pesanan yang dibatalkan akan muncul di sini"
          />
        )}
      </div>
    </main>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Ticket className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{description}</p>
      <Link 
        href="/destinasi"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl"
      >
        Jelajahi Destinasi
        <ChevronRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
