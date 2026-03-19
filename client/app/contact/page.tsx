"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Send, Zap } from "lucide-react";

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main pt-32 pb-20 px-6">
      {/* Dynamic Background Glow - Adjusted for Light Mode visibility */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] -z-10 animate-pulse" />

      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <motion.span variants={containerVariants} className="text-brand-primary font-bold uppercase tracking-[0.2em] text-xs">
                Get in Touch
              </motion.span>
              <motion.h1 variants={containerVariants} className="text-5xl md:text-6xl font-black mt-4 mb-6 tracking-tight leading-[1.1]">
                Let's talk about <br />
                <span className="bg-gradient-to-r from-brand-primary to-indigo-600 bg-clip-text text-transparent">your next project.</span>
              </motion.h1>
              <motion.p variants={containerVariants} className="text-brand-muted text-lg leading-relaxed max-w-md">
                Have a question about Toolmars? Our team is here to help you scale your infrastructure and optimize your workflow.
              </motion.p>
            </div>

            <motion.div variants={containerVariants} className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5" />, label: "Email us", value: "support@toolmars.com" },
                { icon: <MessageSquare className="w-5 h-5" />, label: "Live Chat", value: "Avg response: 2 mins" },
                { icon: <MapPin className="w-5 h-5" />, label: "Office", value: "Lahore, Punjab, Pakistan" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-brand-border flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-brand-muted text-[10px] uppercase font-bold tracking-[0.15em] mb-0.5">{item.label}</p>
                    <p className="font-bold text-brand-main text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div 
            variants={containerVariants}
            className="bg-brand-card border border-brand-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden"
          >
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -z-10" />
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" placeholder="Mustafa Riaz" />
                <InputGroup label="Email Address" placeholder="mustafa@example.com" type="email" />
              </div>
              <InputGroup label="Subject" isSelect options={["General Inquiry", "Technical Support", "Billing", "Partnership"]} />
              <InputGroup label="Message" isTextArea placeholder="Tell us how we can help..." />

              <button className="w-full bg-brand-primary hover:bg-brand-hover text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/25">
                Send Message 
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

function InputGroup({ label, placeholder, type = "text", isTextArea = false, isSelect = false, options = [] }: any) {
  const baseClass = "w-full bg-slate-50/50 border border-brand-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-sm text-brand-main placeholder:text-slate-400";
  
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-brand-muted uppercase ml-1 tracking-widest">{label}</label>
      {isTextArea ? (
        <textarea rows={4} placeholder={placeholder} className={`${baseClass} resize-none`} />
      ) : isSelect ? (
        <div className="relative">
          <select className={`${baseClass} appearance-none cursor-pointer`}>
            {options.map((opt: string) => <option key={opt}>{opt}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted opacity-50">
            ▼
          </div>
        </div>
      ) : (
        <input type={type} placeholder={placeholder} className={baseClass} />
      )}
    </div>
  );
}