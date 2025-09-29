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
   experimental: {
      serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
   },
   // Environment variables for build time
   env: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
   }
};

module.exports = nextConfig;
