"use client";

import { motion } from "framer-motion";
import { Chrome, Download, ShieldCheck, Star, Zap } from "lucide-react";
import { myExtensions } from "../constants/extensions";

// 1. Define the shape of your extension object
interface Extension {
  title: string;
  description: string;
  bg: string;
  icon: React.ReactNode;
  version: string;
  link: string;
}

// 2. Define the props for your component
interface ExtensionCardProps {
  ext: Extension;
  index: number;
}
const ExtensionCard = ({ ext, index }: ExtensionCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
    // The "floating" effect: Hovering moves it up and darkens the shadow
    whileHover={{ y: -12 }}
    className="group relative"
  >
    {/* Decorative background glow */}
    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] opacity-0 group-hover:opacity-10 blur-xl transition duration-500" />
    
    {/* Card Container: Added stronger shadow and transition */}
    <div className="relative h-full bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/50 
                    shadow-[0_10px_30px_rgba(0,0,0,0.05),0_1px_4px_rgba(0,0,0,0.03)] 
                    group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12),0_10px_20px_rgba(0,0,0,0.06)] 
                    transition-all duration-500 ease-out flex flex-col items-center text-center">
      
      {/* Icon with animated border */}
      <div className="relative mb-8">
        <div className={`absolute -inset-4 ${ext.bg} rounded-full opacity-40 blur-lg group-hover:scale-110 transition-transform duration-500`} />
        <div className={`relative w-20 h-20 ${ext.bg} rounded-[2rem] flex items-center justify-center border border-white/20 shadow-inner`}>
          {ext.icon}
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-center gap-2 mb-3">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{ext.title}</h3>
          <Zap size={14} className="text-yellow-500 fill-yellow-500" />
        </div>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 px-2">
          {ext.description}
        </p>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 border border-slate-200">
          V {ext.version}
        </div>
        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={12} fill="currentColor" />
          <span className="text-[10px] font-bold text-slate-700">4.9/5</span>
        </div>
      </div>

      {/* Action Button */}
      <a 
        href={ext.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/btn relative w-full overflow-hidden py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 
                   shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover/btn:shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        <Download size={18} className="relative z-10" />
        <span className="relative z-10">Install Extension</span>
      </a>
    </div>
  </motion.div>
);

export default function ChromeExtensionsPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[120px] -z-10" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 48L54 60L52 60L52 48L40 48L40 46L52 46L52 34L54 34L54 46L66 46L66 48L54 48Z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
      />

      <header className="pt-32 pb-24 px-6 text-center relative">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm mb-8"
  >
    <Chrome size={16} className="text-brand-primary" />
    <span className="text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase">Premium Tools</span>
  </motion.div>
  
  <motion.h1 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.95]"
  >
    Level up your <br />
    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600 pb-2">
      Browser Flow
    </span>
  </motion.h1>

  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="text-slate-500 max-w-lg mx-auto text-xl font-medium leading-relaxed"
  >
    Unlock hyper-productivity with our collection of lightweight, high-performance Chrome extensions.
  </motion.p>
</header>

      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"> 
          {myExtensions.map((ext, index) => (
            <ExtensionCard key={ext.title} ext={ext} index={index} />
          ))}
        </div>
      </section>

      <footer className="mt-32 px-6 pb-20">
        <div className="max-w-xl mx-auto py-6 px-10 bg-white border border-slate-200 rounded-full flex items-center justify-between shadow-sm group hover:border-emerald-200 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="text-emerald-600" size={18} />
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Enterprise Security</p>
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified by Google</p>
        </div>
      </footer>
    </div>
  );
}