"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MotionWrapper, { StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import eventsData from "@/data/events.json";

const upcomingEvents = eventsData.events
  .filter((e) => new Date(e.date) > new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(0, 4);

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDaysUntil(dateStr: string) {
  const now = new Date();
  const eventDate = new Date(dateStr);
  const diff = eventDate.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
}

export default function UpcomingEvents() {
  return (
    <section className="py-24 bg-cream-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeader
            subtitle="Event & Festival"
            title="Agenda Mendatang"
            description="Jangan lewatkan event dan festival menarik di Sulawesi Selatan"
            align="left"
            className="mb-0"
          />
          <MotionWrapper delay={0.3}>
            <Link
              href="/event"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
            >
              Lihat Semua Event
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MotionWrapper>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => {
            const daysUntil = getDaysUntil(event.date);
            return (
              <StaggerItem key={event.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/60 via-transparent to-transparent" />
                    
                    {/* Countdown badge */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-maroon text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysUntil > 0 ? `${daysUntil} hari lagi` : "Berlangsung"}
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-3 left-3 bg-white rounded-lg overflow-hidden shadow-lg">
                      <div className="bg-maroon text-white text-xs font-bold px-3 py-1 text-center uppercase">
                        {new Date(event.date).toLocaleDateString("id-ID", { month: "short" })}
                      </div>
                      <div className="text-deep-ocean text-xl font-bold px-3 py-1 text-center">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-deep-ocean mb-2 line-clamp-1 group-hover:text-gold transition-colors">
                      {event.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-muted text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
