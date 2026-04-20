/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // IMPORTANT
  images: {
    unoptimized: true // required for static export
  }
};

module.exports = nextConfig;