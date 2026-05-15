/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Keep this - it creates the folder structure /tools/index.html
  
  // REMOVE: skipTrailingSlashRedirect: true 
  // Why? This was likely preventing the full generation of the folder-based index files.

  images: {
    unoptimized: true, 
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
}

module.exports = nextConfig