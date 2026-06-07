"use client";

import { useState, useMemo } from "react";
import { 
  TrendingUp, Copy, Check, Sparkles, Search, 
  Plus, Trash2, DollarSign, PieChart, Info, HelpCircle, ShieldCheck
} from "lucide-react";
import Head from "next/head";

interface BuyOrder {
  id: string;
  shares: number;
  price: number;
}

export default function InvestmentCalculator() {
  const [orders, setOrders] = useState<BuyOrder[]>([
    { id: "1", shares: 10, price: 150 },
    { id: "2", shares: 5, price: 120 }
  ]);
  const [sellPrice, setSellPrice] = useState(180);
  const [makerFee, setMakerFee] = useState(0.1); // percentage %
  const [capitalGainsTax, setCapitalGainsTax] = useState(15); // percentage %

  // Programmatic SEO JSON-LD Tool Configuration
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Stock & Crypto Average Down Calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-05-20",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Average cost basis calculation",
        "Crypto and stock profit tracking",
        "Exchange fee deductions",
        "Capital gains tax estimation",
        "Client-side data privacy"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does it mean to average down?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Averaging down is an investment strategy where you buy more shares of an asset after the price has dropped. This lowers your overall average cost per share, making it easier to reach profitability when the price eventually rebounds."
          }
        },
        {
          "@type": "Question",
          "name": "How is average cost basis calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your average cost basis is calculated by taking the total amount of money you have invested in an asset and dividing it by the total number of shares or coins you own."
          }
        },
        {
          "@type": "Question",
          "name": "Are my financial numbers saved or tracked?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This calculator is fully private. All calculations happen entirely within your local web browser. Your entry prices, holdings, and potential profits are never uploaded or saved to any external servers."
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
        { "@type": "ListItem", "position": 4, "name": "Average Down Calculator", "item": "https://toolmars.com/tools/investment-calculator" }
      ]
    }
  ];

  const addOrder = () => {
    setOrders(prev => [...prev, { id: crypto.randomUUID(), shares: 0, price: 0 }]);
  };

  const updateOrder = (id: string, field: "shares" | "price", value: number) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const removeOrder = (id: string) => {
    if (orders.length === 1) return;
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Pure Algorithmic Investment Averaging Engine
  const calculationResults = useMemo(() => {
    let totalShares = 0;
    let totalCostBasis = 0;

    orders.forEach(o => {
      if (o.shares > 0 && o.price > 0) {
        totalShares += o.shares;
        totalCostBasis += o.shares * o.price;
      }
    });

    const averageBuyPrice = totalShares > 0 ? totalCostBasis / totalShares : 0;
    const rawRevenue = totalShares * sellPrice;
    
    // Fee Calculations (Buy fees + Sell fees combined)
    const totalFees = (totalCostBasis * (makerFee / 100)) + (rawRevenue * (makerFee / 100));
    
    const grossProfit = rawRevenue - totalCostBasis - totalFees;
    
    // Tax impact parsing logic
    const taxDeduction = grossProfit > 0 ? grossProfit * (capitalGainsTax / 100) : 0;
    const netProfit = grossProfit - taxDeduction;
    const returnOnInvestment = totalCostBasis > 0 ? (netProfit / totalCostBasis) * 100 : 0;

    return {
      totalShares,
      totalCostBasis,
      averageBuyPrice,
      totalFees,
      taxDeduction,
      netProfit,
      roi: returnOnInvestment
    };
  }, [orders, sellPrice, makerFee, capitalGainsTax]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>Stock & Crypto Average Down Calculator | Profit Tracker | ToolMars</title>
        <meta name="description" content="Free average down calculator for stocks and crypto. Calculate your true cost basis and net profit after exchange fees and taxes instantly and privately." />
        <link rel="canonical" href="https://toolmars.com/tools/investment-calculator" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Stock & Crypto Average Down Calculator | Profit Tracker | ToolMars" />
        <meta property="og:description" content="Free average down calculator for stocks and crypto. Calculate your true cost basis and net profit after exchange fees and taxes instantly and privately." />
        <meta property="og:url" content="https://toolmars.com/tools/investment-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/investment-calculator.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stock & Crypto Average Down Calculator | Profit Tracker | ToolMars" />
        <meta name="twitter:description" content="Free average down calculator for stocks and crypto. Calculate your true cost basis and net profit after exchange fees and taxes instantly and privately." />
        <meta name="twitter:image" content="https://toolmars.com/og/investment-calculator.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <TrendingUp size={14} /> Free Investment Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              Average Down <span className="text-brand-primary">& Profit Calculator.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Calculate your true average cost, track your multi-order stock and crypto purchases, and instantly find your exact net profit after exchange fees and taxes.
            </p>
          </div>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Purchases Input */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-black uppercase text-brand-muted tracking-wider">Your Purchases</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-bg rounded-md border border-brand-border text-brand-muted">Average Cost Engine</span>
              </div>

              {/* Dynamic Position Row Input Groups */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {orders.map((order, idx) => (
                  <div key={order.id} className="flex gap-3 items-center">
                    <span className="font-mono text-xs text-brand-muted/50 w-4 text-right">{idx + 1}</span>
                    <div className="flex-1 relative">
                      <input type="number" value={order.shares || ""} onChange={(e) => updateOrder(order.id, "shares", Number(e.target.value))} placeholder="Shares / Coins" className="w-full bg-brand-bg border border-brand-border text-brand-main text-xs font-mono rounded-xl px-4 py-3 outline-none focus:border-brand-primary transition-all" />
                    </div>
                    <span className="text-brand-muted/30 font-bold text-xs">@</span>
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-muted/40">$</span>
                      <input type="number" value={order.price || ""} onChange={(e) => updateOrder(order.id, "price", Number(e.target.value))} placeholder="Buy Price" className="w-full bg-brand-bg border border-brand-border text-brand-main text-xs font-mono pl-7 pr-4 py-3 outline-none focus:border-brand-primary transition-all" />
                    </div>
                    <button onClick={() => removeOrder(order.id)} disabled={orders.length === 1} className="p-3 text-brand-muted hover:text-red-500 hover:bg-red-500/5 disabled:opacity-10 rounded-xl transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={addOrder} className="w-full mt-1 py-3 bg-brand-bg hover:bg-brand-primary/5 text-brand-main hover:text-brand-primary border border-dashed border-brand-border hover:border-brand-primary rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> Add Another Purchase
              </button>
            </div>

            {/* Fee & Tax Inputs */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Info size={12}/> Exchange Fee (%)</label>
                <input type="number" step="0.01" value={makerFee} onChange={(e) => setMakerFee(Number(e.target.value))} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-xs font-mono font-bold outline-none focus:border-brand-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Info size={12}/> Capital Gains Tax (%)</label>
                <input type="number" step="1" value={capitalGainsTax} onChange={(e) => setCapitalGainsTax(Number(e.target.value))} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-xs font-mono font-bold outline-none focus:border-brand-primary" />
              </div>
            </div>
          </div>

          {/* Right Block: Dynamic Profit & Loss Analytics Panel */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-5">
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-brand-muted uppercase">Expected Selling Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-muted/40">$</span>
                  <input type="number" value={sellPrice} onChange={(e) => setSellPrice(Number(e.target.value))} className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl pl-8 pr-4 py-3 text-sm font-mono font-bold outline-none focus:border-brand-primary" />
                </div>
              </div>

              {/* Comprehensive Summary Cards Stack */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center p-4 bg-brand-bg rounded-2xl border border-brand-border font-semibold text-xs text-brand-muted">
                  <span>True Average Cost:</span>
                  <span className="font-mono font-bold text-brand-main text-sm">${calculationResults.averageBuyPrice.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
                </div>

                <div className={`flex justify-between items-center p-4 rounded-2xl border font-semibold text-xs transition-colors ${
                  calculationResults.netProfit >= 0 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                    : "bg-red-500/10 border-red-500/20 text-red-500"
                }`}>
                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-black uppercase">Net Profit / Loss</span>
                    <span className="font-mono font-black text-xl">${calculationResults.netProfit.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black uppercase">Return (ROI)</span>
                    <span className="font-mono font-black text-sm">{calculationResults.roi.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="p-4 bg-brand-bg/40 rounded-2xl border border-brand-border/60 space-y-2 text-[11px] font-medium text-brand-muted">
                  <div className="flex justify-between"><span>Total Shares/Coins Owned:</span><span className="font-mono text-brand-main">{calculationResults.totalShares}</span></div>
                  <div className="flex justify-between"><span>Exchange Fees Paid:</span><span className="font-mono text-brand-main">${calculationResults.totalFees.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Estimated Taxes:</span><span className="font-mono text-brand-main">${calculationResults.taxDeduction.toFixed(2)}</span></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* --- SUPPLEMENTARY SEO CONTENT BLOCK --- */}
        <section className="mt-24 border-t border-brand-border pt-16 max-w-4xl text-left">
          <h2 className="text-2xl font-black text-brand-main tracking-tight flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-brand-primary" /> What is an Average Down Calculator?
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed mb-6">
            An average down calculator is an essential tool for crypto and stock market investors. When you buy an asset at multiple different price points over time, it becomes difficult to figure out exactly what your overall entry price (cost basis) is. This tool adds up all your purchases, divides them by your total shares, and gives you your exact breakeven price. 
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 text-xs text-brand-muted font-medium mb-12">
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><TrendingUp size={14} className="text-brand-primary" /> Accurate Profit Tracking</h3>
              <p className="leading-relaxed text-brand-muted">By factoring in maker/taker exchange fees and your local capital gains tax brackets, this calculator gives you your exact net profit. No more guessing how much money you will actually take home after hitting the sell button.</p>
            </div>
            <div className="p-6 border border-brand-border rounded-2xl bg-brand-card space-y-2">
              <h3 className="font-black text-brand-main text-sm flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand-primary" /> 100% Private Calculations</h3>
              <p className="leading-relaxed text-brand-muted">Financial data is sensitive. Unlike cloud-based portfolio apps, this web tool processes all the math right inside your browser. Your holdings, entry points, and profit targets are completely invisible to our servers.</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-brand-main mb-4">How to Use the Average Cost Calculator</h3>
          <ol className="space-y-2 text-brand-muted text-sm list-decimal list-inside mb-12">
            <li><strong>Input Purchases:</strong> For each time you bought the asset, enter the number of shares (or coins) and the price you paid.</li>
            <li><strong>Add More Rows:</strong> Click "Add Another Purchase" to include as many entry points as you need.</li>
            <li><strong>Set Target Sell Price:</strong> Enter the price at which you plan to sell the asset on the right side of the screen.</li>
            <li><strong>Adjust Fees (Optional):</strong> Tweak the exchange fee percentage and your capital gains tax rate to match your specific situation.</li>
            <li><strong>View Results:</strong> Instantly view your true average cost, total fees paid, and exact take-home profit.</li>
          </ol>

          <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-brand-main text-sm">What does it mean to average down?</h4>
              <p className="text-sm text-brand-muted mt-1">Averaging down (often called Dollar Cost Averaging or DCA) is an investment strategy where you buy more shares of an asset after the price has dropped. Because you are buying shares at a cheaper price, your overall average cost per share drops, making it easier to reach profitability when the market rebounds.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">How is average cost basis calculated?</h4>
              <p className="text-sm text-brand-muted mt-1">Your average cost basis is calculated by taking the total amount of money you have invested in an asset and dividing it by the total number of shares or coins you currently own. This calculator handles that math for you automatically.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand-main text-sm">Does this work for Crypto and Stocks?</h4>
              <p className="text-sm text-brand-muted mt-1">Yes, the math behind averaging down is identical whether you are trading traditional stocks on Robinhood, or buying fractions of cryptocurrencies like Bitcoin and Ethereum on exchanges like Binance or Coinbase.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}