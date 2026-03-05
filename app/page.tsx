"use client"

import Link from "next/link"
import { GraduationCap, BookOpen, Brain, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDF1E1] text-[#2D5A4C] font-sans selection:bg-[#F3B664]/30 overflow-x-hidden">
      
      {/* HEADER - Responsive */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E5D88] shadow-md flex-shrink-0">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="leading-none">
            <span className="block text-xl font-black uppercase tracking-tighter text-[#1E5D88]">Easy</span>
            <span className="block text-xl font-black uppercase tracking-tighter text-[#1E5D88]">University</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {["AI Coach", "English Dept", "Courses", "Library"].map((item) => (
            <Link key={item} href="#" className="text-[11px] font-black uppercase tracking-widest text-[#4E9F86] hover:opacity-70 transition-opacity">
              {item}
            </Link>
          ))}
          <Link href="/auth/login">
            <Button className="rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white px-8 py-2 font-bold uppercase text-xs tracking-widest shadow-lg shadow-[#4E9F86]/20 transition-all active:scale-95">
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Mobile Sign In */}
        <Link href="/auth/login" className="lg:hidden">
            <Button size="sm" className="rounded-full bg-[#4E9F86] text-white font-bold uppercase text-[10px]">Sign In</Button>
        </Link>
      </header>

      <main className="relative mx-auto max-w-[1400px] px-6 md:px-12 pt-8 md:pt-12">
        
        {/* FORME ORGANIQUE ORANGE - Décoration */}
        <div className="absolute top-[-50px] left-[-50px] w-[300px] md:w-[500px] h-[300px] md:h-[400px] bg-[#F3B664] rounded-full blur-[80px] opacity-20 -z-10" />
        <div className="absolute top-0 left-0 hidden md:block">
             <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                <path d="M0 0H400C300 150 150 250 0 300V0Z" fill="#F3B664"/>
             </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* TEXTE (Côté Gauche) */}
          <div className="lg:col-span-5 pt-10 md:pt-20 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[0.9] tracking-tighter text-[#4E9F86] mb-8">
              ONLINE <br /> EDUCATION
            </h1>
            
            <h3 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-[#4E9F86] mb-6">
              Fast • Simple • Adapted
            </h3>

            <p className="max-w-md mx-auto lg:mx-0 text-base md:text-lg text-[#2D5A4C]/80 leading-relaxed font-medium mb-12">
              Master the English Department curriculum with Algeria's first AI-powered platform. 
              Get instant summaries, official resources, and 24/7 coaching tailored to your success.
            </p>

            {/* Pagination dots */}
            <div className="flex justify-center lg:justify-start gap-2 mb-12">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-2.5 w-2.5 rounded-full ${i === 1 ? 'bg-[#4E9F86]' : 'bg-[#4E9F86]/30'}`} />
                ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button className="w-full sm:w-auto h-16 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] px-12 text-lg font-black uppercase tracking-widest text-white shadow-xl shadow-[#4E9F86]/20 transition-transform hover:scale-105 active:scale-95">
                Get Started
                </Button>
                <div className="flex items-center gap-2 text-[#4E9F86] font-bold text-sm">
                    <Zap className="h-4 w-4 fill-[#4E9F86]" /> 500+ Students Joined
                </div>
            </div>
          </div>

          {/* ILLUSTRATION (Côté Droit) - Stable */}
          <div className="lg:col-span-7 relative mt-12 lg:mt-0">
            {/* Arrière-plan de l'illustration (Blob Orange) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] bg-[#F3B664] rounded-[50px] md:rounded-[100px] -z-10" />
            
            <div className="relative p-4 flex justify-center">
                {/* Image STABLE (animate-float supprimé) */}
                <img 
                    src="/1.svg" 
                    alt="EasyUniversity Online Study" 
                    className="w-full max-w-[600px] h-auto drop-shadow-2xl"
                />
                
                {/* Éléments de confiance */}
                <div className="absolute bottom-10 left-0 md:left-10 bg-[#1E5D88] px-4 py-3 rounded-full shadow-lg text-white flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-bold tracking-tight">English Dept. Approved</span>
                </div>
            </div>
          </div>

        </div>

        {/* Section Features Rapide (pour inciter l'usage) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-20">
            {[
                { icon: <Brain />, title: "AI Summaries", desc: "Complex modules explained simply." },
                { icon: <BookOpen />, title: "Full Library", desc: "All PDFs and TDs in one place." },
                { icon: <Zap />, title: "Smart Planning", desc: "Optimized study schedules." }
            ].map((f, i) => (
                <div key={i} className="bg-white/50 border border-[#F3B664]/20 p-6 rounded-[2rem] flex items-start gap-4">
                    <div className="text-[#4E9F86] p-3 bg-white rounded-xl shadow-sm">{f.icon}</div>
                    <div>
                        <h4 className="font-black uppercase text-sm tracking-tighter text-[#1E5D88]">{f.title}</h4>
                        <p className="text-xs font-medium text-slate-500">{f.desc}</p>
                    </div>
                </div>
            ))}
        </section>
      </main>

      <footer className="py-12 text-center border-t border-[#F3B664]/20">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4E9F86]/60">
            © 2026 EasyUniversity • Dib wissem - All rights reserved
        </p>
      </footer>
    </div>
  )
}