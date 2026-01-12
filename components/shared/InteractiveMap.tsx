"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

import "leaflet/dist/leaflet.css";

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "destinasi" | "kuliner" | "akomodasi" | "event";
  description?: string;
  image?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  onMarkerClick?: (location: MapLocation) => void;
}

export default function InteractiveMap({
  locations,
  center = [-5.1477, 119.4327], // Default: Makassar
  zoom = 8,
  height = "500px",
  className = "",
  onMarkerClick,
}: InteractiveMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Import Leaflet on client side only
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      // Fix default marker icon issue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isMounted || !L) {
    return (
      <div
        className={`bg-gray-200 rounded-2xl animate-pulse flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <span className="text-gray-500">Memuat peta...</span>
      </div>
    );
  }

  // Create custom icons for different types
  const createIcon = (type: MapLocation["type"]) => {
    const colors = {
      destinasi: "#3B82F6", // blue
      kuliner: "#F97316", // orange
      akomodasi: "#10B981", // green
      event: "#8B5CF6", // purple
    };

    return new L.DivIcon({
      className: "custom-marker",
      html: `
        <div style="
          background-color: ${colors[type]};
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createIcon(location.type)}
            eventHandlers={{
              click: () => onMarkerClick?.(location),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                {location.image && (
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-24 object-cover rounded-t-lg -mt-3 -mx-3 mb-2"
                    style={{ width: "calc(100% + 24px)" }}
                  />
                )}
                <h3 className="font-bold text-deep-ocean">{location.name}</h3>
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full capitalize">
                  {location.type}
                </span>
                {location.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {location.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
