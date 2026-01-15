"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Heart,
  Star,
  ShoppingCart,
  CheckCircle,
  MapPin,
  Truck,
  Shield,
  Gift,
  Sparkles,
  Package,
  Shirt,
  UtensilsCrossed,
  Crown,
  ChevronRight,
  Eye,
  Plus,
  BadgePercent,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import umkmData from "@/data/umkm.json";

const categories = [
  { id: "semua", label: "Semua", icon: Package, color: "from-gray-500 to-gray-600" },
  { id: "tenun", label: "Tenun & Kain", icon: Shirt, color: "from-purple-500 to-purple-600" },
  { id: "kerajinan", label: "Kerajinan", icon: Sparkles, color: "from-amber-500 to-amber-600" },
  { id: "kuliner", label: "Kuliner", icon: UtensilsCrossed, color: "from-orange-500 to-orange-600" },
  { id: "aksesoris", label: "Aksesoris", icon: Crown, color: "from-pink-500 to-pink-600" },
];

const sortOptions = [
  { id: "popular", label: "Terpopuler" },
  { id: "newest", label: "Terbaru" },
  { id: "price-low", label: "Harga Terendah" },
  { id: "price-high", label: "Harga Tertinggi" },
  { id: "rating", label: "Rating Tertinggi" },
];

export default function BelanjaPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<typeof umkmData.products[0] | null>(null);

  const filteredProducts = umkmData.products
    .filter((product) => {
      const matchesCategory = activeCategory === "semua" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.sold - a.sold;
      }
    });

  const featuredProducts = umkmData.products.filter((p) => p.featured);

  const addToCart = (id: string) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const cartTotal = cart.reduce((sum, id) => {
    const product = umkmData.products.find((p) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Belanja UMKM</h1>
                <p className="text-xs text-gray-500">Produk asli Sulawesi Selatan</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowFilter(true)}
                className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              </button>
              <Link href="/cart" className="p-2.5 hover:bg-gray-100 rounded-full relative transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pb-3 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari sarung tenun, kerajinan, oleh-oleh..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdi0yMGgtNjB6IiBmaWxsLW9wYWNpdHk9Ii4wNSIgZmlsbD0iI2ZmZiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-30" />
          <div className="relative px-6 py-8 flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-3">
                <BadgePercent className="w-4 h-4" />
                Promo Spesial
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Dukung UMKM Lokal</h2>
              <p className="text-white/90 text-sm mb-4">Belanja produk asli dari pengrajin Sulawesi Selatan</p>
              <div className="flex flex-wrap gap-4 text-white/80 text-xs">
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {umkmData.stats.totalProducts.toLocaleString()}+ Produk
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {umkmData.stats.totalSellers}+ UMKM
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Gift className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Truck, label: "Gratis Ongkir", sub: "Min. Rp200rb" },
            { icon: Shield, label: "100% Original", sub: "Produk Asli" },
            { icon: Gift, label: "Cashback", sub: "Hingga 10%" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <item.icon className="w-5 h-5 text-pink-600" />
              </div>
              <p className="text-xs font-semibold text-gray-900">{item.label}</p>
              <p className="text-[10px] text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-2xl transition-all ${
                  isActive
                    ? `bg-gradient-to-br ${cat.color} text-white shadow-lg`
                    : "bg-white text-gray-700 shadow-sm border border-gray-100 hover:border-pink-200"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-500"}`} />
                <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Products */}
      {activeCategory === "semua" && featuredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <h2 className="font-bold text-gray-900">Produk Unggulan</h2>
            </div>
            <button className="text-pink-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                className="flex-none w-44 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer"
                onClick={() => setQuickViewProduct(product)}
              >
                <div className="relative h-44">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
                      wishlist.includes(product.id)
                        ? "bg-pink-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                      }}
                      className="flex-1 py-2 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-900 hover:bg-pink-500 hover:text-white transition-colors flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Keranjang
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1 truncate">{product.seller.name}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[40px]">{product.name}</h3>
                  <p className="text-pink-600 font-bold">{formatPrice(product.price)}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {product.rating}
                    </span>
                    <span>•</span>
                    <span>{product.sold} terjual</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Sort & Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produk ditemukan
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer"
              onClick={() => setQuickViewProduct(product)}
            >
              <div className="relative h-40 md:h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.originalPrice && (
                    <span className="px-2 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold rounded-full shadow">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                  {product.featured && (
                    <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold rounded-full shadow flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3" /> Best
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow transition-all ${
                    wishlist.includes(product.id)
                      ? "bg-pink-500 text-white"
                      : "bg-white/95 text-gray-600 hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="flex-1 py-2 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> Lihat
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 ${
                      cart.includes(product.id)
                        ? "bg-green-500 text-white"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    {cart.includes(product.id) ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" /> Tambah
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3">
                {/* Seller */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <Image src={product.seller.avatar} alt={product.seller.name} fill className="object-cover" />
                  </div>
                  <span className="text-[11px] text-gray-500 truncate flex-1">{product.seller.name}</span>
                  {product.seller.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
                </div>

                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[40px] group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating & Sold */}
                <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-medium text-amber-700">{product.rating}</span>
                  </span>
                  <span>•</span>
                  <span>{product.sold} terjual</span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-pink-600 font-bold text-base">{formatPrice(product.price)}</p>
                    {product.originalPrice && (
                      <p className="text-[11px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                    )}
                  </div>
                  {product.stock < 10 && (
                    <span className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                      Sisa {product.stock}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-pink-400" />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-500 mb-6">Coba ubah filter atau gunakan kata kunci lain</p>
            <button
              onClick={() => {
                setActiveCategory("semua");
                setSearchQuery("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Reset Filter
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 z-50 lg:bottom-6"
          >
            <Link
              href="/cart"
              className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg shadow-pink-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-white" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-pink-600 text-xs font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                </div>
                <div className="text-white">
                  <p className="text-sm font-semibold">Keranjang Belanja</p>
                  <p className="text-xs text-white/80">{cart.length} item</p>
                </div>
              </div>
              <div className="text-right text-white">
                <p className="text-xs text-white/80">Total</p>
                <p className="font-bold">{formatPrice(cartTotal)}</p>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-80">
                <Image src={quickViewProduct.image} alt={quickViewProduct.name} fill className="object-cover" />
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
                {quickViewProduct.originalPrice && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold rounded-full">
                    {Math.round((1 - quickViewProduct.price / quickViewProduct.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Seller */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={quickViewProduct.seller.avatar} alt={quickViewProduct.seller.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-900">{quickViewProduct.seller.name}</span>
                      {quickViewProduct.seller.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </div>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {quickViewProduct.seller.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-amber-700">{quickViewProduct.seller.rating}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">{quickViewProduct.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{quickViewProduct.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {quickViewProduct.rating} Rating
                  </span>
                  <span className="text-sm text-gray-600">{quickViewProduct.sold} Terjual</span>
                  <span className="text-sm text-gray-600">Stok: {quickViewProduct.stock}</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-bold text-pink-600">{formatPrice(quickViewProduct.price)}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{formatPrice(quickViewProduct.originalPrice)}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-4 rounded-xl border transition-colors ${
                      wishlist.includes(quickViewProduct.id)
                        ? "bg-pink-50 border-pink-200 text-pink-600"
                        : "border-gray-200 text-gray-600 hover:border-pink-200 hover:text-pink-600"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${wishlist.includes(quickViewProduct.id) ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct.id);
                      setQuickViewProduct(null);
                    }}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      cart.includes(quickViewProduct.id)
                        ? "bg-green-500 text-white"
                        : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg"
                    }`}
                  >
                    {cart.includes(quickViewProduct.id) ? (
                      <>
                        <CheckCircle className="w-5 h-5" /> Sudah di Keranjang
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" /> Tambah ke Keranjang
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFilter(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filter & Sortir</h3>
                <button onClick={() => setShowFilter(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Urutkan</h4>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSortBy(opt.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        sortBy === opt.id
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Kategori</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat.id
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowFilter(false)}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl"
              >
                Terapkan Filter
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
