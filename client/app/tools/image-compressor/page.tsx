"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  Upload, Download, Trash2, X, Settings2,
  AlertCircle, Image as ImageIcon, Package,
  Zap, RefreshCw, TrendingDown
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface QueuedFile {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "compressing" | "completed" | "error";
  originalSize: number;
  compressedSize?: number;
  downloadUrl?: string;
  outputName?: string;
  savings?: number; // percentage saved
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmtBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const savingsColor = (pct: number) => {
  if (pct >= 50) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 20) return "text-amber-600 dark:text-amber-400";
  return "text-brand-muted";
};

// ─── Core compression via canvas ────────────────────────────────────────────

async function compressImage(
  file: File,
  quality: number,         // 0–1
  maxWidth: number,        // px, 0 = no resize
  outputFormat: string,    // "same" | "image/jpeg" | "image/webp" | "image/png"
  canvasEl: HTMLCanvasElement
): Promise<{ blob: Blob; name: string }> {
  const resolvedFormat =
    outputFormat === "same"
      ? file.type === "image/png" ? "image/png" : "image/jpeg"
      : outputFormat;

  const extMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/png":  "png",
  };
  const ext = extMap[resolvedFormat] || "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const outputName = `${baseName}_compressed.${ext}`;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let w = img.naturalWidth;
      let h = img.naturalHeight;

      if (maxWidth > 0 && w > maxWidth) {
        h = Math.round((h * maxWidth) / w);
        w = maxWidth;
      }

      const ctx = canvasEl.getContext("2d", { willReadFrequently: true });
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      canvasEl.width  = w;
      canvasEl.height = h;
      ctx.clearRect(0, 0, w, h);

      // White background for JPEG (no transparency support)
      if (resolvedFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }

      ctx.drawImage(img, 0, 0, w, h);

      canvasEl.toBlob(
        (blob) => {
          if (blob) resolve({ blob, name: outputName });
          else reject(new Error("Compression failed"));
        },
        resolvedFormat,
        resolvedFormat === "image/png" ? undefined : quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image load failed"));
    };

    img.src = objectUrl;
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImageCompressor() {
  const [queue, setQueue]               = useState<QueuedFile[]>([]);
  const [quality, setQuality]           = useState(80);           // 1–100
  const [maxWidth, setMaxWidth]         = useState(0);            // 0 = no cap
  const [outputFormat, setOutputFormat] = useState("same");
  const [isDragging, setIsDragging]     = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrls   = useRef<string[]>([]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => objectUrls.current.forEach((u) => {
      try { URL.revokeObjectURL(u); } catch {}
    });
  }, []);

  // ── File ingestion ──────────────────────────────────────────────────────

  const addFiles = useCallback((files: File[]) => {
    const accepted = files.filter((f) => f.type.startsWith("image/"));
    const entries: QueuedFile[] = accepted.map((file) => {
      const preview = URL.createObjectURL(file);
      objectUrls.current.push(preview);
      return {
        id: crypto.randomUUID(),
        file,
        preview,
        status: "idle",
        originalSize: file.size,
      };
    });
    setQueue((prev) => [...prev, ...entries]);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (id: string) => {
    setQueue((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
        if (item.downloadUrl) URL.revokeObjectURL(item.downloadUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  // ── Single compress ─────────────────────────────────────────────────────

  const compressSingle = useCallback(async (item: QueuedFile) => {
    if (!canvasRef.current || item.status === "compressing") return;

    setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: "compressing" } : q));

    try {
      const { blob, name } = await compressImage(
        item.file,
        quality / 100,
        maxWidth,
        outputFormat,
        canvasRef.current
      );

      const url = URL.createObjectURL(blob);
      objectUrls.current.push(url);

      const savings = Math.max(0, Math.round((1 - blob.size / item.originalSize) * 100));

      setQueue((prev) => prev.map((q) =>
        q.id === item.id
          ? { ...q, status: "completed", compressedSize: blob.size, downloadUrl: url, outputName: name, savings }
          : q
      ));
    } catch (err) {
      console.error(err);
      setQueue((prev) => prev.map((q) => q.id === item.id ? { ...q, status: "error" } : q));
    }
  }, [quality, maxWidth, outputFormat]);

  // ── Compress all idle ───────────────────────────────────────────────────

  const compressAll = async () => {
    const idle = queue.filter((q) => q.status === "idle");
    if (!idle.length || isProcessing || !canvasRef.current) return;
    setIsProcessing(true);
    for (const item of idle) await compressSingle(item);
    setIsProcessing(false);
  };

  // ── Download ZIP of all completed ───────────────────────────────────────

  const downloadZip = async () => {
    const done = queue.filter((q) => q.status === "completed" && q.downloadUrl);
    if (!done.length) return;
    const zip = new JSZip();
    for (const item of done) {
      const res  = await fetch(item.downloadUrl!);
      const blob = await res.blob();
      zip.file(item.outputName!, blob);
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `toolmars_compressed_${Date.now()}.zip`);
  };

  // ── Derived counts ──────────────────────────────────────────────────────

  const idleCount      = queue.filter((q) => q.status === "idle").length;
  const completedCount = queue.filter((q) => q.status === "completed").length;

  const totalOriginal    = queue.filter((q) => q.status === "completed").reduce((s, q) => s + q.originalSize, 0);
  const totalCompressed  = queue.filter((q) => q.status === "completed" && q.compressedSize).reduce((s, q) => s + (q.compressedSize ?? 0), 0);
  const overallSavings   = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  // ─── JSon-LD ─────────────────────────────────────────────────────────────

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Image Compressor",
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": ["Client-side compression","Quality control","Batch processing","ZIP download","No file uploads"]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",   "item": "https://toolmars.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools",  "item": "https://toolmars.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Images", "item": "https://toolmars.com/tools/images" },
        { "@type": "ListItem", "position": 4, "name": "Image Compressor", "item": "https://toolmars.com/tools/image-compressor" }
      ]
    }
  ];

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-main selection:bg-brand-primary/10 transition-colors duration-300">
      <Head>
        <title>Image Compressor – Free & Private | ToolMars</title>
        <meta name="description" content="Compress JPEG, PNG and WebP images in your browser. Adjust quality, cap dimensions, and download individually or as a ZIP. No uploads, 100% private." />
        <link rel="canonical" href="https://toolmars.com/tools/image-compressor" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title"       content="Image Compressor – Free & Private | ToolMars" />
        <meta property="og:description" content="Compress images instantly in your browser. Free, private, no account needed." />
        <meta property="og:url"         content="https://toolmars.com/tools/image-compressor" />
        <meta property="og:type"        content="website" />
        <meta property="og:image"       content="https://toolmars.com/og/image-compressor.png" />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="viewport"           content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-14">

        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl font-black tracking-tight text-brand-main sm:text-4xl">
            Free Image Compressor
          </h1>
          <p className="mt-2 text-sm font-medium text-brand-muted max-w-2xl">
            Shrink JPEG, PNG, and WebP files right in your browser — no uploads, no accounts, nothing sent to any server.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* ── Settings panel ─────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-brand-border bg-brand-card p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <Settings2 size={18} className="text-brand-primary" />
                <h2 className="font-bold uppercase tracking-wider text-xs text-brand-muted">Settings</h2>
              </div>

              <div className="space-y-5">

                {/* Quality slider */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-bold text-brand-muted uppercase">Quality</label>
                    <span className="text-sm font-black text-brand-main tabular-nums">{quality}%</span>
                  </div>
                  <input
                    type="range" min={1} max={100} value={quality}
                    onChange={(e) => {
                      setQuality(Number(e.target.value));
                      // reset completed so they can be re-compressed
                      setQueue((prev) => prev.map((q) =>
                        q.status === "completed" ? { ...q, status: "idle", downloadUrl: undefined, compressedSize: undefined, savings: undefined } : q
                      ));
                    }}
                    className="w-full accent-brand-primary"
                  />
                  <div className="mt-1 flex justify-between text-[10px] font-bold text-brand-muted/60 uppercase">
                    <span>Smaller file</span>
                    <span>Better quality</span>
                  </div>
                </div>

                {/* Max width */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-brand-muted uppercase">Max Width (px)</label>
                  <div className="relative">
                    <select
                      value={maxWidth}
                      onChange={(e) => {
                        setMaxWidth(Number(e.target.value));
                        setQueue((prev) => prev.map((q) =>
                          q.status === "completed" ? { ...q, status: "idle", downloadUrl: undefined, compressedSize: undefined, savings: undefined } : q
                        ));
                      }}
                      className="w-full appearance-none rounded-2xl border border-brand-border bg-brand-bg px-4 py-3.5 text-sm font-bold text-brand-main outline-none transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                    >
                      <option value={0}>No resize</option>
                      <option value={3840}>3840 — 4K</option>
                      <option value={2560}>2560 — 2K</option>
                      <option value={1920}>1920 — Full HD</option>
                      <option value={1280}>1280 — HD</option>
                      <option value={1024}>1024</option>
                      <option value={800}>800</option>
                      <option value={640}>640</option>
                    </select>
                    <TrendingDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted" size={16} />
                  </div>
                </div>

                {/* Output format */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-brand-muted uppercase">Output Format</label>
                  <div className="relative">
                    <select
                      value={outputFormat}
                      onChange={(e) => {
                        setOutputFormat(e.target.value);
                        setQueue((prev) => prev.map((q) =>
                          q.status === "completed" ? { ...q, status: "idle", downloadUrl: undefined, compressedSize: undefined, savings: undefined } : q
                        ));
                      }}
                      className="w-full appearance-none rounded-2xl border border-brand-border bg-brand-bg px-4 py-3.5 text-sm font-bold text-brand-main outline-none transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                    >
                      <option value="same">Same as original</option>
                      <option value="image/jpeg">JPG — best compression</option>
                      <option value="image/webp">WebP — modern &amp; small</option>
                      <option value="image/png">PNG — lossless</option>
                    </select>
                    <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted" size={16} />
                  </div>
                </div>

                {/* Compress All */}
                <button
                  onClick={compressAll}
                  disabled={idleCount === 0 || isProcessing}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-brand-main py-4 font-bold text-brand-card transition-all hover:bg-brand-primary active:scale-[0.98] disabled:pointer-events-none disabled:opacity-20 shadow-md shadow-brand-main/5"
                >
                  {isProcessing
                    ? <RefreshCw className="animate-spin" size={20} />
                    : <Zap size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  }
                  <span>
                    {isProcessing ? "Compressing…" : idleCount > 0 ? `Compress ${idleCount} File${idleCount !== 1 ? "s" : ""}` : "Compress All"}
                  </span>
                </button>

                {/* Download ZIP */}
                <button
                  onClick={downloadZip}
                  disabled={completedCount === 0}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-brand-border bg-brand-bg py-3.5 font-bold text-sm text-brand-main transition-all hover:border-brand-primary hover:text-brand-primary active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30"
                >
                  <Package size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span>{completedCount > 0 ? `Download ZIP (${completedCount})` : "Download as ZIP"}</span>
                </button>

                {/* Clear */}
                {queue.length > 0 && (
                  <button
                    onClick={() => {
                      objectUrls.current.forEach((u) => { try { URL.revokeObjectURL(u); } catch {} });
                      objectUrls.current = [];
                      setQueue([]);
                    }}
                    className="flex w-full items-center justify-center gap-2 py-2 text-xs font-bold text-brand-muted transition-colors hover:text-red-500"
                  >
                    <Trash2 size={13} /> Clear all files
                  </button>
                )}
              </div>
            </div>

            {/* Privacy notice */}
            <div className="rounded-3xl bg-brand-primary/10 p-6 border border-brand-primary/20">
              <div className="flex gap-3">
                <AlertCircle className="text-brand-primary shrink-0" size={20} />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-brand-main">100% Private Processing</h4>
                  <p className="text-xs leading-relaxed text-brand-muted">
                    Your images are compressed right inside your browser. Nothing is ever sent to a server.
                  </p>
                </div>
              </div>
            </div>

            {/* Live savings summary */}
            <AnimatePresence>
              {completedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-3xl border border-brand-border bg-brand-card p-6 shadow-sm"
                >
                  <h4 className="mb-4 text-xs font-bold text-brand-muted uppercase tracking-wider">Session Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Original</span>
                      <span className="font-bold text-brand-main">{fmtBytes(totalOriginal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Compressed</span>
                      <span className="font-bold text-brand-main">{fmtBytes(totalCompressed)}</span>
                    </div>
                    <div className="flex justify-between border-t border-brand-border pt-2 mt-2">
                      <span className="font-bold text-brand-main">Saved</span>
                      <span className={`font-black text-base ${savingsColor(overallSavings)}`}>
                        {overallSavings}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Workspace ──────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed transition-all
                ${isDragging ? "border-brand-primary bg-brand-primary/10" : "border-brand-border bg-brand-card hover:border-brand-primary/40 hover:bg-brand-bg"}`}
            >
              <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleInput} className="hidden" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-bg text-brand-muted shadow-inner border border-brand-border">
                <Upload size={24} />
              </div>
              <div className="mt-4 text-center">
                <p className="text-base font-bold text-brand-main">Drop images here to compress</p>
                <p className="text-xs font-semibold text-brand-muted mt-0.5">or click to select — JPEG, PNG, WebP supported</p>
              </div>
            </div>

            {/* File list */}
            <div className="rounded-[32px] border border-brand-border bg-brand-card p-2 shadow-sm min-h-[400px]">
              <div className="p-6 pb-3 flex justify-between items-center">
                <h3 className="font-bold text-sm text-brand-main">
                  Files{" "}
                  <span className="ml-1.5 rounded-full bg-brand-bg px-2 py-0.5 text-xs font-bold text-brand-muted border border-brand-border">
                    {queue.length}
                  </span>
                </h3>
                {completedCount > 0 && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {completedCount} compressed · {overallSavings}% saved
                  </span>
                )}
              </div>

              <div className="p-2 space-y-1">
                <AnimatePresence mode="popLayout">
                  {queue.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-24 text-brand-muted"
                    >
                      <ImageIcon size={40} strokeWidth={1.5} />
                      <p className="mt-3 text-xs font-bold">No files added yet</p>
                    </motion.div>
                  ) : (
                    queue.map((item) => (
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
                          <img src={item.preview} alt={item.file.name} className="h-full w-full object-cover" />
                          {item.status === "compressing" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[1px]">
                              <RefreshCw className="animate-spin text-white" size={16} />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col min-w-0">
                          <span className="truncate text-sm font-bold text-brand-main">{item.file.name}</span>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            {item.status === "completed" && item.compressedSize != null ? (
                              <>
                                <span className="text-[11px] font-bold text-brand-muted/60 line-through uppercase">
                                  {fmtBytes(item.originalSize)}
                                </span>
                                <span className="text-[10px] text-brand-muted/40">→</span>
                                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md uppercase">
                                  {fmtBytes(item.compressedSize)}
                                </span>
                                {item.savings != null && item.savings > 0 && (
                                  <span className={`text-[11px] font-black ${savingsColor(item.savings)}`}>
                                    −{item.savings}%
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-[11px] font-bold text-brand-muted uppercase">
                                {fmtBytes(item.originalSize)}
                                <span className="text-brand-muted/40 mx-1">·</span>
                                {item.file.type.split("/")[1]?.toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pr-2 shrink-0">
                          {item.status === "completed" ? (
                            <>
                              <a
                                href={item.downloadUrl}
                                download={item.outputName}
                                className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-600 hover:text-white shadow-sm"
                              >
                                <Download size={13} />
                                <span>Download</span>
                              </a>
                              <button
                                onClick={() => removeFile(item.id)}
                                className="rounded-xl p-2 text-brand-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
                              >
                                <X size={15} />
                              </button>
                            </>
                          ) : item.status === "compressing" ? (
                            <span className="text-xs font-bold text-brand-primary animate-pulse px-2">Compressing…</span>
                          ) : item.status === "error" ? (
                            <>
                              <span className="text-xs font-bold text-red-500 px-2">Failed</span>
                              <button
                                onClick={() => compressSingle(item)}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl border border-brand-border text-brand-muted hover:text-brand-main transition-colors"
                              >
                                Retry
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => compressSingle(item)}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-brand-main text-brand-card hover:bg-brand-primary hover:text-white transition-colors shadow-sm"
                              >
                                Compress
                              </button>
                              <button
                                onClick={() => removeFile(item.id)}
                                className="rounded-xl p-2 text-brand-muted hover:bg-red-500/10 hover:text-red-500 transition-colors"
                              >
                                <X size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEO content ──────────────────────────────────────────────────── */}
        <div className="mt-16 space-y-12 border-t border-brand-border pt-12 max-w-3xl">

          <section>
            <h2 className="text-xl font-black text-brand-main mb-4 tracking-tight">What is the Image Compressor?</h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              It is a free, browser-based tool that reduces the file size of your images without uploading them anywhere. Adjust quality, cap the maximum width, and choose an output format — then compress one at a time or all at once.
            </p>
            <p className="text-brand-muted leading-relaxed italic border-l-2 border-brand-primary pl-4">
              Image compression reduces file size by discarding redundant pixel data, making pages load faster and storage costs lower.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">How to Compress Images</h3>
            <ol className="space-y-2 text-brand-muted list-decimal list-inside">
              <li><strong>Drop</strong> your JPEG, PNG, or WebP images into the upload area.</li>
              <li><strong>Adjust</strong> quality (lower = smaller file), max width, and output format.</li>
              <li><strong>Click Compress</strong> per file, or hit "Compress All" for the whole batch.</li>
              <li><strong>Download</strong> individually or grab everything as a ZIP.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Key Features</h3>
            <ul className="space-y-2 text-brand-muted list-disc list-inside">
              <li>Quality slider from 1–100 for precise control over size vs. fidelity.</li>
              <li>Optional max-width cap to resize large images at the same time.</li>
              <li>Convert to JPG, WebP, or PNG during compression for extra savings.</li>
              <li>Live savings summary shows total bytes saved across your session.</li>
              <li>Everything runs client-side — your photos never leave your device.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-brand-main text-sm">Does compression reduce image quality?</h4>
                <p className="text-sm text-brand-muted mt-1">At 80% quality most people cannot see any difference. Below 60% you may notice artefacts. PNG output is always lossless regardless of the slider.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">What formats are supported?</h4>
                <p className="text-sm text-brand-muted mt-1">You can upload JPEG, PNG, WebP, GIF, or BMP. Output can be JPG, WebP, PNG, or the same format as the original.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Why convert to WebP?</h4>
                <p className="text-sm text-brand-muted mt-1">WebP files are typically 25–35% smaller than equivalent JPEGs with the same visual quality, making them ideal for web use.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Is there a file size or count limit?</h4>
                <p className="text-sm text-brand-muted mt-1">No. The only limit is your device's memory. Very large images (over 20 MP) may take a moment to process.</p>
              </div>
            </div>
          </section>

          <section className="pt-6 mt-6 border-t border-brand-border">
            <h3 className="text-sm font-bold text-brand-main mb-3 uppercase tracking-wider">Related Tools</h3>
            <div className="flex flex-wrap gap-3">
              <a href="/tools/image-converter"  className="text-sm text-brand-primary hover:underline">Batch Image Converter</a>
              <a href="/tools/svg-optimizer"    className="text-sm text-brand-primary hover:underline">SVG Optimizer</a>
              <a href="/tools/base64-converter" className="text-sm text-brand-primary hover:underline">Base64 Image Encoder</a>
            </div>
          </section>

        </div>
      </main>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}