"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Users, Landmark, Star } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: 24,
    suffix: "",
    label: "Kabupaten & Kota",
    description: "Area administratif",
  },
  {
    icon: Landmark,
    value: 500,
    suffix: "+",
    label: "Destinasi Wisata",
    description: "Tempat untuk dijelajahi",
  },
  {
    icon: Users,
    value: 2,
    suffix: "M+",
    label: "Wisatawan/Tahun",
    description: "Pengunjung domestik & internasional",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "/5",
    label: "Rating Kepuasan",
    description: "Dari wisatawan",
  },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  const formattedValue =
    value % 1 === 0 ? Math.round(displayValue) : displayValue.toFixed(1);

  return (
    <span>
      {formattedValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-maroon relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                <stat.icon className="w-8 h-8 text-gold" />
              </div>
              <div className="font-heading text-4xl lg:text-5xl font-bold text-white mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/60 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
