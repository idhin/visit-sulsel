"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Clock, PartyPopper, Landmark, UtensilsCrossed, Trophy, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import eventsData from "@/data/events.json";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Calendar,
  PartyPopper,
  Landmark,
  UtensilsCrossed,
  Trophy,
};

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="bg-deep-ocean text-white text-2xl sm:text-3xl font-bold w-14 sm:w-16 h-14 sm:h-16 rounded-xl flex items-center justify-center">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-muted mt-1 capitalize">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventPage() {
  const [activeCategory, setActiveCategory] = useState("semua");

  const upcomingEvents = eventsData.events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

  const filteredEvents = upcomingEvents.filter((event) => {
    return activeCategory === "semua" || event.category === activeCategory;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}`;
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <main className="pt-20">
      {/* Hero with Featured Event */}
      {featuredEvent && (
        <section className="relative min-h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <Image
              src={featuredEvent.image}
              alt={featuredEvent.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/95 via-deep-ocean/80 to-deep-ocean/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4"
              >
                <PartyPopper className="w-4 h-4" />
                Event Unggulan
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {featuredEvent.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 text-white/80 mb-6"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDateRange(featuredEvent.date, featuredEvent.endDate)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {featuredEvent.location}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-white/80 mb-8"
              >
                {featuredEvent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-white/60 text-sm mb-3">Dimulai dalam:</p>
                <Countdown targetDate={featuredEvent.date} />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {eventsData.categories.map((cat) => {
              const IconComponent = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-deep-ocean text-white shadow-lg"
                      : "bg-cream text-deep-ocean hover:bg-cream-dark"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subtitle="Agenda 2026"
            title="Event & Festival Mendatang"
            description="Jadwal event dan festival yang bisa Anda kunjungi di Sulawesi Selatan"
          />

          <StaggerContainer className="space-y-6">
            {filteredEvents.map((event) => (
              <StaggerItem key={event.id}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover"
                      />
                      {event.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-deep-ocean text-xs font-semibold rounded-full">
                          Unggulan
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-deep-ocean/10 text-deep-ocean text-xs font-semibold rounded-full capitalize">
                            {event.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-deep-ocean mb-2">
                          {event.name}
                        </h3>

                        <p className="text-muted line-clamp-2 mb-4">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {/* Date badge */}
                          <div className="flex items-center gap-3">
                            <div className="bg-maroon text-white rounded-lg overflow-hidden text-center">
                              <div className="bg-maroon-light text-xs px-3 py-1 uppercase">
                                {new Date(event.date).toLocaleDateString("id-ID", { month: "short" })}
                              </div>
                              <div className="text-xl font-bold py-1 px-3">
                                {new Date(event.date).getDate()}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-deep-ocean">
                                {formatDateRange(event.date, event.endDate)}
                              </div>
                              <div className="text-xs text-muted">
                                {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} hari lagi
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all">
                          Detail Event
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-muted mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2">
                Tidak ada event
              </h3>
              <p className="text-muted">
                Belum ada event untuk kategori ini. Coba pilih kategori lain.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Calendar View Teaser */}
      <section className="py-16 bg-deep-ocean">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper>
            <Calendar className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Kalender Event 2026
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Lihat semua event dalam tampilan kalender untuk memudahkan Anda
              merencanakan perjalanan ke Sulawesi Selatan.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all">
              Lihat Kalender Lengkap
            </button>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}
