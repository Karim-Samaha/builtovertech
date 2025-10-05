import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow images from any domain
      },
    ],
  },
};

export default nextConfig;
