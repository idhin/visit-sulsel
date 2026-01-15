"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Ticket,
  Hotel,
  ShoppingBag,
  Users,
  Camera,
  UtensilsCrossed,
  Calendar,
  Map,
  Heart,
  MessageCircle,
  Compass,
  Gift,
  Headphones,
  CreditCard,
  Shield,
} from "lucide-react";

const services = [
  {
    category: "Utama",
    items: [
      { icon: Ticket, label: "Tiket Wisata", href: "/destinasi", color: "from-blue-500 to-blue-600", desc: "Pesan tiket destinasi" },
      { icon: Hotel, label: "Hotel & Penginapan", href: "/akomodasi", color: "from-orange-500 to-orange-600", desc: "Booking akomodasi" },
      { icon: ShoppingBag, label: "Belanja UMKM", href: "/belanja", color: "from-pink-500 to-pink-600", desc: "Produk lokal Sulsel" },
      { icon: Users, label: "Tour Guide", href: "/guide", color: "from-green-500 to-green-600", desc: "Pemandu wisata resmi" },
    ],
  },
  {
    category: "Jelajahi",
    items: [
      { icon: Camera, label: "Creator Hub", href: "/kreator", color: "from-purple-500 to-purple-600", desc: "Fotografer & videografer" },
      { icon: UtensilsCrossed, label: "Kuliner", href: "/kuliner", color: "from-red-500 to-red-600", desc: "Makanan khas Sulsel" },
      { icon: Calendar, label: "Event & Festival", href: "/event", color: "from-indigo-500 to-indigo-600", desc: "Acara mendatang" },
      { icon: Map, label: "Peta Interaktif", href: "/peta", color: "from-teal-500 to-teal-600", desc: "Eksplorasi lokasi" },
    ],
  },
  {
    category: "Lainnya",
    items: [
      { icon: Compass, label: "Itinerary", href: "/itinerary", color: "from-cyan-500 to-cyan-600", desc: "Rencana perjalanan" },
      { icon: Heart, label: "Wishlist", href: "/wishlist", color: "from-rose-500 to-rose-600", desc: "Destinasi favorit" },
      { icon: Gift, label: "Promo", href: "/promo", color: "from-amber-500 to-amber-600", desc: "Penawaran spesial" },
      { icon: MessageCircle, label: "Komunitas", href: "/komunitas", color: "from-emerald-500 to-emerald-600", desc: "Forum diskusi" },
    ],
  },
  {
    category: "Bantuan",
    items: [
      { icon: Headphones, label: "Pusat Bantuan", href: "/bantuan", color: "from-slate-500 to-slate-600", desc: "FAQ & support" },
      { icon: CreditCard, label: "Pembayaran", href: "/pembayaran", color: "from-violet-500 to-violet-600", desc: "Metode pembayaran" },
      { icon: Shield, label: "Keamanan", href: "/keamanan", color: "from-gray-500 to-gray-600", desc: "Privasi & keamanan" },
    ],
  },
];

export default function LayananPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 py-4">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Semua Layanan</h1>
              <p className="text-xs text-gray-500">Akses semua fitur Visit Sulsel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {services.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <h2 className="text-sm font-semibold text-gray-500 mb-3">{section.category}</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              {section.items.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                    index !== section.items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-300 rotate-180" />
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
