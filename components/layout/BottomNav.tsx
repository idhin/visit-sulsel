"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Route, Heart, User, Home } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Beranda", href: "/" },
  { icon: Route, label: "Rencanakan", href: "/rencanakan" },
  { icon: Compass, label: "Jelajahi", href: "/jelajahi" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: User, label: "Akun", href: "/akun" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom lg:hidden">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 py-2 relative"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center ${isActive ? "text-blue-600" : "text-gray-500"}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-0.5 w-12 h-1 bg-blue-600 rounded-full"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <item.icon 
                    className={`w-6 h-6 ${isActive ? "text-blue-600" : "text-gray-400"}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={`text-[10px] mt-1 ${isActive ? "font-semibold text-blue-600" : "text-gray-500"}`}>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
