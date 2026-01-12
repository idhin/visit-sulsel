"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Copy, Check, Facebook, Twitter, MessageCircle, Link2 } from "lucide-react";

interface ShareButtonProps {
  url?: string;
  title: string;
  description?: string;
  variant?: "icon" | "button" | "dropdown";
  className?: string;
}

export default function ShareButton({
  url,
  title,
  description,
  variant = "icon",
  className,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = description || title;

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    } else {
      setIsOpen(true);
    }
  };

  // Icon only variant
  if (variant === "icon") {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNativeShare}
          className={`w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-deep-ocean transition-colors ${className}`}
          aria-label="Bagikan"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>

        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shareLinks={shareLinks}
          onCopyLink={handleCopyLink}
          copied={copied}
          title={title}
        />
      </>
    );
  }

  // Button variant
  if (variant === "button") {
    return (
      <>
        <button
          onClick={handleNativeShare}
          className={`flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors ${className}`}
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Bagikan</span>
        </button>

        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shareLinks={shareLinks}
          onCopyLink={handleCopyLink}
          copied={copied}
          title={title}
        />
      </>
    );
  }

  // Dropdown variant
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors ${className}`}
      >
        <Share2 className="w-4 h-4" />
        <span className="text-sm font-medium">Bagikan</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-50"
          >
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <link.icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">{link.name}</span>
              </a>
            ))}
            <button
              onClick={() => {
                handleCopyLink();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Link2 className="w-5 h-5 text-gray-600" />
              )}
              <span className="text-sm text-gray-700">
                {copied ? "Tersalin!" : "Salin Link"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Modal component for sharing
function ShareModal({
  isOpen,
  onClose,
  shareLinks,
  onCopyLink,
  copied,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  shareLinks: Array<{ name: string; icon: React.ComponentType<{ className?: string }>; color: string; url: string }>;
  onCopyLink: () => void;
  copied: boolean;
  title: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-heading text-xl font-bold text-deep-ocean">
                Bagikan
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Title preview */}
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-sm text-gray-600 line-clamp-2">{title}</p>
            </div>

            {/* Share options */}
            <div className="p-6">
              <div className="flex justify-center gap-4 mb-6">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={`w-14 h-14 ${link.color} rounded-full flex items-center justify-center text-white transition-colors`}
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>

              {/* Copy link */}
              <button
                onClick={onCopyLink}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Link Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">Salin Link</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
