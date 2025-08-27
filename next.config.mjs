/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "randomuser.me",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "www.maggi.lk",
      "media.istockphoto.com", // ✅ added
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
