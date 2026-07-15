/** @type {import('next').NextConfig} */
const nextConfig = {
  // Me setting eka build wenakota errors ignore karanawa
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;