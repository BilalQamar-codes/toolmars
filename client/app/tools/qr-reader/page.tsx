"use client";

import { useEffect, useState } from "react";
import { Scan, Copy, CheckCircle2, Camera, Upload, RefreshCw } from "lucide-react";
import Head from "next/head";

export default function QrReader() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Programmatic SEO JSON-LD Configuration
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "QR Code Reader",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-05-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Webcam QR scanning",
        "Image file decoding",
        "Instant URL detection",
        "Client-side privacy"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a QR Code Reader?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A QR code reader is a tool that scans square matrix barcodes to reveal hidden text, website links, or contact information. This tool allows you to scan them directly from your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Is my scanned data private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This tool processes your camera feed and image files entirely within your web browser. We never save, track, or upload your scanned information to our servers."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from a mobile app?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike dedicated apps that you have to download and sign up for, this tool works instantly in any web browser on your phone or computer. No installation is required."
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
        { "@type": "ListItem", "position": 3, "name": "Utilities", "item": "https://toolmars.com/tools/utilities" },
        { "@type": "ListItem", "position": 4, "name": "QR Code Reader", "item": "https://toolmars.com/tools/qr-reader" }
      ]
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const startScanner = async () => {
      const { Html5QrcodeScanner } = await import("html5-qrcode");
      const scanner = new Html5QrcodeScanner("reader", { 
        fps: 15, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true
      }, false);

      scanner.render((text) => { setScanResult(text); }, () => {});
      return () => { scanner.clear(); };
    };

    startScanner();
  }, [isMounted]);

  const copyResult = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-brand-bg p-6 lg:p-12 text-brand-main transition-colors duration-300">
      <Head>
        <title>QR Code Reader Online - Scan With Camera & Files | ToolMars</title>
        <meta name="description" content="Free online QR code reader. Scan codes using your webcam or upload images to decode them instantly. Private, fast, and no app installation required." />
        <link rel="canonical" href="https://toolmars.com/tools/qr-reader" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="QR Code Reader Online - Scan With Camera & Files | ToolMars" />
        <meta property="og:description" content="Free online QR code reader. Scan codes using your webcam or upload images to decode them instantly. Private, fast, and no app installation required." />
        <meta property="og:url" content="https://toolmars.com/tools/qr-reader" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/qr-reader.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QR Code Reader Online - Scan With Camera & Files | ToolMars" />
        <meta name="twitter:description" content="Free online QR code reader. Scan codes using your webcam or upload images to decode them instantly. Private, fast, and no app installation required." />
        <meta name="twitter:image" content="https://toolmars.com/og/qr-reader.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="mx-auto max-w-4xl">
        <header className="mb-12 text-center lg:text-left mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-brand-primary/10">
            <Scan size={14} /> Free Scanner
          </div>
          <h1 className="text-4xl font-black mb-2 text-brand-main">QR Code Reader.</h1>
          <p className="text-brand-muted font-medium">Scan codes using your camera or upload an image file.</p>
        </header>

        <div className="grid gap-8">
          <div className="bg-brand-card rounded-[32px] border border-brand-border p-6 shadow-sm">
            <div id="reader" className="overflow-hidden rounded-2xl border-none"></div>
            <div className="mt-8 flex justify-center gap-6 text-[10px] font-black text-brand-muted uppercase tracking-widest">
               <span className="flex items-center gap-2"><Camera size={14} /> Live Camera Scan</span>
               <span className="flex items-center gap-2"><Upload size={14} /> File Upload</span>
            </div>
          </div>

          {scanResult && (
            <div className="bg-brand-primary p-8 rounded-[32px] text-white shadow-xl shadow-brand-primary/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 size={16} /> Scan Result
                </span>
                <button onClick={copyResult} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/5">
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy Result"}
                </button>
              </div>
              
              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 mb-6">
                <p className="font-mono text-sm break-all">{scanResult}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {scanResult.startsWith("http") && (
                  <a href={scanResult} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white text-brand-primary py-4 rounded-2xl font-black hover:bg-slate-100 transition-all text-sm">
                    Visit Link
                  </a>
                )}
                <button onClick={() => window.location.reload()} className="flex-1 text-center bg-black/20 py-4 rounded-2xl font-black hover:bg-black/30 transition-all border border-white/5 text-sm">
                  Scan Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SEO Section */}
        <section className="mt-20 border-t border-brand-border pt-16 max-w-3xl">
          <h2 className="text-2xl font-black text-brand-main mb-6">What is this QR Scanner?</h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-8">
            This is a free, web-based QR code reader that lets you scan codes without needing to install an app. Whether you have a QR code on your computer screen, in a printed document, or saved as an image file on your device, this scanner decodes the information instantly.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card">
              <h3 className="font-bold text-brand-main mb-2">How it Works</h3>
              <p className="text-xs text-brand-muted leading-relaxed">Simply grant camera access to scan in real-time, or upload an existing image file. The tool uses your device's browser to process the scan, making it fast and accurate.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card">
              <h3 className="font-bold text-brand-main mb-2">100% Privacy</h3>
              <p className="text-xs text-brand-muted leading-relaxed">Your privacy is our priority. We never record your video feed, and we never save the images or codes you upload. All processing happens locally on your machine.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
             <div>
               <h4 className="font-bold text-brand-main text-sm">Do I need to download an app?</h4>
               <p className="text-sm text-brand-muted mt-1">No. This QR scanner runs entirely inside your browser. It works on Chrome, Firefox, Safari, and Edge without any installations.</p>
             </div>
             <div>
               <h4 className="font-bold text-brand-main text-sm">Is it safe to scan any QR code?</h4>
               <p className="text-sm text-brand-muted mt-1">While the scanner is safe, always be careful about what links you click. Only visit websites or download files from sources you trust.</p>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}