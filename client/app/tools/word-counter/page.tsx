"use client";

import { useState, useTransition } from "react";
import { 
  FileText, Copy, Check, Trash2, Type, 
  Clock, Sparkles, Search, Space, HelpCircle
} from "lucide-react";
import Head from "next/head";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Structured Data (JSON-LD) for Search Engine Bots
  const jsonLdSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is this word counter and what does it do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a real-time text analysis tool that counts your words, characters, sentences, and paragraphs as you type. It also calculates reading times and helps you change your text casing with a single click."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to use with sensitive data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it is completely secure. Your text is processed entirely inside your own browser window, meaning none of your words are ever uploaded to a server."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No account is required. You can use every feature on this page instantly without providing an email address or setting up a password."
          }
        },
        {
          "@type": "Question",
          "name": "Does it work on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the layout scales perfectly to fit any mobile browser. You can track your text limits on your phone just as easily as on a desktop."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from checking counts in Microsoft Word or Google Docs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike bulky word processors, this tool offers instant casing transformations, counts characters without spaces explicitly, and strips out double spaces automatically in one click."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Online Word Counter",
      "operatingSystem": "Any",
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Client-side processing",
        "Live character limits",
        "Whitespace cleanup",
        "Text case switching"
      ],
      "datePublished": "2026-06-01",
      "dateModified": "2026-06-06"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolmars.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://toolmars.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Text Utilities", "item": "https://toolmars.com/tools#text" },
        { "@type": "ListItem", "position": 4, "name": "Word Counter", "item": "https://toolmars.com/tools/word-counter" }
      ]
    }
  ];

  const getWordsCount = () => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  };

  const getCharactersCount = (includeSpaces: boolean) => {
    return includeSpaces ? text.length : text.replace(/\s/g, "").length;
  };

  const getSentencesCount = () => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter(Boolean).length;
  };

  const getParagraphsCount = () => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\n+/).filter(Boolean).length;
  };

  const calculateTime = (wpm: number) => {
    const words = getWordsCount();
    const minutes = words / wpm;
    const seconds = Math.ceil(minutes * 60);
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(minutes)}m ${seconds % 60}s`;
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const changeCase = (type: "upper" | "lower" | "title" | "sentence") => {
    if (!text) return;
    startTransition(() => {
      let result = "";
      if (type === "upper") result = text.toUpperCase();
      else if (type === "lower") result = text.toLowerCase();
      else if (type === "sentence") {
        result = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
      } else if (type === "title") {
        result = text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      }
      setText(result);
    });
  };

  const cleanExtraSpaces = () => {
    setText(text.replace(/\s+/g, " "));
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6 font-sans">
      <Head>
        {/* Core SEO Meta Tags */}
        <title>Count Words and Characters Online - Free | ToolMars</title>
        <meta name="description" content="Check your word count and character limits in seconds. Completely free, works entirely in your browser, and requires no signup. Try it now." />
        <link rel="canonical" href="https://toolmars.com/tools/word-counter" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolmars.com/tools/word-counter" />
        <meta property="og:title" content="Count Words and Characters Online - Free | ToolMars" />
        <meta property="og:description" content="Paste your text to check character limits and words instantly. No signups, no data leaks." />
        <meta property="og:image" content="https://toolmars.com/og/word-counter.png" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://toolmars.com/tools/word-counter" />
        <meta name="twitter:title" content="Count Words and Characters Online - Free | ToolMars" />
        <meta name="twitter:description" content="Paste your text to check character limits and words instantly. No signups, no data leaks." />
        <meta name="twitter:image" content="https://toolmars.com/og/word-counter.png" />

        {/* Injected Schema Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto">
        
        {/* MAIN TOOL HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <FileText size={14} /> Text Analyzer
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Count Words and Characters <span className="text-brand-primary">Online</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Your data never leaves your device. Get live text statistics and formatting fixes instantly without making an account.
            </p>
          </div>

          {/* SEARCH HIGHLIGHTER BOX */}
          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Find text snippets
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Type to highlight matches..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* REAL-TIME STATS COUNTER COUNTERS */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Words", val: getWordsCount() },
            { label: "Characters (with spaces)", val: getCharactersCount(true) },
            { label: "Characters (no spaces)", val: getCharactersCount(false) },
            { label: "Sentences", val: getSentencesCount() },
            { label: "Paragraphs", val: getParagraphsCount() }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm text-left flex flex-col justify-between group hover:border-brand-primary/30 transition-all">
              <span className="text-[10px] font-black uppercase text-brand-muted tracking-wider">{kpi.label}</span>
              <span className="text-3xl font-black text-brand-main mt-2 group-hover:text-brand-primary transition-colors">{kpi.val}</span>
            </div>
          ))}
        </section>

        {/* WORK BENCH INTERFACE CONTAINER */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9 space-y-4">
            <div className="relative bg-brand-card rounded-[32px] border border-brand-border shadow-sm overflow-hidden focus-within:border-brand-primary/40 focus-within:ring-4 focus-within:ring-brand-primary/5 transition-all">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text content here to look up its length limits..."
                className="w-full h-[480px] p-8 outline-none border-none bg-transparent font-sans text-base leading-relaxed text-brand-main placeholder:text-brand-muted/30 resize-none"
                style={{ minHeight: "480px" }} // Dynamic Layout Shift Fixed
              />
              
              {searchQuery.trim() && text && (
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs font-bold">
                  Matches found: {text.toLowerCase().split(searchQuery.toLowerCase()).length - 1}
                </div>
              )}
            </div>

            {/* ACTION TRIGGERS */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={handleCopy}
                disabled={!text}
                className="px-6 py-3.5 rounded-xl bg-brand-main text-brand-card font-bold text-xs flex items-center gap-2 border border-brand-border hover:bg-brand-primary hover:text-white transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy Content"}
              </button>
              
              <button 
                onClick={cleanExtraSpaces}
                disabled={!text}
                className="px-6 py-3.5 rounded-xl bg-brand-card text-brand-main font-bold text-xs flex items-center gap-2 border border-brand-border hover:border-brand-primary hover:text-white transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
              >
                <Space size={14} /> Remove Double Spaces
              </button>

              <button 
                onClick={() => setText("")}
                disabled={!text}
                className="ml-auto px-6 py-3.5 rounded-xl bg-brand-card text-red-500 font-bold text-xs flex items-center gap-2 border border-brand-border hover:bg-red-500/10 transition-all active:scale-95 disabled:opacity-20 disabled:pointer-events-none"
              >
                <Trash2 size={14} /> Reset Box
              </button>
            </div>
          </div>

          {/* SIDE PANEL RIG CONTROL CONTAINER */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-brand-main mb-2">
                <Type size={16} className="text-brand-primary" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-muted">Case Conversions</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "UPPERCASE", id: "upper" },
                  { name: "lowercase", id: "lower" },
                  { name: "Title Case", id: "title" },
                  { name: "Sentence case", id: "sentence" }
                ].map((op) => (
                  <button
                    key={op.id}
                    onClick={() => changeCase(op.id as any)}
                    disabled={!text || isPending}
                    className="w-full text-left px-4 py-3 bg-brand-bg hover:bg-brand-primary/10 border border-brand-border hover:border-brand-primary text-brand-main hover:text-brand-primary font-bold text-xs rounded-xl transition-all active:scale-[0.98] disabled:opacity-10 disabled:pointer-events-none"
                  >
                    {op.name}
                  </button>
                ))}
              </div>
            </div>

            {/* PERFORMANCE ANALYSIS FOR CAST TIMINGS */}
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-brand-main mb-2">
                <Clock size={16} className="text-brand-primary" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-brand-muted">Read & Speech Times</h3>
              </div>
              <div className="space-y-3 font-semibold text-xs text-brand-muted">
                <div className="flex justify-between items-center p-3 bg-brand-bg rounded-xl border border-brand-border">
                  <span>Silent Reading</span>
                  <span className="font-mono font-bold text-brand-main text-sm">{calculateTime(225)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-brand-bg rounded-xl border border-brand-border">
                  <span>Speech Duration</span>
                  <span className="font-mono font-bold text-brand-main text-sm">{calculateTime(130)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HUMAN-FIRST SEO ARTICLE FOOTER AREA */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl transition-colors text-left" style={{ contentVisibility: "auto" }}>
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2">
            <Sparkles size={18} className="text-brand-primary" /> Reliable Text Length Tracking
          </h2>
          <p className="text-sm text-brand-muted mt-3 leading-relaxed">
            ToolMars Word Counter is a free web tool that tracks your text length as you type. It shows your exact word count, character count with or without spaces, total sentences, and paragraphs. Because it runs right inside your web browser, your text stays secure and private.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mt-8 text-xs text-brand-muted font-medium">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Character Limit Checkers</h3>
              <p className="leading-relaxed text-brand-muted">Track text limits instantly for Twitter threads, layout descriptions, or database string configurations.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Speech Time Forecasting</h3>
              <p className="leading-relaxed text-brand-muted">Calculates verbal pacing metrics to help you adjust your presentation pacing flawlessly.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm">Whitespace Cleanup</h3>
              <p className="leading-relaxed text-brand-muted">Strip out double spaces or tab layouts immediately before pasting drafts or code strings.</p>
            </div>
          </div>
        </section>

        {/* DEEP INTEGRATION FAQ COMPONENT */}
        <section className="mt-16 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2 mb-8">
            <HelpCircle size={22} className="text-brand-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What is this word counter and what does it do?",
                a: "It is a real-time text analysis tool that counts your words, characters, sentences, and paragraphs as you type. It also calculates reading times and helps you change your text casing with a single click."
              },
              {
                q: "Is it safe to use with sensitive data?",
                a: "Yes, it is completely secure. Your text is processed entirely inside your own browser window, meaning none of your words are ever uploaded to a server."
              },
              {
                q: "Do I need an account?",
                a: "No account is required. You can use every feature on this page instantly without providing an email address or setting up a password."
              },
              {
                q: "Does it work on mobile?",
                a: "Yes, the layout scales perfectly to fit any mobile browser. You can track your text limits on your phone just as easily as on a desktop."
              },
              {
                q: "How is this different from checking counts in Microsoft Word or Google Docs?",
                a: "Unlike bulky word processors, this tool offers instant casing transformations, counts characters without spaces explicitly, and strips out double spaces automatically in one click."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-brand-card border border-brand-border rounded-2xl space-y-2">
                <h3 className="font-black text-brand-main text-base">{faq.q}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}