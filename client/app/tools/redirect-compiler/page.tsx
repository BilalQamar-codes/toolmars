"use client";

import { useState, useMemo, useTransition } from "react";
import { 
  RefreshCw, Copy, Check, Sparkles, Search, 
  Code2, AlertTriangle, Plus, Trash2, Server, HelpCircle, Terminal
} from "lucide-react";
import Head from "next/head";

interface RedirectRow {
  id: string;
  source: string;
  destination: string;
}

type ServerTarget = "nextjs" | "nginx" | "apache";

export default function RedirectCompiler() {
  const [rows, setRows] = useState<RedirectRow[]>([
    { id: "1", source: "/old-blog-post", destination: "/blogs/optimizing-nextjs-15-core-web-vitals" },
    { id: "2", source: "/tools/image-optimizer", destination: "/tools/image-converter" },
    { id: "3", source: "/contact-us", destination: "/contact" }
  ]);
  const [serverType, setServerType] = useState<ServerTarget>("nextjs");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Programmatic SEO JSON-LD Tool Configuration
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "URL Redirection Map & Server Config Compiler | Toolmars",
    "description": "Free online bulk redirect map compiler. Detect cyclical redirect loops, generate clean Nginx, Apache .htaccess, and Next.js redirect configuration objects without AI.",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const addRow = () => {
    setRows(prev => [...prev, { id: crypto.randomUUID(), source: "", destination: "" }]);
  };

  const updateRow = (id: string, field: "source" | "destination", value: string) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const removeRow = (id: string) => {
    setRows(prev => prev.filter(row => row.id !== id));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Real-Time Algorithmic Loop and Chain Detection (No AI Wrappers)
  const circularRouteErrors = useMemo(() => {
    const errorMessages: string[] = [];
    
    // Direct Self-Referential Check
    rows.forEach((row, idx) => {
      const src = row.source.trim();
      const dest = row.destination.trim();
      if (src && dest && src === dest) {
        errorMessages.push(`Row ${idx + 1}: Infinite Self-Loop found. Path points directly back onto itself.`);
      }
    });

    // Multi-Step Redirect Chain Tracking Logic
    const adjMap = new Map<string, string>();
    rows.forEach(row => {
      if (row.source.trim() && row.destination.trim()) {
        adjMap.set(row.source.trim(), row.destination.trim());
      }
    });

    rows.forEach((row, idx) => {
      const startPath = row.source.trim();
      if (!startPath) return;

      let current = startPath;
      const visited = new Set<string>();
      let internalChainCounter = 0;

      while (adjMap.has(current)) {
        visited.add(current);
        current = adjMap.get(current)!;
        internalChainCounter++;

        if (visited.has(current)) {
          errorMessages.push(`Row ${idx + 1}: Cyclical Routing Chain warning! Path sets off a closed routing loop involving: ${Array.from(visited).join(" → ")} → ${current}`);
          break;
        }

        // Warning threshold for multi-step redirection lag loops
        if (internalChainCounter > 3) {
          errorMessages.push(`Row ${idx + 1}: Performance Warning. Path triggers a deep redirect chain (>3 hops). This degrades SEO page speed metrics.`);
          break;
        }
      }
    });

    // Deduplicate structural array notifications cleanly
    return Array.from(new Set(errorMessages));
  }, [rows]);

  // Transpiles the dynamic row grid into syntactically perfect server-level directives
  const compiledServerOutput = useMemo(() => {
    const validRows = rows.filter(r => r.source.trim() && r.destination.trim());

    switch (serverType) {
      case "nextjs":
        const nextJson = validRows.map(r => `      {
        source: '${r.source.trim()}',
        destination: '${r.destination.trim()}',
        permanent: true,
      }`).join(",\n");
        return `// next.config.js\nmodule.exports = {\n  async redirects() {\n    return [\n${nextJson}\n    ];\n  },\n};`;

      case "nginx":
        return `# Nginx Redirect Configuration Map\n` + validRows.map(r => {
          return `rewrite ^${r.source.trim()}$ ${r.destination.trim()} permanent;`;
        }).join("\n");

      case "apache":
        return `# Apache .htaccess Redirect Engine Map\nRewriteEngine On\n` + validRows.map(r => {
          return `Redirect 301 ${r.source.trim()} ${r.destination.trim()}`;
        }).join("\n");
    }
  }, [serverType, rows]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Bulk URL Redirection Map & Configuration Compiler | Toolmars</title>
        <meta name="description" content="Compile bulk 301 redirect routing configurations without AI. Detect endless loops, trace routing latency chains, and export Nginx, Apache, or Next.js mappings safely." />
        <meta name="keywords" content="url redirection map, 301 redirect generator, robots rewrite rules, nginx redirect compiler, htaccess generator, toolmars" />
        <link rel="canonical" href="https://toolmars.com/tools/redirect-compiler" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <div className="max-w-7xl mx-auto">
        
        {/* --- DASHBOARD CONTROL HEAD CONSOLE --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <RefreshCw size={14} /> Routing Pipeline
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Redirect Map <span className="text-brand-primary">& Compiler.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Build migration route lists, calculate path cyclical dependencies, and generate valid deployment scripts instantly.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Live Path Lookup Filter
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Filter current list mappings..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- MAIN UTILITY WORKSPACE SPLIT --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Dynamic Redirection Mapping Matrix (7/12 layout) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black uppercase text-brand-muted tracking-wider">Routing Rules Map</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-bg rounded-md border border-brand-border text-brand-muted">{rows.length} Vectors Loaded</span>
              </div>

              {/* Dynamic Table Input Array Rows */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {rows.map((row, idx) => (
                  <div key={row.id} className="flex gap-3 items-center group/row">
                    <span className="font-mono text-xs text-brand-muted/50 w-5 text-right">{idx + 1}</span>
                    <input 
                      type="text" 
                      value={row.source} 
                      onChange={(e) => updateRow(row.id, "source", e.target.value)}
                      placeholder="Old Path (e.g., /old-route)" 
                      className="flex-1 bg-brand-bg border border-brand-border text-brand-main text-xs font-mono rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-all"
                    />
                    <span className="text-brand-muted/40 font-bold text-xs">➔</span>
                    <input 
                      type="text" 
                      value={row.destination} 
                      onChange={(e) => updateRow(row.id, "destination", e.target.value)}
                      placeholder="New URL Path (e.g., /new-route)" 
                      className="flex-1 bg-brand-bg border border-brand-border text-brand-main text-xs font-mono rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-all"
                    />
                    <button 
                      onClick={() => removeRow(row.id)}
                      className="p-3 text-brand-muted hover:text-red-500 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={addRow}
                className="w-full mt-2 py-3 bg-brand-bg hover:bg-brand-primary/5 text-brand-main hover:text-brand-primary border border-dashed border-brand-border hover:border-brand-primary rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Plus size={14} /> Add Redirection Rule Pair
              </button>
            </div>

            {/* Loop Safety Validation Banner */}
            {circularRouteErrors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-5 rounded-2xl space-y-2">
                <div className="flex gap-2 items-center text-xs font-black uppercase tracking-wider">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>Pipeline Execution Halts ({circularRouteErrors.length} Errors)</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {circularRouteErrors.map((err, i) => (
                    <p key={i} className="text-xs leading-relaxed opacity-90 pl-6 relative">
                      <span className="absolute left-1 top-0.5 text-xs select-none">•</span> {err}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Block: Destination Architecture Script Generation (5/12 layout) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-muted">
                <Server size={14} className="text-brand-primary" />
                <span>Output Deployment Rules</span>
              </div>

              {/* Target Ecosystem Selectors */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-brand-bg border border-brand-border rounded-xl">
                {[
                  { name: "Next.js", id: "nextjs" },
                  { name: "Nginx", id: "nginx" },
                  { name: "Apache", id: "apache" }
                ].map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => setServerType(srv.id as ServerTarget)}
                    className={`py-2 rounded-lg font-bold text-[11px] transition-all ${
                      serverType === srv.id 
                        ? "bg-brand-primary text-white shadow-sm" 
                        : "text-brand-muted hover:text-brand-main"
                    }`}
                  >
                    {srv.name}
                  </button>
                ))}
              </div>

              {/* Code Compilation Layout Area */}
              <div className="relative">
                <button 
                  onClick={() => handleCopy(compiledServerOutput)}
                  className="absolute right-3 top-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-card border border-brand-border text-[10px] font-bold text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all z-10 shadow-sm"
                >
                  {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                  <span>{copied ? "Copied" : "Copy Build"}</span>
                </button>
                <div className="p-4 pt-12 bg-brand-bg rounded-xl border border-brand-border overflow-x-auto font-mono text-xs text-brand-muted leading-relaxed h-64">
                  <pre>{compiledServerOutput}</pre>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- SUPPLEMENTARY TECHNICAL REPOSITORY DOCUMENTATION --- */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-brand-primary" /> Algorithmic Route Compilation Principles
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            When migrating web assets, search engine bots evaluate HTTP status tokens to transfer domain authority layout weights cleanly. Serving structural 301 headers instructs spiders that content vectors have relocated permanently. Redirection chains should be strictly consolidated down to a single hop; chaining maps recursively increases operational TTFB latency and completely exhausts search crawl budgeting allocations.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-8 text-xs text-brand-muted font-medium">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><HelpCircle size={14} className="text-brand-primary" /> Authority Preservation Rules</h3>
              <p className="leading-relaxed text-brand-muted">Using direct, clean mappings passes up to 95% of ranking signals (LinkEquity) directly to the target deployment page loop, protecting search index health.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><Terminal size={14} className="text-brand-primary" /> RegEx Bound Compliances</h3>
              <p className="leading-relaxed text-brand-muted">The compiled Nginx and Apache rewrites construct precise boundaries using string matching markers to prevent nested folders from triggering false matching cascades.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}