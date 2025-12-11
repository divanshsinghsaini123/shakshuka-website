import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Image Optimization
  images: {
    // Allow images from these domains (if using external images)
    remotePatterns: [
      // Add external image domains here if needed
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
    // Image formats to use (modern formats for better compression)
    formats: ['image/avif', 'image/webp'],
    // Image quality (1-100, default is 75)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum quality for optimized images
    minimumCacheTTL: 60,
    // Disable static image optimization if needed (set to false to disable)
    // unoptimized: false,
  },

  // Compression & Performance
  compress: true, // Enable gzip compression (default: true)
  
  // Power by header removal (security)
  poweredByHeader: false,

  // Headers Configuration
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          // Content Security Policy (CSP) - adjust as needed
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Adjust for your needs
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "media-src 'self' blob:",
              "frame-src 'none'",
            ].join('; ')
          },
        ],
      },
      // CORS headers for API routes (if needed)
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env['NEXT_PUBLIC_SITE_URL'] || '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
