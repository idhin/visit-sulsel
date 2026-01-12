"use client";

import { useState } from "react";
import { User } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";

export default function UserMenu() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsLoginOpen(true)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Login"
      >
        <User className="w-5 h-5 text-white/80 hover:text-white" />
      </button>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}
