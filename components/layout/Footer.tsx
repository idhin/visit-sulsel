"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowUp,
  Heart,
} from "lucide-react";

const footerLinks = {
  jelajahi: [
    { label: "Destinasi", href: "/destinasi" },
    { label: "Kuliner", href: "/kuliner" },
    { label: "Budaya", href: "/budaya" },
    { label: "Event", href: "/event" },
    { label: "Akomodasi", href: "/akomodasi" },
  ],
  layanan: [
    { label: "Pesan", href: "/pesan" },
    { label: "Belanja", href: "/belanja" },
    { label: "Creator Hub", href: "/kreator" },
    { label: "Pemandu", href: "/layanan/pemandu" },
    { label: "Komunitas", href: "/komunitas" },
  ],
  tentang: [
    { label: "Tentang Platform", href: "/tentang" },
    { label: "Dampak Ekonomi", href: "/dampak" },
    { label: "Rencanakan", href: "/rencanakan" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontak", href: "/kontak" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-deep-ocean text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-deep-ocean" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-2xl font-bold text-white">
                    Visit Sulsel
                  </span>
                  <span className="text-xs tracking-widest uppercase text-gold">
                    Super App Pariwisata
                  </span>
                </div>
              </Link>
              <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
                Platform pariwisata digital terintegrasi untuk Sulawesi Selatan. 
                Menghubungkan wisatawan dengan destinasi, UMKM, kreator, dan tour guide lokal.
              </p>
              <div className="space-y-3 text-white/70">
                <a
                  href="tel:+624111234567"
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+62 411 123 4567</span>
                </a>
                <a
                  href="mailto:info@visitsulsel.id"
                  className="flex items-center gap-3 hover:text-gold transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@visitsulsel.id</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>
                    Jl. Urip Sumoharjo No. 269, Makassar,
                    <br />
                    Sulawesi Selatan 90231
                  </span>
                </div>
              </div>
            </div>

            {/* Links columns */}
            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-gold">
                Jelajahi
              </h4>
              <ul className="space-y-2">
                {footerLinks.jelajahi.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-gold">
                Layanan
              </h4>
              <ul className="space-y-2">
                {footerLinks.layanan.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-semibold mb-4 text-gold">
                Tentang
              </h4>
              <ul className="space-y-2">
                {footerLinks.tentang.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social links */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-deep-ocean transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-gold hover:text-deep-ocean transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Kembali ke Atas</span>
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-black/20 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-3 text-sm">
              <p className="text-white/70 text-center">
                by <span className="font-semibold text-gold">Dinas Pariwisata Provinsi Sulawesi Selatan</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-white/50">
                <p>© {new Date().getFullYear()} Visit Sulsel</p>
                <span className="hidden sm:inline">•</span>
                <p className="flex items-center gap-1">
                  Dibuat dengan <Heart className="w-4 h-4 text-maroon fill-maroon" /> di Sulawesi Selatan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
