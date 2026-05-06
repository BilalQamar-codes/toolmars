"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Upload, ArrowLeft, 
  RefreshCw, CheckCircle2,
  X, Image as ImageIcon,
  Settings2, Trash2
} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface QueuedFile {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "processing" | "completed" | "failed";
  error?: string;
}

const PRESET_OPTIONS = [
  { label: "Youtube Thumbnail", width: 1280, height: 720 },
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Twitter Post", width: 1200, height: 675 },
  { label: "Facebook Post", width: 1200, height: 630 },
  { label: "LinkedIn Post", width: 1200, height: 627 },
  { label: "Pinterest Pin", width: 1000, height: 1500 },
  { label: "Custom", width: 0, height: 0 },
];

const FORMAT_OPTIONS = ["PNG", "JPG", "WebP", "AVIF", "GIF"];

export default function ResizeImageTool() {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESET_OPTIONS[0]);
  const [customWidth, setCustomWidth] = useState(1280);
  const [customHeight, setCustomHeight] = useState(720);
  const [outputFormat, setOutputFormat] = useState("PNG");
  const [quality, setQuality] = useState(80);
  const [preserveAspect, setPreserveAspect] = useState(true);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newEntries: QueuedFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      status: "idle",
    }));
    setQueue((prev) => [...prev, ...newEntries]);
  };

  const removeFile = (id: string) => {
    setQueue((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAllFiles = () => {
    // Revoke all object URLs to prevent memory leaks
    queue.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    
    // Clear the queue
    setQueue([]);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resizeImage = async (
    file: File,
    width: number,
    height: number,
    format: string,
    quality: number,
    preserveAspect: boolean
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          try {
            // Create canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              reject(new Error("Canvas context not available"));
              return;
            }

            // Calculate dimensions
            let finalWidth = width;
            let finalHeight = height;

            if (preserveAspect) {
              const imgAspectRatio = img.width / img.height;
              const targetAspectRatio = width / height;

              if (imgAspectRatio > targetAspectRatio) {
                // Image is wider than target
                finalHeight = Math.round(width / imgAspectRatio);
              } else {
                // Image is taller than target
                finalWidth = Math.round(height * imgAspectRatio);
              }
            }

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Fill background with white (for transparent images converted to non-transparent formats)
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, width, height);

            // Calculate position to center the image
            const x = (width - finalWidth) / 2;
            const y = (height - finalHeight) / 2;

            // Draw image on canvas
            ctx.drawImage(img, x, y, finalWidth, finalHeight);

            // Convert to blob with selected format
            const mimeType = format.toLowerCase();
            const qualityValue = quality / 100;

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error("Failed to convert canvas to blob"));
                }
              },
              `image/${mimeType === "jpg" ? "jpeg" : mimeType}`,
              qualityValue
            );
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const processAll = async () => {
    if (queue.length === 0 || isProcessing) return;
    
    setIsProcessing(true);
    const zip = new JSZip();
    const width = selectedPreset.label === "Custom" ? customWidth : selectedPreset.width;
    const height = selectedPreset.label === "Custom" ? customHeight : selectedPreset.height;

    try {
      const currentQueue = [...queue];

      for (const item of currentQueue) {
        if (item.status === "completed") continue;

        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "processing" } : q
          )
        );

        await delay(150);

        try {
          const resizedBlob = await resizeImage(
            item.file,
            width,
            height,
            outputFormat,
            quality,
            preserveAspect
          );

          const fileName = item.file.name.split(".")[0];
          const extension = outputFormat.toLowerCase() === "jpg" ? "jpeg" : outputFormat.toLowerCase();
          const finalFileName = `${fileName}_${width}x${height}.${extension}`;

          zip.file(finalFileName, resizedBlob);

          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, status: "completed" } : q
            )
          );
        } catch (error) {
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? {
                    ...q,
                    status: "failed",
                    error: error instanceof Error ? error.message : "Unknown error",
                  }
                : q
            )
          );
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `resized-images-${width}x${height}.zip`);
    } catch (error) {
      alert("Error processing images. Check console for details.");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10 font-sans text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-indigo-600">Resize & Optimize.</h1>
          <p className="text-slate-500 font-medium">Batch resize images to preset dimensions with format conversion and optimization.</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Left Sidebar - Settings */}
          <section className="space-y-6">
            {/* Upload */}
            <div className="rounded-[30px] bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="mb-4 font-bold flex items-center gap-2">
                <Upload size={18} /> 1. Upload
              </h3>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleUpload}
                className="w-full text-sm"
                accept="image/*"
              />
            </div>

            {/* Presets */}
            <div className="rounded-[30px] bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="mb-4 font-bold flex items-center gap-2">
                <Settings2 size={18} /> 2. Size Preset
              </h3>
              <select
                value={selectedPreset.label}
                onChange={(e) => {
                  const selected = PRESET_OPTIONS.find((opt) => opt.label === e.target.value);
                  if (selected) setSelectedPreset(selected);
                }}
                className="w-full rounded-xl bg-slate-100 p-3 font-bold outline-none mb-4"
              >
                {PRESET_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {selectedPreset.label === "Custom" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold">Width (px)</label>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg bg-slate-100 p-2 mt-1 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Height (px)</label>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg bg-slate-100 p-2 mt-1 outline-none"
                    />
                  </div>
                </div>
              )}
              {selectedPreset.label !== "Custom" && (
                <div className="text-sm text-slate-600">
                  <p>Width: {selectedPreset.width}px</p>
                  <p>Height: {selectedPreset.height}px</p>
                </div>
              )}
            </div>

            {/* Format */}
            <div className="rounded-[30px] bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="mb-4 font-bold">3. Format</h3>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full rounded-xl bg-slate-100 p-3 font-bold outline-none"
              >
                {FORMAT_OPTIONS.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
            </div>

            {/* Quality */}
            <div className="rounded-[30px] bg-white p-8 shadow-sm border border-slate-200">
              <h3 className="mb-4 font-bold">4. Quality & Options</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold flex justify-between mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preserveAspect}
                    onChange={(e) => setPreserveAspect(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Preserve Aspect Ratio</span>
                </label>
              </div>
            </div>

            {/* Process Button */}
            <button
              onClick={processAll}
              disabled={queue.length === 0 || isProcessing}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white transition-all hover:bg-indigo-700 disabled:opacity-30"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Resize & Download
                </>
              )}
            </button>
          </section>

          {/* Right - Queue */}
          <section className="lg:col-span-2">
            <div className="rounded-[30px] bg-white p-6 shadow-sm border border-slate-200 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Queue ({queue.length})</h3>
                {queue.length > 0 && (
                  <button
                    onClick={clearAllFiles}
                    className="text-red-500 text-sm font-bold hover:text-red-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {queue.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-4 rounded-2xl p-4 border ${
                        item.status === "failed"
                          ? "bg-red-50 border-red-200"
                          : "bg-slate-50 border-slate-100"
                      }`}
                    >
                      <img
                        src={item.preview}
                        className="h-12 w-12 rounded-lg object-cover"
                        alt="preview"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">{item.file.name}</p>
                        <p className="text-xs text-slate-500">
                          {(item.file.size / 1024).toFixed(2)} KB
                        </p>
                        {item.error && (
                          <p className="text-xs text-red-600 mt-1">{item.error}</p>
                        )}
                      </div>
                      {item.status === "completed" ? (
                        <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                      ) : item.status === "processing" ? (
                        <RefreshCw className="animate-spin text-indigo-500 flex-shrink-0" size={20} />
                      ) : (
                        <button
                          onClick={() => removeFile(item.id)}
                          className="text-slate-400 hover:text-red-500 flex-shrink-0"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {queue.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <ImageIcon className="w-16 h-16 text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No images uploaded yet</p>
                    <p className="text-sm text-slate-400">Upload images to get started</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
