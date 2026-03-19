"use client";

import { motion } from "framer-motion";
import { 
  Zap, ArrowRight, Code2, Globe, Sparkles, 
  MessageSquare, Star, ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const bestTools = [
    {
      title: "AI Code Auditor",
      desc: "Automatically find and fix vulnerabilities in your React & Next.js projects.",
      icon: <Code2 className="w-6 h-6 text-brand-primary" />,
      tag: "Popular"
    },
    {
      title: "Global Edge Deploy",
      desc: "Deploy your assets to 200+ edge locations with a single click.",
      icon: <Globe className="w-6 h-6 text-brand-primary" />,
      tag: "New"
    },
    {
      title: "Smart SEO Optimizer",
      desc: "Generate meta tags and structured data using advanced LLM logic.",
      icon: <Sparkles className="w-6 h-6 text-brand-primary" />,
      tag: "Beta"
    }
  ];

  const featuredBlogs = [
    {
      title: "Scaling Next.js 15 for 1M+ Users",
      excerpt: "Learn the architecture secrets behind high-traffic applications.",
      date: "Mar 12, 2026",
      category: "Architecture"
    },
    {
      title: "Tailwind v4: The New Era",
      excerpt: "Everything you need to know about the CSS-variable-first engine.",
      date: "Feb 28, 2026",
      category: "Design"
    }
  ];

  const reviews = [
    {
      name: "Alex Rivera",
      role: "CTO at NexusFlow",
      text: "Toolmars has cut our deployment time by 40%. The AI Auditor is a lifesaver.",
      avatar: "AR"
    },
    {
      name: "Sarah Chen",
      role: "Fullstack Dev",
      text: "The cleanest UI I've ever worked with. The tools are actually useful, not bloat.",
      avatar: "SC"
    }
  ];

  return (
    <div className="bg-brand-bg min-h-screen text-brand-main pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-primary/10 blur-[120px] -z-10" />
        
        <motion.div 
          initial="hidden" animate="visible" variants={containerVariants}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.span variants={containerVariants} className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-white border border-brand-border rounded-full shadow-sm">
            🚀 Trusted by 5,000+ Developers
          </motion.span>
          
          <motion.h1 variants={containerVariants} className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            The Ultimate <br/>
            <span className="bg-gradient-to-r from-brand-primary to-indigo-600 bg-clip-text text-transparent italic">Developer Toolkit.</span>
          </motion.h1>
          
          <motion.p variants={containerVariants} className="text-brand-muted text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop switching between dozen apps. Toolmars brings high-performance utilities, AI auditing, and edge deployment into one clean interface.
          </motion.p>

          <motion.div variants={containerVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-hover transition-all flex items-center gap-2 shadow-xl shadow-blue-500/20">
              Explore All Tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/contact" className="px-8 py-4 bg-white border border-brand-border rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
              Contact Sales
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- BEST TOOLS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Best Rated Tools</h2>
            <p className="text-brand-muted mt-2">Powering the next generation of web apps.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bestTools.map((tool, i) => (
            <div key={i} className="bg-brand-card border border-brand-border p-8 rounded-[2rem] hover:shadow-2xl hover:shadow-blue-500/5 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center border border-brand-border">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-md">
                  {tool.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{tool.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">{tool.desc}</p>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-primary">
                Try Tool <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <section className="bg-white border-y border-brand-border py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">Loved by builders worldwide.</h2>
            <p className="text-brand-muted">Join the community of developers who have simplified their workflow with Toolmars.</p>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {reviews.map((rev, i) => (
              <div key={i} className="p-8 bg-brand-bg rounded-3xl border border-brand-border">
                <p className="italic text-brand-main mb-6 font-medium">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{rev.name}</h4>
                    <p className="text-xs text-brand-muted">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BEST BLOGS SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Knowledge Base</h2>
          <p className="text-brand-muted">Expert insights on coding, design, and deployment.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featuredBlogs.map((blog, i) => (
            <div key={i} className="group bg-brand-card border border-brand-border p-8 rounded-[2.5rem] hover:border-brand-primary transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{blog.category}</span>
                  <span className="text-xs text-brand-muted">{blog.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors">{blog.title}</h3>
                <p className="text-brand-muted leading-relaxed mb-8">{blog.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 font-bold text-brand-main group-hover:translate-x-2 transition-transform cursor-pointer">
                Read Article <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-brand-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/40">
           <Zap className="absolute -top-10 -left-10 w-64 h-64 text-white/10 -rotate-12" />
           <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Stop building solo. <br/> Start building with Toolmars.</h2>
           <p className="text-blue-100 mb-10 relative z-10 max-w-md mx-auto">Access the full toolkit today and join the elite circle of high-performance developers.</p>
           <button className="bg-white text-brand-primary px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all relative z-10">
             Get Instant Access
           </button>
        </div>
      </section>
    </div>
  );
}