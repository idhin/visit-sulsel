"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "id" | "en";

interface Translations {
  [key: string]: {
    id: string;
    en: string;
  };
}

// Basic translations
const translations: Translations = {
  // Navbar
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.destinations": { id: "Destinasi", en: "Destinations" },
  "nav.culinary": { id: "Kuliner", en: "Culinary" },
  "nav.culture": { id: "Budaya", en: "Culture" },
  "nav.events": { id: "Event", en: "Events" },
  "nav.services": { id: "Layanan", en: "Services" },
  "nav.more": { id: "Lainnya", en: "More" },
  "nav.book_now": { id: "Pesan Sekarang", en: "Book Now" },
  
  // Hero
  "hero.badge": { id: "Super App Pariwisata Sulawesi Selatan", en: "South Sulawesi Tourism Super App" },
  "hero.title": { id: "Jelajahi, Pesan, Belanja —", en: "Explore, Book, Shop —" },
  "hero.title_highlight": { id: "Satu Platform", en: "One Platform" },
  "hero.description": { 
    id: "Visit Sulsel menghubungkan Anda dengan destinasi wisata, UMKM lokal, kreator berbakat, dan tour guide profesional.",
    en: "Visit Sulsel connects you with tourist destinations, local SMEs, talented creators, and professional tour guides."
  },
  "hero.cta": { id: "Mulai Sekarang", en: "Get Started" },
  "hero.learn_more": { id: "Pelajari Platform", en: "Learn More" },

  // Common
  "common.search": { id: "Cari...", en: "Search..." },
  "common.see_all": { id: "Lihat Semua", en: "See All" },
  "common.see_details": { id: "Lihat Detail", en: "See Details" },
  "common.book": { id: "Pesan", en: "Book" },
  "common.share": { id: "Bagikan", en: "Share" },
  "common.popular": { id: "Populer", en: "Popular" },
  "common.featured": { id: "Unggulan", en: "Featured" },
  "common.price": { id: "Harga", en: "Price" },
  "common.location": { id: "Lokasi", en: "Location" },
  "common.rating": { id: "Rating", en: "Rating" },
  "common.reviews": { id: "ulasan", en: "reviews" },

  // Sections
  "section.destinations.subtitle": { id: "Destinasi Populer", en: "Popular Destinations" },
  "section.destinations.title": { id: "Tempat Wisata Terfavorit", en: "Top Favorite Places" },
  "section.culinary.subtitle": { id: "Kuliner Khas", en: "Local Cuisine" },
  "section.culinary.title": { id: "Cita Rasa Sulawesi Selatan", en: "Taste of South Sulawesi" },
  "section.events.subtitle": { id: "Agenda Mendatang", en: "Upcoming Events" },
  "section.events.title": { id: "Event & Festival", en: "Events & Festivals" },

  // Footer
  "footer.tagline": { id: "Jelajahi Keindahan Sulawesi Selatan", en: "Explore the Beauty of South Sulawesi" },
  "footer.rights": { id: "Hak Cipta Dilindungi", en: "All Rights Reserved" },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "id" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[locale];
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useI18n();
  return { t };
}
