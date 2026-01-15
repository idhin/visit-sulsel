"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Store, MapPin, CreditCard, Building2 } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 40,
    suffix: "+ Juta",
    label: "Wisnus per Tahun",
    description: "Perjalanan wisatawan nusantara",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Users,
    value: 18,
    suffix: "-20 Ribu",
    label: "Wisman per Tahun",
    description: "Naik 27-37% dari 2024",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Store,
    value: 15,
    suffix: ".000+",
    label: "UMKM Pariwisata",
    description: "Siap melayani wisatawan",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: CreditCard,
    value: 75,
    suffix: "%",
    label: "Adopsi Digital",
    description: "UMKM sudah pakai QRIS",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: MapPin,
    value: 8,
    suffix: "+",
    label: "Destinasi Unggulan",
    description: "Toraja, Bira, Rammang-Rammang",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Building2,
    value: 8,
    suffix: "%",
    label: "Kontribusi PDRB",
    description: "Potensi besar ditingkatkan",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-heading text-4xl lg:text-5xl font-bold">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-16 bg-gradient-to-b from-deep-ocean to-deep-ocean/95 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full text-gold text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Data Pariwisata Sulawesi Selatan 2025
          </span>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
            Potensi Besar, Siap Dikelola
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Sulawesi Selatan memiliki potensi wisata yang luar biasa. Platform Visit Sulsel hadir untuk mengoptimalkan potensi ini.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-colors group"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={stat.color}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-medium mt-2">{stat.label}</div>
              <div className="text-white/50 text-sm mt-1">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Source */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/40 text-sm mt-8"
        >
          Sumber: BPS Sulawesi Selatan 2025 (perjalanan, bukan unique visitor)
        </motion.p>
      </div>
    </section>
  );
}
