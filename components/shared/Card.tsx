"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
  location?: string;
  rating?: number;
  category?: string;
  price?: string;
  className?: string;
  variant?: "default" | "horizontal" | "featured";
}

export default function Card({
  title,
  description,
  image,
  href,
  location,
  rating,
  category,
  price,
  className = "",
  variant = "default",
}: CardProps) {
  if (variant === "horizontal") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex",
          className
        )}
      >
        <div className="relative w-48 flex-shrink-0 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {category && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-gold text-deep-ocean text-xs font-semibold rounded-full">
              {category}
            </span>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-deep-ocean mb-2 group-hover:text-gold transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-muted text-sm line-clamp-2 mb-3">{description}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            {location && (
              <span className="flex items-center gap-1 text-sm text-muted">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
            )}
            <Link
              href={href}
              className="text-gold font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Lihat <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className={cn(
          "group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500",
          className
        )}
      >
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/90 via-deep-ocean/20 to-transparent" />
          {category && (
            <span className="absolute top-4 left-4 px-4 py-1.5 bg-gold text-deep-ocean text-sm font-semibold rounded-full">
              {category}
            </span>
          )}
          {rating && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-sm font-semibold text-deep-ocean">{rating}</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-heading text-2xl font-bold mb-2">{title}</h3>
            {location && (
              <span className="flex items-center gap-1 text-white/80 text-sm mb-3">
                <MapPin className="w-4 h-4" />
                {location}
              </span>
            )}
            {description && (
              <p className="text-white/70 text-sm line-clamp-2 mb-4">{description}</p>
            )}
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gold text-deep-ocean font-semibold rounded-full hover:gap-3 transition-all"
            >
              Jelajahi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default card
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-gold text-deep-ocean text-xs font-semibold rounded-full">
            {category}
          </span>
        )}
        {rating && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span className="text-xs font-semibold text-deep-ocean">{rating}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-xl font-bold text-deep-ocean mb-2 group-hover:text-gold transition-colors">
          {title}
        </h3>
        {location && (
          <span className="flex items-center gap-1 text-muted text-sm mb-2">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        )}
        {description && (
          <p className="text-muted text-sm line-clamp-2 mb-4">{description}</p>
        )}
        <div className="flex items-center justify-between">
          {price && (
            <span className="text-gold font-semibold">{price}</span>
          )}
          <Link
            href={href}
            className="text-deep-ocean font-medium text-sm flex items-center gap-1 group-hover:text-gold group-hover:gap-2 transition-all"
          >
            Lihat Detail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
