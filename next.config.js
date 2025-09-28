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
};

module.exports = nextConfig;
