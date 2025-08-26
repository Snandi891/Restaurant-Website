/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com", // Unsplash images
      "randomuser.me", // Random User API
    ],
  },
};

export default nextConfig;
