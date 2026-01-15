"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Tag,
  Clock,
  Percent,
  Copy,
  Check,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";

const promos = [
  {
    id: "promo-1",
    title: "Diskon 30% Tur Toraja",
    description: "Dapatkan diskon 30% untuk paket tur Tana Toraja selama 3 hari 2 malam. Termasuk akomodasi, transportasi, dan guide lokal.",
    image: "https://www.gotravelaindonesia.com/wp-content/uploads/Tana-Toraja-Sulawesi.jpg",
    discount: 30,
    code: "TORAJA30",
    validUntil: "2026-02-28",
    category: "Tur",
    location: "Tana Toraja",
    terms: ["Minimal pemesanan 2 orang", "Tidak dapat digabung dengan promo lain", "Berlaku untuk keberangkatan Jan-Feb 2026"],
  },
  {
    id: "promo-2",
    title: "Cashback Rp100rb Hotel Makassar",
    description: "Pesan hotel partner di Makassar dan dapatkan cashback hingga Rp100.000 untuk pemesanan minimal 2 malam.",
    image: "https://cdn.antaranews.com/cache/1200x800/2020/05/01/antarafoto-tempat-favorit-ngabuburit-di-makassar-sepi-010520-ap-4.jpg",
    discount: 100000,
    discountType: "cashback",
    code: "HOTELMKS100",
    validUntil: "2026-01-31",
    category: "Akomodasi",
    location: "Makassar",
    terms: ["Minimal menginap 2 malam", "Berlaku untuk hotel partner", "Cashback masuk ke saldo dompet digital"],
  },
  {
    id: "promo-3",
    title: "Gratis Snorkeling Samalona",
    description: "Booking paket trip ke Pulau Samalona dan dapatkan gratis perlengkapan snorkeling + guide bawah air.",
    image: "https://asset.kompas.com/crops/n6oRm9RSiw4ewhEAHnnGSMaTJQQ=/77x12:903x563/1200x800/data/photo/2022/05/28/6291c43d5cb5b.jpg",
    discount: 0,
    discountType: "free",
    code: "SNORKELFREE",
    validUntil: "2026-03-31",
    category: "Aktivitas",
    location: "Pulau Samalona",
    terms: ["Minimal 4 orang per booking", "Termasuk life jacket dan fins", "Guide berpengalaman tersertifikasi"],
  },
  {
    id: "promo-4",
    title: "Diskon 25% Kuliner Tour",
    description: "Nikmati wisata kuliner Makassar dengan diskon 25%. Kunjungi 5 tempat makan legendaris bersama food guide.",
    image: "https://cdn0-production-images-kly.akamaized.net/z_OYMIbKYR4ujnTwNLW-dqb0kxk=/1280x720/smart/filters:quality(75):strip_icc()/kly-media-production/medias/4893831/original/066496500_1721195157-pallubasa.jpg",
    discount: 25,
    code: "KULINER25",
    validUntil: "2026-02-15",
    category: "Kuliner",
    location: "Makassar",
    terms: ["Termasuk 5 tempat makan", "Porsi makanan sudah termasuk", "Durasi sekitar 4 jam"],
  },
  {
    id: "promo-5",
    title: "Paket Honeymoon Pantai Bira",
    description: "Paket romantis 4 hari 3 malam di Pantai Bira dengan diskon 20%. Termasuk dinner romantis di tepi pantai.",
    image: "https://satyawinnie.com/wp-content/uploads/elementor/thumbs/67FA112C-0367-4AED-970B-8B38BD5D5EF7-oyx0zo4xsweejstfi4wpewcfwuwt2yxcaauwadsj9c.jpg",
    discount: 20,
    code: "HONEYBIRA20",
    validUntil: "2026-04-30",
    category: "Paket",
    location: "Pantai Bira",
    terms: ["Khusus pasangan", "Termasuk transportasi PP dari Makassar", "Welcome drink & fruit basket"],
  },
  {
    id: "promo-6",
    title: "Early Bird Rammang-Rammang",
    description: "Booking trip Rammang-Rammang minimal H-7 dan dapatkan diskon 15% + gratis foto drone.",
    image: "https://sulselprov.go.id/upload/post/580497d2e70fa.jpg",
    discount: 15,
    code: "EARLYRAM15",
    validUntil: "2026-03-15",
    category: "Tur",
    location: "Rammang-Rammang",
    terms: ["Pemesanan minimal 7 hari sebelum keberangkatan", "Foto drone dikirim via email", "Cuaca cerah untuk hasil terbaik"],
  },
];

const categories = [
  { id: "semua", label: "Semua Promo" },
  { id: "tur", label: "Tur" },
  { id: "akomodasi", label: "Akomodasi" },
  { id: "aktivitas", label: "Aktivitas" },
  { id: "kuliner", label: "Kuliner" },
  { id: "paket", label: "Paket" },
];

export default function PromoPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredPromos = promos.filter((promo) => {
    if (activeCategory === "semua") return true;
    return promo.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDiscount = (promo: typeof promos[0]) => {
    if (promo.discountType === "cashback") {
      return `Cashback Rp${(promo.discount / 1000).toFixed(0)}rb`;
    } else if (promo.discountType === "free") {
      return "GRATIS";
    }
    return `${promo.discount}% OFF`;
  };

  const isExpiringSoon = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 py-4">
            <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Promo & Diskon</h1>
              <p className="text-green-100 text-sm">Penawaran terbaik untuk liburanmu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Promos Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPromos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative h-40">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                />
                {/* Discount Badge */}
                <div className="absolute top-3 left-3">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    {promo.discountType === "free" ? (
                      <Sparkles className="w-4 h-4" />
                    ) : (
                      <Percent className="w-4 h-4" />
                    )}
                    {formatDiscount(promo)}
                  </div>
                </div>
                {/* Expiring Soon Badge */}
                {isExpiringSoon(promo.validUntil) && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Segera Berakhir
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                    {promo.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="w-3 h-3" />
                    {promo.location}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{promo.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{promo.description}</p>

                {/* Promo Code */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Kode Promo</p>
                    <p className="font-mono font-bold text-green-600">{promo.code}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(promo.code)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedCode === promo.code
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Valid Until */}
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>Berlaku hingga {new Date(promo.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPromos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Tidak ada promo</h3>
            <p className="text-gray-500 text-sm">Belum ada promo untuk kategori ini</p>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Cara Menggunakan Promo</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Salin kode promo yang diinginkan</li>
                <li>2. Pilih layanan atau produk yang sesuai</li>
                <li>3. Masukkan kode promo saat checkout</li>
                <li>4. Diskon akan otomatis teraplikasi</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
