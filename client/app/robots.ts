import { MetadataRoute } from 'next';

// Add this exact line at the top to tell the static export to compile this file
export const dynamic = "force-static"; 

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://toolmars.com/sitemap.xml',
  };
}