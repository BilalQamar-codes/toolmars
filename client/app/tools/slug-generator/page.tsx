"use client";

import { useState } from "react";
import { slugify } from "@/utils/slugify";
import { Copy, Check } from "lucide-react";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setSlug(slugify(value));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black mb-8">Slug Generator</h1>
      
      <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm">
        <label className="block text-sm font-bold mb-2">Enter Title</label>
        <input 
          type="text"
          value={input}
          onChange={handleInput}
          className="w-full p-4 border border-brand-border rounded-xl mb-6 outline-none focus:ring-2 focus:ring-brand-primary"
          placeholder="e.g., How to build a Next.js 15 app"
        />

        <label className="block text-sm font-bold mb-2">Resulting Slug</label>
        <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl border border-brand-border font-mono">
          <span className="flex-grow text-brand-primary">{slug || "your-slug-here"}</span>
          <button onClick={copyToClipboard} className="p-2 hover:bg-white rounded-lg transition-colors">
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}