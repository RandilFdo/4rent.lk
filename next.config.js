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
      minimumCacheTTL: 60,
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
      optimizeCss: true,
   },
   // Environment variables for build time
   env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
   }
};

module.exports = withBundleAnalyzer(nextConfig);
