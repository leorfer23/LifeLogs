import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SPA Configuration - Disabled for OAuth functionality
  // output: "export", // Enable static export for SPA
  // trailingSlash: true, // Required for static export
  distDir: "dist", // Custom output directory

  // Image Optimization
  images: {
    // unoptimized: true, // Only needed for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Performance Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental Features
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Environment Variables (for build-time optimization)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
