/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "randomuser.me",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "www.maggi.lk", // add any other host you need
    ],
  },
};

export default nextConfig;
