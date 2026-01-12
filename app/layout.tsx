import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientComponents from "@/components/layout/ClientComponents";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visit Sulsel | Jelajahi Keindahan Sulawesi Selatan",
  description:
    "Platform pariwisata resmi Provinsi Sulawesi Selatan. Temukan destinasi wisata menakjubkan, kuliner khas, budaya unik, dan event menarik di Sulsel.",
  keywords: [
    "Sulawesi Selatan",
    "Wisata Makassar",
    "Toraja",
    "Pariwisata Sulsel",
    "Pantai Losari",
    "Bantimurung",
  ],
  manifest: "/manifest.json",
  themeColor: "#0A2540",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Visit Sulsel",
  },
  openGraph: {
    title: "Visit Sulsel | Jelajahi Keindahan Sulawesi Selatan",
    description:
      "Platform pariwisata resmi Provinsi Sulawesi Selatan. Temukan destinasi wisata menakjubkan, kuliner khas, budaya unik, dan event menarik.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${jakarta.variable} antialiased bg-cream text-deep-ocean`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ClientComponents />
      </body>
    </html>
  );
}
