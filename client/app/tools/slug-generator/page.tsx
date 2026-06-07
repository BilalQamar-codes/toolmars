"use client";

import { useState } from "react";
import { slugify } from "@/utils/slugify";
import { Copy, Check, Link2, Sparkles } from "lucide-react";
import Head from "next/head";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  // Programmatic SEO JSON-LD Schema Configuration for Search Caching
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Slug Generator | Toolmars",
    "description": "Free web-based clean text-to-slug converter tool. Generate clean, lowercase, alphanumeric web strings optimized instantly for human readability and organic SEO indexing.",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "browserRequirements": "Requires JavaScript support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setSlug(slugify(value));
  };

  const copyToClipboard = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg py-16 px-6 text-brand-main selection:bg-brand-primary/10 transition-colors duration-300">
      <Head>
        {/* Intent-Engineered Meta Tags for Programmatic Keyword Targeting */}
        <title>Online URL Slug Generator | Clean SEO String Converter | Toolmars</title>
        <meta name="description" content="Convert your article, blog, or product titles into clean, semantic, URL-friendly slug strings instantly. Free client-side processing optimized for SEO workflows." />
        <meta name="keywords" content="url slug generator, clean text to slug converter, human readable permalink designer, free seo utility, toolmars" />
        <link rel="canonical" href="https://toolmars.com/tools/slug-generator" />
        
        {/* SoftwareApplication Rich Snippet Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </Head>

      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-brand-primary/10">
            <Sparkles size={14} /> SEO Utilities
          </div>
          <h1 className="text-4xl font-black mb-2 text-brand-main">Slug Generator.</h1>
          <p className="text-brand-muted font-medium italic">Sanitize header content paths into semantic permalinks instantly.</p>
        </header>

        <div className="bg-brand-card border border-brand-border p-8 rounded-3xl shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-brand-muted mb-2">Source Entry Title</label>
            <input 
              type="text"
              value={input}
              onChange={handleInput}
              className="w-full p-4 border border-brand-border bg-brand-bg rounded-xl outline-none text-brand-main focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all placeholder:text-brand-muted/40 font-semibold"
              placeholder="e.g., How to build a Next.js 15 app with Tailwind CSS"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-brand-muted mb-2">Resulting URL Permalinks Slug</label>
            <div className="flex items-center gap-2 p-4 bg-brand-bg rounded-xl border border-brand-border font-mono text-sm group transition-colors">
              <Link2 size={16} className="text-brand-muted/40 shrink-0 ml-1" />
              <span className={`flex-grow truncate ${slug ? 'text-brand-primary font-bold' : 'text-brand-muted/30'}`}>
                {slug || "transformed-slug-output-stream-here"}
              </span>
              <button 
                onClick={copyToClipboard} 
                disabled={!slug}
                className="p-2.5 bg-brand-card hover:bg-brand-primary/10 rounded-xl border border-brand-border transition-all disabled:opacity-20 disabled:pointer-events-none active:scale-95 text-brand-muted hover:text-brand-primary"
                title="Copy string payload"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Structural Content Node Supporting Technical Curation Crawls */}
        <section className="mt-20 border-t border-brand-border pt-12 transition-colors">
          <div className="grid md:grid-cols-3 gap-12 text-sm">
            <div className="space-y-3">
              <h3 className="text-base font-black text-brand-main">What is a URL Slug?</h3>
              <p className="text-brand-muted leading-relaxed text-xs">
                A URL slug is the precise segment of an electronic route string that points to a specific web location in an intuitive layout. Converting titles to lowercase strings separated by simple hyphens ensures search engine crawlers map directory hierarchies correctly.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-black text-brand-main">Clean Semantic Trailing</h3>
              <p className="text-brand-muted leading-relaxed text-xs">
                Our algorithm passes variable entries through recursive cleaning routines, wiping custom punctuation, filtering spacing anomalies, and stripping invalid non-alphanumeric expressions to ensure pristine routing layout stability.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-base font-black text-brand-main">Private Browser Execution</h3>
              <p className="text-brand-muted leading-relaxed text-xs">
                String calculations run exclusively on client threads right inside the active DOM instance sandbox. Your confidential production keywords, draft drafts, or release content metrics are safe and completely shielded from external networks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}