"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Calendar,
  Tag,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

type CartItem = {
  id: string;
  type: "product" | "tour" | "accommodation";
  name: string;
  image: string;
  price: number;
  quantity: number;
  seller?: string;
  date?: string;
  location?: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("visitsulsel_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Demo items for showcase
      setCartItems([
        {
          id: "tenun-sengkang-1",
          type: "product",
          name: "Sarung Tenun Sutra Sengkang",
          image: "https://indonesiakaya.com/wp-content/uploads/2020/10/01_2.jpg",
          price: 850000,
          quantity: 1,
          seller: "Tenun Andi Mappanyukki",
          location: "Sengkang, Wajo",
        },
        {
          id: "tour-toraja",
          type: "tour",
          name: "Toraja Cultural Adventure - 4 Hari 3 Malam",
          image: "https://www.gotravelaindonesia.com/wp-content/uploads/Tana-Toraja-Sulawesi.jpg",
          price: 3500000,
          quantity: 2,
          date: "25 Jan 2026",
          location: "Tana Toraja",
        },
        {
          id: "songkok-bone",
          type: "product",
          name: "Songkok Recca Bone",
          image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/80/MTA-101270200/tidak_ada_merk_peci_bone__songkok_recca_kopiah_bone_premium_putih_emas_full03_biwucjgi.jpg",
          price: 350000,
          quantity: 1,
          seller: "Recca Bone Authentic",
          location: "Watampone, Bone",
        },
      ]);
    }
    setIsLoading(false);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "Produk";
      case "tour":
        return "Paket Tur";
      case "accommodation":
        return "Akomodasi";
      default:
        return type;
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-blue-100 text-blue-700";
      case "tour":
        return "bg-green-100 text-green-700";
      case "accommodation":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Keranjang</h1>
                <p className="text-xs text-gray-500">
                  {cartItems.length} item
                </p>
              </div>
            </div>
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Keranjang Kosong
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Belum ada item di keranjang. Yuk mulai belanja!
          </p>
          <Link
            href="/belanja"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span
                              className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-1 ${getTypeBgColor(
                                item.type
                              )}`}
                            >
                              {getTypeLabel(item.type)}
                            </span>
                            <h3 className="font-semibold text-gray-900 line-clamp-2">
                              {item.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {item.location}
                            </span>
                          )}
                          {item.date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                          )}
                          {item.seller && (
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {item.seller}
                            </span>
                          )}
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-green-600 font-bold">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Promo Code */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-green-500" />
                  <input
                    type="text"
                    placeholder="Masukkan kode promo"
                    className="flex-1 py-2 text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                  <button className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
                    Terapkan
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">
                  Ringkasan Pesanan
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} item)
                    </span>
                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Diskon</span>
                      <span className="text-green-600">
                        -{formatPrice(discount)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-amber-50 rounded-xl p-3 mb-4 flex gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Harga belum termasuk ongkos kirim. Ongkir akan dihitung saat checkout.
                  </p>
                </div>

                <button className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  Checkout
                  <ChevronRight className="w-5 h-5" />
                </button>

                <Link
                  href="/belanja"
                  className="block text-center text-sm text-green-600 font-medium mt-3 hover:underline"
                >
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
