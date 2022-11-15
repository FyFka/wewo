/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.ytimg.com", "yt3.ggpht.com"],
  },
};

module.exports = nextConfig;
