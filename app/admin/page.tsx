"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MapPin,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Filter,
  RefreshCw,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  Ticket,
  Hotel,
  Utensils,
  ShoppingBag,
  Star,
  MessageSquare,
  Activity,
  PieChart,
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
  Briefcase,
  Building2,
  Plane,
  Ship,
  Bus,
  TreePine,
  Droplets,
  Thermometer,
  AlertTriangle,
  Lightbulb,
  FileText,
  TrendingUp as Growth,
  Wallet,
  CreditCard,
  Banknote,
  BadgePercent,
  UserCheck,
  UserX,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Award,
  Flag,
  Navigation,
  Route,
  CircleDollarSign,
  Factory,
  GraduationCap,
  Leaf,
  Sun,
  CloudRain,
  Wind,
  X,
  Info,
  BookOpen,
  Calculator,
  HelpCircle,
  Car,
  Bike,
  Train,
  ClipboardList,
} from "lucide-react";

// ==================== DATA SECTION ====================

const overviewStats = [
  {
    label: "Total Wisatawan",
    value: "1.28M",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
    target: "1.5M",
    achieved: 85,
  },
  {
    label: "PAD Pariwisata",
    value: "Rp 127.8M",
    change: "+18.3%",
    trend: "up",
    icon: CircleDollarSign,
    color: "bg-green-500",
    target: "Rp 150M",
    achieved: 85,
  },
  {
    label: "Penyerapan Tenaga Kerja",
    value: "45.2K",
    change: "+8.7%",
    trend: "up",
    icon: Briefcase,
    color: "bg-purple-500",
    target: "50K",
    achieved: 90,
  },
  {
    label: "UMKM Terdaftar",
    value: "3.847",
    change: "+22.1%",
    trend: "up",
    icon: ShoppingBag,
    color: "bg-orange-500",
    target: "5000",
    achieved: 77,
  },
];

const economicImpact = {
  directSpending: 892000000000, // 892 Milyar
  indirectImpact: 1560000000000, // 1.56 Triliun
  multiplierEffect: 1.75,
  taxContribution: 45800000000, // 45.8 Milyar
  foreignExchange: 28500000, // 28.5 Juta USD
};

const regionalData = [
  { region: "Makassar", visitors: 425000, revenue: 45.2, growth: 15, hotels: 156, attractions: 28, employment: 18500 },
  { region: "Tana Toraja", visitors: 185000, revenue: 28.5, growth: 22, hotels: 48, attractions: 35, employment: 8200 },
  { region: "Bulukumba", visitors: 142000, revenue: 18.2, growth: 18, hotels: 32, attractions: 12, employment: 5400 },
  { region: "Maros", visitors: 128000, revenue: 12.8, growth: 12, hotels: 18, attractions: 8, employment: 3800 },
  { region: "Gowa", visitors: 98000, revenue: 8.5, growth: 8, hotels: 24, attractions: 15, employment: 2900 },
  { region: "Bone", visitors: 72000, revenue: 6.2, growth: -3, hotels: 15, attractions: 10, employment: 2100 },
  { region: "Pinrang", visitors: 45000, revenue: 3.8, growth: 5, hotels: 12, attractions: 6, employment: 1400 },
  { region: "Lainnya", visitors: 185000, revenue: 4.6, growth: 10, hotels: 95, attractions: 42, employment: 2900 },
];

const monthlyTrend = [
  { month: "Jan", domestic: 72000, foreign: 8500, revenue: 8.2 },
  { month: "Feb", domestic: 68000, foreign: 7800, revenue: 7.5 },
  { month: "Mar", domestic: 85000, foreign: 12000, revenue: 10.2 },
  { month: "Apr", domestic: 92000, foreign: 14500, revenue: 11.8 },
  { month: "May", domestic: 78000, foreign: 9200, revenue: 9.4 },
  { month: "Jun", domestic: 115000, foreign: 18500, revenue: 14.2 },
  { month: "Jul", domestic: 145000, foreign: 25000, revenue: 18.5 },
  { month: "Aug", domestic: 138000, foreign: 22000, revenue: 17.2 },
  { month: "Sep", domestic: 98000, foreign: 15000, revenue: 12.4 },
  { month: "Oct", domestic: 88000, foreign: 11500, revenue: 10.8 },
  { month: "Nov", domestic: 95000, foreign: 13000, revenue: 11.5 },
  { month: "Dec", domestic: 125000, foreign: 18000, revenue: 15.2 },
];

const visitorDemographics = {
  byOrigin: [
    { region: "Jawa", percentage: 32, count: 410000 },
    { region: "Sulawesi", percentage: 28, count: 358000 },
    { region: "Kalimantan", percentage: 12, count: 154000 },
    { region: "Sumatera", percentage: 8, count: 102000 },
    { region: "Lainnya", percentage: 5, count: 64000 },
    { region: "Mancanegara", percentage: 15, count: 192000 },
  ],
  byAge: [
    { group: "< 25 tahun", percentage: 22 },
    { group: "25-34 tahun", percentage: 35 },
    { group: "35-44 tahun", percentage: 25 },
    { group: "45-54 tahun", percentage: 12 },
    { group: "> 55 tahun", percentage: 6 },
  ],
  byPurpose: [
    { purpose: "Liburan/Rekreasi", percentage: 58 },
    { purpose: "Bisnis/MICE", percentage: 22 },
    { purpose: "Ziarah/Religi", percentage: 12 },
    { purpose: "Edukasi", percentage: 8 },
  ],
  topCountries: [
    { country: "Malaysia", visitors: 48000, flag: "🇲🇾" },
    { country: "Singapura", visitors: 35000, flag: "🇸🇬" },
    { country: "Tiongkok", visitors: 28000, flag: "🇨🇳" },
    { country: "Australia", visitors: 22000, flag: "🇦🇺" },
    { country: "Jepang", visitors: 18000, flag: "🇯🇵" },
  ],
};

const satisfactionData = {
  overall: 4.2,
  categories: [
    { category: "Keindahan Alam", score: 4.6, icon: TreePine },
    { category: "Kebersihan", score: 3.8, icon: Droplets },
    { category: "Infrastruktur", score: 3.5, icon: Route },
    { category: "Keamanan", score: 4.3, icon: CheckCircle },
    { category: "Keramahan", score: 4.7, icon: Heart },
    { category: "Kuliner", score: 4.4, icon: Utensils },
    { category: "Harga", score: 3.9, icon: Wallet },
    { category: "Aksesibilitas", score: 3.4, icon: Navigation },
  ],
  complaints: [
    { issue: "Infrastruktur jalan rusak", count: 342, priority: "high" },
    { issue: "Kebersihan destinasi", count: 256, priority: "high" },
    { issue: "Harga tidak standar", count: 189, priority: "medium" },
    { issue: "Kurang papan informasi", count: 145, priority: "medium" },
    { issue: "Parkir tidak memadai", count: 128, priority: "low" },
  ],
};

const infrastructureNeeds = [
  { project: "Perbaikan Jalan Wisata Toraja", budget: 45, status: "urgent", impact: "high" },
  { project: "Toilet Umum 20 Destinasi", budget: 8.5, status: "planned", impact: "high" },
  { project: "Pusat Informasi Turis", budget: 12, status: "ongoing", impact: "medium" },
  { project: "Signage & Wayfinding", budget: 5.2, status: "planned", impact: "medium" },
  { project: "Dermaga Wisata Pulau", budget: 28, status: "proposed", impact: "high" },
];

const policyRecommendations = [
  {
    title: "Percepatan Infrastruktur Toraja",
    description: "Perbaikan jalan Makassar-Toraja untuk meningkatkan aksesibilitas ke destinasi unggulan",
    impact: "Potensi peningkatan wisatawan 35%",
    priority: "Tinggi",
    budget: "Rp 120M",
    icon: Route,
  },
  {
    title: "Program Sertifikasi UMKM",
    description: "Standarisasi kualitas dan harga produk UMKM pariwisata",
    impact: "Peningkatan kepercayaan wisatawan",
    priority: "Tinggi",
    budget: "Rp 8.5M",
    icon: Award,
  },
  {
    title: "Digital Tourism Campaign",
    description: "Kampanye pemasaran digital untuk pasar mancanegara Asia Tenggara",
    impact: "Target 25% peningkatan wisman",
    priority: "Sedang",
    budget: "Rp 15M",
    icon: Globe,
  },
  {
    title: "Pengembangan SDM Pariwisata",
    description: "Pelatihan guide, hospitality, dan bahasa asing",
    impact: "Peningkatan kualitas layanan",
    priority: "Sedang",
    budget: "Rp 6.2M",
    icon: GraduationCap,
  },
];

const environmentalIndicators = [
  { indicator: "Indeks Keberlanjutan", value: 72, target: 85, status: "warning" },
  { indicator: "Pengelolaan Sampah", value: 58, target: 80, status: "danger" },
  { indicator: "Konservasi Alam", value: 81, target: 85, status: "good" },
  { indicator: "Emisi Karbon", value: 65, target: 75, status: "warning" },
];

const upcomingEvents = [
  { name: "Festival Toraja", date: "15-20 Jul 2026", expected: 50000, status: "confirmed" },
  { name: "Makassar F8", date: "8-10 Aug 2026", expected: 75000, status: "confirmed" },
  { name: "Pinisi Festival", date: "22-25 Sep 2026", expected: 35000, status: "planning" },
  { name: "Sulsel Food Fest", date: "5-8 Oct 2026", expected: 40000, status: "planning" },
];

const transportationData = [
  { mode: "Pesawat", icon: Plane, arrivals: 892000, growth: 12 },
  { mode: "Kapal Laut", icon: Ship, arrivals: 156000, growth: 8 },
  { mode: "Darat (Bus)", icon: Bus, arrivals: 232000, growth: 5 },
];

// ==================== COMPONENT ====================

// Methodology Data
const methodologyData = [
  {
    id: "emisi-karbon",
    title: "Perhitungan Emisi Karbon Pariwisata",
    icon: Leaf,
    color: "bg-green-500",
    description: "Emisi karbon dihitung berdasarkan jejak karbon wisatawan dari transportasi, akomodasi, dan aktivitas wisata.",
    formula: "Total Emisi = Emisi Transportasi + Emisi Akomodasi + Emisi Aktivitas",
    components: [
      {
        name: "Transportasi (75% kontribusi)",
        formula: "Jarak (km) × Jumlah Penumpang × Faktor Emisi",
        details: [
          { item: "Pesawat Domestik", value: "0.255 kg CO₂/km/penumpang" },
          { item: "Pesawat Internasional", value: "0.195 kg CO₂/km/penumpang" },
          { item: "Mobil/Taksi", value: "0.171 kg CO₂/km/penumpang" },
          { item: "Bus", value: "0.089 kg CO₂/km/penumpang" },
          { item: "Kereta", value: "0.041 kg CO₂/km/penumpang" },
          { item: "Kapal Laut", value: "0.245 kg CO₂/km/penumpang" },
        ]
      },
      {
        name: "Akomodasi (20% kontribusi)",
        formula: "Jumlah Malam × Faktor Emisi Hotel",
        details: [
          { item: "Hotel Bintang 5", value: "30-50 kg CO₂/malam" },
          { item: "Hotel Bintang 3-4", value: "15-25 kg CO₂/malam" },
          { item: "Budget Hotel", value: "8-15 kg CO₂/malam" },
          { item: "Homestay/Guesthouse", value: "5-10 kg CO₂/malam" },
        ]
      },
      {
        name: "Aktivitas Wisata (5% kontribusi)",
        formula: "Berdasarkan jenis aktivitas",
        details: [
          { item: "Tur dengan Kendaraan", value: "Dihitung per km" },
          { item: "Boat Trip", value: "~15 kg CO₂/jam" },
          { item: "Aktivitas Outdoor", value: "Minimal/negligible" },
        ]
      }
    ],
    example: {
      title: "Contoh Perhitungan Wisatawan Jakarta → Toraja",
      steps: [
        "Pesawat Jakarta-Makassar: 1,400 km × 0.255 = 357 kg CO₂",
        "Mobil Makassar-Toraja: 320 km × 0.171 = 55 kg CO₂",
        "Hotel 3 malam (bintang 3): 3 × 20 = 60 kg CO₂",
        "Total per wisatawan: ~472 kg CO₂"
      ]
    },
    source: "IPCC Guidelines, UNWTO Carbon Measurement"
  },
  {
    id: "sti",
    title: "Sustainable Tourism Index (STI)",
    icon: TreePine,
    color: "bg-teal-500",
    description: "Indeks keberlanjutan pariwisata mengukur seberapa berkelanjutan praktik pariwisata di suatu destinasi berdasarkan framework UNWTO/GSTC.",
    formula: "STI = (E × 0.30) + (S × 0.25) + (Ek × 0.25) + (M × 0.20)",
    components: [
      {
        name: "Lingkungan / Environment (E) - Bobot 30%",
        formula: "Rata-rata skor 0-100",
        details: [
          { item: "Pengelolaan Sampah", value: "% sampah terpilah & terolah" },
          { item: "Konservasi Alam", value: "% kawasan dilindungi" },
          { item: "Kualitas Air", value: "Indeks pencemaran air" },
          { item: "Emisi Karbon", value: "CO₂ per wisatawan" },
        ]
      },
      {
        name: "Sosial-Budaya (S) - Bobot 25%",
        formula: "Rata-rata skor 0-100",
        details: [
          { item: "Pelestarian Budaya", value: "% situs budaya terjaga" },
          { item: "Partisipasi Masyarakat", value: "% masyarakat terlibat" },
          { item: "Kepuasan Penduduk", value: "Survei tahunan" },
        ]
      },
      {
        name: "Ekonomi (Ek) - Bobot 25%",
        formula: "Rata-rata skor 0-100",
        details: [
          { item: "Pendapatan Lokal", value: "% ke ekonomi lokal" },
          { item: "Penyerapan Tenaga Kerja", value: "Rasio pekerja lokal" },
          { item: "Multiplier Effect", value: "Dampak ekonomi berlipat" },
        ]
      },
      {
        name: "Manajemen (M) - Bobot 20%",
        formula: "Rata-rata skor 0-100",
        details: [
          { item: "Regulasi", value: "Kelengkapan kebijakan" },
          { item: "Monitoring", value: "Sistem pengawasan" },
          { item: "Infrastruktur", value: "Kapasitas daya dukung" },
        ]
      }
    ],
    interpretation: [
      { range: "85-100", label: "Sangat Berkelanjutan", color: "text-green-600" },
      { range: "70-84", label: "Berkelanjutan", color: "text-blue-600" },
      { range: "55-69", label: "Cukup Berkelanjutan", color: "text-yellow-600" },
      { range: "40-54", label: "Kurang Berkelanjutan", color: "text-orange-600" },
      { range: "<40", label: "Tidak Berkelanjutan", color: "text-red-600" },
    ],
    source: "UNWTO, Global Sustainable Tourism Council (GSTC)"
  },
  {
    id: "multiplier",
    title: "Multiplier Effect Ekonomi",
    icon: TrendingUp,
    color: "bg-blue-500",
    description: "Multiplier effect mengukur seberapa besar dampak ekonomi berlipat dari setiap rupiah yang dibelanjakan wisatawan.",
    formula: "Multiplier = Total Dampak Ekonomi / Belanja Langsung Wisatawan",
    components: [
      {
        name: "Dampak Langsung (Direct)",
        formula: "Belanja wisatawan di destinasi",
        details: [
          { item: "Akomodasi", value: "Hotel, homestay, resort" },
          { item: "Makanan & Minuman", value: "Restoran, kafe, warung" },
          { item: "Transportasi", value: "Rental, taksi, ojek" },
          { item: "Atraksi & Hiburan", value: "Tiket masuk, pertunjukan" },
          { item: "Belanja", value: "Souvenir, oleh-oleh" },
        ]
      },
      {
        name: "Dampak Tidak Langsung (Indirect)",
        formula: "Belanja pelaku usaha ke supplier",
        details: [
          { item: "Pembelian Bahan Baku", value: "Dari petani, nelayan lokal" },
          { item: "Jasa Pendukung", value: "Laundry, cleaning service" },
          { item: "Utilitas", value: "Listrik, air, telekomunikasi" },
        ]
      },
      {
        name: "Dampak Induksi (Induced)",
        formula: "Belanja pekerja dari pendapatan",
        details: [
          { item: "Konsumsi Rumah Tangga", value: "Kebutuhan sehari-hari" },
          { item: "Pendidikan & Kesehatan", value: "Dari pendapatan pekerja" },
        ]
      }
    ],
    example: {
      title: "Contoh Perhitungan",
      steps: [
        "Belanja Langsung: Rp 892 Milyar",
        "Dampak Tidak Langsung: Rp 446 Milyar (50%)",
        "Dampak Induksi: Rp 223 Milyar (25%)",
        "Total Dampak: Rp 1.56 Triliun",
        "Multiplier: 1.56T / 892M = 1.75x"
      ]
    },
    source: "World Travel & Tourism Council (WTTC)"
  },
  {
    id: "pad",
    title: "PAD Pariwisata (Pendapatan Asli Daerah)",
    icon: CircleDollarSign,
    color: "bg-emerald-500",
    description: "PAD Pariwisata adalah total pendapatan yang diterima pemerintah daerah dari sektor pariwisata.",
    formula: "PAD = Pajak + Retribusi + Hasil Pengelolaan + Lain-lain",
    components: [
      {
        name: "Pajak Daerah",
        formula: "Sesuai Perda tentang Pajak Daerah",
        details: [
          { item: "Pajak Hotel", value: "10% dari pembayaran" },
          { item: "Pajak Restoran", value: "10% dari pembayaran" },
          { item: "Pajak Hiburan", value: "15-35% (bervariasi)" },
          { item: "Pajak Parkir", value: "20% dari pendapatan" },
        ]
      },
      {
        name: "Retribusi",
        formula: "Tarif × Volume",
        details: [
          { item: "Retribusi Tempat Wisata", value: "Tiket masuk destinasi" },
          { item: "Retribusi Parkir", value: "Di area wisata" },
          { item: "Retribusi Izin", value: "Usaha pariwisata" },
        ]
      },
      {
        name: "Hasil Pengelolaan",
        formula: "Pendapatan dari aset daerah",
        details: [
          { item: "BUMD Pariwisata", value: "Deviden/laba" },
          { item: "Kerjasama Pihak Ketiga", value: "Bagi hasil" },
        ]
      }
    ],
    source: "UU No. 28/2009 tentang Pajak & Retribusi Daerah"
  },
  {
    id: "kepuasan",
    title: "Indeks Kepuasan Wisatawan",
    icon: Star,
    color: "bg-yellow-500",
    description: "Mengukur tingkat kepuasan wisatawan berdasarkan survei dan ulasan di berbagai platform.",
    formula: "IKW = Σ(Skor × Bobot) / Total Bobot",
    components: [
      {
        name: "Sumber Data",
        formula: "Agregasi multi-platform",
        details: [
          { item: "Survei Langsung", value: "QR code di destinasi" },
          { item: "Google Reviews", value: "API integration" },
          { item: "TripAdvisor", value: "Scraping/API" },
          { item: "Social Media", value: "Sentiment analysis" },
          { item: "Platform Booking", value: "Traveloka, Tiket.com" },
        ]
      },
      {
        name: "Kategori Penilaian",
        formula: "Skor 1-5 per kategori",
        details: [
          { item: "Keindahan Alam", value: "Pemandangan, kebersihan alam" },
          { item: "Infrastruktur", value: "Jalan, fasilitas umum" },
          { item: "Keamanan", value: "Rasa aman, ketertiban" },
          { item: "Keramahan", value: "Sikap penduduk lokal" },
          { item: "Kuliner", value: "Rasa, variasi, harga" },
          { item: "Aksesibilitas", value: "Kemudahan akses" },
          { item: "Value for Money", value: "Harga vs kualitas" },
        ]
      },
      {
        name: "Metodologi Survei",
        formula: "Sampling & validasi",
        details: [
          { item: "Sample Size", value: "Min. 384 (CI 95%)" },
          { item: "Periode", value: "Rolling 12 bulan" },
          { item: "Validasi", value: "Cross-check multi-source" },
        ]
      }
    ],
    source: "Metode Net Promoter Score (NPS) & Customer Satisfaction Index"
  }
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("tahun-ini");
  const [activeTab, setActiveTab] = useState("overview");
  const [showRecommendation, setShowRecommendation] = useState<number | null>(null);
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<string | null>(null);

  const maxVisitors = Math.max(...monthlyTrend.map(d => d.domestic + d.foreign));

  const tabs = [
    { id: "overview", label: "Ringkasan", icon: LayoutDashboard },
    { id: "regional", label: "Per Wilayah", icon: MapPin },
    { id: "demographics", label: "Demografi", icon: Users },
    { id: "satisfaction", label: "Kepuasan", icon: Star },
    { id: "policy", label: "Rekomendasi", icon: Lightbulb },
    { id: "metodologi", label: "Metodologi", icon: BookOpen },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000000000) return `Rp ${(value / 1000000000000).toFixed(2)} T`;
    if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)} M`;
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} Jt`;
    return `Rp ${value.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900">Visit Sulsel</h1>
                  <p className="text-[10px] text-gray-500 -mt-0.5">Dashboard Eksekutif</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari data..."
                  className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">DS</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Dinas Pariwisata</p>
                  <p className="text-[10px] text-gray-500">Prov. Sulawesi Selatan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Eksekutif Pariwisata</h1>
            <p className="text-gray-500 text-sm">Sistem Informasi Pengambilan Kebijakan - Provinsi Sulawesi Selatan</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bulan-ini">Bulan Ini</option>
              <option value="kuartal-ini">Kuartal Ini</option>
              <option value="tahun-ini">Tahun 2025</option>
              <option value="yoy">Year-over-Year</option>
            </select>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Laporan</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards with Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500 mb-3">{stat.label}</p>
                  
                  {/* Target Progress */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Target: {stat.target}</span>
                      <span className="font-semibold text-gray-700">{stat.achieved}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div 
                        className={`h-full rounded-full ${stat.achieved >= 80 ? 'bg-green-500' : stat.achieved >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${stat.achieved}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Economic Impact Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Dampak Ekonomi Sektor Pariwisata
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-blue-200 text-xs mb-1">Belanja Langsung Wisatawan</p>
                  <p className="text-2xl font-bold">{formatCurrency(economicImpact.directSpending)}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-xs mb-1">Dampak Ekonomi Tidak Langsung</p>
                  <p className="text-2xl font-bold">{formatCurrency(economicImpact.indirectImpact)}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-xs mb-1">Multiplier Effect</p>
                  <p className="text-2xl font-bold">{economicImpact.multiplierEffect}x</p>
                </div>
                <div>
                  <p className="text-blue-200 text-xs mb-1">Kontribusi Pajak</p>
                  <p className="text-2xl font-bold">{formatCurrency(economicImpact.taxContribution)}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-xs mb-1">Devisa (Wisman)</p>
                  <p className="text-2xl font-bold">${(economicImpact.foreignExchange / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Monthly Trend */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-gray-900">Tren Kunjungan Wisatawan</h2>
                    <p className="text-sm text-gray-500">Domestik vs Mancanegara - Tahun 2025</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded" />
                      <span className="text-gray-600">Domestik</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded" />
                      <span className="text-gray-600">Mancanegara</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-64 flex items-end gap-2">
                  {monthlyTrend.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center gap-0.5 h-52 justify-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.foreign / maxVisitors) * 100}%` }}
                          transition={{ delay: index * 0.03, duration: 0.5 }}
                          className="w-full bg-green-500 rounded-t-sm"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(data.domestic / maxVisitors) * 100}%` }}
                          transition={{ delay: index * 0.03, duration: 0.5 }}
                          className="w-full bg-blue-500"
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transportation Mode */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-1">Moda Kedatangan</h2>
                <p className="text-sm text-gray-500 mb-4">Distribusi wisatawan per moda</p>
                
                <div className="space-y-4">
                  {transportationData.map((transport, index) => (
                    <motion.div
                      key={transport.mode}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <transport.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{transport.mode}</span>
                          <span className="text-sm font-bold text-gray-900">{(transport.arrivals / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(transport.arrivals / 892000) * 100}%` }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="h-full bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${transport.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transport.growth >= 0 ? '+' : ''}{transport.growth}%
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Upcoming Events */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Event Mendatang
                  </h3>
                  <div className="space-y-2">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.name} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium text-gray-900">{event.name}</p>
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                        <span className="text-xs text-blue-600 font-medium">{(event.expected / 1000)}K exp.</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental & Sustainability */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                Indikator Keberlanjutan Pariwisata
              </h2>
              <p className="text-sm text-gray-500 mb-4">Sustainable Tourism Index</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {environmentalIndicators.map((ind) => (
                  <div key={ind.indicator} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{ind.indicator}</span>
                      {ind.status === "good" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {ind.status === "warning" && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                      {ind.status === "danger" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-gray-900">{ind.value}</span>
                      <span className="text-sm text-gray-500 mb-1">/ {ind.target}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div 
                        className={`h-full rounded-full ${
                          ind.status === "good" ? 'bg-green-500' : ind.status === "warning" ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(ind.value / ind.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Regional Tab */}
        {activeTab === "regional" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Performa per Kabupaten/Kota</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">Wilayah</th>
                      <th className="pb-3 font-medium text-right">Wisatawan</th>
                      <th className="pb-3 font-medium text-right">Pendapatan (M)</th>
                      <th className="pb-3 font-medium text-right">Hotel</th>
                      <th className="pb-3 font-medium text-right">Atraksi</th>
                      <th className="pb-3 font-medium text-right">Tenaga Kerja</th>
                      <th className="pb-3 font-medium text-right">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {regionalData.map((region, index) => (
                      <motion.tr
                        key={region.region}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="py-3 font-medium text-gray-900">{region.region}</td>
                        <td className="py-3 text-right text-gray-700">{region.visitors.toLocaleString()}</td>
                        <td className="py-3 text-right text-gray-700">Rp {region.revenue}</td>
                        <td className="py-3 text-right text-gray-700">{region.hotels}</td>
                        <td className="py-3 text-right text-gray-700">{region.attractions}</td>
                        <td className="py-3 text-right text-gray-700">{region.employment.toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <span className={`inline-flex items-center gap-1 font-medium ${
                            region.growth >= 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {region.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {Math.abs(region.growth)}%
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Infrastructure Needs */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                Kebutuhan Infrastruktur Prioritas
              </h2>
              <div className="space-y-3">
                {infrastructureNeeds.map((project, index) => (
                  <motion.div
                    key={project.project}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className={`w-2 h-12 rounded-full ${
                      project.status === "urgent" ? "bg-red-500" :
                      project.status === "ongoing" ? "bg-blue-500" :
                      project.status === "planned" ? "bg-yellow-500" : "bg-gray-300"
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{project.project}</p>
                      <p className="text-sm text-gray-500">Estimasi: Rp {project.budget} Milyar</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "urgent" ? "bg-red-100 text-red-700" :
                        project.status === "ongoing" ? "bg-blue-100 text-blue-700" :
                        project.status === "planned" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
                      }`}>
                        {project.status === "urgent" ? "Mendesak" :
                         project.status === "ongoing" ? "Berjalan" :
                         project.status === "planned" ? "Direncanakan" : "Diusulkan"}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Impact: {project.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demographics Tab */}
        {activeTab === "demographics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* By Origin */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Asal Wisatawan</h2>
                <div className="space-y-3">
                  {visitorDemographics.byOrigin.map((origin, index) => (
                    <div key={origin.region}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{origin.region}</span>
                        <span className="font-semibold">{origin.count.toLocaleString()} ({origin.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${origin.percentage}%` }}
                          transition={{ delay: index * 0.1 }}
                          className="h-full bg-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Countries */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Top 5 Negara Asal Wisman</h2>
                <div className="space-y-3">
                  {visitorDemographics.topCountries.map((country, index) => (
                    <motion.div
                      key={country.country}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{country.country}</p>
                      </div>
                      <span className="font-bold text-gray-900">{country.visitors.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* By Age */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Kelompok Usia</h2>
                <div className="space-y-3">
                  {visitorDemographics.byAge.map((age, index) => (
                    <div key={age.group}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{age.group}</span>
                        <span className="font-semibold">{age.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${age.percentage}%` }}
                          transition={{ delay: index * 0.1 }}
                          className="h-full bg-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* By Purpose */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Tujuan Kunjungan</h2>
                <div className="space-y-3">
                  {visitorDemographics.byPurpose.map((purpose, index) => (
                    <div key={purpose.purpose}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{purpose.purpose}</span>
                        <span className="font-semibold">{purpose.percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${purpose.percentage}%` }}
                          transition={{ delay: index * 0.1 }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Satisfaction Tab */}
        {activeTab === "satisfaction" && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold">{satisfactionData.overall}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Indeks Kepuasan Wisatawan</h2>
                  <p className="text-white/80">Berdasarkan {(15200).toLocaleString()} ulasan wisatawan</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= Math.round(satisfactionData.overall) ? 'fill-white' : 'fill-white/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Scores */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4">Skor per Kategori</h2>
                <div className="space-y-4">
                  {satisfactionData.categories.map((cat, index) => (
                    <motion.div
                      key={cat.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        cat.score >= 4.5 ? 'bg-green-100' : cat.score >= 4 ? 'bg-blue-100' : cat.score >= 3.5 ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        <cat.icon className={`w-5 h-5 ${
                          cat.score >= 4.5 ? 'text-green-600' : cat.score >= 4 ? 'text-blue-600' : cat.score >= 3.5 ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{cat.category}</span>
                          <span className="font-bold text-gray-900">{cat.score}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              cat.score >= 4.5 ? 'bg-green-500' : cat.score >= 4 ? 'bg-blue-500' : cat.score >= 3.5 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(cat.score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Top Complaints */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Keluhan Utama Wisatawan
                </h2>
                <div className="space-y-3">
                  {satisfactionData.complaints.map((complaint, index) => (
                    <motion.div
                      key={complaint.issue}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className={`w-2 h-10 rounded-full ${
                        complaint.priority === "high" ? "bg-red-500" :
                        complaint.priority === "medium" ? "bg-yellow-500" : "bg-gray-300"
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{complaint.issue}</p>
                        <p className="text-sm text-gray-500">{complaint.count} laporan</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        complaint.priority === "high" ? "bg-red-100 text-red-700" :
                        complaint.priority === "medium" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {complaint.priority === "high" ? "Prioritas Tinggi" :
                         complaint.priority === "medium" ? "Prioritas Sedang" : "Prioritas Rendah"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policy Recommendations Tab */}
        {activeTab === "policy" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                Rekomendasi Kebijakan Strategis
              </h2>
              <p className="text-white/80">Berdasarkan analisis data dan tren pariwisata Sulawesi Selatan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {policyRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setShowRecommendation(showRecommendation === index ? null : index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <rec.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{rec.title}</h3>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            rec.priority === "Tinggi" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            Prioritas {rec.priority}
                          </span>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                          showRecommendation === index ? "rotate-90" : ""
                        }`} />
                      </div>
                      
                      <AnimatePresence>
                        {showRecommendation === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 pt-3 border-t border-gray-100"
                          >
                            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-2 bg-green-50 rounded-lg">
                                <p className="text-xs text-green-600 font-medium">Proyeksi Impact</p>
                                <p className="text-sm text-green-800">{rec.impact}</p>
                              </div>
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-600 font-medium">Estimasi Anggaran</p>
                                <p className="text-sm text-blue-800">{rec.budget}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Langkah Aksi Prioritas Q1 2026
              </h2>
              <div className="space-y-3">
                {[
                  { action: "Finalisasi anggaran perbaikan jalan wisata Toraja", deadline: "15 Jan 2026", status: "pending" },
                  { action: "Launching program sertifikasi UMKM batch pertama", deadline: "1 Feb 2026", status: "ongoing" },
                  { action: "Kick-off kampanye digital Visit Sulsel 2026", deadline: "15 Feb 2026", status: "planned" },
                  { action: "Review dan evaluasi kinerja destinasi Q4 2025", deadline: "20 Jan 2026", status: "ongoing" },
                  { action: "MoU dengan 5 maskapai untuk rute baru", deadline: "28 Feb 2026", status: "planned" },
                ].map((item, index) => (
                  <motion.div
                    key={item.action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    {item.status === "ongoing" ? (
                      <div className="w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    ) : item.status === "pending" ? (
                      <div className="w-6 h-6 border-2 border-yellow-500 rounded-full" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">Deadline: {item.deadline}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === "ongoing" ? "bg-blue-100 text-blue-700" :
                      item.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {item.status === "ongoing" ? "Berjalan" : item.status === "pending" ? "Pending" : "Direncanakan"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Metodologi Tab */}
        {activeTab === "metodologi" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Metodologi Perhitungan Indikator
              </h2>
              <p className="text-white/80">
                Panduan lengkap cara menghitung setiap metrik dan indikator yang ditampilkan di dashboard ini. 
                Klik setiap kartu untuk melihat detail rumus, komponen, dan contoh perhitungan.
              </p>
            </div>

            {/* Quick Reference Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Cara Menggunakan Panduan Ini</h3>
                  <p className="text-sm text-amber-800">
                    Setiap indikator memiliki rumus dasar, komponen perhitungan, dan sumber data yang digunakan. 
                    Data yang ditampilkan di dashboard saat ini merupakan <strong>data simulasi</strong> untuk demonstrasi. 
                    Untuk implementasi nyata, diperlukan integrasi dengan sistem data dari BPS, Dinas LH, dan survei lapangan.
                  </p>
                </div>
              </div>
            </div>

            {/* Methodology Cards */}
            <div className="grid grid-cols-1 gap-4">
              {methodologyData.map((method) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  {/* Card Header */}
                  <button
                    onClick={() => setExpandedMethod(expandedMethod === method.id ? null : method.id)}
                    className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{method.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{method.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedMethod === method.id ? "rotate-90" : ""
                    }`} />
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedMethod === method.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-5 space-y-6">
                          {/* Main Formula */}
                          <div className="bg-blue-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calculator className="w-5 h-5 text-blue-600" />
                              <span className="font-semibold text-blue-900">Rumus Dasar</span>
                            </div>
                            <code className="text-blue-800 font-mono text-sm bg-blue-100 px-3 py-2 rounded-lg block">
                              {method.formula}
                            </code>
                          </div>

                          {/* Components */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <ClipboardList className="w-5 h-5 text-gray-400" />
                              Komponen Perhitungan
                            </h4>
                            <div className="space-y-4">
                              {method.components.map((comp, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-gray-900">{comp.name}</h5>
                                    <code className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700">
                                      {comp.formula}
                                    </code>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {comp.details.map((detail, detailIdx) => (
                                      <div key={detailIdx} className="flex items-center justify-between text-sm bg-white rounded-lg px-3 py-2">
                                        <span className="text-gray-600">{detail.item}</span>
                                        <span className="font-medium text-gray-900">{detail.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Example Calculation */}
                          {method.example && (
                            <div className="bg-green-50 rounded-xl p-4">
                              <h4 className="font-semibold text-green-900 mb-3">{method.example.title}</h4>
                              <div className="space-y-2">
                                {method.example.steps.map((step, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-800 text-xs font-bold flex-shrink-0">
                                      {idx + 1}
                                    </span>
                                    <span className="text-sm text-green-800">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Interpretation (for STI) */}
                          {method.interpretation && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Interpretasi Skor</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {method.interpretation.map((interp, idx) => (
                                  <div key={idx} className="text-center p-3 bg-gray-50 rounded-xl">
                                    <span className={`font-bold ${interp.color}`}>{interp.range}</span>
                                    <p className="text-xs text-gray-600 mt-1">{interp.label}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Source */}
                          <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
                            <FileText className="w-4 h-4" />
                            <span>Sumber: {method.source}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Data Sources Summary */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                Sumber Data untuk Implementasi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "BPS Sulawesi Selatan", desc: "Statistik wisatawan, akomodasi, tenaga kerja", icon: BarChart3 },
                  { name: "Dinas Lingkungan Hidup", desc: "Data emisi, pengelolaan sampah, kualitas air", icon: Leaf },
                  { name: "BMKG", desc: "Kualitas udara, data cuaca", icon: CloudRain },
                  { name: "Survei Wisatawan", desc: "Kepuasan, moda transportasi, pengeluaran", icon: ClipboardList },
                  { name: "Platform Digital", desc: "Google, TripAdvisor, Traveloka, Tiket.com", icon: Smartphone },
                  { name: "DISPENDA", desc: "Data pajak hotel, restoran, hiburan", icon: CircleDollarSign },
                ].map((source, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <source.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{source.name}</p>
                      <p className="text-xs text-gray-500">{source.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Documentation */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">Butuh Dokumentasi Lengkap?</h3>
                  <p className="text-white/80 text-sm">
                    Download panduan teknis lengkap untuk implementasi sistem monitoring pariwisata berkelanjutan.
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Modal */}
        <AnimatePresence>
          {showInfoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setShowInfoModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const method = methodologyData.find(m => m.id === showInfoModal);
                  if (!method) return null;
                  return (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${method.color} rounded-xl flex items-center justify-center`}>
                            <method.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900">{method.title}</h3>
                        </div>
                        <button 
                          onClick={() => setShowInfoModal(null)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{method.description}</p>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">Rumus</p>
                        <code className="text-blue-800 font-mono">{method.formula}</code>
                      </div>
                      <p className="text-xs text-gray-500 mt-4">Sumber: {method.source}</p>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p className="font-medium">Dashboard Eksekutif Dinas Pariwisata Provinsi Sulawesi Selatan</p>
          <p className="text-xs mt-1">Data terakhir diperbarui: {new Date().toLocaleString('id-ID')} | Sistem Informasi Pariwisata Terpadu v2.0</p>
        </div>
      </div>
    </main>
  );
}
