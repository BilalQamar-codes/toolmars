"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Download, Link as LinkIcon, Palette, Sparkles, ShieldCheck, HelpCircle } from "lucide-react";
import Head from "next/head";

export default function QrGenerator() {
  const [value, setValue] = useState("https://toolmars.com");
  const [fgColor, setFgColor] = useState("#4F46E5");
  const qrContainerRef = useRef<HTMLDivElement>(null);

  // SEO Schemas
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Custom QR Code Generator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-05-15",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Custom color selection",
        "High-resolution download",
        "Browser-based privacy",
        "No signup required",
        "Unlimited generation"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a QR code generator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a tool that turns your links or text into a scannable QR code image. You can scan it with any smartphone camera to instantly open the link."
          }
        },
        {
          "@type": "Question",
          "name": "Are the QR codes free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our generator is completely free. You can create, design, and download as many QR codes as you need without any restrictions or paywalls."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data private?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. This tool processes your QR codes directly inside your web browser. Your links and data are never uploaded to our servers, keeping your information private."
          }
        },
        {
          "@type": "Question",
          "name": "Does it work on mobile phones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our tool is mobile-friendly. You can generate and download your custom QR code on your phone just as easily as you can on a desktop computer."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from other QR generators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike many other generators that require you to create an account or show ads, our tool is private, fast, and completely free. You get the image file directly without any extra steps."
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
        { "@type": "ListItem", "position": 3, "name": "Design", "item": "https://toolmars.com/tools/design" },
        { "@type": "ListItem", "position": 4, "name": "QR Generator", "item": "https://toolmars.com/tools/qr-generator" }
      ]
    }
  ];

  const downloadSvg = () => {
    const svg = qrContainerRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.drawImage(img, 0, 0, 1000, 1000);
      }
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "toolmars_qr_code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-brand-bg p-6 lg:p-12 text-brand-main selection:bg-brand-primary/10 transition-colors duration-300">
      <Head>
        <title>Free Aesthetic QR Code Generator | Custom Design | ToolMars</title>
        <meta name="description" content="Create beautiful, custom branded QR codes for free. Download as high-resolution PNG instantly with secure browser processing." />
        <link rel="canonical" href="https://toolmars.com/tools/qr-generator" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Free Aesthetic QR Code Generator | Custom Design | ToolMars" />
        <meta property="og:description" content="Create beautiful, custom branded QR codes for free. Download as high-resolution PNG instantly with secure browser processing." />
        <meta property="og:url" content="https://toolmars.com/tools/qr-generator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/qr-generator.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Aesthetic QR Code Generator | Custom Design | ToolMars" />
        <meta name="twitter:description" content="Create beautiful, custom branded QR codes for free. Download as high-resolution PNG instantly with secure browser processing." />
        <meta name="twitter:image" content="https://toolmars.com/og/qr-generator.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center lg:text-left mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold mb-4 uppercase tracking-widest border border-brand-primary/10">
            <Sparkles size={14} /> Design Tool
          </div>
          <h1 className="text-4xl font-black mb-2 text-brand-main">Custom QR Generator.</h1>
          <p className="text-brand-muted font-medium">Create branded, high-resolution QR codes in seconds.</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6 bg-brand-card p-8 rounded-[32px] border border-brand-border shadow-sm">
            <div>
              <label className="text-xs font-bold uppercase text-brand-muted mb-2 block">Your Link or Text</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full rounded-2xl border border-brand-border bg-brand-bg p-4 pl-12 text-sm font-semibold outline-none text-brand-main focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all placeholder:text-brand-muted/40"
                  placeholder="Paste your link here..."
                />
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted/50" size={18} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-bold uppercase text-brand-muted mb-2 block">Choose Color</label>
                <div className="flex items-center gap-3 bg-brand-bg p-3 rounded-2xl border border-brand-border">
                  <input 
                    type="color" 
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-xl border border-brand-border bg-transparent transition-transform active:scale-95"
                  />
                  <span className="font-mono text-xs font-bold uppercase text-brand-main">{fgColor}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={downloadSvg}
              disabled={!value.trim()}
              className="w-full bg-brand-main text-brand-card py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all shadow-md active:scale-[0.98] border border-brand-border disabled:opacity-20 disabled:pointer-events-none"
            >
              <Download size={18} /> Download Image
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-brand-card p-12 rounded-[40px] border border-brand-border border-dashed min-h-[400px]">
             <div ref={qrContainerRef} className="bg-white p-6 rounded-3xl shadow-2xl shadow-brand-primary/5 border border-slate-100">
                <QRCode 
                  value={value || " "}
                  fgColor={fgColor}
                  bgColor="#FFFFFF"
                  size={230}
                  level="H"
                />
             </div>
             <p className="mt-8 text-xs font-bold text-brand-muted flex items-center gap-2 uppercase tracking-wider">
                <Palette size={14} className="text-brand-primary" /> Live Preview
             </p>
          </div>
        </div>

        {/* Content Block */}
        <section className="mt-20 border-t border-brand-border pt-16 transition-colors max-w-4xl">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-brand-primary" /> What is a QR Generator?
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-10">
            A QR generator is a simple tool that turns any web link or text into a scannable image. By scanning the generated code with their smartphone, users can be instantly directed to a specific website, menu, or social media profile without typing a URL.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-3">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5">
                <Palette size={14} className="text-brand-primary" /> Custom Branded Design
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Make your QR code match your brand colors. Select any color you like to ensure the design fits perfectly with your business cards, marketing flyers, or website landing pages.
              </p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-3">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-primary" /> 100% Private & Secure
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Your data is completely private. This tool generates your QR codes entirely inside your web browser. Your links are never uploaded, saved, or tracked on our servers.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-main mb-4">How to Use the QR Generator</h3>
          <ol className="space-y-2 text-brand-muted text-sm list-decimal list-inside mb-12">
            <li><strong>Paste your link:</strong> Enter the URL or text you want to encode.</li>
            <li><strong>Choose a color:</strong> Use the color picker to set the foreground color for your QR code.</li>
            <li><strong>Download:</strong> Click the Download button to save the high-resolution image to your device.</li>
          </ol>

          <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-brand-main text-sm">What is a QR code generator?</h4>
              <p className="text-sm text-brand-muted mt-1">It is a tool that turns your links or text into a scannable QR code image. You can scan it with any smartphone camera to instantly open the link.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Are the QR codes free to use?</h4>
              <p className="text-sm text-brand-muted mt-1">Yes, our generator is completely free. You can create, design, and download as many QR codes as you need without any restrictions or paywalls.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Is my data private?</h4>
              <p className="text-sm text-brand-muted mt-1">Yes. This tool processes your QR codes directly inside your web browser. Your links and data are never uploaded, saved, or tracked on our servers.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Does it work on mobile phones?</h4>
              <p className="text-sm text-brand-muted mt-1">Yes, our tool is mobile-friendly. You can generate and download your custom QR code on your phone just as easily as you can on a desktop computer.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">How is this different from other QR generators?</h4>
              <p className="text-sm text-brand-muted mt-1">Unlike many other generators that require you to create an account or show ads, our tool is private, fast, and completely free. You get the image file directly without any extra steps.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}