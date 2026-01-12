"use client";

import MotionWrapper from "@/components/animations/MotionWrapper";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
  light = false,
}: SectionHeaderProps) {
  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("max-w-3xl mb-12", alignments[align], className)}>
      {subtitle && (
        <MotionWrapper delay={0}>
          <span
            className={cn(
              "inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4",
              light
                ? "bg-white/20 text-white"
                : "bg-gold/10 text-gold"
            )}
          >
            {subtitle}
          </span>
        </MotionWrapper>
      )}
      <MotionWrapper delay={0.1}>
        <h2
          className={cn(
            "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
            light ? "text-white" : "text-deep-ocean"
          )}
        >
          {title}
        </h2>
      </MotionWrapper>
      {description && (
        <MotionWrapper delay={0.2}>
          <p
            className={cn(
              "text-lg leading-relaxed",
              light ? "text-white/80" : "text-muted"
            )}
          >
            {description}
          </p>
        </MotionWrapper>
      )}
    </div>
  );
}
