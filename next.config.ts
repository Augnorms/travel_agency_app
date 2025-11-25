import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --------------------------
  // Ignore ESLint errors during production build
  // --------------------------
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
