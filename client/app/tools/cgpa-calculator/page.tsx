"use client";

import { useState, useMemo } from "react";
import { 
  Award, Plus, Trash2, Sparkles, BookOpen, 
  Layers, Percent, GraduationCap, Calculator 
} from "lucide-react";
import Head from "next/head";

interface CourseRow {
  id: string;
  name: string;
  gradePoints: number; // e.g., 4.0 for A
  creditHours: number;
}

const GRADE_SCALE = [
  { label: "A (4.00)", val: 4.0 },
  { label: "B+ (3.50)", val: 3.5 },
  { label: "B (3.00)", val: 3.0 },
  { label: "C+ (2.50)", val: 2.5 },
  { label: "C (2.00)", val: 2.0 },
  { label: "D (1.00)", val: 1.0 },
  { label: "F (0.00)", val: 0.0 }
];

export default function CgpaCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: "1", name: "Data Structures", gradePoints: 4.0, creditHours: 3 },
    { id: "2", name: "Linear Algebra", gradePoints: 3.5, creditHours: 3 },
    { id: "3", name: "Web Engineering Lab", gradePoints: 4.0, creditHours: 1 }
  ]);
  const [priorCgpa, setPriorCgpa] = useState<number | "">("");
  const [priorCredits, setPriorCredits] = useState<number | "">("");

  // Programmatic SEO JSON-LD Tool Configuration
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "GPA & CGPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "datePublished": "2024-03-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "featureList": [
        "Semester GPA calculation",
        "Cumulative CGPA tracking",
        "Letter grade conversion",
        "Credit hour weighting",
        "Client-side privacy"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between GPA and CGPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GPA (Grade Point Average) usually refers to your academic performance in a single semester or term. CGPA (Cumulative Grade Point Average) is your overall academic score across all completed semesters combined."
          }
        },
        {
          "@type": "Question",
          "name": "How does the CGPA calculator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It multiplies the grade value of each course by its credit hours to get quality points. It then divides your total quality points by your total attempted credit hours to find your average."
          }
        },
        {
          "@type": "Question",
          "name": "Are my grades and scores saved anywhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This tool operates entirely inside your web browser. Your course names, grades, and cumulative scores are never saved or transmitted to our servers."
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
        { "@type": "ListItem", "position": 4, "name": "CGPA Calculator", "item": "https://toolmars.com/tools/cgpa-calculator" }
      ]
    }
  ];

  const addCourse = () => {
    setCourses(prev => [...prev, { id: crypto.randomUUID(), name: "", gradePoints: 4.0, creditHours: 3 }]);
  };

  const updateCourse = (id: string, field: keyof CourseRow, value: any) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
  
  const removeCourse = (id: string) => {
    if (courses.length === 1) return;
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Academic Averaging Engine
  const gpaMetrics = useMemo(() => {
    let currentSemesterQualityPoints = 0;
    let currentSemesterCredits = 0;

    courses.forEach(c => {
      if (c.creditHours > 0 && c.gradePoints >= 0) {
        currentSemesterQualityPoints += c.gradePoints * c.creditHours;
        currentSemesterCredits += c.creditHours;
      }
    });

    const semesterGpa = currentSemesterCredits > 0 ? currentSemesterQualityPoints / currentSemesterCredits : 0;

    // Cumulative Tracking Logic incorporating prior institutional data blocks
    let totalQualityPoints = currentSemesterQualityPoints;
    let totalCredits = currentSemesterCredits;

    if (Number(priorCgpa) > 0 && Number(priorCredits) > 0) {
      totalQualityPoints += Number(priorCgpa) * Number(priorCredits);
      totalCredits += Number(priorCredits);
    }

    const cumulativeCgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

    return {
      semesterGpa,
      cumulativeCgpa,
      currentSemesterCredits,
      totalCredits
    };
  }, [courses, priorCgpa, priorCredits]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-main transition-colors duration-300 pt-32 pb-20 px-6">
      <Head>
        <title>GPA & CGPA Calculator - Calculate College Grades | ToolMars</title>
        <meta name="description" content="Free online GPA and CGPA calculator. Easily calculate your semester grades, cumulative grade point average, and credit hours instantly in your browser." />
        <link rel="canonical" href="https://toolmars.com/tools/cgpa-calculator" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="GPA & CGPA Calculator - Calculate College Grades | ToolMars" />
        <meta property="og:description" content="Free online GPA and CGPA calculator. Easily calculate your semester grades, cumulative grade point average, and credit hours instantly in your browser." />
        <meta property="og:url" content="https://toolmars.com/tools/cgpa-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://toolmars.com/og/cgpa-calculator.png" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GPA & CGPA Calculator - Calculate College Grades | ToolMars" />
        <meta name="twitter:description" content="Free online GPA and CGPA calculator. Easily calculate your semester grades, cumulative grade point average, and credit hours instantly in your browser." />
        <meta name="twitter:image" content="https://toolmars.com/og/cgpa-calculator.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      </Head>

      <main className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-border pb-10 mb-12 gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/10 text-xs font-bold uppercase tracking-wider">
              <GraduationCap size={14} /> Free Student Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-main tracking-tight leading-[1.05]">
              GPA & CGPA <span className="text-brand-primary">Calculator.</span>
            </h1>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Easily calculate your semester GPA and track your overall CGPA. Enter your course credits and letter grades to see your academic standing instantly.
            </p>
          </div>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Course Inputs */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-black uppercase text-brand-muted tracking-wider flex items-center gap-1.5"><BookOpen size={14}/> This Semester's Courses</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-bg rounded-md border border-brand-border text-brand-muted">{courses.length} Classes Added</span>
              </div>

              {/* Dynamic Course Rows */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {courses.map((course, idx) => (
                  <div key={course.id} className="flex gap-3 items-center">
                    <span className="font-mono text-xs text-brand-muted/50 w-4 text-right">{idx + 1}</span>
                    <input type="text" value={course.name} onChange={(e) => updateCourse(course.id, "name", e.target.value)} placeholder="Course Name" className="flex-1 bg-brand-bg border border-brand-border text-brand-main text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-brand-primary" />
                    
                    <select value={course.gradePoints} onChange={(e) => updateCourse(course.id, "gradePoints", Number(e.target.value))} className="w-32 bg-brand-bg border border-brand-border text-brand-main text-xs font-bold rounded-xl px-3 py-3 outline-none focus:border-brand-primary">
                      {GRADE_SCALE.map(g => <option key={g.val} value={g.val}>{g.label}</option>)}
                    </select>

                    <input type="number" min="1" max="6" value={course.creditHours || ""} onChange={(e) => updateCourse(course.id, "creditHours", Number(e.target.value))} placeholder="Credits" className="w-16 bg-brand-bg border border-brand-border text-brand-main text-xs font-mono font-bold text-center rounded-xl py-3 outline-none focus:border-brand-primary" />
                    
                    <button onClick={() => removeCourse(course.id)} disabled={courses.length === 1} className="p-3 text-brand-muted hover:text-red-500 hover:bg-red-500/5 rounded-xl disabled:opacity-10 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={addCourse} className="w-full mt-1 py-3 bg-brand-bg hover:bg-brand-primary/5 text-brand-main hover:text-brand-primary border border-dashed border-brand-border hover:border-brand-primary rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> Add Another Course
              </button>
            </div>

            {/* Optional Input Block: Prior Records */}
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Layers size={12}/> Current CGPA (Optional)</label>
                <input type="number" step="0.01" max="4" value={priorCgpa} onChange={(e) => setPriorCgpa(e.target.value !== "" ? Number(e.target.value) : "")} placeholder="e.g., 3.64" className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-xs font-mono font-bold outline-none focus:border-brand-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-brand-muted uppercase flex items-center gap-1"><Percent size={12}/> Total Credits Earned</label>
                <input type="number" value={priorCredits} onChange={(e) => setPriorCredits(e.target.value !== "" ? Number(e.target.value) : "")} placeholder="e.g., 64" className="w-full bg-brand-bg border border-brand-border text-brand-main rounded-xl px-4 py-3 text-xs font-mono font-bold outline-none focus:border-brand-primary" />
              </div>
            </div>
          </div>

          {/* Right Block: Summary Box */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="bg-brand-card border border-brand-border rounded-[2rem] p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-brand-muted">
                <Calculator size={14} className="text-brand-primary" />
                <span>Your Results</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border">
                  <span className="text-[9px] font-black uppercase text-brand-muted tracking-wider block">Semester GPA</span>
                  <span className="text-3xl font-black text-brand-main font-mono block mt-1">{gpaMetrics.semesterGpa.toFixed(2)}</span>
                  <span className="text-[10px] text-brand-muted font-semibold mt-1 block">{gpaMetrics.currentSemesterCredits} credits this term</span>
                </div>
                <div className="p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20">
                  <span className="text-[9px] font-black uppercase text-brand-primary tracking-wider block">Overall CGPA</span>
                  <span className="text-3xl font-black text-brand-primary font-mono block mt-1">{gpaMetrics.cumulativeCgpa.toFixed(2)}</span>
                  <span className="text-[10px] text-brand-muted font-semibold mt-1 block">{gpaMetrics.totalCredits} total credits</span>
                </div>
              </div>

              {/* Honors Badge */}
              {gpaMetrics.cumulativeCgpa >= 3.5 && (
                <div className="flex gap-3 items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                  <Award size={18} className="shrink-0" />
                  <span>Excellent! Your CGPA qualifies for Dean's List or honors standing at most universities.</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Content Block Optimized for AI Search & Featured Snippets */}
        <div className="mt-16 space-y-12 border-t border-brand-border pt-12 max-w-3xl text-left">
          
          <section>
            <h2 className="text-xl font-black text-brand-main mb-4 tracking-tight">What is a CGPA Calculator?</h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              A CGPA (Cumulative Grade Point Average) calculator is an online tool designed to help high school and university students calculate their academic scores. By entering the credit hours and letter grades for each class, you can instantly find out your GPA for the current semester, as well as your overall cumulative score.
            </p>
            <p className="text-brand-muted leading-relaxed italic border-l-2 border-brand-primary pl-4">
              Your GPA determines your academic standing, eligibility for scholarships, and honors list placements like the Dean's List or Cum Laude status.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">How to Calculate Your College GPA</h3>
            <ol className="space-y-2 text-brand-muted list-decimal list-inside">
              <li><strong>Add your classes:</strong> Enter the name of each course you are currently taking.</li>
              <li><strong>Select the grade:</strong> Pick the expected or received letter grade from the dropdown menu (A, B+, C, etc.).</li>
              <li><strong>Enter credit hours:</strong> Input how many credits each course is worth (usually between 1 and 4).</li>
              <li><strong>Check your results:</strong> The calculator instantly displays your semester GPA.</li>
              <li><strong>Find your CGPA:</strong> (Optional) Enter your previous overall CGPA and total past credits to see how this semester affects your final graduation score.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Key Features of This Tool</h3>
            <ul className="space-y-2 text-brand-muted list-disc list-inside">
              <li>Calculates both term GPA and total cumulative CGPA simultaneously.</li>
              <li>Uses the standard 4.0 grading scale used by most colleges and universities.</li>
              <li>Instantly updates your score as you change grades or add new classes.</li>
              <li>100% private. Your grades never leave your browser and are not saved on any database.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-brand-main mb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-brand-main text-sm">What is the difference between GPA and CGPA?</h4>
                <p className="text-sm text-brand-muted mt-1">GPA (Grade Point Average) usually refers to your academic performance in a single semester or term. CGPA (Cumulative Grade Point Average) is your overall academic score across all completed semesters combined.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">How is my GPA calculated mathematically?</h4>
                <p className="text-sm text-brand-muted mt-1">The calculator multiplies the grade value (e.g., an A is 4.0) of each course by its credit hours to get your "quality points." It then adds up all your quality points and divides that number by the total number of credit hours you took.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-main text-sm">Are my grades saved anywhere?</h4>
                <p className="text-sm text-brand-muted mt-1">No. This tool operates entirely inside your own web browser. Your course names, grades, and cumulative scores are never saved, tracked, or transmitted to any servers.</p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}