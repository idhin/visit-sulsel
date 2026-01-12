"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
}

interface WeatherWidgetProps {
  location: string;
  latitude?: number;
  longitude?: number;
  className?: string;
}

// Mapping of weather codes to icons and descriptions
const weatherCodeMap: Record<number, { icon: React.ComponentType<{ className?: string }>; description: string }> = {
  0: { icon: Sun, description: "Cerah" },
  1: { icon: Sun, description: "Cerah Berawan" },
  2: { icon: Cloud, description: "Berawan" },
  3: { icon: Cloud, description: "Mendung" },
  45: { icon: Cloud, description: "Berkabut" },
  48: { icon: Cloud, description: "Berkabut" },
  51: { icon: CloudRain, description: "Gerimis" },
  53: { icon: CloudRain, description: "Gerimis" },
  55: { icon: CloudRain, description: "Gerimis" },
  61: { icon: CloudRain, description: "Hujan Ringan" },
  63: { icon: CloudRain, description: "Hujan Sedang" },
  65: { icon: CloudRain, description: "Hujan Lebat" },
  71: { icon: CloudSnow, description: "Salju Ringan" },
  73: { icon: CloudSnow, description: "Salju Sedang" },
  75: { icon: CloudSnow, description: "Salju Lebat" },
  80: { icon: CloudRain, description: "Hujan Ringan" },
  81: { icon: CloudRain, description: "Hujan Sedang" },
  82: { icon: CloudRain, description: "Hujan Lebat" },
  95: { icon: CloudRain, description: "Badai" },
  96: { icon: CloudRain, description: "Badai Petir" },
  99: { icon: CloudRain, description: "Badai Petir" },
};

// Default coordinates for major locations in South Sulawesi
const locationCoordinates: Record<string, { lat: number; lon: number }> = {
  "Makassar": { lat: -5.1477, lon: 119.4327 },
  "Tana Toraja": { lat: -3.0458, lon: 119.8547 },
  "Toraja": { lat: -3.0458, lon: 119.8547 },
  "Bulukumba": { lat: -5.5499, lon: 120.1956 },
  "Maros": { lat: -5.0095, lon: 119.5724 },
  "Gowa": { lat: -5.3125, lon: 119.4464 },
  "Palopo": { lat: -2.9923, lon: 120.1967 },
  "Bone": { lat: -4.5342, lon: 120.3306 },
  "Soppeng": { lat: -4.3454, lon: 119.8787 },
  "Wajo": { lat: -4.0561, lon: 120.1745 },
  "Bantimurung": { lat: -4.9905, lon: 119.6731 },
  "Pantai Losari": { lat: -5.1389, lon: 119.4116 },
  "Bira": { lat: -5.6080, lon: 120.4527 },
};

export default function WeatherWidget({
  location,
  latitude,
  longitude,
  className,
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(false);

        // Get coordinates
        let lat = latitude;
        let lon = longitude;

        if (!lat || !lon) {
          // Try to find location in our map
          const locationKey = Object.keys(locationCoordinates).find((key) =>
            location.toLowerCase().includes(key.toLowerCase())
          );
          if (locationKey) {
            lat = locationCoordinates[locationKey].lat;
            lon = locationCoordinates[locationKey].lon;
          } else {
            // Default to Makassar
            lat = -5.1477;
            lon = 119.4327;
          }
        }

        // Fetch from Open-Meteo API (free, no API key needed)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`
        );

        if (!response.ok) throw new Error("Failed to fetch weather");

        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
        });
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location, latitude, longitude]);

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 ${className}`}>
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-white/20 rounded w-20 mb-2" />
            <div className="h-6 bg-white/20 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return null;
  }

  const weatherInfo = weatherCodeMap[weather.weatherCode] || { icon: Cloud, description: "Tidak diketahui" };
  const WeatherIcon = weatherInfo.icon;

  return (
    <div className={`bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 text-white ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <WeatherIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-white/80">Cuaca di {location}</p>
            <p className="text-2xl font-bold">{weather.temperature}°C</p>
          </div>
        </div>
      </div>
      
      <p className="text-white/90 font-medium mb-3">{weatherInfo.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Droplets className="w-4 h-4" />
          <span>{weather.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Wind className="w-4 h-4" />
          <span>{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}
