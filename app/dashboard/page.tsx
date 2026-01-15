"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  Store,
  Camera,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  Building2,
  Shield,
} from "lucide-react";

const metrics = [
  {
    title: "Total Pengunjung",
    value: "1,284,732",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Total Transaksi",
    value: "Rp 24.5 M",
    change: "+22.1%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500",
  },
  {
    title: "UMKM Aktif",
    value: "8,234",
    change: "+8.7%",
    trend: "up",
    icon: Store,
    color: "bg-purple-500",
  },
  {
    title: "Tour Guide",
    value: "156",
    change: "+12.4%",
    trend: "up",
    icon: Users,
    color: "bg-orange-500",
  },
];

const topDestinations = [
  { name: "Tana Toraja", visitors: 45210, percent: 100, trend: "+12%" },
  { name: "Pantai Bira", visitors: 38470, percent: 85, trend: "+8%" },
  { name: "Rammang-Rammang", visitors: 29320, percent: 65, trend: "+15%" },
  { name: "Fort Rotterdam", visitors: 24150, percent: 53, trend: "+5%" },
  { name: "Bantimurung", visitors: 21890, percent: 48, trend: "+10%" },
];

const recentTransactions = [
  { id: "TRX001", type: "Booking Hotel", amount: "Rp 2.450.000", status: "success", time: "2 menit lalu" },
  { id: "TRX002", type: "Tiket Destinasi", amount: "Rp 150.000", status: "success", time: "5 menit lalu" },
  { id: "TRX003", type: "Produk UMKM", amount: "Rp 875.000", status: "pending", time: "8 menit lalu" },
  { id: "TRX004", type: "Tour Guide", amount: "Rp 1.200.000", status: "success", time: "12 menit lalu" },
  { id: "TRX005", type: "Paket Wisata", amount: "Rp 5.500.000", status: "success", time: "15 menit lalu" },
];

const weeklyData = [
  { day: "Sen", visitors: 12500, transactions: 450 },
  { day: "Sel", visitors: 15200, transactions: 520 },
  { day: "Rab", visitors: 11800, transactions: 380 },
  { day: "Kam", visitors: 18900, transactions: 620 },
  { day: "Jum", visitors: 22100, transactions: 780 },
  { day: "Sab", visitors: 28500, transactions: 950 },
  { day: "Min", visitors: 25800, transactions: 870 },
];

const maxVisitors = Math.max(...weeklyData.map((d) => d.visitors));

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-deep-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard Analytics</h1>
                  <p className="text-white/60 text-sm">Platform Visit Sulsel</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Preview Mode
              </span>
              <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Live Data Simulation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-gold/10 border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="w-5 h-5 text-gold" />
            <p className="text-deep-ocean">
              <span className="font-semibold">Untuk Dinas Pariwisata:</span> Ini adalah preview dashboard. 
              Data lengkap dan real-time tersedia setelah kerjasama resmi.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              7 Hari Terakhir
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-deep-ocean text-white rounded-lg text-sm font-medium hover:bg-deep-ocean/90">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {metric.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-deep-ocean mb-1">{metric.value}</p>
              <p className="text-gray-500 text-sm">{metric.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visitor Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-deep-ocean">Trend Pengunjung</h3>
                  <p className="text-gray-500 text-sm">7 hari terakhir</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full" />
                    Pengunjung
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gold rounded-full" />
                    Transaksi
                  </span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="h-64 flex items-end gap-4">
                {weeklyData.map((data, index) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end h-48">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.visitors / maxVisitors) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex-1 bg-blue-500 rounded-t-md"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.transactions / 1000) * 100}%` }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex-1 bg-gold rounded-t-md"
                      />
                    </div>
                    <span className="text-gray-500 text-xs">{data.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-deep-ocean">Transaksi Terbaru</h3>
                  <p className="text-gray-500 text-sm">Update real-time</p>
                </div>
                <button className="text-gold text-sm font-medium hover:underline">Lihat Semua</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b border-gray-100">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Tipe</th>
                      <th className="pb-3 font-medium">Jumlah</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((trx) => (
                      <tr key={trx.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 text-sm font-medium text-deep-ocean">{trx.id}</td>
                        <td className="py-3 text-sm text-gray-600">{trx.type}</td>
                        <td className="py-3 text-sm font-medium text-deep-ocean">{trx.amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              trx.status === "success"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {trx.status === "success" ? "Sukses" : "Pending"}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{trx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Destinations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-deep-ocean">Top Destinasi</h3>
                  <p className="text-gray-500 text-sm">Berdasarkan kunjungan</p>
                </div>
                <MapPin className="w-5 h-5 text-gold" />
              </div>

              <div className="space-y-4">
                {topDestinations.map((dest, index) => (
                  <div key={dest.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-deep-ocean">{dest.name}</span>
                      </div>
                      <span className="text-emerald-500 text-xs font-medium">{dest.trend}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${dest.percent}%` }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                        />
                      </div>
                      <span className="text-gray-500 text-xs w-16 text-right">
                        {dest.visitors.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Revenue by Category */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-deep-ocean">Revenue per Kategori</h3>
                  <p className="text-gray-500 text-sm">Bulan ini</p>
                </div>
                <PieChart className="w-5 h-5 text-gold" />
              </div>

              <div className="space-y-4">
                {[
                  { name: "Booking Hotel", value: "Rp 8.2M", percent: 35, color: "bg-blue-500" },
                  { name: "Tiket Destinasi", value: "Rp 6.5M", percent: 28, color: "bg-emerald-500" },
                  { name: "Produk UMKM", value: "Rp 5.1M", percent: 22, color: "bg-purple-500" },
                  { name: "Tour Guide", value: "Rp 3.5M", percent: 15, color: "bg-orange-500" },
                ].map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${cat.color} rounded-full`} />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{cat.name}</span>
                        <span className="font-medium text-deep-ocean">{cat.value}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-deep-ocean to-deep-ocean/90 rounded-2xl p-6 text-white"
            >
              <h3 className="font-semibold mb-2">Ingin Data Lengkap?</h3>
              <p className="text-white/70 text-sm mb-4">
                Dashboard lengkap dengan data real-time tersedia setelah kerjasama resmi dengan Dinas Pariwisata.
              </p>
              <button className="w-full py-3 bg-gold text-deep-ocean font-semibold rounded-xl hover:bg-gold-light transition-colors">
                Hubungi Kami
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
