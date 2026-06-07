"use client";

import { useState } from "react";
import Head from "next/head";
import { 
  Braces, Copy, Trash2, CheckCircle2, 
  AlertCircle, FileCode, Maximize2, Minimize2, HelpCircle, ShieldCheck
} from "lucide-react";

export default function JsonParser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Programmatic SEO JSON-LD Configuration
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "JSON Parser & Formatter",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-03-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "JSON validation",
        "Code beautification",
        "String minification",
        "Syntax error highlighting",
        "Local browser processing"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a JSON Parser?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A JSON parser is a tool that reads raw JSON data and makes it easy to view, format, and edit. It helps developers quickly find and fix syntax errors."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between beautify and minify?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Beautifying adds spaces and line breaks so the code is easy for humans to read. Minifying removes all extra spaces to shrink the file size, making your API responses faster."
          }
        },
        {
          "@type": "Question",
          "name": "Is my JSON data secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, your data is completely secure. This tool processes everything directly inside your web browser. We never upload, save, or track your JSON data on our servers."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolmars.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://toolmars.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Developer", "item": "https://toolmars.com/tools/developer" },
        { "@type": "ListItem", "position": 4, "name": "JSON Parser", "item": "https://toolmars.com/tools/json-parser" }
      ]
    }
  ];

  const handleAction = (type: "format" | "minify") => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const result = type === "format" 
        ? JSON.stringify(parsed, null, 2) 
        : JSON.stringify(parsed);
      
      setOutput(result);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg p-6 lg:p-12 font-sans text-brand-main transition-colors duration-300">
      <Head>
        <title>JSON Parser & Formatter - Validate, Beautify & Minify | ToolMars</title>
        <meta name="description" content="Free online JSON parser and formatter. Easily validate, beautify, and minify your JSON data instantly. 100% private processing right in your browser." />
        <link rel="canonical" href="https://toolmars.com/tools/json-parser" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="JSON Parser & Formatter - Validate, Beautify & Minify | ToolMars" />
        <meta property="og:description" content="Free online JSON parser and formatter. Easily validate, beautify, and minify your JSON data instantly. 100% private processing right in your browser." />
        <meta property="og:url" content="https://toolmars.com/tools/json-parser" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/json-parser.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JSON Parser & Formatter - Validate, Beautify & Minify | ToolMars" />
        <meta name="twitter:description" content="Free online JSON parser and formatter. Easily validate, beautify, and minify your JSON data instantly. 100% private processing right in your browser." />
        <meta name="twitter:image" content="https://toolmars.com/og/json-parser.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="mx-auto max-w-6xl">
        
        {/* --- HEADER --- */}
        <header className="mb-12 text-center lg:text-left mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-brand-primary/10">
            <Braces size={14} /> Free Developer Tool
          </div>
          <h1 className="text-4xl font-black text-brand-main mb-2">JSON Parser & Formatter.</h1>
          <p className="text-brand-muted font-medium">Format, validate, and minify your JSON data instantly.</p>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold uppercase text-brand-muted flex items-center gap-2">
                <FileCode size={14} /> Input JSON
              </label>
              <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1 transition-all">
                <Trash2 size={12} /> Clear Workspace
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here... (e.g. {"name": "John"})'
              className="h-[450px] w-full rounded-[32px] border border-brand-border bg-brand-card p-6 font-mono text-sm shadow-sm outline-none text-brand-main focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all placeholder:text-brand-muted/40"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => handleAction("format")}
                className="flex-1 rounded-2xl bg-brand-primary py-4 font-bold text-white transition-all hover:bg-brand-primary/90 shadow-md shadow-brand-primary/10 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Maximize2 size={18} /> Beautify Code
              </button>
              <button 
                onClick={() => handleAction("minify")}
                className="flex-1 rounded-2xl bg-brand-main py-4 font-bold text-brand-card transition-all hover:bg-brand-primary hover:text-white flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm border border-brand-border"
              >
                <Minimize2 size={18} /> Minify String
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold uppercase text-brand-muted">Output Result</label>
              {output && (
                <button onClick={copyToClipboard} className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline transition-all">
                  {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy Output"}
                </button>
              )}
            </div>
            
            <div className="relative group h-[450px]">
              <div className={`h-full w-full rounded-[32px] border border-brand-border bg-brand-card p-6 font-mono text-sm overflow-auto transition-all ${error ? 'border-red-500/30 bg-red-500/[0.03]' : ''}`}>
                {error ? (
                  <div className="flex gap-3 text-red-500">
                    <AlertCircle className="shrink-0 animate-pulse mt-0.5" size={18} />
                    <div className="space-y-1">
                       <p className="font-bold text-sm">Invalid JSON Syntax</p>
                       <p className="text-xs opacity-90 leading-relaxed font-mono">{error}</p>
                    </div>
                  </div>
                ) : (
                  <pre className="text-brand-main whitespace-pre-wrap break-all">{output || <span className="text-brand-muted/40 font-sans">Your formatted JSON will appear here...</span>}</pre>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- SUPPLEMENTARY SEO CONTENT BLOCK --- */}
        <section className="mt-20 border-t border-brand-border pt-16 transition-colors max-w-4xl">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2 mb-4">
            <Braces size={18} className="text-brand-primary" /> What is a JSON Parser?
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-10">
            A JSON Parser is an essential tool for developers working with APIs and databases. It takes raw, unformatted JSON text and structures it into a clean, readable format. If your JSON has a missing comma or broken bracket, the parser acts as a validator, pointing out the exact syntax error so you can fix it quickly.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-3">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5">
                <Maximize2 size={14} className="text-brand-primary" /> Beautify JSON
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Beautifying (or formatting) JSON adds proper indentation, spaces, and line breaks. This makes complex nested objects and arrays easy for humans to read, helping you spot structural issues and debug your code faster.
              </p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-3">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5">
                <Minimize2 size={14} className="text-brand-primary" /> Minify JSON
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Minifying removes all unnecessary whitespace, tabs, and line breaks from your JSON code. This dramatically reduces the file size, making data payloads lighter and your API responses much faster.
              </p>
            </div>
          </div>

          <div className="p-6 border border-brand-border rounded-2xl bg-brand-bg space-y-3">
            <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-primary" /> 100% Private & Secure
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Your data is completely safe. This parser processes your JSON strings entirely locally within your web browser. We never upload, save, or track your database contents, API keys, or security cookies on our servers.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}