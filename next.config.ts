import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asset.kompas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn0-production-images-kly.akamaized.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "awsimages.detik.net.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tribratanews.polri.go.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gotravelaindonesia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.antaranews.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sulselprov.go.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.bisnis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "satyawinnie.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "indonesiakaya.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.static-src.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.zcreators.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.promediateknologi.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.idntimes.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
