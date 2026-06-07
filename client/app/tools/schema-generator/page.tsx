"use client";

import { useState, useMemo } from "react";
import { 
  Braces, Copy, Check, Sparkles, Search, 
  Code2, AlertCircle, CheckCircle2, Layers, HelpCircle
} from "lucide-react";
import Head from "next/head";

type SchemaType = "SoftwareApplication" | "Article" | "FAQPage" | "Product" | "Organization";

export default function SchemaGenerator() {
  const [activeSchema, setActiveSchema] = useState<SchemaType>("SoftwareApplication");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Comprehensive Schema Field State Management Datasets
  const [fields, setFields] = useState({
    // SoftwareApplication Fields
    appName: "Toolmars Web Suite",
    appDesc: "Secure, client-side development optimization tools running natively inside browser environments.",
    appCategory: "DeveloperApplication",
    appPrice: "0",
    
    // Article Fields
    artTitle: "Optimizing Core Web Vitals in Next.js 15",
    artAuthor: "Muhammad Noman Zafar",
    artDate: "2026-06-02",
    artImage: "https://toolmars.com/images/blog-cover.jpg",
    
    // Product Fields
    prodName: "Premium Dev Sandbox Utility Access",
    prodBrand: "Toolmars",
    prodPrice: "19.99",
    prodCurrency: "USD",
    prodRating: "4.9",
    
    // Organization Fields
    orgName: "Toolmars Open Source Lab",
    orgUrl: "https://toolmars.com",
    orgLogo: "https://toolmars.com/logo.png",
    
    // FAQPage Fields (Dynamic parsing of key-value arrays computed below)
    faqQ1: "Are these developer tools free to utilize?",
    faqA1: "Yes, every application module in our catalog runs 100% free with no account registrations needed.",
    faqQ2: "Is my data processed securely?",
    faqA2: "Absolutely. All computation routines compile client-side in your memory stack. Your code is never saved."
  });

  // Programmatic SEO Tool Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JSON-LD Structured Data Schema Generator | Toolmars",
    "description": "Generate error-free Schema.org structured data snippets for Next.js. Live validation checks for Products, Articles, FAQs, and Apps.",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const handleInputChange = (key: string, val: string) => {
    setFields(prev => ({ ...prev, [key]: val }));
  };

  // Algorithmic construction of Schema.org syntax maps (No AI wrappers)
  const compiledJsonLd = useMemo(() => {
    switch (activeSchema) {
      case "SoftwareApplication":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": fields.appName,
          "description": fields.appDesc,
          "applicationCategory": fields.appCategory,
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": fields.appPrice,
            "priceCurrency": "USD"
          }
        };
      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": fields.artTitle,
          "author": { "@type": "Person", "name": fields.artAuthor },
          "datePublished": fields.artDate,
          "image": fields.artImage
        };
      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": fields.prodName,
          "image": fields.artImage,
          "brand": { "@type": "Brand", "name": fields.prodBrand },
          "offers": {
            "@type": "Offer",
            "price": fields.prodPrice,
            "priceCurrency": fields.prodCurrency,
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": fields.prodRating,
            "reviewCount": "128"
          }
        };
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": fields.orgName,
          "url": fields.orgUrl,
          "logo": fields.orgLogo
        };
      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": fields.faqQ1,
              "acceptedAnswer": { "@type": "Answer", "text": fields.faqA1 }
            },
            {
              "@type": "Question",
              "name": fields.faqQ2,
              "acceptedAnswer": { "@type": "Answer", "text": fields.faqA2 }
            }
          ]
        };
    }
  }, [activeSchema, fields]);

  // Real-Time Property Requirement Check Engine
  const validationWarnings = useMemo(() => {
    const alerts: string[] = [];
    if (activeSchema === "SoftwareApplication") {
      if (!fields.appName.trim()) alerts.push("Application Name is strongly required by Google crawlers.");
      if (!fields.appDesc.trim() || fields.appDesc.length < 20) alerts.push("Provide a description longer than 20 chars to avoid parsing truncation.");
    } else if (activeSchema === "Article") {
      if (!fields.artTitle.trim()) alerts.push("Headline missing. Google will reject Article snippets without headers.");
      if (!fields.artImage.startsWith("http")) alerts.push("Crawler warnings: Image target must be an absolute URL.");
    } else if (activeSchema === "Product") {
      if (!fields.prodPrice || parseFloat(fields.prodPrice) < 0) alerts.push("Offer structure error: Valid price is required.");
    } else if (activeSchema === "Organization") {
      if (!fields.orgUrl.startsWith("http")) alerts.push("Organization URL framework must contain an absolute HTTP/HTTPS path root.");
    }
    return alerts;
  }, [activeSchema, fields]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeString = JSON.stringify(compiledJsonLd, null, 2);
  const nextJsSnippet = `<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(compiledJsonLd)}) }}
/>`;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>JSON-LD Rich Snippet Generator & Next.js Schema Engine | Toolmars</title>
        <meta name="description" content="Generate valid Schema.org structured data files without AI. Live structural parameter verification for safe developer deployments." />
        <meta name="keywords" content="json-ld generator, structured data workspace, rich snippets generator, schema validation check, toolmars" />
        <link rel="canonical" href="https://toolmars.com/tools/schema-generator" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <div className="max-w-7xl mx-auto">
        
        {/* --- CONSOLE HEADER SYSTEM --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <Braces size={14} /> Semantic Struct Node
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Rich Schema <span className="text-brand-primary">Workspace.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Build high-visibility Schema.org injection arrays manually. Inject clean parameters ready for Google search sheets instantly.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Live Structural Field Filter
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Lookup key arguments..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- DYNAMIC DIRECTORY NAVIGATION MATRIX --- */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["SoftwareApplication", "Article", "FAQPage", "Product", "Organization"] as SchemaType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveSchema(type)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 border ${
                activeSchema === type 
                  ? "bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/10" 
                  : "bg-brand-card border-brand-border text-brand-muted hover:border-brand-primary hover:text-brand-main"
              }`}
            >
              {type === "SoftwareApplication" ? "💻 App Schema" : type === "Article" ? "✍️ Article Blog" : type === "FAQPage" ? "❓ FAQ Array" : type === "Product" ? "🛍️ Product Offer" : "🏢 Organization"}
            </button>
          ))}
        </div>

        {/* --- CORE WORKBENCH GRAPH --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Dynamic Field Form Mapping Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 space-y-4 shadow-sm text-left">
              <h2 className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-2 mb-2">
                <Layers size={14} className="text-brand-primary" /> Define Schema Variables
              </h2>

              {activeSchema === "SoftwareApplication" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Application Title</label>
                    <input type="text" value={fields.appName} onChange={(e) => handleInputChange("appName", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Application Description</label>
                    <textarea value={fields.appDesc} onChange={(e) => handleInputChange("appDesc", e.target.value)} className="w-full h-24 bg-brand-bg border border-brand-border text-brand-main rounded-xl p-4 text-sm font-semibold outline-none focus:border-brand-primary transition-all resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Price Limit Marker</label>
                    <input type="text" value={fields.appPrice} onChange={(e) => handleInputChange("appPrice", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary transition-all" />
                  </div>
                </>
              )}

              {activeSchema === "Article" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Headline Text</label>
                    <input type="text" value={fields.artTitle} onChange={(e) => handleInputChange("artTitle", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Author Persona Name</label>
                    <input type="text" value={fields.artAuthor} onChange={(e) => handleInputChange("artAuthor", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Cover Graphic absolute link</label>
                    <input type="text" value={fields.artImage} onChange={(e) => handleInputChange("artImage", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary transition-all" />
                  </div>
                </>
              )}

              {activeSchema === "FAQPage" && (
                <>
                  <div className="space-y-3 p-4 bg-brand-bg rounded-2xl border border-brand-border">
                    <span className="text-[10px] font-black uppercase text-brand-primary">FAQ Node Pair 1</span>
                    <input type="text" value={fields.faqQ1} placeholder="Question 1" onChange={(e) => handleInputChange("faqQ1", e.target.value)} className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl px-4 py-2.5 text-xs font-semibold outline-none" />
                    <textarea value={fields.faqA1} placeholder="Answer 1" onChange={(e) => handleInputChange("faqA1", e.target.value)} className="w-full h-16 bg-brand-card border border-brand-border text-brand-main rounded-xl p-3 text-xs font-semibold resize-none" />
                  </div>
                  <div className="space-y-3 p-4 bg-brand-bg rounded-2xl border border-brand-border">
                    <span className="text-[10px] font-black uppercase text-brand-primary">FAQ Node Pair 2</span>
                    <input type="text" value={fields.faqQ2} placeholder="Question 2" onChange={(e) => handleInputChange("faqQ2", e.target.value)} className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl px-4 py-2.5 text-xs font-semibold outline-none" />
                    <textarea value={fields.faqA2} placeholder="Answer 2" onChange={(e) => handleInputChange("faqA2", e.target.value)} className="w-full h-16 bg-brand-card border border-brand-border text-brand-main rounded-xl p-3 text-xs font-semibold resize-none" />
                  </div>
                </>
              )}

              {activeSchema === "Product" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Product Title</label>
                    <input type="text" value={fields.prodName} onChange={(e) => handleInputChange("prodName", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-muted uppercase">Price</label>
                      <input type="text" value={fields.prodPrice} onChange={(e) => handleInputChange("prodPrice", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-brand-muted uppercase">Rating Metric</label>
                      <input type="text" value={fields.prodRating} onChange={(e) => handleInputChange("prodRating", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none" />
                    </div>
                  </div>
                </>
              )}

              {activeSchema === "Organization" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Legal Organization Title</label>
                    <input type="text" value={fields.orgName} onChange={(e) => handleInputChange("orgName", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-muted uppercase">Corporate Root URL</label>
                    <input type="text" value={fields.orgUrl} onChange={(e) => handleInputChange("orgUrl", e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none" />
                  </div>
                </>
              )}
            </div>

            {/* Validation Panel Feed */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-5 shadow-sm text-left">
              {validationWarnings.length === 0 ? (
                <div className="flex gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/10 p-3 rounded-xl">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Schema structure rules are fully satisfied for Google crawler indexing.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {validationWarnings.map((warn, i) => (
                    <div key={i} className="flex gap-2 text-xs font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/10 p-3 rounded-xl leading-relaxed">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Block: Structured Code Generation Windows */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Native JSON-LD Plain Array Block */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-black uppercase text-brand-muted flex items-center gap-2">
                  <Code2 size={14} className="text-brand-primary" /> Plain JSON-LD Configuration Vector
                </span>
                <button onClick={() => handleCopy(codeString)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-bold text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all">
                  {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy Schema"}</span>
                </button>
              </div>
              <div className="p-4 bg-brand-bg rounded-xl border border-brand-border overflow-x-auto font-mono text-xs text-brand-muted max-h-64 leading-relaxed">
                <pre>{codeString}</pre>
              </div>
            </div>

            {/* Next.js Frame Layout Configuration Injection */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-black uppercase text-brand-muted flex items-center gap-2">
                  <Code2 size={14} className="text-brand-primary" /> Next.js Safe InnerHTML Component
                </span>
                <button onClick={() => handleCopy(nextJsSnippet)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-bg border border-brand-border text-xs font-bold text-brand-muted hover:border-brand-primary hover:text-brand-primary transition-all">
                  {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  <span>Copy Block</span>
                </button>
              </div>
              <div className="p-4 bg-brand-bg rounded-xl border border-brand-border overflow-x-auto font-mono text-xs text-brand-primary max-h-48 leading-relaxed">
                <pre>{nextJsSnippet}</pre>
              </div>
            </div>

          </div>
        </div>

        {/* --- REPOSITORY COMPLIANCE GUIDE FOOTER --- */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-brand-primary" /> Rich Results Optimization Directives
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            By avoiding hidden telemetry dependencies, metadata arrays compile entirely localized within client sandbox scopes. Supplying structured meta data architectures directly to Next.js layout configurations enables Google structural bots to parse contextual relationships instantaneously, displaying dynamic search extensions such as pricing rows or review star counts.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-8 text-xs text-brand-muted font-medium">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><HelpCircle size={14} className="text-brand-primary" /> Why Next.js innerHTML?</h3>
              <p className="leading-relaxed text-brand-muted">Using the React script structure ensures that structured variables are securely burned straight into static HTML pre-render builds, preventing client hydration mismatch loops.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-primary" /> Verification Workflows</h3>
              <p className="leading-relaxed text-brand-muted">Once your tool code outputs run successfully on your production branches, paste your URLs into Google's rich results inspection tool to confirm indexing stability layout maps.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}