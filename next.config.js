const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: [
         "avatars.githubusercontent.com", 
         "lh3.googleusercontent.com", 
         "res.cloudinary.com", 
         "images.unsplash.com",
         "picsum.photos"
      ],
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 31536000, // 1 year
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
   },
   webpack: (config, { isServer }) => {
      // Minimal webpack config to avoid runtime errors
      if (!isServer) {
         config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
         };
      }
      return config;
   },
   // Production optimizations
   output: 'standalone',
   compress: true,
   poweredByHeader: false,
   reactStrictMode: true,
   swcMinify: true,
   experimental: {
      serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
   },
   // Environment variables for build time
   env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
   }
};

module.exports = withBundleAnalyzer(nextConfig);
