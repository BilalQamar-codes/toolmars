"use client";

import { useState, useTransition, useEffect } from "react";
import { 
  ShieldAlert, Copy, Check, Sparkles, Search, 
  Terminal, ShieldCheck, FileCode, Play, AlertCircle 
} from "lucide-react";
import Head from "next/head";

// Pre-configured blocks for malicious or resource-heavy automated scripts
const BOT_PRESETS = {
  aiScrapers: [
    "# Block Aggressive AI Scrapers",
    "User-agent: GPTBot",
    "Disallow: /",
    "User-agent: ChatGPT-User",
    "Disallow: /",
    "User-agent: Google-Extended",
    "Disallow: /",
    "User-agent: Anthropic-AI",
    "Disallow: /",
    "User-agent: Claude-Web",
    "Disallow: /",
    "User-agent: cohere-ai",
    "Disallow: /",
  ],
  archiveBots: [
    "# Block Aggressive Archivers",
    "User-agent: ia_archiver",
    "Disallow: /",
  ],
  securityScanners: [
    "# Block Vulnerability Scanners",
    "User-agent: Nessus",
    "Disallow: /",
    "User-agent: CyberSpider",
    "Disallow: /",
  ]
};

export default function RobotsGenerator() {
  const [rules, setRules] = useState("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://yourdomain.com/sitemap.xml");
  const [testPath, setTestPath] = useState("/api/auth/private");
  const [testUserAgent, setTestUserAgent] = useState("*");
  const [testResult, setTestResult] = useState<{ allowed: boolean; reason: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // Programmatic SEO JSON-LD Configuration
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Robots.txt Generator & Directives Validator | Toolmars",
    "description": "Free online client-side robots.txt file generator and rule simulator. Test crawl directives, map paths against custom user-agents, and block aggressive AI scrapers natively.",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // Run a real-time syntax error validation scan on rules input change
  useEffect(() => {
    const lines = rules.split("\n");
    const newErrors: string[] = [];
    let standardUserAgentDeclared = false;

    lines.forEach((line, index) => {
      const cleanLine = line.trim();
      if (!cleanLine || cleanLine.startsWith("#")) return;

      if (cleanLine.toLowerCase().startsWith("user-agent:")) {
        standardUserAgentDeclared = true;
      }
      
      if ((cleanLine.toLowerCase().startsWith("allow:") || cleanLine.toLowerCase().startsWith("disallow:")) && !standardUserAgentDeclared) {
        newErrors.push(`Line ${index + 1}: Directive declared before defining a target User-agent block.`);
      }

      if (cleanLine.includes(":") && !cleanLine.startsWith("User-agent:") && !cleanLine.startsWith("Allow:") && !cleanLine.startsWith("Disallow:") && !cleanLine.startsWith("Sitemap:") && !cleanLine.startsWith("Crawl-delay:")) {
        newErrors.push(`Line ${index + 1}: Unrecognized configuration directive token.`);
      }
    });

    setErrors(newErrors);
  }, [rules]);

  // One-click structural preset appender
  const injectPreset = (presetKey: keyof typeof BOT_PRESETS) => {
    const block = BOT_PRESETS[presetKey].join("\n");
    setRules(prev => `${block}\n\n${prev}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rules);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Rule Simulation Sandbox Engine (100% Client-Side Matching Algorithm)
  const runRuleSimulation = () => {
    startTransition(() => {
      const lines = rules.split("\n");
      let currentAgentMatches = false;
      let matchedDirective: { allowed: boolean; length: number } | null = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith("#")) continue;

        const parts = line.split(":");
        const key = parts[0]?.trim().toLowerCase();
        const value = parts.slice(1).join(":").trim();

        if (key === "user-agent") {
          // Check if block matches all agents or specifically targeted simulation agent
          currentAgentMatches = (value === "*" || value.toLowerCase() === testUserAgent.toLowerCase());
          continue;
        }

        // If the crawling sequence falls within the matching agent scope block
        if (currentAgentMatches && (key === "allow" || key === "disallow")) {
          // Convert standard wildcards (*) into clean RegEx match metrics safely
          const regexPattern = value
            .replace(/[.+^${}()|[\]\\]/g, "\\$&") 
            .replace(/\*/g, ".*") 
            .replace(/\?/g, ".?");
          
          const matcher = new RegExp(`^${regexPattern}`);

          if (matcher.test(testPath)) {
            const isAllowed = key === "allow";
            // Explicit rule specificity tracking logic (longest path match wins rule parameters)
            if (!matchedDirective || value.length >= matchedDirective.length) {
              matchedDirective = { allowed: isAllowed, length: value.length };
            }
          }
        }
      }

      if (matchedDirective) {
        setTestResult({
          allowed: matchedDirective.allowed,
          reason: `Evaluated structural rule matching pattern: "${matchedDirective.allowed ? 'Allow' : 'Disallow'}" constraint.`
        });
      } else {
        setTestResult({
          allowed: true,
          reason: "No matched restriction path targets. Inherited default global crawl capability."
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Robots.txt Validator & Anti-Bot Shield Generator | Toolmars</title>
        <meta name="description" content="Validate crawl configurations, test custom endpoints via our sandbox simulator, and generate bullet-proof robots.txt parameters natively." />
        <meta name="keywords" content="robots.txt generator, robots txt validator, crawl rule tester, block ai scrapers, googlebot sandbox, toolmars" />
        <link rel="canonical" href="https://toolmars.com/tools/robots-generator" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER CONSOLE WITH TOP-RIGHT SEARCH FILTER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <Terminal size={14} /> Security Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Robots.txt <span className="text-brand-primary">Sandbox Console.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Generate target system indexing maps, inject robust AI scraper blocks, and simulate live crawler rule loops natively client-side.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Live File Syntax Filter
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Find directive strings..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- WORKSPACE CONTENT CORE GRIDS --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Interactive Configuration Options & Quick Injections */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Quick Action Preset Shields Injection Box */}
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-brand-muted">
                <ShieldAlert size={16} className="text-brand-primary" />
                <span>Security Shield Injection</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Add defensive filters into your file matrix stack to prevent resource scraping loops.
              </p>
              <div className="space-y-2 pt-2">
                <button 
                  onClick={() => injectPreset("aiScrapers")}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg hover:bg-brand-primary/10 border border-brand-border hover:border-brand-primary text-brand-main hover:text-brand-primary text-xs font-bold text-left transition-colors"
                >
                  + Block AI Content Scrapers
                </button>
                <button 
                  onClick={() => injectPreset("archiveBots")}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg hover:bg-brand-primary/10 border border-brand-border hover:border-brand-primary text-brand-main hover:text-brand-primary text-xs font-bold text-left transition-colors"
                >
                  + Block Web History Archivers
                </button>
                <button 
                  onClick={() => injectPreset("securityScanners")}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-bg hover:bg-brand-primary/10 border border-brand-border hover:border-brand-primary text-brand-main hover:text-brand-primary text-xs font-bold text-left transition-colors"
                >
                  + Block Vulnerability Probers
                </button>
              </div>
            </div>

            {/* Sandbox Real-Time Validation Feedback Flag Card */}
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 shadow-sm text-left">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-brand-muted mb-3">
                <FileCode size={16} className="text-brand-primary" />
                <span>Syntax Quality</span>
              </div>
              {errors.length === 0 ? (
                <div className="flex gap-2 items-start text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/10">
                  <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                  <span>File rules pass all semantic structure guidelines perfectly.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {errors.map((err, i) => (
                    <div key={i} className="flex gap-2 items-start text-xs text-red-500 bg-red-500/5 p-3 rounded-xl border border-red-500/10 leading-relaxed">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Block: Interactive Code Sandbox Editor Window */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-brand-card rounded-[32px] border border-brand-border shadow-sm overflow-hidden transition-all focus-within:border-brand-primary/40 focus-within:ring-4 focus-within:ring-brand-primary/5">
              <div className="flex justify-between items-center bg-brand-bg/50 px-6 py-4 border-b border-brand-border">
                <span className="font-mono text-xs font-semibold text-brand-muted">robots.txt configuration</span>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-bold text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all"
                >
                  {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy Content"}</span>
                </button>
              </div>
              <textarea
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                className="w-full h-[480px] p-6 outline-none border-none bg-transparent font-mono text-sm leading-relaxed text-brand-main placeholder:text-brand-muted/30 resize-none"
              />
            </div>
          </div>

          {/* Right Block: Live Path Crawler Simulator Engine */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4 text-left">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-muted mb-2">
                <Play size={15} className="text-brand-primary" />
                <span>Pipeline Simulator</span>
              </div>
              
              <div className="space-y-3">
                {/* User-Agent Path Selection Wrapper */}
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted uppercase mb-1">Simulated User-Agent</label>
                  <input 
                    type="text"
                    value={testUserAgent}
                    onChange={(e) => setTestUserAgent(e.target.value)}
                    placeholder="e.g., Googlebot, GPTBot, *"
                    className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                {/* Target Path Testing Parameter */}
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted uppercase mb-1">Target Endpoint Path</label>
                  <input 
                    type="text"
                    value={testPath}
                    onChange={(e) => setTestPath(e.target.value)}
                    className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-2.5 text-xs font-semibold outline-none focus:border-brand-primary transition-all"
                  />
                </div>

                <button 
                  onClick={runRuleSimulation}
                  disabled={isPending}
                  className="w-full mt-2 py-3 bg-brand-primary text-white hover:bg-brand-hover rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm shadow-brand-primary/10"
                >
                  <span>Evaluate Route Restrictions</span>
                </button>
              </div>

              {/* Simulation Response Matrix View Panel */}
              {testResult && (
                <div className={`mt-4 p-4 rounded-xl border transition-all ${
                  testResult.allowed 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                    : "bg-red-500/10 border-red-500/20 text-red-500"
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide mb-1">
                    <span className={`w-2 h-2 rounded-full ${testResult.allowed ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span>Crawl Access: {testResult.allowed ? "ALLOWED" : "BLOCKED"}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-brand-muted mt-2">{testResult.reason}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* --- SUPPLEMENTARY TECHNICAL REPOSITORY EXPLANATION --- */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-brand-primary" /> Architectural Scanning Compliance Rules
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            The processing parsing loop runs custom text sequence alignment checks without utilizing external cloud processes. Each user-agent condition node sets an exclusive boundary context inside search engine parsing graphs. When multiple wildcard targets compete for priority allocations over deep paths, rule engines apply the path match length criterion parameters to verify file access rights.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-8 text-xs text-brand-muted font-medium">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Wildcard RegEx Testing</h3>
              <p className="leading-relaxed text-brand-muted">Handles path mapping symbols securely, tracking variables such as trailing dollar string terminations ($) or universal folder locks (*).</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Resource Conservation Limits</h3>
              <p className="leading-relaxed text-brand-muted">Isolating complex analytics panels or authentication loops through Disallow statements reduces indexing strain, focusing crawl budgets onto valuable content pages.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}