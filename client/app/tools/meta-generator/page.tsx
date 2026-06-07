"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Globe, Copy, Check, Sparkles, Search, 
  Monitor, Smartphone, Eye, Code2, AlertTriangle 
} from "lucide-react";
import Head from "next/head";

export default function MetaGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("https://yourdomain.com");
  const [copied, setCopied] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [titlePixelWidth, setTitlePixelWidth] = useState(0);
  const [descPixelWidth, setDescPixelWidth] = useState(0);

  // Hidden references to track pixel lengths against real browser canvas limits
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Programmatic SEO JSON-LD Configuration
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Technical Meta Tag Generator & SERP Simulator | Toolmars",
    "description": "Free online client-side meta tag generator. Compute pixel widths, preview search engine snippets for mobile and desktop, and export Next.js metadata configurations instantly.",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // Measure exact pixel sizing rules matching Google's modern desktop viewport calculations
  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    const context = canvasRef.current.getContext("2d");
    if (context) {
      // Google standard SERP font criteria variables
      context.font = "20px Arial";
      setTitlePixelWidth(Math.floor(context.measureText(title || "A").width));
      
      context.font = "14px Arial";
      setDescPixelWidth(Math.floor(context.measureText(description || "A").width));
    }
  }, [title, description]);

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Formats valid Next.js configuration structures algorithmically 
  const generateNextJsCode = () => {
    return `export const metadata = {
  title: "${title || 'Toolmars Utility Suite'}",
  description: "${description || 'Isolated client-side developer applications.'}",
  alternates: {
    canonical: "${url || 'https://toolmars.com'}",
  },
  openGraph: {
    title: "${title || 'Toolmars Utility Suite'}",
    description: "${description || 'Isolated client-side developer applications.'}",
    url: "${url || 'https://toolmars.com'}",
    type: "website",
  }
};`;
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Meta Tag Generator & Live SERP Simulator | Toolmars</title>
        <meta name="description" content="Optimize search engine preview widths using our technical pixel calculator. Generate compliant Next.js metadata objects safely." />
        <meta name="keywords" content="meta tag generator, serp simulator, google search snippet preview, pixel width counter, nextjs metadata, toolmars" />
        <link rel="canonical" href="https://toolmars.com/tools/meta-generator" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER CONSOLE WITH TOP-RIGHT LOOKUP --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <Globe size={14} /> Optimization Node
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              SERP Preview <span className="text-brand-primary">& Generator.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Measure exact pixel truncation limits and generate production metadata properties with zero telemetry tracking.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Live Parameter Filter
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Highlight term tokens..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- INTERFACE WORKSPACE --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Technical Inputs Layout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 space-y-5 shadow-sm">
              <h2 className="text-sm font-black uppercase text-brand-muted tracking-wider flex items-center gap-2">
                Configuration Inputs
              </h2>
              
              {/* Title Input Element */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-brand-muted uppercase">Meta Title</label>
                  <span className={`font-mono font-bold ${titlePixelWidth > 580 ? "text-amber-500" : "text-brand-muted"}`}>
                    {titlePixelWidth}px / 580px ({title.length} chars)
                  </span>
                </div>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Cloud Sandbox Tools Suite | Toolmars"
                  className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3.5 text-sm font-semibold outline-none focus:border-brand-primary transition-all"
                />
              </div>

              {/* Description Input Element */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-brand-muted uppercase">Meta Description</label>
                  <span className={`font-mono font-bold ${descPixelWidth > 960 ? "text-amber-500" : "text-brand-muted"}`}>
                    {descPixelWidth}px / 960px ({description.length} chars)
                  </span>
                </div>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Access secure, client-side data formatting utilities engineered natively for agile software developers. Free of cookie tracking."
                  className="w-full h-28 bg-brand-bg border border-brand-border text-brand-main rounded-xl p-4 text-sm font-semibold outline-none focus:border-brand-primary transition-all resize-none"
                />
              </div>

              {/* Canonical URL Input Element */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-brand-muted uppercase">Canonical Destination Link</label>
                <input 
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3.5 text-sm font-semibold outline-none focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Critical Warnings Notice Block if threshold is broken */}
            {(titlePixelWidth > 580 || descPixelWidth > 960) && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-5 rounded-2xl flex gap-3 text-xs leading-relaxed">
                <AlertTriangle className="shrink-0" size={16} />
                <div>
                  <span className="font-bold uppercase block mb-0.5">Pixel Threshold Warning</span>
                  Your metadata boundaries exceed Google's strict rendering framework limits. Strings highlighted in amber will likely be clipped with trailing ellipses (...) on search sheets.
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Simulated Live Layout Elements & Code Outputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SERP Preview Stage Card */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-6 text-left">
              <div className="flex justify-between items-center border-b border-brand-border pb-4">
                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-muted flex items-center gap-2">
                  <Eye size={14} /> Live Google Simulator
                </h3>
                
                {/* Viewport Toggles */}
                <div className="flex bg-brand-bg border border-brand-border p-1 rounded-xl">
                  <button 
                    onClick={() => setDevice("desktop")}
                    className={`p-2 rounded-lg transition-all ${device === "desktop" ? "bg-brand-primary text-white" : "text-brand-muted hover:text-brand-main"}`}
                  >
                    <Monitor size={15} />
                  </button>
                  <button 
                    onClick={() => setDevice("mobile")}
                    className={`p-2 rounded-lg transition-all ${device === "mobile" ? "bg-brand-primary text-white" : "text-brand-muted hover:text-brand-main"}`}
                  >
                    <Smartphone size={15} />
                  </button>
                </div>
              </div>

              {/* Simulated Google Result Node */}
              <div className={`p-2 font-sans overflow-hidden transition-all duration-300 ${device === "mobile" ? "max-w-[360px] border-l-2 border-brand-primary/20 pl-4" : "w-full"}`}>
                <div className="text-xs text-[#202124] dark:text-[#bdc1c6] mb-1 truncate font-normal">
                  {url.replace(/https?:\/\//, "").replace(/\/$/, "")}
                </div>
                
                <h3 className={`text-xl font-medium tracking-normal mb-1 leading-tight select-none hover:underline cursor-pointer ${titlePixelWidth > 580 ? "truncate" : ""} text-[#1a0dab] dark:text-[#8ab4f8]`}>
                  {title || "Please enter a specific target title..."}
                </h3>
                
                <p className={`text-sm leading-normal text-[#4d5156] dark:text-[#3c4043] select-none font-normal dark:text-[#rgba(255,255,255,0.7)] ${descPixelWidth > 960 ? "line-clamp-2 md:line-clamp-none md:truncate" : ""}`}>
                  {description || "Provide an asset workspace summary description to render the live search index mock block details here..."}
                </p>
              </div>
            </div>

            {/* Next.js Framework Code Module */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4 text-left">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-muted flex items-center gap-2">
                  <Code2 size={14} /> Next.js 13/14/15 Metadata Object
                </h3>
                <button 
                  onClick={() => handleCopy(generateNextJsCode())}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-bold text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all"
                >
                  {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy Code"}</span>
                </button>
              </div>

              <div className="p-4 bg-brand-bg rounded-xl border border-brand-border overflow-x-auto font-mono text-xs text-brand-muted leading-relaxed">
                <pre>{generateNextJsCode()}</pre>
              </div>
            </div>

          </div>
        </div>

        {/* --- SUPPLEMENTARY TEXT INTERACTIVE DOCUMENTATION LOOP --- */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-brand-primary" /> Algorithmic Indexing Rules Explained
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            Modern search engine spider scripts do not truncate titles based simply on string character lengths. Instead, they calculate spatial pixel grid allocations using proportional font widths. For instance, wide tracking letter shapes like capital <span className="font-mono font-bold text-brand-main bg-brand-card px-1.5 py-0.5 rounded border border-brand-border">W</span> require significantly wider layout rendering blocks than small shapes like <span className="font-mono font-bold text-brand-main bg-brand-card px-1.5 py-0.5 rounded border border-brand-border">i</span>. 
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-8 text-xs text-brand-muted font-medium">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Next.js Header Integrations</h3>
              <p className="leading-relaxed text-brand-muted">The generated configuration exports cleanly into static layout wrappers or dynamic page nodes, feeding automated crawl machines with clean semantic instructions.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Isolated Security Bounds</h3>
              <p className="leading-relaxed text-brand-muted">Your structural project drafts stay perfectly internal. The engine measures character tracking vectors inside your browser's execution memory context, isolating assets completely from external networks.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}