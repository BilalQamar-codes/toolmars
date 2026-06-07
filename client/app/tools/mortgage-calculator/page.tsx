"use client";

import { useState, useMemo } from "react";
import { 
  Building, HelpCircle, Sparkles, Search, 
  Percent, Calendar, Download, Table, PieChart, ShieldCheck 
} from "lucide-react";
import Head from "next/head";

interface AmortizationRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export default function MortgageCalculator() {
  const [homeValue, setHomeValue] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30); // in years
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2); // annual %
  const [searchQuery, setSearchQuery] = useState("");

  // SEO Schemas
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mortgage Amortization Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-06-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Local browser processing",
        "Instant monthly calculation",
        "CSV schedule download",
        "Property tax estimation",
        "Mobile responsive design"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a mortgage amortization calculator and what does it do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is a simple tool to estimate your monthly home loan payments. It builds a schedule showing your principal and interest payments over time. You can also factor in your estimated property taxes."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to use with sensitive data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, your financial numbers are completely safe. This tool processes the math right on your own device. We never upload or save your loan details."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, you do not need an account to use this. You can start calculating home costs immediately. There are no hidden fees or sign-up walls."
          }
        },
        {
          "@type": "Question",
          "name": "Does it work on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, it works great on any mobile phone. You can quickly run the numbers while looking at houses. The schedule download also works smoothly on mobile."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from Zillow or Bankrate calculators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike big real estate websites, this tool never tracks your searches or sells your data to mortgage brokers. Everything stays directly on your device, giving you total privacy while shopping for homes."
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
        { "@type": "ListItem", "position": 3, "name": "Finance", "item": "https://toolmars.com/tools/finance" },
        { "@type": "ListItem", "position": 4, "name": "Mortgage Calculator", "item": "https://toolmars.com/tools/mortgage-calculator" }
      ]
    }
  ];

  const loanAmount = useMemo(() => {
    return Math.max(0, homeValue - downPayment);
  }, [homeValue, downPayment]);

  const metrics = useMemo(() => {
    const P = loanAmount;
    const r = (interestRate / 100) / 12;
    const n = loanTerm * 12;

    let monthlyPI = 0;
    if (P > 0) {
      if (r === 0) {
        monthlyPI = P / n;
      } else {
        monthlyPI = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
    }

    const monthlyTax = (homeValue * (propertyTaxRate / 100)) / 12;
    const totalMonthly = monthlyPI + monthlyTax;

    const schedule: AmortizationRow[] = [];
    let balance = P;
    
    for (let i = 1; i <= n; i++) {
      const interestPaid = balance * r;
      const principalPaid = Math.min(balance, monthlyPI - interestPaid);
      balance = Math.max(0, balance - principalPaid);

      schedule.push({
        month: i,
        payment: monthlyPI,
        principalPaid,
        interestPaid,
        remainingBalance: balance
      });
    }

    return {
      monthlyPI,
      monthlyTax,
      totalMonthly,
      schedule
    };
  }, [loanAmount, interestRate, loanTerm, homeValue, propertyTaxRate]);

  const chartSlices = useMemo(() => {
    const total = metrics.totalMonthly || 1;
    const piPercent = (metrics.monthlyPI / total) * 100;
    const taxPercent = (metrics.monthlyTax / total) * 100;

    const piDash = `${piPercent} ${100 - piPercent}`;
    const taxDash = `${taxPercent} ${100 - taxPercent}`;

    return { piPercent, taxPercent, piDash, taxDash };
  }, [metrics]);

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Month,Payment,Principal Paid,Interest Paid,Remaining Balance\n";
    metrics.schedule.forEach(r => {
      csvContent += `${r.month},${r.payment.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.remainingBalance.toFixed(2)}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mortgage-schedule-${loanTerm}yrs.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Mortgage Amortization Calculator - Free & Online | ToolMars</title>
        <meta name="description" content="Calculate your monthly home loan payments instantly. View your principal, interest, and taxes, then download your full schedule — free and no account needed." />
        <link rel="canonical" href="https://toolmars.com/tools/mortgage-calculator" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Mortgage Amortization Calculator - Free & Online | ToolMars" />
        <meta property="og:description" content="Find out exactly what your monthly home payment will be. Free, private, and instant." />
        <meta property="og:url" content="https://toolmars.com/tools/mortgage-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/mortgage-calculator.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mortgage Amortization Calculator - Free & Online | ToolMars" />
        <meta name="twitter:description" content="Find out exactly what your monthly home payment will be. Free, private, and instant." />
        <meta name="twitter:image" content="https://toolmars.com/og/mortgage-calculator.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <Building size={14} /> Free Financial Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Free Mortgage <span className="text-brand-primary">Amortization Calculator.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Calculate your exact monthly payments and see how much goes to interest versus principal. Your data stays completely private on your device.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <label className="block text-[10px] font-black uppercase text-brand-muted mb-2 tracking-widest">
              Search Payment Schedule
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted/40 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text"
                placeholder="Find a specific month..."
                className="w-full bg-brand-card border border-brand-border text-brand-main rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 transition-all shadow-sm placeholder:text-brand-muted/30 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 space-y-5 shadow-sm">
              <span className="text-xs font-black uppercase text-brand-muted tracking-wider block mb-2">Loan Details</span>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-brand-muted uppercase">
                  <span>Home Value</span>
                  <span className="text-brand-main font-mono">${homeValue.toLocaleString()}</span>
                </div>
                <input type="range" min="50000" max="2000000" step="5000" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="w-full h-1.5 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-primary" aria-label="Home Value Slider" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-brand-muted uppercase">
                  <span>Down Payment</span>
                  <span className="text-brand-main font-mono">${downPayment.toLocaleString()}</span>
                </div>
                <input type="range" min="0" max={homeValue} step="1000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-1.5 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-primary" aria-label="Down Payment Slider" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Percent size={12}/> Interest Rate (%)</label>
                  <input type="number" step="0.01" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Calendar size={12}/> Term Length</label>
                  <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-brand-primary appearance-none">
                    <option value={30}>30 Years Fixed</option>
                    <option value={20}>20 Years Fixed</option>
                    <option value={15}>15 Years Fixed</option>
                    <option value={10}>10 Years Fixed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase">Annual Property Tax Rate (%)</label>
                <input type="number" step="0.1" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(Number(e.target.value))} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-brand-primary" />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Chart & Output */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="grid sm:grid-cols-2 gap-6 bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm items-center">
              
              {/* Left KPI Text */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-brand-muted tracking-wider">Total Monthly Payment</span>
                  <h2 className="text-4xl font-black text-brand-primary mt-1 font-mono">${metrics.totalMonthly.toLocaleString(undefined, {maximumFractionDigits:2})}</h2>
                </div>
                <div className="space-y-2 text-xs font-semibold text-brand-muted border-t border-brand-border pt-4">
                  <div className="flex justify-between"><span>Principal & Interest:</span><span className="text-brand-main font-mono">${metrics.monthlyPI.toLocaleString(undefined, {maximumFractionDigits:2})}</span></div>
                  <div className="flex justify-between"><span>Property Taxes:</span><span className="text-brand-main font-mono">${metrics.monthlyTax.toLocaleString(undefined, {maximumFractionDigits:2})}</span></div>
                  <div className="flex justify-between border-t border-brand-border/40 pt-2 text-brand-main font-bold"><span>Loan Amount:</span><span className="font-mono">${loanAmount.toLocaleString()}</span></div>
                </div>
              </div>

              {/* Right Chart */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg width="140" height="140" viewBox="0 0 32 32" className="rotate-[-90deg]">
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#1e293b" strokeWidth="32" />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#6366f1" strokeWidth="32" strokeDasharray={chartSlices.piDash} />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#38bdf8" strokeWidth="32" strokeDasharray={chartSlices.taxDash} strokeDashoffset={100 - chartSlices.piPercent} />
                </svg>
                <div className="flex gap-4 text-[10px] font-black uppercase">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-brand-primary block"/>P&I</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-sky-400 block"/>Tax</div>
                </div>
              </div>
            </div>

            {/* Table Area */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-1.5"><Table size={14} className="text-brand-primary" /> Payment Schedule</span>
                <button onClick={downloadCSV} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-bg border border-brand-border text-[10px] font-black uppercase text-brand-muted hover:text-brand-primary transition-colors"><Download size={12}/> Download CSV</button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-brand-border max-h-60 bg-brand-bg/20">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-brand-bg/80 border-b border-brand-border text-brand-muted select-none">
                      <th className="p-3 font-bold">Month</th>
                      <th className="p-3 font-bold">Principal Paid</th>
                      <th className="p-3 font-bold">Interest Paid</th>
                      <th className="p-3 font-bold">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40 font-medium text-brand-muted">
                    {metrics.schedule
                      .filter(r => !searchQuery || r.month.toString() === searchQuery)
                      .slice(0, 360)
                      .map((row) => (
                        <tr key={row.month} className="hover:bg-brand-card/50 text-brand-main">
                          <td className="p-3 text-brand-muted">M {row.month}</td>
                          <td className="p-3">${row.principalPaid.toFixed(2)}</td>
                          <td className="p-3">${row.interestPaid.toFixed(2)}</td>
                          <td className="p-3 text-brand-primary font-bold">${row.remainingBalance.toFixed(2)}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* --- SUPPLEMENTARY SEO CONTENT BLOCK --- */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-brand-primary" /> What is a Mortgage Amortization Calculator?
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-4">
            What is a mortgage amortization calculator? It is a free online tool that breaks down your monthly home loan payments. It shows you exactly how much money goes toward your principal balance, interest, and property taxes over the life of your loan.
          </p>
          <p className="text-brand-muted leading-relaxed italic border-l-2 border-brand-primary pl-4 text-sm mb-12">
            A mortgage amortization calculator is an app that estimates your monthly home payments and creates a schedule showing your balance shrinking over time.
          </p>

          <h3 className="text-lg font-bold text-brand-main mb-4">How to Use the Mortgage Calculator</h3>
          <ol className="space-y-2 text-brand-muted text-sm list-decimal list-inside mb-12">
            <li><strong>Type</strong> your home value and expected down payment into the boxes.</li>
            <li><strong>Enter</strong> your interest rate and select your loan term length.</li>
            <li><strong>Review</strong> your estimated monthly payment and the visual breakdown chart.</li>
            <li><strong>Click</strong> the download button to save your complete payment schedule.</li>
          </ol>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-brand-main mb-4">Key Features</h3>
              <ul className="space-y-2 text-brand-muted text-sm list-disc list-inside">
                <li>Your financial data never leaves your web browser.</li>
                <li>Results appear instantly without any sign-up forms.</li>
                <li>Use it endlessly without hitting any annoying paywalls.</li>
                <li>Download your complete payment schedule as a CSV file.</li>
                <li>Works perfectly on your mobile phone or tablet.</li>
              </ul>
            </div>
            
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-bg space-y-3 h-fit text-sm">
              <h3 className="font-black text-brand-main flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-brand-primary" /> Why Use ToolMars for This?
              </h3>
              <p className="text-brand-muted leading-relaxed">
                ToolMars provides completely free tools forever without ads or accounts. This mortgage calculator runs entirely on your device for total financial privacy. Homebuyers trust it to quickly estimate costs without handing over personal data to brokers.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-brand-main text-sm">What is a mortgage amortization calculator and what does it do?</h4>
              <p className="text-sm text-brand-muted mt-1">It is a simple tool to estimate your monthly home loan payments. It builds a schedule showing your principal and interest payments over time. You can also factor in your estimated property taxes.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Is it safe to use with sensitive data?</h4>
              <p className="text-sm text-brand-muted mt-1">Yes, your financial numbers are completely safe. This tool processes the math right on your own device. We never upload or save your loan details.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Do I need an account?</h4>
              <p className="text-sm text-brand-muted mt-1">No, you do not need an account to use this. You can start calculating home costs immediately. There are no hidden fees or sign-up walls.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Does it work on mobile?</h4>
              <p className="text-sm text-brand-muted mt-1">Yes, it works great on any mobile phone. You can quickly run the numbers while looking at houses. The schedule download also works smoothly on mobile.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">How is this different from Zillow or Bankrate calculators?</h4>
              <p className="text-sm text-brand-muted mt-1">Unlike big real estate websites, this tool never tracks your searches or sells your data to mortgage brokers. Everything stays directly on your device, giving you total privacy while shopping for homes.</p>
            </div>
          </div>

          {/* Internal Links Block */}
          <section className="pt-6 mt-12 border-t border-brand-border">
             <h3 className="text-sm font-bold text-brand-main mb-3 uppercase tracking-wider">Related Financial Tools</h3>
             <div className="flex flex-wrap gap-4">
                <a href="/tools/investment-calculator" className="text-sm text-brand-primary hover:underline">Investment & ROI Calculator</a>
                <a href="/tools/salary-calculator" className="text-sm text-brand-primary hover:underline">Take-Home Salary Calculator</a>
                <a href="/tools/compound-interest" className="text-sm text-brand-primary hover:underline">Compound Interest Calculator</a>
             </div>
          </section>

        </section>

      </main>
    </div>
  );
}