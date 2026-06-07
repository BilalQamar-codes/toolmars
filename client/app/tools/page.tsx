"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Link as LinkIcon, ImageIcon, ArrowRight,
  Braces, QrCode, Scan, Code2, FileText, Globe, Terminal,
  RefreshCw, FileImage, Calculator, Calendar, GraduationCap,
  Flame, Star, Layers, ArrowUpRight, Minimize2
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL = "https://toolmars.com";

// ─── Schema ───────────────────────────────────────────────────────────────────
const jsonLdSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Online Developer Tools & Calculators | ToolMars",
    "description": "Browse 16+ free browser-based developer utilities, SEO tools, and calculators. No signup, no ads, completely private.",
    "url": `${SITE_URL}/tools`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",  "item": `${SITE_URL}/`      },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": `${SITE_URL}/tools` }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ToolMars Free Online Tools",
    "url": `${SITE_URL}/tools`,
    "numberOfItems": 16,
    "itemListElement": [
      { "@type": "ListItem", "position": 1,  "name": "Batch Image Converter",            "url": `${SITE_URL}/tools/image-converter`      },
      { "@type": "ListItem", "position": 2,  "name": "Image Compressor",                 "url": `${SITE_URL}/tools/image-compressor`     },
      { "@type": "ListItem", "position": 3,  "name": "JSON Parser & Formatter",          "url": `${SITE_URL}/tools/json-parser`          },
      { "@type": "ListItem", "position": 4,  "name": "Slug Generator",                   "url": `${SITE_URL}/tools/slug-generator`       },
      { "@type": "ListItem", "position": 5,  "name": "QR Code Designer",                 "url": `${SITE_URL}/tools/qr-generator`         },
      { "@type": "ListItem", "position": 6,  "name": "Universal QR Reader",              "url": `${SITE_URL}/tools/qr-reader`            },
      { "@type": "ListItem", "position": 7,  "name": "Word & Text Counter",              "url": `${SITE_URL}/tools/word-counter`         },
      { "@type": "ListItem", "position": 8,  "name": "SERP Preview & Generator",         "url": `${SITE_URL}/tools/meta-generator`       },
      { "@type": "ListItem", "position": 9,  "name": "Robots.txt Generator",             "url": `${SITE_URL}/tools/robots-generator`     },
      { "@type": "ListItem", "position": 10, "name": "Schema Markup Generator",          "url": `${SITE_URL}/tools/schema-generator`     },
      { "@type": "ListItem", "position": 11, "name": "Redirect Map Compiler",            "url": `${SITE_URL}/tools/redirect-compiler`    },
      { "@type": "ListItem", "position": 12, "name": "Image SEO & Filename Sanitizer",   "url": `${SITE_URL}/tools/image-seo`            },
      { "@type": "ListItem", "position": 13, "name": "Mortgage Payment Calculator",      "url": `${SITE_URL}/tools/mortgage-calculator`  },
      { "@type": "ListItem", "position": 14, "name": "Trading Profit & Loss Calculator", "url": `${SITE_URL}/tools/investment-calculator` },
      { "@type": "ListItem", "position": 15, "name": "Age Calculator",                   "url": `${SITE_URL}/tools/age-calculator`       },
      { "@type": "ListItem", "position": 16, "name": "CGPA & GPA Calculator",            "url": `${SITE_URL}/tools/cgpa-calculator`      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolMars",
    "url": SITE_URL,
    "description": "Free browser-based developer tools, SEO utilities, and calculators. No signup required.",
    "sameAs": []
  }
];

// ─── Tool Data ────────────────────────────────────────────────────────────────
interface Tool {
  id: number;
  title: string;
  desc: string;
  category: "Utility" | "Development" | "SEO" | "Calculators";
  icon: React.ReactNode;
  badge?: string;
  href: string;
  featured?: boolean;
  popular?: boolean;
}

const TOOLS_DATA: Tool[] = [
  {
    id: 1,
    title: "Batch Image Converter",
    desc: "Convert PNG, JPG, WebP and more — all at once, right in your browser. No uploads, no waiting.",
    category: "Utility",
    icon: <ImageIcon className="w-5 h-5" />,
    badge: "Most Used",
    href: "/tools/image-converter",
    featured: true,
    popular: true
  },
  {
    id: 16,
    title: "Image Compressor",
    desc: "Shrink JPEG, PNG and WebP files without losing quality. Adjust compression level and download individually or as a ZIP.",
    category: "Utility",
    icon: <Minimize2 className="w-5 h-5" />,
    badge: "New",
    href: "/tools/image-compressor",
    featured: true,
    popular: true
  },
  {
    id: 2,
    title: "JSON Formatter",
    desc: "Paste messy JSON and get it back clean, indented, and error-free in one click.",
    category: "Development",
    icon: <Braces className="w-5 h-5" />,
    badge: "Popular",
    href: "/tools/json-parser",
    featured: true,
    popular: true
  },
  {
    id: 3,
    title: "Slug Generator",
    desc: "Turn any title into a clean, URL-friendly slug for better SEO — instantly.",
    category: "Development",
    icon: <LinkIcon className="w-5 h-5" />,
    badge: "SEO",
    href: "/tools/slug-generator",
    featured: true,
    popular: true
  },
  {
    id: 4,
    title: "QR Code Designer",
    desc: "Generate high-resolution QR codes with your brand colors. Download as PNG instantly.",
    category: "Utility",
    icon: <QrCode className="w-5 h-5" />,
    badge: "New",
    href: "/tools/qr-generator",
    popular: true
  },
  {
    id: 5,
    title: "Universal QR Reader",
    desc: "Scan any QR code from your webcam or a screenshot — no app needed.",
    category: "Utility",
    icon: <Scan className="w-5 h-5" />,
    href: "/tools/qr-reader"
  },
  {
    id: 6,
    title: "Word & Text Counter",
    desc: "Count words, characters, and reading time. Change text case in seconds.",
    category: "Utility",
    icon: <FileText className="w-5 h-5" />,
    href: "/tools/word-counter"
  },
  {
    id: 7,
    title: "SERP Preview Tool",
    desc: "See exactly how your title and meta description look in Google before you publish.",
    category: "SEO",
    icon: <Globe className="w-5 h-5" />,
    badge: "Popular",
    href: "/tools/meta-generator",
    popular: true
  },
  {
    id: 8,
    title: "Robots.txt Generator",
    desc: "Build a valid robots.txt visually, test crawler rules, and block AI scrapers easily.",
    category: "SEO",
    icon: <Terminal className="w-5 h-5" />,
    href: "/tools/robots-generator"
  },
  {
    id: 9,
    title: "Schema Markup Generator",
    desc: "Create valid JSON-LD structured data for articles, products, and web apps — no code needed.",
    category: "SEO",
    icon: <Braces className="w-5 h-5" />,
    href: "/tools/schema-generator"
  },
  {
    id: 10,
    title: "Redirect Map Compiler",
    desc: "Paste old and new URLs and get a ready redirect file for Nginx, Apache, or Next.js.",
    category: "Development",
    icon: <RefreshCw className="w-5 h-5" />,
    href: "/tools/redirect-compiler"
  },
  {
    id: 11,
    title: "Image SEO Sanitizer",
    desc: "Rename image files into SEO-friendly slugs and strip hidden EXIF data — all locally.",
    category: "SEO",
    icon: <FileImage className="w-5 h-5" />,
    href: "/tools/image-seo"
  },
  {
    id: 12,
    title: "Mortgage Calculator",
    desc: "Calculate your monthly payment, total interest, and full amortization schedule.",
    category: "Calculators",
    icon: <Calculator className="w-5 h-5" />,
    badge: "Popular",
    href: "/tools/mortgage-calculator",
    popular: true
  },
  {
    id: 13,
    title: "Trading P&L Calculator",
    desc: "Track your average buy price, calculate profit or loss, and plan your next trade.",
    category: "Calculators",
    icon: <RefreshCw className="w-5 h-5" />,
    href: "/tools/investment-calculator"
  },
  {
    id: 14,
    title: "Age Calculator",
    desc: "Find your exact age in years, months, days, and hours — and see upcoming milestones.",
    category: "Calculators",
    icon: <Calendar className="w-5 h-5" />,
    href: "/tools/age-calculator"
  },
  {
    id: 15,
    title: "CGPA & GPA Calculator",
    desc: "Enter courses, credit hours, and grades to get your semester GPA and cumulative CGPA.",
    category: "Calculators",
    icon: <GraduationCap className="w-5 h-5" />,
    href: "/tools/cgpa-calculator"
  }
];

// ─── Category config ──────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  Utility: {
    label: "Utility Tools",
    desc: "File converters, QR tools, and everyday browser utilities.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20"
  },
  Development: {
    label: "Developer Tools",
    desc: "JSON, slugs, redirects, and tools built for dev workflows.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20"
  },
  SEO: {
    label: "SEO Tools",
    desc: "SERP previews, schema builders, robots.txt, and more.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  Calculators: {
    label: "Calculators",
    desc: "Finance, academic, and personal calculators — all free.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
} as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeaturedCard({ tool }: { tool: Tool }) {
  return (
    <Link href={tool.href} className="group block">
      <article className="relative h-full bg-brand-card border border-brand-border rounded-3xl p-7 flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/[0.03] group-hover:to-transparent transition-all duration-500 rounded-3xl pointer-events-none" />
        <div>
          <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300" aria-hidden="true">
              {tool.icon}
            </div>
            {tool.badge && (
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full border border-brand-primary/20">
                {tool.badge}
              </span>
            )}
          </div>
          <h3 className="text-lg font-black text-brand-main mb-2 leading-tight">{tool.title}</h3>
          <p className="text-brand-muted text-sm leading-relaxed">{tool.desc}</p>
        </div>
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-brand-border">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted px-2.5 py-1 bg-brand-bg border border-brand-border rounded-lg">
            {tool.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-black text-brand-primary group-hover:translate-x-0.5 transition-transform duration-200">
            Open <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

function CompactCard({ tool, showCategory = false }: { tool: Tool; showCategory?: boolean }) {
  return (
    <Link href={tool.href} className="group block">
      <article className="flex items-center gap-4 p-4 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-primary/30 hover:bg-brand-bg transition-all duration-200">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200" aria-hidden="true">
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-black text-brand-main truncate">{tool.title}</h3>
            {tool.badge && (
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full border border-brand-primary/20 shrink-0">
                {tool.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-brand-muted mt-0.5 leading-relaxed line-clamp-1">{tool.desc}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0" aria-hidden="true" />
      </article>
    </Link>
  );
}

function CategoryCard({ tool }: { tool: Tool }) {
  const cfg = CATEGORY_CONFIG[tool.category];
  return (
    <Link href={tool.href} className="group block">
      <article className="flex items-start gap-4 p-5 rounded-2xl border border-brand-border bg-brand-card hover:border-brand-primary/30 hover:shadow-md hover:shadow-brand-primary/5 transition-all duration-200">
        <div className={`w-11 h-11 shrink-0 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center ${cfg.color} group-hover:scale-105 transition-transform duration-200`} aria-hidden="true">
          {tool.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-brand-main">{tool.title}</h3>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">{tool.desc}</p>
            </div>
            {tool.badge && (
              <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.color} ${cfg.bg} px-2 py-0.5 rounded-full border ${cfg.border} shrink-0 mt-0.5`}>
                {tool.badge}
              </span>
            )}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-1" aria-hidden="true" />
      </article>
    </Link>
  );
}

function SectionHeader({
  icon, label, title, desc, count
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  desc?: string;
  count?: number;
}) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-brand-primary" aria-hidden="true">{icon}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">{label}</span>
        </div>
        <h2 className="text-2xl font-black text-brand-main tracking-tight">{title}</h2>
        {desc && <p className="text-sm text-brand-muted mt-1">{desc}</p>}
      </div>
      {count !== undefined && (
        <span className="shrink-0 mt-1 text-xs font-bold text-brand-muted bg-brand-card border border-brand-border px-3 py-1 rounded-full">
          {count} tools
        </span>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return TOOLS_DATA.filter(
      t => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const featuredTools = TOOLS_DATA.filter(t => t.featured);
  const popularTools  = TOOLS_DATA.filter(t => t.popular);
  const categories    = (["Utility", "Development", "SEO", "Calculators"] as const);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main pt-28 pb-24 px-6 transition-colors duration-300">
      <Head>
        <title>Free Online Developer Tools & Calculators | ToolMars</title>
        <meta name="description" content="16+ free browser-based tools for developers and students. Format JSON, convert images, compress photos, generate QR codes, calculate mortgage payments, and more — no signup needed." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/tools`} />
        <meta property="og:title" content="Free Online Developer Tools & Calculators | ToolMars" />
        <meta property="og:description" content="16+ free browser-based tools. Format JSON, convert images, calculate GPA — no account needed." />
        <meta property="og:url" content={`${SITE_URL}/tools`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og/tools.png`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="ToolMars" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Developer Tools & Calculators | ToolMars" />
        <meta name="twitter:description" content="16+ free browser-based tools. No signup, no uploads, completely private." />
        <meta name="twitter:image" content={`${SITE_URL}/og/tools.png`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <div className="max-w-6xl mx-auto space-y-16">

        {/* ── PAGE HEADER ───────────────────────────────────────────────────── */}
        <header>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-brand-border">
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-3">ToolMars</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-brand-main leading-tight">
                Free Online <span className="text-brand-primary">Tools.</span>
              </h1>
              <p className="text-brand-muted text-sm md:text-base mt-3 leading-relaxed">
                Developer utilities, SEO tools, and calculators — all free, all browser-based.
                Your data never leaves your device.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {categories.map((cat) => {
                  const cfg = CATEGORY_CONFIG[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(activeCategory === cat ? null : cat);
                        setSearchQuery("");
                        document.getElementById(`section-${cat}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        activeCategory === cat
                          ? `${cfg.color} ${cfg.bg} ${cfg.border}`
                          : "bg-brand-card border-brand-border text-brand-muted hover:border-brand-primary/40 hover:text-brand-main"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <label htmlFor="tool-search" className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
                Search tools
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" aria-hidden="true" />
                <input
                  id="tool-search"
                  type="search"
                  placeholder="e.g. image converter, JSON..."
                  className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </header>

        {/* ── SEARCH RESULTS ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {searchResults !== null && (
            <motion.section
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              aria-label="Search results"
            >
              <SectionHeader
                icon={<Search className="w-4 h-4" />}
                label="Search"
                title={`Results for "${searchQuery}"`}
                count={searchResults.length}
              />
              {searchResults.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {searchResults.map(tool => <CompactCard key={tool.id} tool={tool} showCategory />)}
                </div>
              ) : (
                <div className="text-center py-16 text-brand-muted" role="status" aria-live="polite">
                  <Code2 size={36} className="mx-auto mb-3 stroke-1" aria-hidden="true" />
                  <p className="font-bold">No tools found for "{searchQuery}"</p>
                  <p className="text-xs mt-1">Try a different keyword.</p>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── MOST USED (FEATURED) ──────────────────────────────────────────── */}
        {!searchResults && (
          <section aria-labelledby="featured-heading">
            <SectionHeader
              icon={<Flame className="w-4 h-4" />}
              label="Most Used"
              title="Top Picks"
              desc="The tools developers and students reach for most."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredTools.map((tool, i) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <FeaturedCard tool={tool} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── POPULAR THIS WEEK ─────────────────────────────────────────────── */}
        {!searchResults && (
          <section aria-labelledby="popular-heading">
            <SectionHeader
              icon={<Star className="w-4 h-4" />}
              label="Trending"
              title="Popular Right Now"
              desc="Highly used tools across all categories this week."
              count={popularTools.length}
            />
            <div className="grid sm:grid-cols-2 gap-3">
              {popularTools.map(tool => <CompactCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}

        {/* ── BY CATEGORY ───────────────────────────────────────────────────── */}
        {!searchResults && categories.map((cat) => {
          const cfg      = CATEGORY_CONFIG[cat];
          const catTools = TOOLS_DATA.filter(t => t.category === cat);
          return (
            <section
              key={cat}
              id={`section-${cat}`}
              aria-labelledby={`heading-${cat}`}
              className="scroll-mt-32"
            >
              <div className={`flex items-center gap-3 mb-6 pb-5 border-b ${cfg.border}`}>
                <div className={`p-2 rounded-xl ${cfg.bg} border ${cfg.border}`} aria-hidden="true">
                  <Layers className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 id={`heading-${cat}`} className="text-xl font-black text-brand-main">{cfg.label}</h2>
                      <p className="text-xs text-brand-muted mt-0.5">{cfg.desc}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-bold ${cfg.color} ${cfg.bg} border ${cfg.border} px-3 py-1 rounded-full`}>
                      {catTools.length} tools
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {catTools.map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <CategoryCard tool={tool} />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}

        {/* ── SEO CONTENT BLOCK ─────────────────────────────────────────────── */}
        <section className="pt-12 border-t border-brand-border max-w-3xl space-y-10">
          <div>
            <h2 className="text-xl font-black text-brand-main mb-3 tracking-tight">What is ToolMars?</h2>
            <p className="text-brand-muted leading-relaxed">
              ToolMars is a free collection of browser-based tools for developers, students, and
              content creators. Every tool runs entirely in your browser — your data never gets
              sent to a server. There are no accounts, no paywalls, and no ads covering the workspace.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-brand-main mb-3 tracking-tight">What tools are available?</h2>
            <ul className="space-y-2 text-brand-muted list-disc list-inside text-sm leading-relaxed">
              <li><strong>Developer utilities</strong> — JSON formatter, slug generator, redirect compiler, and more.</li>
              <li><strong>SEO tools</strong> — SERP preview, robots.txt generator, schema markup builder, and image filename sanitizer.</li>
              <li><strong>Image tools</strong> — batch image converter, image compressor, QR code designer and reader.</li>
              <li><strong>Calculators</strong> — mortgage calculator, GPA/CGPA calculator, age calculator, and trading P&amp;L tracker.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-black text-brand-main mb-3 tracking-tight">Are these tools really free?</h2>
            <p className="text-brand-muted leading-relaxed">
              Yes, every tool on ToolMars is completely free with no usage limits. No premium tiers,
              no feature locks, no signup forms. The tools work the same whether you use them once
              or a hundred times a day.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-black text-brand-main mb-3 tracking-tight">Is my data private?</h2>
            <p className="text-brand-muted leading-relaxed">
              Every tool processes your data locally inside your browser. Nothing you paste, upload,
              or type gets sent to ToolMars servers — because there are no servers involved. This is
              especially important for tools like the JSON formatter, image converter, image compressor,
              and CGPA calculator, where you might be working with sensitive or confidential information.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}