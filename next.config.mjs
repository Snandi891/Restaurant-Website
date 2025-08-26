/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "randomuser.me",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com", // 👈 Add this
    ],
  },
};

export default nextConfig;
