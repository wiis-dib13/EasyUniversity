"use client"

import Link from "next/link"
import { GraduationCap, BookOpen, Brain, Users, Zap, ArrowRight } from "lucide-react"
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
        {/* NEW SECTION: ENGLISH HUB / COURSES / LIBRARY */}
        <section className="mt-20 mb-28">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* English Dept - Large Card */}
            <div className="flex-[2] bg-[#1E5D88] rounded-[3rem] p-8 md:p-12 relative overflow-hidden group shadow-2xl shadow-[#1E5D88]/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#F3B664] px-4 py-2 rounded-full mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">English Dept Hub</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none tracking-tighter mb-6">
                    Everything you need <br /> <span className="text-[#F3B664]">in one place</span>
                  </h2>
                  <p className="text-[#FDF1E1]/70 max-w-md font-medium text-lg leading-relaxed mb-8">
                    Access official course materials, literature summaries, and phonetics guides specifically curated for our University.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button className="h-14 px-8 rounded-2xl bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105">
                    Explore Dept
                  </Button>
                  <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/20 white  font-black uppercase tracking-widest transition-all">
                    Course Guide
                  </Button>
                </div>
              </div>
            </div>

            {/* Courses Library - Smaller Sidebar Card */}
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="flex-1 bg-white border-2 border-[#F3B664]/20 rounded-[2.5rem] p-8 hover:border-[#4E9F86]/50 transition-colors shadow-xl shadow-[#4E9F86]/5 group">
                <div className="h-14 w-14 bg-[#4E9F86]/10 rounded-2xl flex items-center justify-center text-[#4E9F86] mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter text-[#1E5D88] mb-2">Digital Library</h4>
                <p className="text-sm font-medium text-slate-500 mb-6">Instant access to 200+ PDFs, past exam papers, and audio recordings.</p>
                <Link href="#" className="inline-flex items-center gap-2 text-[#4E9F86] font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                  Open Library <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex-1 bg-[#F3B664] rounded-[2.5rem] p-8 shadow-xl shadow-[#F3B664]/20 group relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl font-black uppercase tracking-tighter text-white mb-2">Join the Community</h4>
                  <p className="text-white/80 text-sm font-medium mb-6 leading-snug">Connect with other students in the English department.</p>
                  <div className="flex -space-x-3 mb-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#F3B664] bg-white/20 flex items-center justify-center text-[10px] font-black text-white">
                        U{i}
                      </div>
                    ))}
                    <div className="h-10 w-10 rounded-full border-2 border-[#F3B664] bg-[#1E5D88] flex items-center justify-center text-[10px] font-black text-white">
                      +1k
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 text-white opacity-10 rotate-12">
                   <Users className="h-24 w-24" />
                </div>
              </div>

            </div>
          </div>
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