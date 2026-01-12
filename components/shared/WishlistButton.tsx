"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  id: string;
  type: "destinasi" | "kuliner" | "event" | "akomodasi";
  name: string;
  image: string;
  location?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const STORAGE_KEY = "visitsulsel_wishlist";

interface WishlistItem {
  id: string;
  type: string;
  name: string;
  image: string;
  location?: string;
  addedAt: number;
}

export default function WishlistButton({
  id,
  type,
  name,
  image,
  location,
  className,
  size = "md",
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Check if item is in wishlist on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const items: WishlistItem[] = JSON.parse(saved);
        setIsInWishlist(items.some((i) => i.id === id && i.type === type));
      } catch {
        console.error("Failed to parse wishlist");
      }
    }
  }, [id, type]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const saved = localStorage.getItem(STORAGE_KEY);
    let items: WishlistItem[] = saved ? JSON.parse(saved) : [];

    const exists = items.some((i) => i.id === id && i.type === type);

    if (exists) {
      items = items.filter((i) => !(i.id === id && i.type === type));
      setIsInWishlist(false);
      setToastMessage("Dihapus dari wishlist");
    } else {
      items.push({ id, type, name, image, location, addedAt: Date.now() });
      setIsInWishlist(true);
      setToastMessage("Ditambahkan ke wishlist");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent("wishlistUpdate", { detail: items }));

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleWishlist}
        className={cn(
          "rounded-full flex items-center justify-center transition-all",
          isInWishlist
            ? "bg-red-500 text-white"
            : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500",
          sizeClasses[size],
          className
        )}
        aria-label={isInWishlist ? "Hapus dari wishlist" : "Tambah ke wishlist"}
      >
        <Heart
          className={cn(iconSizes[size], isInWishlist && "fill-current")}
        />
      </motion.button>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] px-4 py-2 bg-deep-ocean text-white rounded-full shadow-lg flex items-center gap-2"
          >
            <Heart className={cn("w-4 h-4", isInWishlist && "fill-red-500 text-red-500")} />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
