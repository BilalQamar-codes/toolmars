"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import Link from "next/link";

const BLOGS_DATA = [
  {
    id: 1,
    title: "Optimizing Next.js 15 for Core Web Vitals",
    excerpt: "Deep dive into partial pre-rendering and how to achieve a perfect 100 Lighthouse score in 2026.",
    category: "Development",
    date: "March 15, 2026",
    readTime: "8 min read",
    image: "bg-blue-600/10",
    featured: true
  },
  {
    id: 2,
    title: "The Rise of AI-Driven Code Auditing",
    excerpt: "Why manual security reviews are becoming a thing of the past for modern SaaS teams.",
    category: "Security",
    date: "March 10, 2026",
    readTime: "5 min read",
    image: "bg-indigo-600/10",
    featured: false
  },
  {
    id: 3,
    title: "Tailwind v4: CSS Variable Architecture",
    excerpt: "Master the new engine and learn how to build scalable design systems with zero config files.",
    category: "Design",
    date: "March 05, 2026",
    readTime: "6 min read",
    image: "bg-slate-600/10",
    featured: false
  },
  {
    id: 4,
    title: "Edge Computing: The End of Latency?",
    excerpt: "Exploring how Toolmars deploys assets to 200+ locations to ensure sub-millisecond response.",
    category: "Infrastructure",
    date: "Feb 28, 2026",
    readTime: "10 min read",
    image: "bg-brand-primary/10",
    featured: false
  }
];

export default function BlogsPage() {
  const featuredPost = BLOGS_DATA.find(b => b.featured);
  const regularPosts = BLOGS_DATA.filter(b => !b.featured);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-4"
          >
            Our <span className="text-brand-primary">Insights.</span>
          </motion.h1>
          <p className="text-brand-muted text-lg max-w-2xl leading-relaxed">
            Expert perspectives on building, securing, and scaling the modern web. 
            Updated weekly by the Toolmars engineering team.
          </p>
        </div>

        {/* --- FEATURED POST --- */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group cursor-pointer mb-20 overflow-hidden rounded-[3rem] border border-brand-border bg-white shadow-2xl shadow-blue-500/5 transition-all hover:border-brand-primary/30"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className={`h-64 lg:h-full ${featuredPost.image} flex items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-border`}>
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
                <h2 className="text-3xl md:text-4xl font-black mb-6 group-hover:text-brand-primary transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-brand-muted text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 font-bold text-brand-main">
                  Read Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- BLOG GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-card border border-brand-border rounded-[2.5rem] p-8 hover:shadow-xl hover:border-brand-primary/20 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className={`w-full h-48 ${post.image} rounded-2xl mb-8 flex items-center justify-center border border-brand-border/50`}>
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
                <h3 className="text-2xl font-black mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-brand-border/50">
                <span className="text-xs font-bold text-brand-muted italic">{post.readTime}</span>
                <ArrowRight className="w-5 h-5 text-brand-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- NEWSLETTER CTA --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 bg-brand-main rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -z-0" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">Stay ahead of the curve.</h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto relative z-10">Get the latest tools and tech insights delivered to your inbox every Tuesday.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-primary transition-all"
            />
            <button className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-hover shadow-lg shadow-blue-500/20 transition-all">
              Subscribe
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}