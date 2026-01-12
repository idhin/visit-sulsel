"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, ChevronDown, Camera, Store, Users, ShoppingCart, MessageSquare, Ticket } from "lucide-react";
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
  { href: "/guide", label: "Tour Guide", icon: Users, desc: "Pemandu wisata lokal" },
  { href: "/komunitas", label: "Komunitas", icon: MessageSquare, desc: "Forum & review" },
];

const aboutLinks = [
  { href: "/tentang", label: "Tentang Platform" },
  { href: "/dampak", label: "Dampak Ekonomi" },
  { href: "/akomodasi", label: "Akomodasi" },
  { href: "/itinerary", label: "Itinerary" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || !isHomepage
            ? "bg-deep-ocean/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center"
              >
                <MapPin className="w-5 h-5 text-deep-ocean" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-white">
                  Visit Sulsel
                </span>
                <span className={cn(
                  "text-[10px] tracking-widest uppercase transition-colors",
                  scrolled ? "text-gold-light" : "text-gold"
                )}>
                  Super App Pariwisata
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group text-white/90 hover:text-white"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold group-hover:w-3/4 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}

              {/* Services Dropdown */}
              <div ref={servicesRef} className="relative">
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    setAboutOpen(false);
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white/90 hover:text-white"
                >
                  Layanan
                  <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
                </motion.button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        {servicesLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                              <link.icon className="w-5 h-5 text-gold" />
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
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => {
                    setAboutOpen(!aboutOpen);
                    setServicesOpen(false);
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white/90 hover:text-white"
                >
                  Lainnya
                  <ChevronDown className={cn("w-4 h-4 transition-transform", aboutOpen && "rotate-180")} />
                </motion.button>

                <AnimatePresence>
                  {aboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="py-2">
                        {aboutLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setAboutOpen(false)}
                            className="block px-4 py-2.5 text-sm text-deep-ocean hover:bg-cream transition-colors"
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="hidden lg:block"
            >
              <Link
                href="/pesan"
                className="px-6 py-2.5 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 hover:scale-105"
              >
                Pesan Sekarang
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
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
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-deep-ocean shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {/* Main Links */}
                <div className="flex flex-col gap-1">
                  {mainNavLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Services */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="px-4 text-xs uppercase tracking-wider text-gold mb-2">Layanan</h3>
                  <div className="flex flex-col gap-1">
                    {servicesLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <link.icon className="w-5 h-5 text-gold" />
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* About */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="px-4 text-xs uppercase tracking-wider text-gold mb-2">Lainnya</h3>
                  <div className="flex flex-col gap-1">
                    {aboutLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <Link
                    href="/pesan"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-deep-ocean font-semibold rounded-full"
                  >
                    Pesan Sekarang
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
