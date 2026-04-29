"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getLinkStyle = (path: string) => 
    `text-sm font-bold transition-all duration-200 ${
      pathname === path 
        ? "text-brand-primary" 
        : "text-brand-muted hover:text-brand-primary"
    }`;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Extensions", href: "/chrome-extensions" }, // New Link
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      {/* Added flex and min-h-screen to ensure footer sticks to the bottom */}
      <body className="bg-brand-bg text-brand-main antialiased selection:bg-brand-primary/10 flex flex-col min-h-screen">
        
        <nav className="fixed top-0 w-full z-50 border-b border-brand-border bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter group">
              <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                <Zap className="w-5 h-5 fill-current text-white" />
              </div>
              <span>TOOL<span className="text-brand-primary">MARS</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={getLinkStyle(link.href)}>
                  {link.name}
                </Link>
              ))}
              <Link href="/">
                <button className="bg-brand-main text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-primary transition-all shadow-md active:scale-95">
                  Get Started
                </button>
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-brand-muted hover:text-brand-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-b border-brand-border px-6 py-8 flex flex-col gap-6 overflow-hidden shadow-2xl"
              >
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-black tracking-tight ${
                      pathname === link.href ? "text-brand-primary" : "text-brand-main"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* flex-grow ensures this area takes up all remaining space, pushing the footer down */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Professional Footer */}
        <Footer />

      </body>
    </html>
  );
}

// Define the Footer component here, or import it from a separate file
function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Branding & Mission */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg" /> Toolmars
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            The professional-grade toolkit for modern developers. 
            Built for the next decade of web engineering.
          </p>
        </div>

        {/* Links Columns */}
        <div>
          <h4 className="font-bold text-white mb-6">Platform</h4>
          <ul className="space-y-4 text-sm">
            {['All Tools', 'Dashboard', 'Integrations', 'Pricing', 'API Docs'].map(l => (
              <li key={l}><a href="#" className="hover:text-brand-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Company</h4>
          <ul className="space-y-4 text-sm">
            {['About Us', 'Careers', 'Blog', 'Security', 'Contact'].map(l => (
              <li key={l}><a href="#" className="hover:text-brand-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Legal</h4>
          <ul className="space-y-4 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'].map(l => (
              <li key={l}><a href="#" className="hover:text-brand-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <p>© 2026 Toolmars Labs. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Status</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}