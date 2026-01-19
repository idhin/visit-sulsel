"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, ChevronDown, Camera, Users, ShoppingCart, MessageSquare, Ticket, Search, Heart, Moon, Sun, Globe, User } from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { href: "/", label: "Beranda" },
  { href: "/destinasi", label: "Destinasi" },
  { href: "/kuliner", label: "Kuliner" },
  { href: "/budaya", label: "Budaya" },
  { href: "/event", label: "Event" },
];

const servicesLinks = [
  { href: "/pesan", label: "Pesan", icon: Ticket, desc: "Tiket, hotel, paket wisata" },
  { href: "/belanja", label: "Belanja", icon: ShoppingCart, desc: "Produk UMKM lokal" },
  { href: "/kreator", label: "Creator Hub", icon: Camera, desc: "Fotografer & videografer" },
  { href: "/layanan/pemandu", label: "Pemandu", icon: Users, desc: "Layanan pemandu resmi" },
  { href: "/komunitas", label: "Komunitas", icon: MessageSquare, desc: "Forum & review" },
];

const aboutLinks = [
  { href: "/tentang", label: "Tentang Platform" },
  { href: "/dampak", label: "Dampak Ekonomi" },
  { href: "/akomodasi", label: "Akomodasi" },
  { href: "/rencanakan", label: "Rencanakan" },
  { href: "/peta", label: "Peta Wisata" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Load wishlist count
  useEffect(() => {
    const updateCount = () => {
      const saved = localStorage.getItem("visitsulsel_wishlist");
      if (saved) {
        try {
          const items = JSON.parse(saved);
          setWishlistCount(items.length);
        } catch {
          setWishlistCount(0);
        }
      }
    };
    updateCount();
    window.addEventListener("wishlistUpdate", updateCount);
    return () => window.removeEventListener("wishlistUpdate", updateCount);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHomepage
            ? "bg-deep-ocean/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <MapPin className="w-4 h-4 text-deep-ocean" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-heading text-lg font-bold text-white leading-tight">
                  Visit Sulsel
                </span>
                <span className="text-[9px] tracking-wider uppercase text-gold">
                  Super App Pariwisata
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname === link.href
                      ? "text-gold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    setAboutOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Layanan
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", servicesOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        {servicesLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-cream transition-colors"
                          >
                            <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center">
                              <link.icon className="w-4 h-4 text-gold" />
                            </div>
                            <div>
                              <div className="font-medium text-deep-ocean text-sm">{link.label}</div>
                              <div className="text-xs text-muted">{link.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Dropdown */}
              <div ref={aboutRef} className="relative">
                <button
                  onClick={() => {
                    setAboutOpen(!aboutOpen);
                    setServicesOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  Lainnya
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", aboutOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="py-1">
                        {aboutLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setAboutOpen(false)}
                            className="block px-4 py-2 text-sm text-deep-ocean hover:bg-cream transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/60 hidden md:inline">Cari...</span>
                <kbd className="hidden md:inline text-[10px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
              </button>

              {/* Icon buttons - visible on desktop */}
              <div className="hidden sm:flex items-center">
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 text-white/70 hover:text-white" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-gold" />
                  ) : (
                    <Moon className="w-5 h-5 text-white/70 hover:text-white" />
                  )}
                </button>

                {/* Language - simplified */}
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Globe className="w-5 h-5 text-white/70 hover:text-white" />
                </button>

                {/* User */}
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <User className="w-5 h-5 text-white/70 hover:text-white" />
                </button>
              </div>

              {/* CTA Button */}
              <Link
                href="/pesan"
                className="hidden lg:inline-flex ml-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-deep-ocean text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                Pesan
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors ml-1"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari destinasi, kuliner, event..."
                  autoFocus
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-lg"
                />
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">ESC</kbd>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-3">Jelajahi</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Destinasi", href: "/destinasi", icon: MapPin, color: "bg-blue-500/10 text-blue-500" },
                    { label: "Kuliner", href: "/kuliner", icon: ShoppingCart, color: "bg-orange-500/10 text-orange-500" },
                    { label: "Event", href: "/event", icon: Ticket, color: "bg-purple-500/10 text-purple-500" },
                    { label: "Akomodasi", href: "/akomodasi", icon: Users, color: "bg-green-500/10 text-green-500" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl ${item.color} hover:opacity-80 transition-opacity`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-deep-ocean shadow-2xl overflow-y-auto"
            >
              <div className="p-5 pt-20">
                {/* Search */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl mb-4"
                >
                  <Search className="w-5 h-5 text-white/60" />
                  <span className="text-white/60">Cari...</span>
                </button>

                {/* Main Links */}
                <div className="flex flex-col gap-1">
                  {mainNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg transition-colors",
                        pathname === link.href
                          ? "bg-gold/20 text-gold"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Services */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="px-4 text-xs uppercase tracking-wider text-gold mb-2">Layanan</h3>
                  <div className="flex flex-col gap-1">
                    {servicesLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                      >
                        <link.icon className="w-5 h-5 text-gold" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* About */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="px-4 text-xs uppercase tracking-wider text-gold mb-2">Lainnya</h3>
                  <div className="flex flex-col gap-1">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 px-2">
                    <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 rounded-lg text-white/80">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Wishlist</span>
                    </Link>
                    <button onClick={toggleTheme} className="p-2.5 bg-white/10 rounded-lg">
                      {isDark ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-white/80" />}
                    </button>
                  </div>
                  <Link
                    href="/pesan"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-xl"
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
