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

  // Helper to handle active link styling
  const getLinkStyle = (path: string) => 
    `text-sm font-bold transition-all duration-200 ${
      pathname === path 
        ? "text-brand-primary" 
        : "text-brand-muted hover:text-brand-primary"
    }`;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      {/* Set body to use our global background variable */}
      <body className="bg-brand-bg text-brand-main antialiased selection:bg-brand-primary/10">
        
        <nav className="fixed top-0 w-full z-50 border-b border-brand-border bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-black tracking-tighter group"
            >
              <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                <Zap className="w-5 h-5 fill-current text-white" />
              </div>
              <span>
                TOOL<span className="text-brand-primary">MARS</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-brand-muted hover:text-brand-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
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

                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* This renders the content of each page */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Minimal Global Footer */}
        <footer className="bg-white border-t border-brand-border py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-brand-muted/50 uppercase tracking-widest">
            <div>© 2026 Toolmars Labs</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-brand-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-brand-primary transition-colors">Terms</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}