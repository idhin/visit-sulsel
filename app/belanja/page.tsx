"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Shirt,
  UtensilsCrossed,
  Palette,
  Crown,
  Star,
  MapPin,
  ShoppingCart,
  Heart,
  CheckCircle,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Store,
  Users,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { formatPrice } from "@/lib/utils";
import umkmData from "@/data/umkm.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Package,
  Shirt,
  UtensilsCrossed,
  Palette,
  Crown,
};

export default function BelanjaPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof umkmData.products[0] | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = umkmData.products.filter((product) => {
    const matchesCategory = activeCategory === "semua" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addToCart = (id: string) => {
    if (!cart.includes(id)) {
      setCart((prev) => [...prev, id]);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=1920"
            alt="UMKM Marketplace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/80 to-deep-ocean/60" />
        </div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-6"
            >
              <Store className="w-4 h-4" />
              Marketplace UMKM Lokal
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Belanja Produk{" "}
              <span className="text-gradient">Khas Sulsel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 mb-8 leading-relaxed"
            >
              Temukan kerajinan tangan, tenun tradisional, kuliner khas, dan 
              oleh-oleh autentik langsung dari pengrajin dan UMKM Sulawesi Selatan. 
              Setiap pembelian mendukung ekonomi lokal.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Store, value: umkmData.stats.totalSellers, label: "UMKM Terdaftar" },
                { icon: Package, value: umkmData.stats.totalProducts.toLocaleString(), label: "Produk" },
                { icon: Users, value: umkmData.stats.totalTransactions.toLocaleString(), label: "Transaksi" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Cari produk atau toko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {umkmData.categories.map((cat) => {
                const IconComponent = iconMap[cat.icon];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-maroon text-white shadow-lg"
                        : "bg-cream text-deep-ocean hover:bg-cream-dark"
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Cart */}
            <button className="relative p-3 bg-cream rounded-full hover:bg-cream-dark transition-colors">
              <ShoppingCart className="w-5 h-5 text-deep-ocean" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-maroon text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 bg-gradient-to-r from-gold/10 to-gold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="font-heading text-lg font-bold text-deep-ocean">Produk Unggulan</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {umkmData.products.filter(p => p.featured).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedProduct(product)}
                className="flex-shrink-0 w-48 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-32">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-maroon text-white text-xs font-bold rounded-full">
                      Sale
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-deep-ocean text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-maroon">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted">
              Menampilkan{" "}
              <span className="font-semibold text-deep-ocean">{filteredProducts.length}</span>{" "}
              produk
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    {product.originalPrice && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-maroon text-white text-xs font-bold rounded-full">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        wishlist.includes(product.id)
                          ? "bg-maroon text-white"
                          : "bg-white/80 text-deep-ocean hover:bg-white"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                    </button>

                    {/* Quick view overlay */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className="absolute inset-0 bg-deep-ocean/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      <span className="px-4 py-2 bg-white text-deep-ocean font-semibold rounded-full text-sm">
                        Lihat Detail
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    {/* Seller */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={product.seller.avatar}
                          alt={product.seller.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-muted truncate">{product.seller.name}</span>
                      {product.seller.verified && (
                        <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                      )}
                    </div>

                    <h3 className="font-medium text-deep-ocean line-clamp-2 mb-2 group-hover:text-maroon transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-xs font-medium text-deep-ocean">{product.rating}</span>
                      <span className="text-xs text-muted">| {product.sold} terjual</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-lg font-bold text-maroon">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-80 md:h-full min-h-[400px]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 md:hidden w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="hidden md:block absolute top-4 right-4 w-10 h-10 bg-cream rounded-full flex items-center justify-center hover:bg-cream-dark transition-colors"
                >
                  ×
                </button>

                {/* Category */}
                <span className="inline-block px-3 py-1 bg-cream text-deep-ocean text-xs font-medium rounded-full mb-3 capitalize">
                  {selectedProduct.category}
                </span>

                <h2 className="font-heading text-2xl font-bold text-deep-ocean mb-2">
                  {selectedProduct.name}
                </h2>

                {/* Rating & sold */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="font-medium text-deep-ocean">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-muted">{selectedProduct.sold} terjual</span>
                  <span className="text-muted">Stok: {selectedProduct.stock}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-heading text-3xl font-bold text-maroon">
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <>
                      <span className="text-lg text-muted line-through">
                        {formatPrice(selectedProduct.originalPrice)}
                      </span>
                      <span className="px-2 py-1 bg-maroon text-white text-sm font-bold rounded">
                        {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted mb-6">{selectedProduct.description}</p>

                {/* Seller */}
                <div className="flex items-center gap-3 p-4 bg-cream rounded-xl mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={selectedProduct.seller.avatar}
                      alt={selectedProduct.seller.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-deep-ocean">{selectedProduct.seller.name}</span>
                      {selectedProduct.seller.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted">
                      <MapPin className="w-3 h-3" />
                      {selectedProduct.seller.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="font-medium">{selectedProduct.seller.rating}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct.id);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Tambah ke Keranjang
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`px-4 py-4 rounded-full transition-all ${
                      wishlist.includes(selectedProduct.id)
                        ? "bg-maroon text-white"
                        : "border-2 border-border hover:bg-cream"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA for UMKM */}
      <section className="py-20 bg-deep-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <Store className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Punya Produk UMKM?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Daftarkan usaha Anda di Visit Sulsel dan jangkau ribuan wisatawan 
              yang mencari produk khas Sulawesi Selatan. Gratis untuk bergabung!
            </p>
            <Link
              href="/belanja/daftar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all"
            >
              Daftar UMKM Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
