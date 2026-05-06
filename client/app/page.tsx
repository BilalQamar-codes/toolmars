"use client";

import { motion } from "framer-motion";
import { 
  Zap, ArrowRight, Code2, Globe, Sparkles, Search, ShieldCheck, 
  Database, LayoutGrid, ArrowUpRight, Cpu, Layers, MousePointer2, 
  CheckCircle2, Terminal, Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "DevOps", "AI/ML", "Web Utilities", "Security", "Design"];

  const tools = [
    { title: "AI Code Auditor", desc: "Scan React/Next.js for security flaws.", category: "DevOps", icon: <Code2 />, popular: true },
    { title: "Global Edge Deploy", desc: "Push to 200+ nodes instantly.", category: "DevOps", icon: <Globe />, popular: false },
    { title: "Smart SEO", desc: "LLM-powered metadata generation.", category: "AI/ML", icon: <Sparkles />, popular: true },
    { title: "JSON Architect", desc: "Visualize and format complex data.", category: "Web Utilities", icon: <Database />, popular: false },
    { title: "Header Inspector", desc: "Analyze HTTP security headers.", category: "Security", icon: <ShieldCheck />, popular: false },
    { title: "SVG Optimizer", desc: "Compress assets without quality loss.", category: "Design", icon: <Layers />, popular: false },
  ];

  return (
    <div className="bg-[#fcfcfd] min-h-screen text-slate-900 font-sans">
      
      

      {/* 2. NAVIGATION (Simplified for Landing) */}
      {/* <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg" /> Toolmars
        </div>
        <div className="hidden md:flex gap-8 font-bold text-sm text-slate-600">
          <Link href="/tools">All Tools</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/docs">API Docs</Link>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
          Dashboard
        </button>
      </nav> */}

      {/* 3. HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mb-8">
            <Terminal className="w-3 h-3" /> Built for modern engineering teams
          </motion.div>
          
          <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tight leading-[0.9] mb-8">
            Your workflow, <br/>
            <span className="text-brand-primary">hyper-optimized.</span>
          </h1>
          
          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12">
            One subscription for 50+ premium developer tools. No more tab-switching. No more bloat. Just pure performance.
          </p>

          {/* Integrated Search Command */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-xl p-2">
              <Search className="ml-4 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Find a tool... (Press '⌘+K')" 
                className="w-full px-4 py-4 text-lg outline-none bg-transparent"
              />
              <button className="hidden sm:block bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE STATS TICKER */}
      <section className="border-y border-slate-100 bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Tools Available", val: "54+" },
            { label: "Active Developers", val: "12k" },
            { label: "Daily Requests", val: "1.2M" },
            { label: "Uptime", val: "99.9%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-slate-900">{stat.val}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TOOL EXPLORER GRID */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-4">The Toolkit</h2>
            <p className="text-slate-500">Everything you need to build, audit, and scale your next project without leaving the browser.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeCategory === cat ? 'bg-white shadow-sm text-brand-primary' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={i} 
              className="group p-8 bg-white border border-slate-200 rounded-[2rem] hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary border border-slate-100 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  {tool.icon}
                </div>
                {tool.popular && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">Hot</span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{tool.desc}</p>
              <div className="flex items-center gap-2 text-sm font-black text-brand-primary group-hover:gap-4 transition-all">
                Open Utility <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
          {/* Add Request Tool Card */}
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-center hover:border-brand-primary transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 group-hover:text-brand-primary">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Missing something?</h4>
            <p className="text-xs text-slate-400 mt-1">Request a custom tool</p>
          </div>
        </div>
      </section>

      {/* 6. FEATURE FOCUS: "WHY TOOLMARS?" */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black leading-tight mb-8">Enterprise-grade <br/><span className="text-blue-400">Security & Speed.</span></h2>
            <div className="space-y-8">
              {[
                { t: "Local-First Processing", d: "We don't store your sensitive code or data. Everything happens in your browser." },
                { t: "Next.js 15 Optimized", d: "Tailored specifically for modern Vercel/Next workflows." },
                { t: "Collaborative Links", d: "Share tool results with your team via secure, expiring URLs." }
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{f.t}</h4>
                    <p className="text-slate-400 text-sm">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-tr from-brand-primary to-purple-500 w-full aspect-video rounded-3xl rotate-3 absolute -inset-2 opacity-20 blur-xl" />
            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-4 shadow-2xl">
               {/* Mock UI for a tool */}
               <div className="flex gap-2 mb-4 border-b border-slate-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
               </div>
               <div className="space-y-3">
                  <div className="h-4 bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-slate-700 rounded w-1/2" />
                  <div className="h-20 bg-slate-900 rounded border border-blue-500/30 flex items-center justify-center">
                    <span className="text-blue-400 text-xs font-mono">Running Code Audit... 87%</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-primary to-indigo-700 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <Sparkles className="absolute top-10 right-10 w-32 h-32 text-white/10" />
          <h2 className="text-5xl font-black mb-8 relative z-10">Build faster today.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button className="bg-white text-brand-primary px-10 py-5 rounded-2xl font-black text-lg hover:shadow-xl transition-all">
              Unlock All Tools
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}