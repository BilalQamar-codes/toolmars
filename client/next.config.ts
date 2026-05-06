/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // This is the critical line for Netlify/Static exports
  },
  devIndicators: {
    appIsrStatus: false,   // Disables the ISR status indicator
    buildActivity: false,  // Disables the build activity indicator
  },
}

module.exports = nextConfig