"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Code2, Globe, Sparkles, Layout, 
  ShieldCheck, Smartphone, Zap, ArrowRight, Link as LinkIcon 
} from "lucide-react";

const CATEGORIES = ["All", "Development", "Security", "Design", "Optimization"];

const TOOLS_DATA = [
  {
    id: 1,
    title: "AI Code Auditor",
    desc: "Scan your repository for security flaws and performance bottlenecks in seconds.",
    category: "Security",
    icon: <ShieldCheck className="w-6 h-6" />,
    stats: "1.2k+ Weekly Uses",
    href: "/tools/code-auditor"
  },
  {
    id: 2,
    title: "Global Edge Deploy",
    desc: "Instant worldwide distribution for your static assets with automated compression.",
    category: "Optimization",
    icon: <Zap className="w-6 h-6" />,
    stats: "99.9% Uptime",
    href: "/tools/edge-deploy"
  },
  {
    id: 3,
    title: "Smart SEO Lab",
    desc: "Generate high-ranking metadata and JSON-LD schemas using live SERP data.",
    category: "Development",
    icon: <Globe className="w-6 h-6" />,
    stats: "Top Rated",
    href: "/tools/seo-lab"
  },
  {
    id: 4,
    title: "Flex Grid Builder",
    desc: "Visual tool to generate complex Tailwind CSS layouts with drag-and-drop ease.",
    category: "Design",
    icon: <Layout className="w-6 h-6" />,
    stats: "Designer's Choice",
    href: "/tools/grid-builder"
  },
  {
    id: 5,
    title: "React Hook Smith",
    desc: "Generate custom, type-safe React hooks for common state management patterns.",
    category: "Development",
    icon: <Code2 className="w-6 h-6" />,
    stats: "Open Source",
    href: "/tools/hook-smith"
  },
  {
    id: 6,
    title: "Mobile View Simulator",
    desc: "Test your site on 50+ virtual mobile devices to ensure perfect responsiveness.",
    category: "Design",
    icon: <Smartphone className="w-6 h-6" />,
    stats: "v2.0 Live",
    href: "/tools/mobile-sim"
  },
  {
    id: 7,
    title: "Slug Generator",
    desc: "Convert your titles into URL-friendly slugs instantly.",
    category: "Development",
    icon: <LinkIcon className="w-6 h-6" />,
    stats: "New",
    href: "/tools/slug-generator"
  }
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Powerful <span className="text-brand-primary">Utilities.</span>
        </h1>
        <p className="text-brand-muted text-lg max-w-xl mx-auto mb-12">
          A curated collection of professional tools designed to accelerate your development workflow.
        </p>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input 
              type="text"
              placeholder="Search for a tool..."
              className="w-full bg-white border border-brand-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? "bg-brand-primary text-white shadow-lg shadow-blue-500/20" 
                    : "bg-white border border-brand-border text-brand-muted hover:border-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                layout
                key={tool.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-brand-card border border-brand-border p-8 rounded-[2.5rem] hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-primary border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-colors">
                      {tool.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted/60">
                      {tool.stats}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-3">{tool.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-8">{tool.desc}</p>
                </div>

                <Link href={tool.href} className="flex items-center justify-between pt-6 border-t border-brand-border/50 group/link">
                  <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-lg text-slate-500 uppercase tracking-tighter">
                    {tool.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-black text-brand-primary group-hover/link:translate-x-1 transition-transform">
                    Open Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}