"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Tag, ArrowLeft, Share2, CornerDownRight, AlertCircle, CheckCircle } from "lucide-react";
import Head from "next/head";

// ==========================================
// EXHAUSTIVE, SEO-OPTIMIZED BLOG DATABASE
// ==========================================
const BLOGS_DATA = [
  {
    id: 1,
    slug: "optimizing-nextjs-15-core-web-vitals",
    title: "Optimizing Next.js 15 for Core Web Vitals",
    excerpt: "Deep dive into partial pre-rendering and how to achieve a perfect 100 Lighthouse score in 2026.",
    category: "Development",
    date: "March 15, 2026",
    readTime: "8 min read",
    image: "bg-brand-primary/10",
    featured: true,
    content: (
      <>
        <p className="text-lg text-brand-muted leading-relaxed mb-6 font-medium">
          Achieving a perfect 100 Lighthouse performance score on modern Next.js 15 architectures requires moving past basic Server-Side Rendering (SSR). As web applications scale, search intent algorithms place massive performance weight on real-user metrics like Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS).
        </p>
        
        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">1. The Mechanics of Partial Pre-rendering (PPR)</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          Partial Pre-rendering bridges the old architectural gap between completely static pages and heavy dynamic rendering. Instead of forcing the entire route stream to compile on demand at request time, Next.js 15 generates an absolute static shell during your build cycle while streaming dynamic visual components through standard React Suspense boundaries.
        </p>
        <p className="text-brand-muted mb-6 leading-relaxed">
          This results in an instantaneous Time to First Byte (TTFB) because the core layout structure loads without waiting for slow dynamic database queries or token authorizations to execute.
        </p>

        <pre className="bg-slate-950 dark:bg-black text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto mb-8 border border-brand-border shadow-inner">
{`// next.config.ts production layout implementation
const nextConfig = {
  experimental: {
    ppr: 'incremental', // Enable safe step-by-step feature rollout
  },
};

export default nextConfig;`}
        </pre>

        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">2. Completely Eliminating Cumulative Layout Shift (CLS)</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          Dynamic layout injection is the primary enemy of pristine CLS scores. When dynamic widgets or code snippets load after the main page shell without explicit structural rules, elements bounce around on screen, frustrating users and incurring severe search index penalties.
        </p>
        
        <div className="bg-brand-bg border border-brand-border rounded-2xl p-6 mb-8">
          <h4 className="font-bold text-brand-main mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-brand-primary" /> Key Mitigation Guidelines
          </h4>
          <ul className="space-y-3 text-brand-muted text-sm pl-2">
            <li className="flex gap-2"><CornerDownRight className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" /> <strong>Aspect-Ratio Enforcements:</strong> Ensure all media containers and image components use explicit Tailwind aspect-ratio tokens (`aspect-video`, `aspect-square`) before client files parse.</li>
            <li className="flex gap-2"><CornerDownRight className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" /> <strong>Skeleton Buffering:</strong> Build exact-height layout placeholders within your React Suspense fallback properties to save spatial allocation boundaries on the client screen.</li>
            <li className="flex gap-2"><CornerDownRight className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" /> <strong>Font Swap Configuration:</strong> Use standard modern web fonts with optimized `font-display: swap` instructions to prevent severe layout shifts when secondary weights finish rendering.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">3. Striking a Balance with Server Component Data Caching</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          Next.js 15 replaces old broad caching rules with an explicit evaluate-by-default behavior pattern. When writing fetch paths within React Server Components (RSC), explicitly defining cache keys prevents repetitive database stress over heavily populated endpoints.
        </p>
        <pre className="bg-slate-950 dark:bg-black text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto mb-8 border border-brand-border shadow-inner">
{`// Implementation of high-speed revalidation routines
async function getDeveloperToolsData() {
  const res = await fetch('https://api.toolmars.com/v1/utilities', {
    next: { revalidate: 3600 } // Revalidate static content smoothly every hour
  });
  return res.json();
}`}
        </pre>
      </>
    )
  },
  {
    id: 2,
    slug: "rise-of-ai-driven-code-auditing",
    title: "The Rise of AI-Driven Code Auditing",
    excerpt: "Why manual security reviews are becoming a thing of the past for modern SaaS teams.",
    category: "Security",
    date: "March 10, 2026",
    readTime: "5 min read",
    image: "bg-brand-primary/10",
    featured: false,
    content: (
      <>
        <p className="text-lg text-brand-muted leading-relaxed mb-6 font-medium">
          As continuous integration loops speed up, manual peer review processes introduce massive production friction bottlenecks. Modern engineering groups are replacing manual security audits with high-speed autonomous tooling systems.
        </p>
        
        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">1. Eliminating Vulnerability Leakage Paths</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          Manual logic tracing easily misses subtle context flows, like loose validation rules on complex form fields or unescaped values within deep data objects. AI-driven parsing tools don't simply read text; they construct comprehensive dynamic dependency maps to spot cross-site scripting risks (XSS), missing authorization checks, and leaking structural tokens.
        </p>

        <div className="bg-amber-500/10 dark:bg-amber-500/20 border-l-4 border-amber-500 p-5 rounded-r-2xl my-6 text-sm text-amber-900 dark:text-amber-200 leading-relaxed flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Automated Security Challenge:</strong> Injecting automated inspection metrics directly into Git push triggers ensures flawed logic blocks get rejected before hitting active staging or deployment clusters.
          </div>
        </div>

        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">2. Shifting Security Checkpoints Left</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          "Shifting left" means identifying structural vulnerabilities as early as possible in your software deployment lifecycle. Resolving a memory leak or database authentication mismatch while working locally inside a development container takes minutes—fixing that same security flaw after an exploit has been deployed to live users is a costly disaster.
        </p>
        <p className="text-brand-muted mb-6 leading-relaxed">
          By combining local browser-sandbox testing platforms with automatic validation routines, you keep sensitive customer data isolated, secure, and fully private.
        </p>
      </>
    )
  },
  {
    id: 3,
    slug: "tailwind-v4-css-variable-architecture",
    title: "Tailwind v4: CSS Variable Architecture",
    excerpt: "Master the new engine and learn how to build scalable design systems with zero config files.",
    category: "Design",
    date: "March 05, 2026",
    readTime: "6 min read",
    image: "bg-brand-primary/10",
    featured: false,
    content: (
      <>
        <p className="text-lg text-brand-muted leading-relaxed mb-6 font-medium">
          Tailwind CSS v4 introduces a major rewrite to the utility engine, completely removing legacy configurations like `tailwind.config.js` and replacing them with modern, native CSS custom variables.
        </p>
        
        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">1. Setting Up Your Theme via CSS Variable Injections</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          Rather than relying on complex JavaScript object structures, design tokens are now declared directly inside your main global stylesheet using a clean, modern `@theme` declaration block. This lets the compiler generate blazing-fast design variables natively during the build phase.
        </p>

        <pre className="bg-slate-950 dark:bg-black text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto mb-8 border border-brand-border shadow-inner">
{`/* global configuration: src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-primary: #4f46e5;
  --color-brand-bg: #fcfcfd;
  --color-brand-main: #0f172a;
  
  --font-sans: "Inter", system-ui, sans-serif;
  --radius-xl: 1.5rem;
}`}
        </pre>

        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">2. Seamless Theme Updates with No Runtime Performance Cost</h2>
        <p className="text-brand-muted mb-6 leading-relaxed">
          Because these utility configurations map cleanly to native CSS variables, implementing feature toggles like system dark mode no longer requires heavy JavaScript hydration calculations. You can simply update variable definitions within class rules (like `.dark`), and the entire theme adapts instantly across all layouts with zero lag.
        </p>
      </>
    )
  },
  {
    id: 4,
    slug: "edge-computing-end-of-latency",
    title: "Edge Computing: The End of Latency?",
    excerpt: "Exploring how Toolmars deploys assets to 200+ locations to ensure sub-millisecond response.",
    category: "Infrastructure",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    image: "bg-brand-primary/10",
    featured: false,
    content: (
      <>
        <p className="text-lg text-brand-muted leading-relaxed mb-6 font-medium">
          Routing web asset distributions through traditional centralized cloud datacenters inevitably introduces geographic distance delays. Edge computing eliminates this physical bottleneck by handling application logic closer to the user.
        </p>
        
        <h2 className="text-2xl font-black text-brand-main mt-10 mb-4">1. Serving Content from Edge-Isolated Nodes</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          When a web user requests an optimization tool or validation check, the request shouldn't have to journey across continents just to hit a single primary datacenter node. Edge networks route incoming requests to the closest regional cluster point in their globally distributed routing tree.
        </p>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Running processing scripts directly on edge containers reduces global request latency to sub-millisecond cycles. This speed ensures complex developer tools and layout configurations execute instantly, no matter where your team is working.
        </p>
      </>
    )
  }
];

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("post");

  const featuredPost = BLOGS_DATA.find(b => b.featured);
  const regularPosts = BLOGS_DATA.filter(b => !b.featured);
  const currentPost = BLOGS_DATA.find(b => b.slug === activeSlug);

  const viewPost = (slug: string) => {
    router.push(`/blogs?post=${slug}`);
    window.scrollTo({ top: 0 });
  };

  const closePost = () => {
    router.push("/blogs");
    window.scrollTo({ top: 0 });
  };

  // 1. FULL LENGTH DYNAMIC READER LAYOUT
  if (currentPost) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-main pt-32 pb-20 px-6 transition-colors duration-300">
        <Head>
          <title>{`${currentPost.title} | Toolmars Insights`}</title>
          <meta name="description" content={currentPost.excerpt} />
          <link rel="canonical" href={`https://toolmars.com/blogs?post=${currentPost.slug}`} />
        </Head>
        
        <article className="max-w-3xl mx-auto">
          <button 
            onClick={closePost}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 px-4 py-2 rounded-full transition-all mb-12 border border-brand-primary/10"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-bold text-brand-muted uppercase tracking-wider">
            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-md border border-brand-primary/10">{currentPost.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {currentPost.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {currentPost.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-8 text-brand-main">
            {currentPost.title}
          </h1>

          <div className={`w-full h-64 md:h-96 ${currentPost.image} rounded-[2.5rem] border border-brand-border mb-12 flex items-center justify-center bg-brand-card`}>
            <BookOpen className="w-16 h-16 text-brand-primary opacity-25" />
          </div>

          {/* Prose system injected correctly with dark system variables handling overrides */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-brand-main">
            {currentPost.content}
          </div>

          <div className="border-t border-brand-border mt-16 pt-8 flex justify-between items-center text-sm font-bold text-brand-muted">
            <span>Written by Toolmars Labs Team</span>
            <button className="flex items-center gap-2 hover:text-brand-primary transition-colors">
              <Share2 className="w-4 h-4" /> Share Article
            </button>
          </div>
        </article>
      </div>
    );
  }

  // 2. GRID ARCHITECTURE OVERVIEW LAYOUT
  return (
    <div className="min-h-screen bg-brand-bg text-brand-main pt-32 pb-20 px-6 transition-colors duration-300">
      <Head>
        <title>Toolmars Insights | Engineering, Performance & Design Blog</title>
        <meta name="description" content="Expert perspectives on building, securing, and scaling the modern web. Updated weekly by the Toolmars engineering team." />
        <link rel="canonical" href="https://toolmars.com/blogs" />
      </Head>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-brand-main"
          >
            Our <span className="text-brand-primary">Insights.</span>
          </motion.h1>
          <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
            Expert perspectives on building, securing, and scaling the modern web. 
            Updated weekly by the Toolmars engineering team.
          </p>
        </div>

        {/* FEATURED BLOCK */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => viewPost(featuredPost.slug)}
            className="relative group cursor-pointer mb-20 overflow-hidden rounded-[3rem] border border-brand-border bg-brand-card shadow-2xl shadow-brand-main/[0.01] transition-all hover:border-brand-primary/40"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className={`h-64 lg:h-full ${featuredPost.image} flex items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-border bg-brand-bg/40`}>
                <BookOpen className="w-20 h-20 text-brand-primary opacity-20" />
              </div>
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Featured Article
                  </span>
                  <span className="text-brand-muted text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-brand-main group-hover:text-brand-primary transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-brand-muted text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 font-bold text-brand-main group-hover:text-brand-primary transition-colors">
                  Read Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* REGULAR FEED GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => viewPost(post.slug)}
              className="bg-brand-card border border-brand-border rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-brand-primary/[0.02] hover:border-brand-primary/30 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className={`w-full h-48 ${post.image} rounded-2xl mb-8 flex items-center justify-center border border-brand-border bg-brand-bg/40`}>
                  <Tag className="w-8 h-8 text-brand-primary opacity-10" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-bold text-brand-muted flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4 text-brand-main group-hover:text-brand-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-brand-border">
                <span className="text-xs font-bold text-brand-muted italic">{post.readTime}</span>
                <ArrowRight className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* NEWSLETTER FORM */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 bg-brand-main text-brand-card rounded-[3rem] border border-brand-border text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -z-0" />
          <h2 className="text-3xl md:text-5xl font-black text-brand-card mb-6 relative z-10">Stay ahead of the curve.</h2>
          <p className="text-brand-card/70 dark:text-brand-muted mb-10 max-w-md mx-auto relative z-10">Get the latest tools and tech insights delivered to your inbox every Tuesday.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-2xl bg-brand-bg/10 dark:bg-brand-bg border border-brand-border text-brand-main focus:outline-none focus:border-brand-primary transition-all font-semibold text-sm placeholder:text-brand-muted/50"
            />
            <button className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-hover shadow-lg shadow-brand-primary/20 transition-all text-sm active:scale-95">
              Subscribe
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// ==========================================
// THREAD-SAFE GLOBAL HYDRATION GUARD
// ==========================================
export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg pt-32 text-center text-brand-muted font-bold transition-colors">Loading Insights Pipeline...</div>}>
      <BlogContent />
    </Suspense>
  );
}