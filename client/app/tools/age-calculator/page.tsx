"use client";

import { useState, useMemo } from "react";
import { 
  Calendar, Hourglass, Sparkles, Search, 
  Clock, Cake, Award, Timer 
} from "lucide-react";
import Head from "next/head";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("1998-01-01");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

  // Programmatic SEO JSON-LD Configuration
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Exact Age Calculator",
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-02-15",
      "dateModified": "2026-06-06",
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Exact age calculation",
        "Next birthday countdown",
        "Total days alive metric",
        "Client-side privacy",
        "Instant date processing"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the exact age calculator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It calculates the exact time difference between your birth date and today. It instantly breaks down your age into years, months, days, and even total hours."
          }
        },
        {
          "@type": "Question",
          "name": "Does this tool save my birth date?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All calculations happen directly inside your web browser. Your birth date is never saved, tracked, or sent to any server."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate my age on a specific date in the past or future?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. By changing the 'Age at Target Date' field, you can see exactly how old you were on a historical date or how old you will be in the future."
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
        { "@type": "ListItem", "position": 3, "name": "Calculators", "item": "https://toolmars.com/tools/calculators" },
        { "@type": "ListItem", "position": 4, "name": "Age Calculator", "item": "https://toolmars.com/tools/age-calculator" }
      ]
    }
  ];

  // Pure Algorithmic Chronological Tracking Engine
  const ageMetrics = useMemo(() => {
    if (!birthDate || !targetDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) return null;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Borrow days from the previous month
      const previousMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Totalized Linear Math Vectors
    const totalTimeDiff = target.getTime() - birth.getTime();
    const totalDays = Math.floor(totalTimeDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (target.getFullYear() - birth.getFullYear()) * 12 + target.getMonth() - birth.getMonth();
    const totalHours = totalDays * 24;

    // Next Birthday Milestone Calculation
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      daysToNextBirthday
    };
  }, [birthDate, targetDate]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Exact Age Calculator - Calculate Years, Months & Days | Toolmars</title>
        <meta name="description" content="Calculate your exact age in years, months, days, and hours instantly. A free, private age calculator that also tracks the countdown to your next birthday." />
        <link rel="canonical" href="https://toolmars.com/tools/age-calculator" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Exact Age Calculator - Calculate Years, Months & Days | Toolmars" />
        <meta property="og:description" content="Calculate your exact age in years, months, days, and hours instantly. A free, private age calculator that also tracks the countdown to your next birthday." />
        <meta property="og:url" content="https://toolmars.com/tools/age-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/age-calculator.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exact Age Calculator - Calculate Years, Months & Days | Toolmars" />
        <meta name="twitter:description" content="Calculate your exact age in years, months, days, and hours instantly. A free, private age calculator that also tracks the countdown to your next birthday." />
        <meta name="twitter:image" content="https://toolmars.com/og/age-calculator.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <Hourglass size={14} /> Free Age Counter
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Exact Age Calculator.
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Calculate your exact age in years, months, and days. Find out how many total hours you have been alive and track the countdown to your next birthday.
            </p>
          </div>
        </header>

        {/* --- WORKSPACE CORE INTERFACE --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Date Input Fields */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 space-y-5 shadow-sm">
              <span className="text-xs font-black uppercase text-brand-muted tracking-wider block mb-2">Select Dates</span>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Calendar size={12}/> Date of Birth</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-mono font-bold outline-none focus:border-brand-primary" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Timer size={12}/> Age at Target Date</label>
                <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-mono font-bold outline-none focus:border-brand-primary" />
              </div>
            </div>
          </div>

          {/* Right Block: Granular Metric Breakdowns */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {ageMetrics ? (
              <>
                {/* Core Big Counter Card */}
                <div className="bg-brand-card border border-brand-border rounded-[2rem] p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-muted tracking-wider">Your Exact Age</span>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight mt-1">
                      {ageMetrics.years} <span className="text-brand-primary text-2xl font-bold">Years</span> {ageMetrics.months} <span className="text-brand-primary text-2xl font-bold">Months</span> {ageMetrics.days} <span className="text-brand-primary text-2xl font-bold">Days</span>
                    </h2>
                  </div>
                  <div className="px-5 py-4 bg-brand-bg border border-brand-border rounded-2xl font-semibold text-xs text-brand-muted shrink-0">
                    <div className="flex items-center gap-1.5 font-bold text-brand-main uppercase text-[10px] tracking-wide mb-1"><Cake size={14} className="text-amber-500" /> Next Birthday</div>
                    <span className="font-mono text-sm font-black text-brand-primary">{ageMetrics.daysToNextBirthday} Days Remaining</span>
                  </div>
                </div>

                {/* Sub-Grid Linear Total Units Mapping Block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Months", val: ageMetrics.totalMonths, unit: "mos" },
                    { label: "Total Weeks", val: ageMetrics.totalWeeks, unit: "wks" },
                    { label: "Total Days", val: ageMetrics.totalDays, unit: "days" },
                    { label: "Total Hours", val: ageMetrics.totalHours, unit: "hrs" }
                  ].map((block, idx) => (
                    <div key={idx} className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm">
                      <span className="text-[10px] font-black uppercase text-brand-muted tracking-wider block">{block.label}</span>
                      <span className="text-2xl font-black text-brand-main font-mono mt-2 block break-all">{block.val.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-brand-card border border-brand-border rounded-[2rem] p-12 text-center text-brand-muted font-medium text-sm">
                <Clock size={36} className="mx-auto mb-3 stroke-1 text-brand-muted/40 animate-pulse" />
                Please enter a valid birth date to see your exact age.
              </div>
            )}
          </div>
        </div>

        {/* Content Block Optimized for AI Search & Featured Snippets */}
        <div className="mt-16 space-y-12 border-t border-brand-border pt-12 max-w-3xl">
          
          <section>
            <h2 className="text-xl font-black text-brand-main mb-4 tracking-tight">What is the Exact Age Calculator?</h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              It is a free online tool that figures out exactly how old you are right now. Instead of just giving you your age in years, it calculates your age down to the exact month and day. It also tracks how many days are left until your next birthday.
            </p>
            <p className="text-brand-muted leading-relaxed italic border-l-2 border-brand-primary pl-4">
              A chronological age calculator is an application that subtracts your date of birth from the current date to provide an exact measurement of time lived.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">How to Calculate Your Exact Age</h3>
            <ol className="space-y-2 text-brand-muted list-decimal list-inside">
              <li><strong>Select</strong> your Date of Birth using the calendar input.</li>
              <li><strong>Verify</strong> that the Target Date is set to today (it does this automatically).</li>
              <li><strong>Read</strong> your exact age instantly displayed on the screen.</li>
              <li><strong>Check</strong> your total days and hours alive in the detailed breakdown boxes.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Key Features</h3>
            <ul className="space-y-2 text-brand-muted list-disc list-inside">
              <li>Your birth date is never saved or uploaded to any server.</li>
              <li>Results appear instantly without refreshing the page.</li>
              <li>Calculates total months, weeks, days, and hours you have been alive.</li>
              <li>Includes a handy countdown timer to your next birthday.</li>
              <li>Easily check how old you were on a specific date in the past.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-brand-main text-sm">How does the exact age calculator work?</h4>
                <p className="text-sm text-brand-muted mt-1">It calculates the exact time difference between your birth date and today. It instantly breaks down your age into years, months, days, and even total hours.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Does this tool save my birth date?</h4>
                <p className="text-sm text-brand-muted mt-1">No. All calculations happen directly inside your web browser. Your birth date is never saved, tracked, or sent to any server, guaranteeing your privacy.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Can I calculate my age on a specific date in the past or future?</h4>
                <p className="text-sm text-brand-muted mt-1">Yes. By changing the Age at Target Date field, you can see exactly how old you were on a historical date, or find out how old you will be at a future event.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}