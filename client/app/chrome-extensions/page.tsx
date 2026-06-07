"use client";

import { useEffect, useState } from "react";
import { Chrome, Download, ShieldCheck, Star, Zap, Search, Code2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { myExtensions } from "../constants/extensions";

interface Extension {
  title: string;
  description: string;
  bg: string;
  icon: React.ReactNode;
  version: string;
  link: string;
}

interface ExtensionCardProps {
  ext: Extension;
  index: number;
}

const ExtensionCard = ({ ext, index }: ExtensionCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
    whileHover={{ y: -12 }}
    className="group relative"
  >
    {/* FIXED: Reduced global blur gradient cloud opacity down to 4% (opacity-5 max) for a subtle lift */}
    <div className="absolute -inset-2 bg-gradient-to-r from-brand-primary to-purple-600 rounded-[3rem] opacity-0 group-hover:opacity-5 blur-xl transition duration-500" />
    
    <div className="relative h-full bg-brand-card/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-brand-border 
                    shadow-[0_10px_30px_rgba(0,0,0,0.02),0_1px_4px_rgba(0,0,0,0.01)] 
                    group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08),0_10px_20px_rgba(0,0,0,0.04)] 
                    transition-all duration-500 ease-out flex flex-col items-center text-center">
      
      {/* Icon frame setup */}
      <div className="relative mb-8">
        {/* FIXED: Reduced layout envelope inset to -inset-2 and slashed opacity down to 15% to stop the neon lens-flare bleeding */}
        <div className={`absolute -inset-2 ${ext.bg} rounded-full opacity-15 blur-md group-hover:scale-110 transition-transform duration-500`} />
        <div className={`relative w-20 h-20 ${ext.bg} rounded-[2rem] flex items-center justify-center border border-white/5 shadow-inner`}>
          {ext.icon}
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-center gap-2 mb-3">
          <h3 className="text-2xl font-black text-brand-main tracking-tight">{ext.title}</h3>
          <Zap size={14} className="text-amber-500 fill-amber-500" />
        </div>
        <p className="text-brand-muted text-[15px] leading-relaxed mb-8 px-2">
          {ext.description}
        </p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="px-3 py-1 bg-brand-bg rounded-full text-[10px] font-bold text-brand-muted border border-brand-border uppercase">
          V {ext.version}
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={12} fill="currentColor" />
          <span className="text-[10px] font-bold text-brand-main">4.9/5</span>
        </div>
      </div>

      <a 
        href={ext.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn relative w-full overflow-hidden py-4 bg-brand-main text-brand-card rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md border border-brand-border"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-hover opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        <Download size={18} className="relative z-10" />
        <span className="relative z-10">Install Extension</span>
      </a>
    </div>
  </motion.div>
);

export default function ChromeExtensionsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredExtensions = myExtensions.filter(ext => 
    ext.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ext.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Toolmars Chrome Extensions Directory",
    "description": "A light-weight and secure extension suite engineered to add core screen recording and productivity capabilities directly inside browser flows.",
    "itemListElement": myExtensions.map((ext, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": ext.title,
      "description": ext.description,
      "url": ext.link
    }))
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-main overflow-hidden transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Developer Chrome Extensions Directory | Flow Utilities | Toolmars</title>
        <meta name="description" content="Supercharge your productivity using our suite of secure, high-performance browser tools. Open-source, verified layouts built for developer workflows." />
        <meta name="keywords" content="chrome extensions for developers, productivity browser plugins, local screen recorder, toolmars extension suite" />
        <link rel="canonical" href="https://toolmars.com/chrome-extensions" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </Head>

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] -z-10" />
      
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none -z-10" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48L54 60L52 60L52 48L40 48L40 46L52 46L52 34L54 34L54 46L66 46L66 48L54 48Z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-card border border-brand-border shadow-sm"
            >
              <Chrome size={14} className="text-brand-primary" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-muted uppercase">Premium Addons</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Browser <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-500">Flow Enhancers.</span>
            </h1>

            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Unlock hyper-productivity loops with light-weight, native system integrations.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Live Addon Filter
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Search extensions..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"> 
            <AnimatePresence mode="popLayout">
              {filteredExtensions.map((ext, index) => (
                <ExtensionCard key={ext.title} ext={ext} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredExtensions.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-brand-muted">
              <Code2 size={40} className="mx-auto mb-4 stroke-1" />
              <p className="text-base font-bold">No companion extensions matched your query</p>
              <p className="text-xs mt-1">Try modifying structural search values or check back later for updates.</p>
            </motion.div>
          )}
        </section>

        <section className="mt-28 border-t border-brand-border pt-16 max-w-3xl mx-auto transition-colors">
          <div className="text-center mb-12">
            <HelpCircle className="w-7 h-7 text-brand-primary mx-auto mb-2" />
            <h2 className="text-2xl font-black text-brand-main tracking-tight">Frequently Asked Specifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Are these developer browser add-ons verified by Google store protocols?", a: "Yes. Every extension item undergoes direct Automated Static Analysis vetting alongside explicit manifest security tracing inside the Chrome Web Store validation engine before being linked." },
              { q: "Do these scripts inject cookie metrics or track layout actions?", a: "No. Toolmars utilities feature pure zero-telemetry architectures. Local extensions (like screen tracking loops) leverage isolated memory contexts, preserving system isolation." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-brand-border rounded-2xl overflow-hidden transition-all bg-brand-card">
                <button 
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-brand-main hover:bg-brand-bg transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-brand-muted text-lg">{faqOpen === idx ? "−" : "+"}</span>
                </button>
                {faqOpen === idx && (
                  <div className="p-5 bg-brand-bg/50 text-brand-muted text-xs border-t border-brand-border leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-24">
          <div className="max-w-xl mx-auto py-6 px-10 bg-brand-card border border-brand-border rounded-full flex items-center justify-between shadow-sm group hover:border-brand-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={18} />
              </div>
              <p className="text-xs font-bold text-brand-main uppercase tracking-widest">Enterprise Security</p>
            </div>
            <div className="h-4 w-px bg-brand-border" />
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Verified store artifacts</p>
          </div>
        </footer>
      </div>
    </div>
  );
}