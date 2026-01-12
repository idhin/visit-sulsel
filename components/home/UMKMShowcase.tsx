"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Store, ArrowRight, CheckCircle, ShoppingCart } from "lucide-react";
import MotionWrapper from "@/components/animations/MotionWrapper";
import SectionHeader from "@/components/shared/SectionHeader";
import umkmData from "@/data/umkm.json";
import { formatPrice } from "@/lib/utils";

export default function UMKMShowcase() {
  const featuredProducts = umkmData.products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 bg-maroon relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <MotionWrapper>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
              <Store className="w-4 h-4" />
              UMKM Marketplace
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
              Belanja Produk Khas Sulsel
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tenun Sengkang, kopi Toraja, kerajinan Bugis, dan ratusan produk 
              autentik lainnya langsung dari pengrajin lokal
            </p>
          </MotionWrapper>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {featuredProducts.map((product, index) => (
            <MotionWrapper key={product.id} delay={0.1 * index}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-maroon text-white text-xs font-bold rounded-full">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="relative w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-muted truncate">{product.seller.name}</span>
                    {product.seller.verified && (
                      <CheckCircle className="w-3 h-3 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <h3 className="font-medium text-deep-ocean text-sm line-clamp-2 mb-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted">| {product.sold} terjual</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-maroon">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>

        {/* CTA */}
        <MotionWrapper delay={0.5}>
          <div className="text-center">
            <Link
              href="/belanja"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-maroon font-semibold rounded-full hover:shadow-lg transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Jelajahi Semua Produk
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </MotionWrapper>

        {/* Stats */}
        <MotionWrapper delay={0.6}>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { value: "234", label: "UMKM Terdaftar" },
              { value: "1,500+", label: "Produk" },
              { value: "Rp 2.3M+", label: "Total Transaksi" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
