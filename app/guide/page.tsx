"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect to new pemandu service page
// Individual guide listing has been replaced with white-label government service
export default function GuidePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/layanan/pemandu");
  }, [router]);
  
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Mengalihkan ke layanan pemandu...</p>
      </div>
    </main>
  );
}
