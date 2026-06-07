"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronDown, Layers } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import "./globals.css";

// Simplified core categories for clean text-only navigation layouts
const TOOLS_CATEGORIES = [
  { title: "Utility Tools", id: "Utility" },
  { title: "Development Suite", id: "Development" },
  { title: "SEO Optimization", id: "SEO" }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools", hasDropdown: true },
    { name: "Extensions", href: "/chrome-extensions" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-brand-bg text-brand-main antialiased flex flex-col min-h-screen transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light">
          
          {/* --- NAVBAR OVERLAY ENGINE --- */}
          <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b h-16 ${
              isScrolled 
                ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80 shadow-sm" 
                : "bg-transparent border-transparent"
            }`}
          >
            <div className="max-w-7xl mx-auto h-full px-6 md:px-8 flex items-center justify-between">
              
              {/* Branding Block */}
              <Link href="/" className="flex items-center gap-2.5 text-lg font-black tracking-tighter group">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-md shadow-brand-primary/20 group-hover:rotate-6 transition-transform">
                  <Zap className="w-4 h-4 fill-current text-white" />
                </div>
                <span className="text-brand-main transition-colors">
                  TOOL<span className="text-brand-primary">MARS</span>
                </span>
              </Link>

              {/* Desktop Navigation Link Nodes Workspace */}
              <div 
                className="hidden md:flex items-center gap-1 relative h-full"
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setIsToolsDropdownOpen(false);
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = link.href === "/" 
                    ? pathname === "/" 
                    : pathname.startsWith(link.href);
                  
                  return (
                    <div
                      key={link.href}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        if (link.hasDropdown) setIsToolsDropdownOpen(true);
                        else setIsToolsDropdownOpen(false);
                      }}
                    >
                      <Link 
                        href={link.href}
                        className={`relative px-4 py-1.5 text-sm font-semibold transition-colors duration-200 rounded-full z-10 flex items-center gap-1 ${
                          isActive ? "text-brand-primary" : "text-brand-muted hover:text-brand-main"
                        }`}
                      >
                        <AnimatePresence>
                          {hoveredIndex === index && !isActive && (
                            <motion.span
                              layoutId="navHoverBackground"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute inset-0 rounded-full -z-10 bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/30 dark:border-slate-700/20"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                        </AnimatePresence>
                        
                        <span>{link.name}</span>
                        {link.hasDropdown && (
                          <ChevronDown size={13} className={`transition-transform duration-300 ${isToolsDropdownOpen ? "rotate-180" : ""}`} />
                        )}
                      </Link>

                      {/* Cleaned Simple Text Categories Dropdown */}
                      {link.hasDropdown && (
                        <AnimatePresence>
                          {isToolsDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 15, scale: 0.98 }}
                              transition={{ duration: 0.15, ease: "easeOut" }}
                              className="absolute top-14 left-1/2 -translate-x-1/2 w-56 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-0.5 backdrop-blur-xl"
                            >
                              {TOOLS_CATEGORIES.map((cat, catIdx) => (
                                <Link
                                  key={catIdx}
                                  href={`/tools?category=${cat.id}`}
                                  onClick={() => setIsToolsDropdownOpen(false)}
                                  className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-brand-muted hover:text-brand-primary rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all text-left"
                                >
                                  <Layers size={13} className="text-brand-muted/40 shrink-0" />
                                  <span>{cat.title}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
                
                {/* Right Action Switch Bundle */}
                <div className="ml-3 border-l border-brand-border pl-4 flex items-center gap-3">
                  <ThemeToggle />
                  <Link href="/tools">
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-brand-primary hover:bg-brand-hover active:scale-95 transition-all shadow-sm">
                      Get Started
                    </button>
                  </Link>
                </div>
              </div>

              {/* Mobile Navigation Menu Trigger */}
              <button
                className="md:hidden p-1.5 text-brand-muted hover:text-brand-main transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-16 left-0 w-full md:hidden bg-brand-card border-b border-brand-border p-4 flex flex-col gap-1 shadow-lg max-h-[85vh] overflow-y-auto"
                >
                  {navLinks.map((link) => {
                    const isActive = link.href === "/" 
                      ? pathname === "/" 
                      : pathname.startsWith(link.href);
                      
                    return (
                      <div key={link.href} className="w-full">
                        <Link 
                          href={link.href} 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block w-full py-2.5 px-4 text-sm font-semibold rounded-xl transition-all ${
                            isActive ? "text-brand-primary bg-brand-primary/10" : "text-brand-muted hover:text-brand-main hover:bg-brand-bg"
                          }`}
                        >
                          {link.name}
                        </Link>

                        {/* Flat listed categories inside mobile navigation link tree */}
                        {link.hasDropdown && (
                          <div className="pl-6 pr-2 py-1 grid grid-cols-1 gap-1 border-l border-brand-border/40 ml-4 my-1">
                            {TOOLS_CATEGORIES.map((cat, catIdx) => (
                              <Link
                                key={catIdx}
                                href={`/tools?category=${cat.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 px-3 text-xs font-bold text-brand-muted rounded-lg hover:bg-brand-bg"
                              >
                                {cat.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="pt-3 border-t border-brand-border mt-2 flex flex-col gap-3">
                    <div className="flex justify-between items-center px-4">
                      <span className="text-xs font-bold text-brand-muted uppercase">Appearance</span>
                      <ThemeToggle />
                    </div>
                    <Link href="/tools" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-brand-primary hover:bg-brand-hover transition-colors shadow-sm">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          <main className="flex-grow pt-16">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><Zap size={14} className="fill-current text-white"/></div> Toolmars
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-slate-400">
            The professional-grade toolkit for modern developers. 
            Built for the next decade of web engineering.
          </p>
        </div>

        {[
          { title: "Platform", links: ['All Tools', 'Dashboard', 'Integrations', 'Pricing', 'API Docs'] },
          { title: "Company", links: ['About Us', 'Careers', 'Blog', 'Security', 'Contact'] },
          { title: "Legal", links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'] }
        ].map((col, idx) => (
          <div key={idx} className="text-left">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">{col.title}</h4>
            <ul className="space-y-4 text-sm">
              {col.links.map(l => (
                <li key={l}><a href="#" className="hover:text-indigo-500 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
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