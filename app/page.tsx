import Hero from "@/components/home/Hero";
import SuperAppServices from "@/components/home/SuperAppServices";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import CreatorShowcase from "@/components/home/CreatorShowcase";
import UMKMShowcase from "@/components/home/UMKMShowcase";
import CulinaryShowcase from "@/components/home/CulinaryShowcase";
import CultureHighlight from "@/components/home/CultureHighlight";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ImpactBanner from "@/components/home/ImpactBanner";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <SuperAppServices />
      <FeaturedDestinations />
      <CreatorShowcase />
      <UMKMShowcase />
      <CulinaryShowcase />
      <CultureHighlight />
      <UpcomingEvents />
      <ImpactBanner />
      <CTASection />
    </>
  );
}
