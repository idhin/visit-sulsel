"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar, Users, MapPin } from "lucide-react";

interface WhatsAppBookingProps {
  // Pre-fill data
  itemName?: string;
  itemType?: string;
  price?: number;
  // WhatsApp number (without +)
  phoneNumber?: string;
  // Floating button or inline
  variant?: "floating" | "inline" | "button";
  className?: string;
}

const DEFAULT_PHONE = "6281234567890"; // Replace with actual number

export default function WhatsAppBooking({
  itemName,
  itemType,
  price,
  phoneNumber = DEFAULT_PHONE,
  variant = "floating",
  className,
}: WhatsAppBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    guests: "2",
    notes: "",
  });

  const generateMessage = () => {
    let message = `Halo, saya ingin melakukan pemesanan melalui Visit Sulsel.\n\n`;
    
    if (itemName) {
      message += `📍 *${itemType || "Item"}:* ${itemName}\n`;
    }
    if (price) {
      message += `💰 *Harga:* Rp${price.toLocaleString("id-ID")}\n`;
    }
    
    message += `\n*Data Pemesan:*\n`;
    message += `👤 Nama: ${formData.name || "-"}\n`;
    message += `📅 Tanggal: ${formData.date || "-"}\n`;
    message += `👥 Jumlah Tamu: ${formData.guests} orang\n`;
    
    if (formData.notes) {
      message += `📝 Catatan: ${formData.notes}\n`;
    }
    
    message += `\nTerima kasih! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = generateMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setIsOpen(false);
  };

  const handleQuickBook = () => {
    let message = `Halo, saya tertarik dengan `;
    if (itemName) {
      message += `*${itemName}*`;
    } else {
      message += `layanan Visit Sulsel`;
    }
    message += `. Bisa dibantu untuk informasi lebih lanjut?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Inline button variant
  if (variant === "button") {
    return (
      <button
        onClick={handleQuickBook}
        className={`flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
        Pesan via WhatsApp
      </button>
    );
  }

  // Inline variant
  if (variant === "inline") {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
        Pesan via WhatsApp
      </button>
    );
  }

  // Floating variant (default)
  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors"
        aria-label="Pesan via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-green-500 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold">Pesan via WhatsApp</h3>
                      <p className="text-white/80 text-sm">Respons cepat dalam hitungan menit</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {itemName && (
                  <div className="mt-4 p-3 bg-white/10 rounded-xl">
                    <p className="text-sm text-white/70">{itemType || "Item"}</p>
                    <p className="font-semibold">{itemName}</p>
                    {price && (
                      <p className="text-green-200 font-bold mt-1">
                        Rp{price.toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Users className="w-4 h-4 inline mr-1" />
                      Jumlah Tamu
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} orang
                        </option>
                      ))}
                      <option value="10+">10+ orang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catatan (opsional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Permintaan khusus, pertanyaan, dll."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Kirim via WhatsApp
                </button>

                <p className="text-center text-xs text-gray-500">
                  Anda akan diarahkan ke WhatsApp untuk melanjutkan pemesanan
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
