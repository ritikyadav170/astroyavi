

import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { hostname: "flagcdn.com", pathname: "**", protocol: "https" },
      {
        hostname: "minio-api-dev.baseel.com",
        pathname: "**",
        protocol: "https",
      },
      {
        hostname: "minio-api-uat.baseel.com",
        pathname: "**",
        protocol: "https",
      },
      { hostname: "minio-api.baseel.com", pathname: "**", protocol: "https" },
      { hostname: "ui-avatars.com", pathname: "**", protocol: "https" },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,

  async rewrites() {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://160.187.87.138:9859";
    const baseUrl = rawUrl.replace(/\/api\/user\/?$/, "").replace(/\/+$/, "");
    return [
      {
        source: "/api/user/:path*",
        destination: `${baseUrl}/api/user/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
