"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "id" | "en";

interface Translations {
  [key: string]: {
    id: string;
    en: string;
  };
}

// Comprehensive translations
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
  "nav.plan": { id: "Rencanakan", en: "Plan Trip" },
  "nav.explore": { id: "Jelajahi", en: "Explore" },
  "nav.wishlist": { id: "Wishlist", en: "Wishlist" },
  "nav.account": { id: "Akun", en: "Account" },
  
  // Hero
  "hero.badge": { id: "Super App Pariwisata Sulawesi Selatan", en: "South Sulawesi Tourism Super App" },
  "hero.title": { id: "Jelajahi Keindahan Sulawesi Selatan", en: "Explore the Beauty of South Sulawesi" },
  "hero.title_highlight": { id: "Satu Platform", en: "One Platform" },
  "hero.description": { 
    id: "Dari pegunungan Toraja hingga pantai Bira, temukan destinasi impianmu",
    en: "From Toraja highlands to Bira beaches, discover your dream destination"
  },
  "hero.cta": { id: "Mulai Rencanakan Trip", en: "Start Planning Your Trip" },
  "hero.origin_question": { id: "Dari mana kamu akan berkunjung?", en: "Where are you traveling from?" },

  // Mode Toggle
  "mode.planning": { id: "Perencanaan", en: "Planning" },
  "mode.onlocation": { id: "Di Lokasi", en: "On Location" },
  "mode.planning_desc": { id: "Rencanakan perjalanan dari kota asalmu ke Sulawesi Selatan", en: "Plan your trip from your city to South Sulawesi" },
  "mode.onlocation_desc": { id: "Sudah di Sulsel? Temukan kuliner & oleh-oleh terdekat", en: "Already in South Sulawesi? Find nearby food & souvenirs" },

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
  "common.free": { id: "Gratis", en: "Free" },
  "common.back": { id: "Kembali", en: "Back" },
  "common.next": { id: "Lanjut", en: "Next" },
  "common.save": { id: "Simpan", en: "Save" },
  "common.cancel": { id: "Batal", en: "Cancel" },
  "common.close": { id: "Tutup", en: "Close" },
  "common.add": { id: "Tambah", en: "Add" },
  "common.remove": { id: "Hapus", en: "Remove" },
  "common.day": { id: "Hari", en: "Day" },
  "common.days": { id: "Hari", en: "Days" },
  "common.night": { id: "Malam", en: "Night" },
  "common.nights": { id: "Malam", en: "Nights" },
  "common.hour": { id: "jam", en: "hour" },
  "common.hours": { id: "jam", en: "hours" },
  "common.minute": { id: "menit", en: "minute" },
  "common.minutes": { id: "menit", en: "minutes" },
  "common.person": { id: "orang", en: "person" },
  "common.people": { id: "orang", en: "people" },

  // Sections
  "section.destinations.title": { id: "Destinasi Populer", en: "Popular Destinations" },
  "section.destinations.subtitle": { id: "Tempat wisata terfavorit di Sul-Sel", en: "Top favorite places in South Sulawesi" },
  "section.culinary.title": { id: "Kuliner Sulsel", en: "South Sulawesi Cuisine" },
  "section.culinary.subtitle": { id: "Cita rasa khas yang wajib dicoba", en: "Must-try local flavors" },
  "section.events.title": { id: "Event Mendatang", en: "Upcoming Events" },
  "section.events.subtitle": { id: "Festival dan acara menarik", en: "Festivals and exciting events" },
  "section.packages.title": { id: "Paket Perjalanan", en: "Travel Packages" },
  "section.packages.subtitle": { id: "Itinerary siap pakai untuk liburanmu", en: "Ready-to-use itineraries for your trip" },
  "section.categories.title": { id: "Jelajahi Berdasarkan Kategori", en: "Explore by Category" },
  "section.services.title": { id: "Layanan Lainnya", en: "Other Services" },
  "section.promo.title": { id: "Promo & Penawaran", en: "Promos & Offers" },

  // Trip Planning
  "trip.select_template": { id: "Pilih Template", en: "Select Template" },
  "trip.start_scratch": { id: "Buat dari Awal", en: "Start from Scratch" },
  "trip.start_scratch_desc": { id: "Susun itinerary sesuai preferensimu sendiri", en: "Create your own custom itinerary" },
  "trip.popular_templates": { id: "Template Populer", en: "Popular Templates" },
  "trip.all_templates": { id: "Semua Template", en: "All Templates" },
  "trip.origin": { id: "Kota Asal", en: "Origin City" },
  "trip.date_duration": { id: "Tanggal & Durasi", en: "Date & Duration" },
  "trip.destinations": { id: "Destinasi", en: "Destinations" },
  "trip.accommodation": { id: "Akomodasi", en: "Accommodation" },
  "trip.summary": { id: "Ringkasan", en: "Summary" },
  "trip.budget_estimate": { id: "Estimasi Budget", en: "Budget Estimate" },
  "trip.travelers": { id: "Wisatawan", en: "Travelers" },
  "trip.start_date": { id: "Tanggal Keberangkatan", en: "Departure Date" },
  "trip.duration": { id: "Durasi Perjalanan", en: "Trip Duration" },
  "trip.save_plan": { id: "Simpan Rencana", en: "Save Plan" },
  "trip.add_to_trip": { id: "Tambah ke Trip", en: "Add to Trip" },
  "trip.plan_saved": { id: "Rencana Perjalanan Tersimpan!", en: "Trip Plan Saved!" },
  "trip.plan_code": { id: "Kode Rencana Perjalanan", en: "Trip Plan Code" },

  // Categories
  "category.nature": { id: "Alam", en: "Nature" },
  "category.beach": { id: "Pantai", en: "Beach" },
  "category.culture": { id: "Budaya", en: "Culture" },
  "category.history": { id: "Sejarah", en: "History" },
  "category.food": { id: "Makanan", en: "Food" },
  "category.snacks": { id: "Jajanan", en: "Snacks" },
  "category.drinks": { id: "Minuman", en: "Drinks" },

  // Onboarding
  "onboarding.welcome": { id: "Selamat Datang", en: "Welcome" },
  "onboarding.title": { id: "Jelajahi Sulawesi Selatan", en: "Explore South Sulawesi" },
  "onboarding.description": { id: "Dari keindahan Tana Toraja hingga pantai eksotis Bira, temukan petualangan tak terlupakan.", en: "From the beauty of Tana Toraja to the exotic beaches of Bira, discover unforgettable adventures." },
  "onboarding.start": { id: "Mulai Sekarang", en: "Get Started" },
  "onboarding.skip": { id: "Lewati untuk sekarang", en: "Skip for now" },
  "onboarding.where_are_you": { id: "Di mana kamu sekarang?", en: "Where are you now?" },
  "onboarding.customize_experience": { id: "Kami akan sesuaikan pengalaman untukmu", en: "We'll customize your experience" },
  "onboarding.not_in_sulsel": { id: "Belum di Sulawesi Selatan", en: "Not in South Sulawesi yet" },
  "onboarding.not_in_sulsel_desc": { id: "Saya ingin merencanakan perjalanan", en: "I want to plan my trip" },
  "onboarding.in_sulsel": { id: "Sudah di Sulawesi Selatan", en: "Already in South Sulawesi" },
  "onboarding.in_sulsel_desc": { id: "Saya ingin jelajahi sekitar", en: "I want to explore around" },

  // Stats
  "stats.visitors": { id: "Wisatawan/tahun", en: "Visitors/year" },
  "stats.destinations": { id: "Destinasi Wisata", en: "Tourist Destinations" },
  "stats.districts": { id: "Kabupaten/Kota", en: "Districts/Cities" },
  "stats.official_platform": { id: "Platform Resmi Pariwisata Sul-Sel", en: "Official South Sulawesi Tourism Platform" },

  // Footer
  "footer.tagline": { id: "Jelajahi Keindahan Sulawesi Selatan", en: "Explore the Beauty of South Sulawesi" },
  "footer.rights": { id: "Hak Cipta Dilindungi", en: "All Rights Reserved" },
  "footer.about": { id: "Tentang", en: "About" },
  "footer.contact": { id: "Kontak", en: "Contact" },
  "footer.privacy": { id: "Privasi", en: "Privacy" },
  "footer.terms": { id: "Ketentuan", en: "Terms" },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "id" || saved === "en")) {
      setLocaleState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en") {
        setLocaleState("en");
      }
      // Default to "id" for Indonesian and other languages
    }
    setIsInitialized(true);
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

  // Prevent flash of wrong language
  if (!isInitialized) {
    return null;
  }

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
