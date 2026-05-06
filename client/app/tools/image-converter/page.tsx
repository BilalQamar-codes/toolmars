"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { 
  Download, Upload, ArrowLeft, 
  RefreshCw, CheckCircle2,
  Files, X, Image as ImageIcon,
  Settings2, Trash2
} from "lucide-react";

interface QueuedFile {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "converting" | "completed";
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function MultiImageConverter() {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [targetFormat, setTargetFormat] = useState("image/png");
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Clean up object URLs to prevent memory leaks
  // Clean up ONLY when the user leaves the page entirely
useEffect(() => {
  const currentQueue = queue;
  return () => {
    currentQueue.forEach(item => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
  };
}, []); // Empty dependency array ensures this only runs on unmount

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: QueuedFile[] = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      status: "idle"
    }));
    setQueue(prev => [...prev, ...newEntries]);
  };

  const removeFile = (id: string) => {
    setQueue(prev => {
      const item = prev.find(i => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter(i => i.id !== id);
    });
  };

  const convertToBlob = useCallback(async (item: QueuedFile, format: string): Promise<{ blob: Blob, name: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = async () => {
        try {
          if (img.decode) await img.decode();
          
          const canvas = canvasRef.current;
          if (!canvas) throw new Error("Canvas missing");

          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (!ctx) throw new Error("Context missing");

          const fileName = item.file.name.split('.')[0];
          const extension = format.split('/')[1]?.replace('jpeg', 'jpg') || 'png';

          if (format === "image/svg+xml") {
            // Set canvas to image dimensions for embedding
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Convert canvas to base64 PNG data
            const imageData = canvas.toDataURL("image/png");
            
            // Embed base64 image directly in SVG (works in ZIP files)
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}"><image width="100%" height="100%" href="${imageData}" /></svg>`;
            resolve({ blob: new Blob([svgString], { type: "image/svg+xml" }), name: `${fileName}.svg` });
          } else {
            // Adjust canvas size to image
            canvas.width = format === "image/x-icon" ? 32 : img.width;
            canvas.height = format === "image/x-icon" ? 32 : img.height;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const exportFormat = format === "image/x-icon" ? "image/png" : format;
            const finalExt = format === "image/x-icon" ? "ico" : extension;

            canvas.toBlob((blob) => {
              if (blob) resolve({ blob, name: `${fileName}.${finalExt}` });
              else reject(new Error("Blob failed"));
            }, exportFormat);
          }
        } catch (e) { reject(e); }
      };
      img.onerror = () => reject(new Error("Load failed"));
      img.src = item.preview;
    });
  }, []);

  const processAll = async () => {
    if (queue.length === 0 || isProcessing) return;
    setIsProcessing(true);
    const zip = new JSZip();

    try {
      // Use a local copy of the queue to ensure we iterate correctly
      const currentQueue = [...queue];

      for (const item of currentQueue) {
        if (item.status === 'completed') continue;

        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "converting" } : q));
        
        // Let the event loop cycle to update UI
        await delay(150);

        const result = await convertToBlob(item, targetFormat);
        zip.file(result.name, result.blob);

        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: "completed" } : q));
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "converted-images.zip");
    } catch (error) {
      console.error(error);
      alert("Conversion interrupted. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10 font-sans text-slate-900">
      <Head><title>Batch Image Converter</title></Head>
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
            <h1 className="text-4xl font-black text-indigo-600">Batch Converter.</h1>
            <p className="text-slate-500 font-medium">Convert and download all images as a ZIP.</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-3">
          <section className="space-y-6">
            <div className="rounded-[30px] bg-white p-8 shadow-sm border border-slate-200">
                <h3 className="mb-4 font-bold">1. Upload</h3>
                <input type="file" multiple onChange={handleUpload} className="w-full text-sm" accept="image/*" />
            </div>

            <div className="rounded-[30px] bg-white p-8 shadow-sm border border-slate-200">
                <h3 className="mb-4 font-bold">2. Settings</h3>
                <select 
                    value={targetFormat} 
                    onChange={(e) => setTargetFormat(e.target.value)}
                    className="w-full rounded-xl bg-slate-100 p-3 font-bold outline-none"
                >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPG</option>
                    <option value="image/webp">WebP</option>
                    <option value="image/x-icon">ICO</option>
                    <option value="image/svg+xml">SVG</option>
                </select>

                <button 
                    onClick={processAll}
                    disabled={queue.length === 0 || isProcessing}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white transition-all hover:bg-indigo-700 disabled:opacity-30"
                >
                    {isProcessing ? <RefreshCw className="animate-spin" /> : <Download size={20} />}
                    {isProcessing ? "Processing..." : "Convert & Download"}
                </button>
            </div>
          </section>

          <section className="lg:col-span-2">
            <div className="rounded-[30px] bg-white p-6 shadow-sm border border-slate-200 min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold">Queue ({queue.length})</h3>
                    {queue.length > 0 && <button onClick={() => setQueue([])} className="text-red-500 text-sm font-bold">Clear All</button>}
                </div>
                
                <div className="space-y-3">
                    <AnimatePresence>
                        {queue.map(item => (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-4 rounded-2xl bg-slate-50 p-3 border border-slate-100"
                            >
                                <img src={item.preview} className="h-12 w-12 rounded-lg object-cover" alt="prev" />
                                <span className="flex-1 truncate text-sm font-medium">{item.file.name}</span>
                                {item.status === 'completed' ? (
                                    <CheckCircle2 className="text-emerald-500" size={20} />
                                ) : item.status === 'converting' ? (
                                    <RefreshCw className="animate-spin text-indigo-500" size={20} />
                                ) : (
                                    <button onClick={() => removeFile(item.id)}><X size={18} className="text-slate-400" /></button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
          </section>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}