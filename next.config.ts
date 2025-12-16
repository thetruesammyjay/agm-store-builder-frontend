import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Allow external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
  // 2. Fix server actions size limit
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;