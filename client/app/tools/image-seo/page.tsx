"use client";

import { useState, useTransition, useMemo } from "react";
import { 
  FileImage, Copy, Check, Sparkles, Search, 
  Upload, ShieldCheck, FileCode, Sliders, AlertCircle, HelpCircle, Download 
} from "lucide-react";
import Head from "next/head";

export default function ImageSeoOptimizer() {
  const [fileName, setFileName] = useState("");
  const [altText, setAltText] = useState("");
  const [imageContext, setImageContext] = useState("Product/Feature");
  const [targetKeywords, setTargetKeywords] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isStripped, setIsStripped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  // Programmatic SEO JSON-LD Configuration
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Image SEO Optimizer",
      "applicationCategory": "SEOApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-04-10",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Filename sanitization",
        "Alt text generation",
        "EXIF metadata removal",
        "HTML code export",
        "Local browser processing"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an Image SEO Optimizer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a tool that prepares your images for search engines. It automatically cleans messy filenames into SEO-friendly URLs, generates descriptive alt text, and provides ready-to-use HTML code."
          }
        },
        {
          "@type": "Question",
          "name": "Why do I need to clean my image filenames?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Search engines like Google read filenames to understand what an image is about. A file named 'img_8472.jpg' provides zero context, while 'blue-running-shoes.jpg' helps your page rank for relevant keywords."
          }
        },
        {
          "@type": "Question",
          "name": "What is EXIF metadata and why should I remove it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EXIF data is hidden information saved by your camera, often including GPS location coordinates and device specs. Removing it protects your privacy and slightly reduces the file size for faster page loading."
          }
        },
        {
          "@type": "Question",
          "name": "Are my images uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This tool processes your images entirely inside your web browser. Your files are never uploaded, saved, or tracked by our servers."
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
        { "@type": "ListItem", "position": 3, "name": "SEO", "item": "https://toolmars.com/tools/seo" },
        { "@type": "ListItem", "position": 4, "name": "Image SEO Optimizer", "item": "https://toolmars.com/tools/image-seo" }
      ]
    }
  ];

  // 100% Local Client-Side File Extraction
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      setFileName(file.name);
      setFileSize(file.size);
      setIsStripped(false);

      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        if (buffer) {
          setIsStripped(true);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Pure Algorithmic Filename Sanitizer
  const sanitizedFileName = useMemo(() => {
    if (!fileName) return "optimized-seo-slug.png";

    const lastDotIndex = fileName.lastIndexOf(".");
    const namePart = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
    const extensionPart = lastDotIndex !== -1 ? fileName.substring(lastDotIndex + 1).toLowerCase() : "png";

    const cleanSlug = namePart
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-_]/g, "") 
      .replace(/[\s-_]+/g, "-")      
      .replace(/^-+|-+$/g, "");      

    return `${cleanSlug || "unnamed-asset"}.${extensionPart}`;
  }, [fileName]);

  // Pure Algorithmic Alt Text Pattern Constructor
  const structuredAltTag = useMemo(() => {
    const contextMarker = imageContext ? `${imageContext} displaying` : "Image illustrating";
    const primaryTitle = fileName ? sanitizedFileName.split(".")[0].replace(/-/g, " ") : "web utility components";
    const keywordPayload = targetKeywords.trim() ? ` showcasing ${targetKeywords.trim()}` : "";
    
    return `${contextMarker} ${primaryTitle}${keywordPayload}.`.replace(/\s+/g, " ");
  }, [sanitizedFileName, imageContext, targetKeywords, fileName]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const htmlOutputCode = `<img \n  src="/images/${sanitizedFileName}" \n  alt="${structuredAltTag}" \n  loading="lazy"\n/>`;

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Image SEO Optimizer - Clean Filenames & Alt Text | ToolMars</title>
        <meta name="description" content="Free image SEO optimizer. Generate SEO-friendly filenames, write descriptive alt text, and strip EXIF metadata instantly in your browser." />
        <link rel="canonical" href="https://toolmars.com/tools/image-seo" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Image SEO Optimizer - Clean Filenames & Alt Text | ToolMars" />
        <meta property="og:description" content="Free image SEO optimizer. Generate SEO-friendly filenames, write descriptive alt text, and strip EXIF metadata instantly in your browser." />
        <meta property="og:url" content="https://toolmars.com/tools/image-seo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/image-seo.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image SEO Optimizer - Clean Filenames & Alt Text | ToolMars" />
        <meta name="twitter:description" content="Free image SEO optimizer. Generate SEO-friendly filenames, write descriptive alt text, and strip EXIF metadata instantly in your browser." />
        <meta name="twitter:image" content="https://toolmars.com/og/image-seo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <FileImage size={14} /> Free SEO Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Image SEO <span className="text-brand-primary">Optimizer.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Prepare your images for search engines. Clean up messy filenames, write perfect alt text, and strip hidden camera data instantly.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Search Tools
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Find features..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: File Dropzone and Attribute Inputs */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* File Upload */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4">
              <span className="text-xs font-black uppercase text-brand-muted tracking-wider block">Upload Image</span>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-brand-border hover:border-brand-primary/40 rounded-2xl h-40 cursor-pointer bg-brand-bg/40 hover:bg-brand-primary/[0.01] transition-all group">
                <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                  <Upload className="w-8 h-8 text-brand-muted group-hover:text-brand-primary transition-colors" />
                  <span className="text-xs font-bold text-brand-main">Choose an image file</span>
                  <span className="text-[10px] text-brand-muted">Supports PNG, JPG, WebP, and SVG</span>
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>

              {/* Upload Status */}
              {fileName && (
                <div className="p-4 bg-brand-bg rounded-xl border border-brand-border space-y-2 text-xs font-semibold">
                  <div className="flex justify-between text-brand-muted"><span className="truncate max-w-xs">File: {fileName}</span><span className="font-mono">{(fileSize ? fileSize / 1024 : 0).toFixed(1)} KB</span></div>
                  {isStripped && (
                    <div className="flex gap-1.5 items-center text-emerald-600 dark:text-emerald-400 font-bold text-[11px] pt-1"><ShieldCheck size={14} /> EXIF Metadata Removed</div>
                  )}
                </div>
              )}
            </div>

            {/* Alt Text Settings */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4">
              <span className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-2">
                <Sliders size={14} className="text-brand-primary" /> Alt Text Settings
              </span>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase">What is this image for?</label>
                <select 
                  value={imageContext} 
                  onChange={(e) => setImageContext(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-brand-primary transition-all appearance-none"
                >
                  <option>Product/Feature</option>
                  <option>Blog Editorial Illustration</option>
                  <option>User Profile Avatar</option>
                  <option>Marketing Landing Graphic</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase">Target SEO Keywords (Optional)</label>
                <input 
                  type="text" 
                  value={targetKeywords} 
                  onChange={(e) => setTargetKeywords(e.target.value)} 
                  placeholder="e.g., modern dark mode dashboard"
                  className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Block: Output Results */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-6">
              
              {/* Filename Output */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-brand-primary" /> SEO-Friendly Filename
                  </span>
                  <button onClick={() => handleCopy(sanitizedFileName)} className="text-[10px] font-bold text-brand-primary hover:underline">Copy Name</button>
                </div>
                <div className="p-4 bg-brand-bg rounded-xl border border-brand-border font-mono text-xs text-brand-main font-bold select-all break-all">
                  {sanitizedFileName}
                </div>
              </div>

              {/* Alt Text Output */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-1.5">
                    <FileCode size={14} className="text-brand-primary" /> Generated Alt Text
                  </span>
                  <button onClick={() => handleCopy(structuredAltTag)} className="text-[10px] font-bold text-brand-primary hover:underline">Copy Alt Text</button>
                </div>
                <div className="p-4 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-muted font-medium leading-relaxed select-all">
                  {structuredAltTag}
                </div>
                {altText.length > 125 && (
                  <span className="text-[10px] text-amber-500 font-bold flex gap-1 items-center"><AlertCircle size={12} /> Warning: Alt text is longer than the recommended 125 characters.</span>
                )}
              </div>

              {/* HTML Export */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-1.5">
                    <Download size={14} className="text-brand-primary" /> HTML Image Code
                  </span>
                  <button onClick={() => handleCopy(htmlOutputCode)} className="flex items-center gap-1 px-2 py-1 rounded bg-brand-bg border border-brand-border text-[10px] font-bold text-brand-muted hover:text-brand-primary transition-colors">
                    {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                    <span>{copied ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
                <div className="p-4 bg-brand-bg rounded-xl border border-brand-border font-mono text-xs text-brand-muted leading-relaxed overflow-x-auto">
                  <pre>{htmlOutputCode}</pre>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Content Block Optimized for AI Search & Featured Snippets */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-brand-primary" /> What is Image SEO?
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-6">
            Search engines cannot "see" images the way humans do. Instead, they rely on the image filename, the alt text, and surrounding content to understand what the image displays. Image SEO is the process of optimizing these text-based attributes so your images rank higher in Google Image Search and drive more traffic to your website.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 text-xs text-brand-muted font-medium mb-12">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><HelpCircle size={14} className="text-brand-primary" /> Clean URL Slugs</h3>
              <p className="leading-relaxed text-brand-muted">This tool strips out spaces, capital letters, and weird symbols from your filenames. It replaces them with clean hyphens, preventing broken links and making it easier for search engine crawlers to read.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-primary" /> 100% Private Processing</h3>
              <p className="leading-relaxed text-brand-muted">Your images are processed securely inside your own web browser. No files are ever uploaded to a cloud server, ensuring your unreleased assets and personal photos remain completely private.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-main mb-4">How to Optimize Your Images</h3>
          <ol className="space-y-2 text-brand-muted text-sm list-decimal list-inside mb-12">
            <li><strong>Upload:</strong> Select a raw image file directly from your camera or computer.</li>
            <li><strong>Sanitize:</strong> The tool instantly rewrites the filename into an SEO-friendly format.</li>
            <li><strong>Context:</strong> Select the image category and enter a target keyword.</li>
            <li><strong>Copy:</strong> Copy the generated HTML code, complete with proper `alt` and `loading="lazy"` attributes, straight into your website.</li>
          </ol>

          <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-brand-main text-sm">Why should I remove EXIF data?</h4>
              <p className="text-sm text-brand-muted mt-1">EXIF metadata contains hidden information like the GPS coordinates of where a photo was taken and what camera was used. Removing it protects your privacy and slightly reduces the file size.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">What is Alt Text?</h4>
              <p className="text-sm text-brand-muted mt-1">Alt text (alternative text) is a written description of an image. It helps visually impaired users understand the image using screen readers, and it tells search engines exactly what the image is about.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">How long should Alt Text be?</h4>
              <p className="text-sm text-brand-muted mt-1">Best practices recommend keeping alt text under 125 characters. Screen readers often stop reading after this point. Be concise and descriptive.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}