/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack සහ වෙනත් experimental features වල ගැටලු මඟ හරින්න
  // මෙය සම්පූර්ණයෙන්ම ඉවත් කරන්න හෝ false කරන්න
  experimental: {
    turbopack: false,
  },
};

module.exports = nextConfig;