"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Menu,
  X,
  Play,
  Brain,
  ArrowRight,
  Sparkles,
  Quote,
  Library,
  GraduationCap,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NextEduLanding() {
  const container = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const navLinks = [
    { name: "AI Coach", href: "#" },
    { name: "English Dept", href: "#" },
    { name: "Courses", href: "#" },
    { name: "Library", href: "#" }
  ]

  return (
    <div ref={container} className="bg-[#F8F8F8] min-h-screen selection:bg-teal-500/30 text-slate-900 font-sans">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-[#F8F8F8]/90 backdrop-blur-md border-b border-slate-200/50 flex justify-between items-center px-6 md:px-12 py-4">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 bg-slate-900 rounded-full flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none">Q</span>
          </div>
          <span className="text-xl font-bold tracking-tighter">next-edu</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-teal-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/auth/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-slate-900">
            Log in
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-slate-900 text-white rounded-none px-6 h-10 font-black uppercase tracking-widest text-[10px] hover:bg-teal-600 transition-colors">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden z-[110] relative h-10 w-10 flex flex-col items-end justify-center gap-1.5 group"
        >
          <motion.div 
            animate={isMenuOpen ? { rotate: 45, y: 4, width: "32px" } : { rotate: 0, y: 0, width: "32px" }}
            className="h-[2px] bg-slate-900 transition-all" 
          />
          <motion.div 
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-[2px] w-5 bg-slate-900 transition-all group-hover:w-8" 
          />
          <motion.div 
            animate={isMenuOpen ? { rotate: -45, y: -4, width: "32px" } : { rotate: 0, y: 0, width: "32px" }}
            className="h-[2px] bg-slate-900 transition-all" 
          />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-slate-900 text-white flex flex-col p-8 pt-32 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black tracking-tighter hover:text-teal-500 transition-colors"
                  >
                    {link.name}<span className="text-teal-500">.</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full h-16 rounded-none border-white text-white bg-transparent font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/sign-up" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full h-16 rounded-none bg-teal-600 text-white font-black uppercase tracking-widest hover:bg-teal-500 transition-all">
                  Join The Academy
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-[20%] right-[-5%] text-[20vw] font-black text-slate-200/40 leading-none select-none z-0 pointer-events-none">
          DEPT.
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-3 text-teal-600 font-black uppercase tracking-[0.4em] text-xs mb-6">
                <div className="h-px w-12 bg-teal-600" />
                Est. 2026 / Algeria
              </span>
              <h1 className="text-6xl md:text-[8vw] xl:text-[7vw] font-black leading-[0.85] tracking-tighter mb-8">
                MASTER <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-400 italic font-light pr-4">ENGLISH</span>
                <span className="text-teal-500">.</span>
              </h1>
            </motion.div>

            <motion.div 
               initial={{ y: 30, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="max-w-xl"
            >
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-slate-900 pl-6">
                Beyond basic AI. A sophisticated ecosystem designed for the modern linguist and literature major.
              </p>
              <div className="flex flex-wrap gap-4">
                 <Link href="/auth/sign-up">
                   <Button className="h-16 px-10 bg-slate-900 text-white rounded-none font-bold text-lg hover:bg-teal-600 transition-all">
                     Start Learning
                   </Button>
                 </Link>
                 <button className="h-16 w-16 flex items-center justify-center border-2 border-slate-900 group hover:bg-slate-50 transition-colors">
                    <Play size={24} className="text-slate-900" />
                 </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 relative mt-12 lg:mt-0">
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
              className="relative w-full max-w-md mx-auto aspect-[3/4] z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1600" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                alt="Library"
              />
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-teal-500 text-white p-6 md:p-8 w-[80%] shadow-xl">
                 <Quote size={32} className="mb-3 opacity-50" />
                 <p className="font-bold text-sm md:text-base italic leading-tight">"Language is the dress of thought."</p>
                 <p className="text-[10px] uppercase tracking-widest mt-3 opacity-80 font-black">— Samuel Johnson</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION MODULES */}
      <section className="bg-slate-900 py-24 px-6 md:px-12 text-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              DEEP <br /> FOCUS<span className="text-teal-500">.</span>
            </h2>
            <p className="max-w-xs text-slate-400 font-medium text-lg leading-relaxed border-b border-slate-700 pb-8">
              Tailored tools for the four pillars of the Algerian English Department curriculum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800">
            {[
              { title: "Literature", icon: <Library size={32} />, desc: "Analysis of Victorian, Modernist, and Post-Colonial works." },
              { title: "Linguistics", icon: <Brain size={32} />, desc: "Syntax, Semantics, and Applied Linguistics workshops." },
              { title: "Phonetics", icon: <Sparkles size={32} />, desc: "Interactive IPA training with real-time feedback." },
              { title: "Civilization", icon: <GraduationCap size={32} />, desc: "British & American history modules and archives." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 p-8 md:p-12 hover:bg-teal-600 transition-colors duration-500 cursor-pointer group">
                <div className="mb-12 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-transform origin-left">
                  {item.icon}
                </div>
                <p className="text-xs font-black text-teal-500 mb-2 uppercase tracking-widest group-hover:text-white">Module 0{idx + 1}</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 group-hover:text-white/90 transition-colors">{item.desc}</p>
                <ArrowRight className="mt-8 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION FAQ (CONSERVÉE) */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
              className="w-full aspect-square md:aspect-[4/5] object-cover shadow-[20px_20px_0px_0px_rgba(15,23,42,1)]"
              alt="Student"
            />
          </div>
          <div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 uppercase">
              Designed by <br /> <span className="text-slate-400 italic font-light underline decoration-teal-500 underline-offset-8">Academics.</span>
            </h3>
            <div className="space-y-4">
               {[
                 { q: "How many summaries are available?", a: "We currently host 12,000+ peer-reviewed documents across all license and master levels." },
                 { q: "Is the AI specific to our curriculum?", a: "Yes. Ours is fine-tuned specifically on syllabi from major Algerian universities." },
                 { q: "How active is the student community?", a: "There are over 2,500 students actively sharing insights and preparing for exams." }
               ].map((faq, i) => (
                 <div key={i} className="border-b border-slate-200 cursor-pointer overflow-hidden" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <div className="py-6 flex justify-between items-center group">
                      <h4 className="text-lg font-black flex items-center gap-4 group-hover:text-teal-600 transition-colors uppercase tracking-tighter">
                        <span className="text-teal-500 text-sm">0{i+1}</span> {faq.q}
                      </h4>
                      <ChevronDown className={`text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </div>
                    <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] opacity-100 mb-6" : "grid-rows-[0fr] opacity-0"}`}>
                      <p className="text-slate-500 font-medium pl-8 overflow-hidden leading-relaxed">{faq.a}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t-8 border-slate-900 pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="text-6xl md:text-[8vw] font-black tracking-tighter opacity-[0.05] leading-none select-none">NEXTEDU</div>
          <div className="grid grid-cols-2 gap-12 z-10">
            <div className="flex flex-col gap-4">
              <span className="font-black text-xs uppercase tracking-widest text-teal-600">Navigation</span>
              <Link href="#" className="font-bold text-slate-600 hover:text-slate-900">Campus</Link>
              <Link href="#" className="font-bold text-slate-600 hover:text-slate-900">AI Coach</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-black text-xs uppercase tracking-widest text-teal-600">Legal</span>
              <Link href="#" className="font-bold text-slate-600 hover:text-slate-900">Privacy</Link>
              <Link href="#" className="font-bold text-slate-600 hover:text-slate-900">Terms</Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto pt-8 border-t border-slate-100 flex justify-between font-black text-[10px] uppercase tracking-[0.4em] text-slate-400">
          <span>© 2026 Next-Edu</span>
          <span className="hidden sm:inline">Made for the English Dept</span>
        </div>
      </footer>
    </div>
  )
}