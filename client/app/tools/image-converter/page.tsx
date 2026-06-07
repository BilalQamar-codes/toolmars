"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { 
  Download, Upload, RefreshCw,
  X, Image as ImageIcon, Settings2, Trash2, 
  FileType, AlertCircle, Zap, Package
} from "lucide-react";

interface QueuedFile {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "converting" | "completed";
  downloadUrl?: string; 
  convertedName?: string;
  convertedFormat?: string; // track what format it was converted TO
}

// Helper: get the short extension label from a MIME type
const formatLabel = (mime: string) =>
  mime.split("/")[1]?.replace("jpeg", "JPG").replace("png", "PNG").replace("webp", "WebP").replace("x-icon", "ICO").replace("svg+xml", "SVG").toUpperCase() || mime;

export default function MultiImageConverter() {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [targetFormat, setTargetFormat] = useState("image/png");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Batch Image Converter",
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-01-10",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": ["Client-side processing","Instant batch conversion","Unlimited free usage","Bulk ZIP download","Cross-device compatibility"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the Batch Image Converter and what does it do?", "acceptedAnswer": { "@type": "Answer", "text": "It is a simple tool to change picture formats. You can upload many photos at once. It turns them into PNG or WebP files instantly." } },
        { "@type": "Question", "name": "Is it safe to use with sensitive data?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, your files are completely safe. The tool processes everything right on your own device using client side image conversion. Your photos never upload to our servers." } },
        { "@type": "Question", "name": "Do I need an account?", "acceptedAnswer": { "@type": "Answer", "text": "No, you do not need an account to use this. You can start converting images immediately. There are no hidden fees or sign-up forms." } },
        { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it works great on any mobile phone. You can select photos straight from your camera roll. The ZIP download works smoothly on mobile devices." } },
        { "@type": "Question", "name": "How is this different from other converters?", "acceptedAnswer": { "@type": "Answer", "text": "Unlike tools like Convertio or CloudConvert, this tool never uploads your files to a server — everything stays on your device, which matters when dealing with client photos or sensitive images." } }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolmars.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://toolmars.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Images", "item": "https://toolmars.com/tools/images" },
        { "@type": "ListItem", "position": 4, "name": "Batch Image Converter", "item": "https://toolmars.com/tools/image-converter" }
      ]
    }
  ];

  const memoryObjectsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      memoryObjectsRef.current.forEach(url => {
        try { URL.revokeObjectURL(url); } catch (e) { console.error(e); }
      });
    };
  }, []);

  const addFiles = (files: File[]) => {
    const newEntries: QueuedFile[] = files
      .filter(f => f.type.startsWith('image/'))
      .map(file => {
        const previewUrl = URL.createObjectURL(file);
        memoryObjectsRef.current.push(previewUrl);
        return { id: crypto.randomUUID(), file, preview: previewUrl, status: "idle" };
      });
    setQueue(prev => [...prev, ...newEntries]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (id: string) => {
    setQueue(prev => {
      const item = prev.find(i => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
        if (item.downloadUrl) URL.revokeObjectURL(item.downloadUrl);
        memoryObjectsRef.current = memoryObjectsRef.current.filter(u => u !== item.preview && u !== item.downloadUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const convertToBlob = useCallback(async (item: QueuedFile, format: string): Promise<{ blob: Blob, name: string }> => {
    const fileName = item.file.name.split('.')[0];
    const extension = format.split('/')[1]
      ?.replace('jpeg', 'jpg')
      .replace('svg+xml', 'svg')
      .replace('x-icon', 'ico') || 'png';
    const targetName = `${fileName}.${extension}`;

    if (item.file.type === format) {
      return { blob: item.file, name: targetName };
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = canvasRef.current;
          if (!canvas) throw new Error("Canvas missing");
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) throw new Error("Context missing");

          if (format === "image/svg+xml") {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}"><image width="100%" height="100%" href="${imageData}" /></svg>`;
            resolve({ blob: new Blob([svgString], { type: "image/svg+xml" }), name: targetName });
          } else {
            canvas.width = format === "image/x-icon" ? 32 : img.width;
            canvas.height = format === "image/x-icon" ? 32 : img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const exportFormat = format === "image/x-icon" ? "image/png" : format;
            canvas.toBlob((blob) => {
              if (blob) resolve({ blob, name: targetName });
              else reject(new Error("Blob compilation failed"));
            }, exportFormat);
          }
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error("Image failed to load"));
      img.src = item.preview;
    });
  }, []);

  // ── Convert ALL (no download, just process) ──────────────────────────────
  const convertAll = async () => {
    const toConvert = queue.filter(q => q.status === "idle");
    if (toConvert.length === 0 || isProcessing) return;
    setIsProcessing(true);

    for (const item of toConvert) {
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "converting" } : q));
      try {
        const result = await convertToBlob(item, targetFormat);
        const individualUrl = URL.createObjectURL(result.blob);
        memoryObjectsRef.current.push(individualUrl);
        setQueue(prev => prev.map(q => q.id === item.id ? {
          ...q,
          status: "completed",
          downloadUrl: individualUrl,
          convertedName: result.name,
          convertedFormat: targetFormat,   // ← record the target format
        } : q));
      } catch (error) {
        console.error(error);
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "idle" } : q));
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsProcessing(false);
  };

  // ── Download ALL as ZIP ───────────────────────────────────────────────────
  const downloadZip = async () => {
    const completed = queue.filter(q => q.status === "completed" && q.downloadUrl);
    if (completed.length === 0) return;

    const zip = new JSZip();
    for (const item of completed) {
      const response = await fetch(item.downloadUrl!);
      const blob = await response.blob();
      zip.file(item.convertedName!, blob);
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `toolmars_converted_${Date.now()}.zip`);
  };

  // ── Convert single file ───────────────────────────────────────────────────
  const convertSingleFile = async (item: QueuedFile) => {
    if (item.status === "converting") return;
    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "converting" } : q));
    try {
      const result = await convertToBlob(item, targetFormat);
      const individualUrl = URL.createObjectURL(result.blob);
      memoryObjectsRef.current.push(individualUrl);
      setQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: "completed",
        downloadUrl: individualUrl,
        convertedName: result.name,
        convertedFormat: targetFormat,   // ← record the target format
      } : q));
    } catch (error) {
      console.error(error);
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "idle" } : q));
    }
  };

  const completedCount = queue.filter(q => q.status === "completed").length;
  const idleCount = queue.filter(q => q.status === "idle").length;

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-main selection:bg-brand-primary/10 transition-colors duration-300">
      <Head>
        <title>Batch Image Converter - Free & Online | ToolMars</title>
        <meta name="description" content="Convert multiple images at once right in your browser. It is fast, free, and completely private. Try it now without making an account." />
        <link rel="canonical" href="https://toolmars.com/tools/image-converter" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Batch Image Converter - Free & Online | ToolMars" />
        <meta property="og:description" content="Change picture formats instantly. Free, private, and no account needed." />
        <meta property="og:url" content="https://toolmars.com/tools/image-converter" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/image-converter.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Batch Image Converter - Free & Online | ToolMars" />
        <meta name="twitter:description" content="Change picture formats instantly. Free, private, and no account needed." />
        <meta name="twitter:image" content="https://toolmars.com/og/image-converter.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-black tracking-tight text-brand-main sm:text-4xl">
            Free Batch Image Converter
          </h1>
          <p className="mt-2 text-sm font-medium text-brand-muted max-w-2xl">
            Your files stay completely private. Get instant results without uploading a single image to any server. 
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-brand-border bg-brand-card p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2 text-brand-main">
                <Settings2 size={18} className="text-brand-primary" />
                <h2 className="font-bold uppercase tracking-wider text-xs text-brand-muted">Settings</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-xs font-bold text-brand-muted uppercase">Choose New Format</label>
                  <div className="relative">
                    <select 
                      value={targetFormat} 
                      onChange={(e) => {
                        setTargetFormat(e.target.value);
                        // Reset only idle items; completed ones stay as-is
                        setQueue(prev => prev.map(q => q.status === "idle" ? q : { ...q, status: "idle", downloadUrl: undefined, convertedFormat: undefined }));
                      }}
                      className="w-full appearance-none rounded-2xl border border-brand-border bg-brand-bg px-4 py-3.5 text-sm font-bold text-brand-main outline-none transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                    >
                      <option value="image/png">PNG</option>
                      <option value="image/jpeg">JPG</option>
                      <option value="image/webp">WebP</option>
                      <option value="image/x-icon">ICO</option>
                      <option value="image/svg+xml">SVG</option>
                    </select>
                    <FileType className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted" size={18} />
                  </div>
                </div>

                {/* PRIMARY: Convert All button */}
                <button 
                  onClick={convertAll}
                  disabled={idleCount === 0 || isProcessing}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-brand-main py-4 font-bold text-brand-card transition-all hover:bg-brand-primary active:scale-[0.98] disabled:pointer-events-none disabled:opacity-20 shadow-md shadow-brand-main/5"
                >
                  {isProcessing
                    ? <RefreshCw className="animate-spin" size={20} />
                    : <Zap size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  }
                  <span>
                    {isProcessing
                      ? "Converting..."
                      : idleCount > 0
                        ? `Convert ${idleCount} File${idleCount !== 1 ? "s" : ""}`
                        : "Convert All"
                    }
                  </span>
                </button>

                {/* SECONDARY: Download ZIP — only shown when something is ready */}
                <button 
                  onClick={downloadZip}
                  disabled={completedCount === 0}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-brand-border bg-brand-bg py-3.5 font-bold text-sm text-brand-main transition-all hover:border-brand-primary hover:text-brand-primary active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30"
                >
                  <Package size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span>
                    {completedCount > 0 ? `Download ZIP (${completedCount})` : "Download as ZIP"}
                  </span>
                </button>

                {queue.length > 0 && (
                  <button 
                    onClick={() => {
                      memoryObjectsRef.current.forEach(url => URL.revokeObjectURL(url));
                      memoryObjectsRef.current = [];
                      setQueue([]);
                    }} 
                    className="flex w-full items-center justify-center gap-2 py-2 text-xs font-bold text-brand-muted transition-colors hover:text-red-500"
                  >
                    <Trash2 size={13} /> Clear all files
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-brand-primary/10 p-6 border border-brand-primary/20">
               <div className="flex gap-3">
                  <AlertCircle className="text-brand-primary shrink-0" size={20} />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-brand-main">100% Private Processing</h4>
                    <p className="text-xs leading-relaxed text-brand-muted">
                      Your files never leave your device. Everything happens right inside your browser for total privacy.
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Asset Workspace Area */}
          <div className="lg:col-span-8 space-y-6">
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed transition-all 
                ${isDragging ? "border-brand-primary bg-brand-primary/10" : "border-brand-border bg-brand-card hover:border-brand-primary/40 hover:bg-brand-bg"}`}
            >
              <input type="file" ref={fileInputRef} multiple onChange={handleUpload} className="hidden" accept="image/*" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-bg text-brand-muted shadow-inner border border-brand-border">
                <Upload size={24} />
              </div>
              <div className="mt-4 text-center">
                <p className="text-base font-bold text-brand-main">Drop your pictures here</p>
                <p className="text-xs font-semibold text-brand-muted mt-0.5">or click to select files</p>
              </div>
            </div>

            <div className="rounded-[32px] border border-brand-border bg-brand-card p-2 shadow-sm min-h-[400px]">
              <div className="p-6 pb-3 flex justify-between items-center">
                <h3 className="font-bold text-sm text-brand-main">
                  Ready to Convert{" "}
                  <span className="ml-1.5 rounded-full bg-brand-bg px-2 py-0.5 text-xs font-bold text-brand-muted border border-brand-border">
                    {queue.length}
                  </span>
                </h3>
                {completedCount > 0 && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {completedCount} converted
                  </span>
                )}
              </div>

              <div className="p-2 space-y-1">
                <AnimatePresence mode="popLayout">
                  {queue.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-brand-muted">
                       <ImageIcon size={40} strokeWidth={1.5} className="text-brand-muted" />
                       <p className="mt-3 text-xs font-bold text-brand-muted">No files added yet</p>
                    </motion.div>
                  ) : (
                    queue.map(item => {
                      // What format badge to show:
                      // - idle/converting: show original → target with arrow
                      // - completed: show target only (it's done)
                      const originalLabel = formatLabel(item.file.type || "image/unknown");
                      const targetLabel = formatLabel(targetFormat);
                      const convertedLabel = item.convertedFormat ? formatLabel(item.convertedFormat) : targetLabel;

                      return (
                        <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-brand-bg"
                        >
                          {/* Thumbnail */}
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-brand-border bg-brand-bg">
                            <img src={item.preview} className="h-full w-full object-cover" alt={`Preview of ${item.file.name}`} />
                            {item.status === 'converting' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[1px]">
                                 <RefreshCw className="animate-spin text-white" size={16} />
                              </div>
                            )}
                          </div>

                          {/* File info */}
                          <div className="flex flex-1 flex-col min-w-0">
                            <span className="truncate text-sm font-bold text-brand-main">{item.file.name}</span>
                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                              <span className="text-[11px] font-bold text-brand-muted uppercase">
                                {(item.file.size / 1024).toFixed(1)} KB
                              </span>
                              <span className="text-brand-muted/40 text-[11px]">•</span>

                              {item.status === "completed" ? (
                                // After conversion: show "was → now" so it's crystal clear
                                <span className="flex items-center gap-1">
                                  <span className="text-[11px] font-bold text-brand-muted/60 uppercase line-through">
                                    {originalLabel}
                                  </span>
                                  <span className="text-[10px] text-brand-muted/40">→</span>
                                  <span className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                                    {convertedLabel}
                                  </span>
                                </span>
                              ) : (
                                // Before conversion: show "JPG → PNG" so user knows what will happen
                                <span className="flex items-center gap-1">
                                  <span className="text-[11px] font-bold text-brand-muted uppercase">
                                    {originalLabel}
                                  </span>
                                  <span className="text-[10px] text-brand-muted/40">→</span>
                                  <span className="text-[11px] font-bold uppercase text-brand-primary/80 bg-brand-primary/10 px-1.5 py-0.5 rounded-md">
                                    {targetLabel}
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pr-2">
                            {item.status === 'completed' ? (
                              <div className="flex items-center gap-2">
                                <a 
                                  href={item.downloadUrl} 
                                  download={item.convertedName}
                                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950 shadow-sm"
                                >
                                  <Download size={13} />
                                  <span>Download</span>
                                </a>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}
                                  className="rounded-xl p-2 text-brand-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                                >
                                  <X size={15} />
                                </button>
                              </div>
                            ) : item.status === 'converting' ? (
                              <span className="text-xs font-bold text-brand-primary animate-pulse px-2">Converting...</span>
                            ) : (
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => convertSingleFile(item)}
                                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-main text-brand-card hover:bg-brand-primary hover:text-white transition-colors shadow-sm"
                                >
                                  Convert
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeFile(item.id); }}
                                  className="rounded-xl p-2 text-brand-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                                >
                                  <X size={15} />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="mt-16 space-y-12 border-t border-brand-border pt-12 max-w-3xl">
          
          <section>
            <h2 className="text-xl font-black text-brand-main mb-4 tracking-tight">What is the Batch Image Converter?</h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              It is a free image optimizer and batch image converter that changes the format of multiple pictures at the same time. You drag your files in, pick a new format like PNG or WebP, and download them instantly. Everything happens on your device for total privacy.
            </p>
            <p className="text-brand-muted leading-relaxed italic border-l-2 border-brand-primary pl-4">
              A batch image converter is an app that allows you to convert multiple images into a new format at the exact same time without individual uploads.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Supported Formats</h3>
            <p className="text-brand-muted leading-relaxed mb-4">
              <strong>Supports PNG, JPG, WebP, GIF, BMP, SVG, and ICO.</strong>
            </p>
            <p className="text-brand-muted leading-relaxed">
              Whether you need to bulk convert PNG to WebP to save website bandwidth, or you are looking for an online ICO converter to quickly generate favicons for a new project, this local browser image tool handles it all instantly.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">How to Use Batch Image Converter</h3>
            <ol className="space-y-2 text-brand-muted list-decimal list-inside">
              <li><strong>Drag</strong> your images into the upload box.</li>
              <li><strong>Select</strong> your target format from the dropdown (PNG, WebP, JPG, etc.).</li>
              <li><strong>Click Convert</strong> — either per file or all at once with "Convert All".</li>
              <li><strong>Download</strong> files one by one, or grab them all in one ZIP.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Key Features</h3>
            <ul className="space-y-2 text-brand-muted list-disc list-inside">
              <li>Your files stay private because they never leave your web browser.</li>
              <li>Results appear instantly without any annoying sign-up forms.</li>
              <li>Use it as much as you want without hitting paywalls or limits.</li>
              <li>Download files one-by-one or all converted pictures neatly packed in one ZIP file.</li>
              <li>Works perfectly on your mobile phone, tablet, or desktop computer.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Why Use ToolMars for This?</h3>
            <p className="text-brand-muted leading-relaxed">
              ToolMars gives you free tools forever without ads or accounts. Thanks to client side image conversion, this specific tool runs entirely on your device for total privacy. Thousands of web developers trust it to format images safely without risking client privacy.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-brand-main text-sm">What is the Batch Image Converter and what does it do?</h4>
                <p className="text-sm text-brand-muted mt-1">It is a simple tool to change picture formats. You can upload many photos at once. It turns them into PNG or WebP files instantly.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Is it safe to use with sensitive data?</h4>
                <p className="text-sm text-brand-muted mt-1">Yes, your files are completely safe. The tool processes everything right on your own device using client side image conversion. Your photos never upload to our servers.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Do I need an account?</h4>
                <p className="text-sm text-brand-muted mt-1">No, you do not need an account to use this. You can start converting images immediately. There are no hidden fees or sign-up forms.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Does it work on mobile?</h4>
                <p className="text-sm text-brand-muted mt-1">Yes, it works great on any mobile phone. You can select photos straight from your camera roll. The ZIP download works smoothly on mobile devices.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">How is this different from other converters?</h4>
                <p className="text-sm text-brand-muted mt-1">Unlike tools like Convertio or CloudConvert, this tool never uploads your files to a server — everything stays on your device, which matters when dealing with client photos or sensitive images.</p>
              </div>
            </div>
          </section>

          <section className="pt-6 mt-6 border-t border-brand-border">
             <h3 className="text-sm font-bold text-brand-main mb-3 uppercase tracking-wider">Related Tools</h3>
             <div className="flex flex-wrap gap-3">
                <a href="/tools/image-compressor" className="text-sm text-brand-primary hover:underline">Image Compressor</a>
               
             </div>
          </section>

        </div>
      </main>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}