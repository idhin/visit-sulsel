import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Calendar,
  Users,
  CheckCircle,
} from "lucide-react";
import destinationsData from "@/data/destinations.json";
import DestinationClient from "./DestinationClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinationsData.destinations.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationsData.destinations.find((d) => d.slug === slug);

  if (!destination) {
    return { title: "Destinasi Tidak Ditemukan" };
  }

  return {
    title: `${destination.name} | Visit Sulsel`,
    description: destination.description,
    openGraph: {
      title: destination.name,
      description: destination.description,
      images: [destination.image],
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinationsData.destinations.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  const relatedDestinations = destinationsData.destinations
    .filter((d) => d.category === destination.category && d.id !== destination.id)
    .slice(0, 3);

  return <DestinationClient destination={destination} relatedDestinations={relatedDestinations} />;
}
