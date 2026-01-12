"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "visitsulsel_wishlist";

export default function WishlistIcon() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initial load
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const items = JSON.parse(saved);
        setCount(items.length);
      } catch {
        console.error("Failed to parse wishlist");
      }
    }

    // Listen for updates
    const handleUpdate = (e: CustomEvent) => {
      setCount(e.detail?.length || 0);
    };
    window.addEventListener("wishlistUpdate", handleUpdate as EventListener);
    return () => window.removeEventListener("wishlistUpdate", handleUpdate as EventListener);
  }, []);

  return (
    <Link
      href="/wishlist"
      className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
      aria-label="Wishlist"
    >
      <Heart className="w-5 h-5 text-white/80 hover:text-white" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}
