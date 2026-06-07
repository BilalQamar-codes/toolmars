import { MetadataRoute } from 'next';

// Forces Next.js to bake this as a static XML file during your build phase on Hostinger
export const dynamic = "force-static";

const BASE_URL = 'https://toolmars.com';

const BLOGS_DATA = [
  { slug: "optimizing-nextjs-15-core-web-vitals", date: "2026-03-15" },
  { slug: "rise-of-ai-driven-code-auditing", date: "2026-03-10" },
  { slug: "tailwind-v4-css-variable-architecture", date: "2026-03-05" },
  { slug: "edge-computing-end-of-latency", date: "2026-02-28" }
];

const TOOLS_DATA = [
  { href: "/tools/image-converter" },
  { href: "/tools/json-parser" },
  { href: "/tools/slug-generator" },
  { href: "/tools/qr-generator" },
  { href: "/tools/qr-reader" }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentFieldsDate = new Date().toISOString().split('T')[0];

  // 1. Static fundamental core page paths
  const routes = [
    '',
    '/tools',
    '/chrome-extensions',
    '/blogs',
    '/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentFieldsDate,
  }));

  // 2. Dynamic individual application page endpoints
  const toolRoutes = TOOLS_DATA.map((tool) => ({
    url: `${BASE_URL}${tool.href}`,
    lastModified: currentFieldsDate,
  }));

  // 3. Dynamic individual query-based blog page endpoints
  // FIXED: Next.js automates parameter handling if strings are cleanly structured 
  const blogRoutes = BLOGS_DATA.map((post) => ({
    url: `${BASE_URL}/blogs?post=${post.slug}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
  }));

  // Combined vector stack array - entirely clear of deprecated priority metrics
  return [...routes, ...toolRoutes, ...blogRoutes];
}