"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Link as LinkIcon, ImageIcon, Braces,
  ShieldCheck, ArrowUpRight, Cpu,
  CheckCircle2, Terminal, Plus, HelpCircle, X, Send
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

// ─── Static schema — outside component, never recalculates ───────────────────
const SITE_URL = "https://toolmars.com";

const jsonLdSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ToolMars",
    "url": SITE_URL,
    "description":
      "Free browser-based developer tools, SEO utilities, and calculators. Everything runs in your browser — no signup, no data uploads, no ads.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/tools?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolMars",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.webp`,
    "description":
      "ToolMars builds free, private, browser-based tools for developers, students, and content creators.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "mustafariazdev@gmail.com",
      "contactType": "customer support"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are my files or data saved when I use ToolMars tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Every ToolMars tool runs entirely in your browser. Your files, text, and data never get sent to any server. We cannot see or store what you work with."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account to use ToolMars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No account is needed. All tools are free and work immediately without any signup, login, or subscription."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request a new tool on ToolMars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can submit a tool request by clicking the 'Request a Tool' card on the tools page or by emailing mustafariazdev@gmail.com with your idea."
        }
      }
    ]
  }
];

// ─── Popular tools data ───────────────────────────────────────────────────────
const popularTools = [
  {
    id: 1,
    title: "Batch Image Converter",
    desc: "Convert PNG, JPG, WebP and more — all at once, right in your browser. No uploads, no waiting.",
    category: "Utility",
    icon: <ImageIcon className="w-6 h-6" />,
    stats: "Optimized",
    href: "/tools/image-converter"
  },
  {
    id: 2,
    title: "JSON Formatter",
    desc: "Paste messy JSON and get it back clean, indented, and error-free in one click.",
    category: "Development",
    icon: <Braces className="w-6 h-6" />,
    stats: "Popular",
    href: "/tools/json-parser"
  },
  {
    id: 3,
    title: "Slug Generator",
    desc: "Turn any title into a clean, URL-friendly slug for better SEO — instantly.",
    category: "Development",
    icon: <LinkIcon className="w-6 h-6" />,
    stats: "SEO Tool",
    href: "/tools/slug-generator"
  }
];

// ─── Feature list ─────────────────────────────────────────────────────────────
const features = [
  {
    title: "Your data never leaves your browser",
    desc: "Every tool processes your files and text locally. Nothing gets uploaded to a server — ever. This matters when you're working with client data, API keys, or private documents."
  },
  {
    title: "No account, no paywall, no limits",
    desc: "Every tool is free forever. There are no usage caps, no premium tiers, and no signup forms standing between you and the tool you need."
  },
  {
    title: "Built for real developer workflows",
    desc: "Tools like the redirect compiler, schema generator, and robots.txt builder are designed around tasks developers actually run into — not just generic utilities."
  }
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Are my files or data saved when I use ToolMars?",
    a: "No. Every tool runs entirely in your browser. Your files, text, and data never get sent to any server. We cannot see or store what you work with."
  },
  {
    q: "Do I need an account to use any of the tools?",
    a: "No account needed. All tools are completely free and work immediately — no signup, no login, no subscription required."
  },
  {
    q: "Can I request a new tool?",
    a: "Yes. Click the 'Request a Tool' card on the tools page or send your idea to mustafariazdev@gmail.com. We read every request."
  }
];

// ─── Tool Request Modal ───────────────────────────────────────────────────────
function ToolRequestModal({ onClose }: { onClose: () => void }) {
  const [toolName, setToolName]   = useState("");
  const [toolDesc, setToolDesc]   = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!toolName.trim()) return;
    const subject = encodeURIComponent(`Tool Request: ${toolName}`);
    const body    = encodeURIComponent(
      `Hi,\n\nI'd like to request a new tool on ToolMars.\n\nTool name: ${toolName}\n\nWhat it should do:\n${toolDesc || "Not specified"}\n\nThanks!`
    );
    window.location.href = `mailto:mustafariazdev@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-brand-card border border-brand-border rounded-3xl p-8 w-full max-w-md shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 id="modal-title" className="text-xl font-black text-brand-main">
              Request a Tool
            </h2>
            <p className="text-xs text-brand-muted mt-1">
              Tell us what you need — we read every request.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-brand-main transition-colors p-1 rounded-lg hover:bg-brand-bg"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <p className="font-bold text-brand-main">Your email client should be open!</p>
            <p className="text-sm text-brand-muted mt-2">
              If it didn't open, email us directly at{" "}
              <a
                href="mailto:mustafariazdev@gmail.com"
                className="text-brand-primary underline"
              >
                mustafariazdev@gmail.com
              </a>
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Tool name */}
            <div>
              <label
                htmlFor="tool-name"
                className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2"
              >
                Tool name <span className="text-red-500">*</span>
              </label>
              <input
                id="tool-name"
                type="text"
                placeholder="e.g. CSS Minifier, Base64 Encoder..."
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-main placeholder:text-brand-muted/40 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="tool-desc"
                className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2"
              >
                What should it do?
              </label>
              <textarea
                id="tool-desc"
                placeholder="Describe what the tool should do and why it would be useful..."
                value={toolDesc}
                onChange={(e) => setToolDesc(e.target.value)}
                rows={4}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-main placeholder:text-brand-muted/40 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium resize-none"
              />
            </div>

            {/* Note */}
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Clicking Send will open your email client with the details pre-filled.
              Sending it gets your request straight to the ToolMars inbox.
            </p>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-brand-border text-brand-muted font-bold text-sm hover:text-brand-main hover:border-brand-primary/40 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!toolName.trim()}
                className="flex-1 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-hover transition-all disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-brand-primary/10"
              >
                <Send size={14} /> Send Request
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "ToolMars — Free Online Developer Tools & Calculators",
  description:
    "Free browser-based tools for developers and students. Format JSON, convert images, generate schemas, calculate GPA, and more — no signup, completely private.",
  metadataBase: new URL("https://toolmars.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ToolMars — Free Online Developer Tools & Calculators",
    description:
      "15+ free browser-based tools. Format JSON, convert images, build schemas — no account needed, nothing uploaded to any server.",
    url: "https://toolmars.com",
    siteName: "ToolMars",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolMars — Free Online Developer Tools & Calculators",
    description: "15+ free browser-based tools. No signup, no uploads, completely private.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const [faqOpen,       setFaqOpen]       = useState<number | null>(null);
  const [modalOpen,     setModalOpen]     = useState(false);

  return (
    <>
      <Head>
        {/* ── Primary Meta ── */}
        <title>ToolMars — Free Online Developer Tools & Calculators</title>
        <meta
          name="description"
          content="Free browser-based tools for developers and students. Format JSON, convert images, generate schemas, calculate GPA, and more — no signup, completely private."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />

        {/* ── Open Graph ── */}
        <meta property="og:title" content="ToolMars — Free Online Developer Tools & Calculators" />
        <meta
          property="og:description"
          content="15+ free browser-based tools. Format JSON, convert images, build schemas — no account needed, nothing uploaded to any server."
        />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og/home.webp`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="ToolMars" />

        {/* ── Twitter / X ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ToolMars — Free Online Developer Tools & Calculators" />
        <meta
          name="twitter:description"
          content="15+ free browser-based tools. No signup, no uploads, completely private."
        />
        <meta name="twitter:image" content={`${SITE_URL}/og/home.webp`} />

        {/* ── Viewport ── */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ── JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </Head>

      <div className="bg-brand-bg min-h-screen text-brand-main font-sans antialiased selection:bg-brand-primary/10 transition-colors duration-300">

        {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden border-b border-brand-border">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] -z-10 rounded-full" aria-hidden="true" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left: hero copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider"
                aria-hidden="true"
              >
                <Terminal className="w-3 h-3" /> Free browser-based tools
              </motion.div>

              {/*
                H1 — primary keyword "free online developer tools" placed naturally.
                Old version: "Professional tools. Zero tracking scripts." — no keyword value.
              */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-brand-main">
                Free online tools.<br />
                <span className="text-brand-primary">Your data stays private.</span>
              </h1>

              {/*
                Hero subtext rewritten — old version said "cryptographic, ultra-fast
                client-side applications engineered natively" — zero real users talk
                like that. New version is direct and human.
              */}
              <p className="text-brand-muted text-base sm:text-lg max-w-xl leading-relaxed">
                ToolMars gives you 15+ free developer utilities, SEO tools, and calculators
                that run entirely in your browser. Nothing you paste or upload ever
                reaches a server.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link href="/tools">
                  <button className="w-full sm:w-auto bg-brand-primary hover:bg-brand-hover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center gap-2 active:scale-95 text-sm">
                    Browse All Tools <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/chrome-extensions">
                  <button className="w-full sm:w-auto bg-brand-card border border-brand-border hover:border-brand-primary text-brand-main px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 text-sm">
                    Explore Extensions
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: visual mockup — kept as decorative, aria-hidden */}
            <div className="lg:col-span-5 relative w-full group" aria-hidden="true">
              <div className="absolute -inset-1 bg-brand-primary/10 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-700" />
              <div className="relative bg-brand-card border border-brand-border rounded-3xl p-6 shadow-xl">
                <div className="flex gap-1.5 mb-6 border-b border-brand-border pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30" />
                  <span className="text-[10px] font-mono text-brand-muted/50 ml-2">toolmars_env.json</span>
                </div>
                <div className="space-y-4 font-mono text-xs text-brand-muted">
                  <p className="text-brand-primary font-bold">{"{"}</p>
                  <p className="pl-4"><span className="text-purple-400">"platform"</span>: "ToolMars",</p>
                  <p className="pl-4"><span className="text-purple-400">"data_sent_to_server"</span>: <span className="text-emerald-500 font-semibold">false</span>,</p>
                  <p className="pl-4"><span className="text-purple-400">"account_required"</span>: <span className="text-emerald-500 font-semibold">false</span>,</p>
                  <p className="pl-4"><span className="text-purple-400">"cost"</span>: <span className="text-indigo-400 font-bold">"$0.00"</span>,</p>
                  <p className="pl-4"><span className="text-purple-400">"tools_available"</span>: <span className="text-indigo-400 font-bold">15</span></p>
                  <p className="text-brand-primary font-bold">{"}"}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── 2. STATS BAR ────────────────────────────────────────────────────── */}
        {/*
          Old stats ("54+ Tools", "12k Active Developers", "1.2M Client Assertions")
          were unverifiable numbers that damage trust with skeptical developers.
          Replaced with factual, modest claims that are actually true.
        */}
        <section className="border-y border-brand-border bg-brand-card py-10" aria-label="Platform highlights">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Tools available",    val: "15+" },
              { label: "Cost to use",        val: "$0"  },
              { label: "Signup required",    val: "None" },
              { label: "Data sent to server",val: "Zero" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-brand-main">{stat.val}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. POPULAR TOOLS ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-28" aria-labelledby="popular-heading">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              {/* Changed from h2+h3 nesting to a single h2 — avoids duplicate heading levels */}
              <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">Most Used</p>
              <h2 id="popular-heading" className="text-4xl font-black text-brand-main">
                Popular Tools
              </h2>
            </div>
            <Link href="/tools">
              <button className="group inline-flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary px-6 py-3 rounded-full font-bold text-sm transition-all">
                See all 15 tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTools.map((tool) => (
              <Link href={tool.href} key={tool.id} className="block group">
                <article className="h-full p-8 bg-brand-card border border-brand-border rounded-[2.5rem] hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-primary border border-brand-border group-hover:bg-brand-primary group-hover:text-white transition-colors"
                        aria-hidden="true"
                      >
                        {tool.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-md">
                        {tool.stats}
                      </span>
                    </div>
                    {/* h3 correct here — these are sub-items under the h2 section */}
                    <h3 className="text-2xl font-black mb-3 text-brand-main">{tool.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-8">{tool.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-brand-border">
                    <span className="text-[10px] font-bold px-3 py-1 bg-brand-bg border border-brand-border rounded-lg text-brand-muted uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm font-black text-brand-primary">
                      Launch Tool <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* ── Request a Tool card ── */}
            <button
              onClick={() => setModalOpen(true)}
              className="p-8 border-2 border-dashed border-brand-border rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-brand-primary/40 transition-colors group w-full"
              aria-label="Request a new tool"
            >
              <div
                className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center mb-4 text-brand-muted border border-brand-border group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors"
                aria-hidden="true"
              >
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-brand-main">Need a different tool?</h3>
              <p className="text-xs text-brand-muted max-w-[200px] mt-1">
                Send us your idea — we build tools based on real requests.
              </p>
              <span className="mt-4 text-xs font-bold text-brand-primary flex items-center gap-1">
                Request a tool <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </section>

        {/* ── 4. WHY TOOLMARS ─────────────────────────────────────────────────── */}
        {/*
          Old section had two problems:
          1. Heading hierarchy was broken (h2 label + h3 title under a section with no h2)
          2. Feature descriptions were robotic ("Local WebAssembly Processing Engine",
             "payload string validations", "isolated client-side browser context sandboxes")
          Replaced with plain English features that actually explain the value.
        */}
        <section className="bg-brand-bg border-y border-brand-border py-28 px-6" aria-labelledby="why-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">Why ToolMars</p>
              <h2 id="why-heading" className="text-4xl font-black text-brand-main tracking-tight">
                Built differently from other tool sites
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div key={i} className="bg-brand-card border border-brand-border p-8 rounded-3xl shadow-sm">
                  <Cpu className="w-8 h-8 text-brand-primary mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-black mb-3 text-brand-main">{f.title}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. PRIVACY SECTION ──────────────────────────────────────────────── */}
        {/*
          Old version had three problems:
          1. Section label "Zero-Trust Infrastructure" is enterprise jargon — wrong audience
          2. Feature descriptions were completely incomprehensible
             ("Data manipulation fields resolve local execution logic only — ensuring absolute
              zero backend data caching exposure")
          3. Fake feature: "Premium level integrations unlock localized automated endpoint
             configurations" — implies a paywall that doesn't exist, and is nonsense
          All three rewritten to plain English.
        */}
        <section className="py-28 px-6" aria-labelledby="privacy-heading">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-2">Privacy</p>
              <h2 id="privacy-heading" className="text-4xl md:text-5xl font-black leading-tight mb-8 text-brand-main">
                Your files stay on your device.
              </h2>
              <div className="space-y-6">
                {[
                  {
                    t: "Nothing gets uploaded",
                    d: "When you convert an image, format JSON, or calculate your mortgage, the processing happens inside your browser tab. There is no server receiving your data."
                  },
                  {
                    t: "Works with sensitive files",
                    d: "Because nothing leaves your device, it's safe to use ToolMars with client files, internal documents, API keys, or anything you wouldn't normally paste into a random website."
                  },
                  {
                    t: "No account means no data trail",
                    d: "We don't ask you to log in, so we never collect your email, usage history, or any personal information."
                  }
                ].map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-base mb-1 text-brand-main">{f.t}</h3>
                      <p className="text-brand-muted text-sm leading-relaxed">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative mockup — aria-hidden */}
            <div className="relative" aria-hidden="true">
              <div className="bg-brand-primary/10 w-full aspect-video rounded-3xl rotate-2 absolute -inset-2 opacity-10 blur-xl" />
              <div className="relative bg-slate-950 dark:bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
                <div className="flex gap-2 mb-4 border-b border-slate-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <div className="space-y-4 font-mono text-xs">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-800 rounded w-1/2" />
                  <div className="h-24 bg-slate-900 dark:bg-slate-950 rounded border border-brand-primary/20 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-brand-primary text-xs font-bold">
                      🔒 Running locally in your browser
                    </span>
                    <span className="text-slate-500 text-[10px] mt-1">
                      No network requests made
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. FAQ ──────────────────────────────────────────────────────────── */}
        {/*
          Old FAQs had two problems:
          1. Only 2 questions — not enough for PAA coverage or FAQPage schema value
          2. Answers were robotic ("client runtime engine", "payload items hit database
             cloud nodes", "localized automated endpoint configurations")
          New version: 3 real questions with plain English answers, matching the
          FAQPage JSON-LD schema above so Google can render rich results.
        */}
        <section className="bg-brand-card border-t border-brand-border py-28 px-6" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <HelpCircle className="w-8 h-8 text-brand-primary mx-auto mb-3" aria-hidden="true" />
              <h2 id="faq-heading" className="text-3xl font-black text-brand-main tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-brand-border rounded-2xl overflow-hidden bg-brand-card"
                >
                  <button
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-brand-main hover:bg-brand-bg transition-colors"
                    aria-expanded={faqOpen === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.q}</span>
                    <span className="text-brand-muted text-xl ml-4 shrink-0" aria-hidden="true">
                      {faqOpen === index ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-brand-bg text-brand-muted text-sm border-t border-brand-border leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-28 px-6 text-center" aria-labelledby="cta-heading">
          <div className="max-w-2xl mx-auto space-y-6">
            <ShieldCheck className="w-10 h-10 text-brand-primary mx-auto" aria-hidden="true" />
            <h2 id="cta-heading" className="text-4xl font-black text-brand-main">
              Start using any tool — right now
            </h2>
            <p className="text-brand-muted leading-relaxed">
              No account. No credit card. No waiting. Just pick a tool and start working.
            </p>
            <Link href="/tools">
              <button className="bg-brand-primary hover:bg-brand-hover text-white px-10 py-4 rounded-xl font-bold transition-all shadow-md shadow-brand-primary/10 inline-flex items-center gap-2 active:scale-95">
                Browse All Tools <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>

      </div>

      {/* ── Tool Request Modal ── */}
      <AnimatePresence>
        {modalOpen && <ToolRequestModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}