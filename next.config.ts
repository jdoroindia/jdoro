import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "axkmwkeezkbvfsupshxq.supabase.co",
        pathname: "/storage/v1/object/public/products/**",
      },
    ],
  },
};

export default nextConfig;
