"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Heart,
  MapPin,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Globe,
  Moon,
  Star,
  Gift,
  Ticket,
  Camera,
  Edit3,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";

type MenuItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
  badge?: string;
  value?: string;
  toggle?: boolean;
};

type MenuSection = {
  category: string;
  items: MenuItem[];
};

const menuItems: MenuSection[] = [
  {
    category: "Akun Saya",
    items: [
      { icon: User, label: "Edit Profil", href: "#", color: "bg-blue-500" },
      { icon: Shield, label: "Keamanan Akun", href: "#", color: "bg-green-500" },
      { icon: Bell, label: "Notifikasi", href: "#", badge: "3", color: "bg-red-500" },
      { icon: CreditCard, label: "Metode Pembayaran", href: "#", color: "bg-purple-500" },
    ],
  },
  {
    category: "Aktivitas",
    items: [
      { icon: Ticket, label: "Pesanan Saya", href: "/pesan", color: "bg-orange-500" },
      { icon: Heart, label: "Wishlist", href: "/wishlist", color: "bg-pink-500" },
      { icon: MapPin, label: "Riwayat Kunjungan", href: "#", color: "bg-teal-500" },
      { icon: Star, label: "Ulasan Saya", href: "#", color: "bg-yellow-500" },
    ],
  },
  {
    category: "Pengaturan",
    items: [
      { icon: Globe, label: "Bahasa", href: "#", value: "Indonesia", color: "bg-indigo-500" },
      { icon: Moon, label: "Mode Gelap", href: "#", toggle: true, color: "bg-gray-700" },
      { icon: Settings, label: "Pengaturan Lainnya", href: "#", color: "bg-gray-500" },
    ],
  },
  {
    category: "Bantuan",
    items: [
      { icon: HelpCircle, label: "Pusat Bantuan", href: "#", color: "bg-cyan-500" },
      { icon: Gift, label: "Promo & Voucher", href: "#", badge: "2", color: "bg-rose-500" },
    ],
  },
];

const stats = [
  { label: "Trip", value: "12" },
  { label: "Review", value: "8" },
  { label: "Poin", value: "2.5K" },
];

export default function AkunPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn] = useState(false); // Demo: not logged in

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 pt-12 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-white">Akun</h1>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          {isLoggedIn ? (
            // Logged in state
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/20 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">John Doe</h2>
                  <BadgeCheck className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-white/70 text-sm">john.doe@email.com</p>
                <p className="text-white/70 text-sm">+62 812 3456 7890</p>
              </div>
            </div>
          ) : (
            // Not logged in state
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white/70" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Selamat Datang!</h2>
              <p className="text-white/70 text-sm mb-4">Masuk untuk pengalaman yang lebih personal</p>
              <div className="flex gap-3 justify-center">
                <button className="px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                  Masuk
                </button>
                <button className="px-6 py-2.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  Daftar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Card */}
      {isLoggedIn && (
        <div className="px-4 -mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-lg"
          >
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Menu Items */}
      <div className={`px-4 space-y-4 ${isLoggedIn ? 'mt-4' : '-mt-8'}`}>
        {menuItems.map((section, sectionIndex) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500">{section.category}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="flex-1 font-medium text-gray-700">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.value && (
                    <span className="text-sm text-gray-500">{item.value}</span>
                  )}
                  {item.toggle ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setDarkMode(!darkMode);
                      }}
                      className={`w-11 h-6 rounded-full transition-colors ${
                        darkMode ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        darkMode ? 'translate-x-5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        {isLoggedIn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white rounded-2xl shadow-sm text-red-500 font-semibold hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </motion.button>
        )}

        {/* App Info */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-400">Visit Sulsel v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">Made with ❤️ in South Sulawesi</p>
        </div>
      </div>
    </main>
  );
}
