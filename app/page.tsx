"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import Link from "next/link"
import { 
  GraduationCap, BookOpen, Brain, Users, Zap, ArrowRight, 
  Star, CheckCircle, TrendingUp, Globe, Award, MessageSquare, 
  ChevronRight, Play 
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Scroll Animation Component ─── */
const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.95] : [1.05, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div className="h-[70rem] md:h-[90rem] flex items-center justify-center relative p-2 md:p-20" ref={containerRef}>
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1200px" }}>
        <motion.div style={{ translateY }} className="max-w-4xl mx-auto text-center mb-12">
          {titleComponent}
        </motion.div>
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026",
          }}
          className="max-w-5xl -mt-12 mx-auto h-[28rem] md:h-[38rem] w-full border-4 border-[#1E5D88]/20 p-2 md:p-4 bg-[#1E5D88] rounded-[30px] shadow-2xl"
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-[#FDF1E1]">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Stat Counter Card ─── */
const StatCard = ({ number, label, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex flex-col items-center p-8 bg-white rounded-[2.5rem] border border-[#F3B664]/20 shadow-lg shadow-[#4E9F86]/5 hover:shadow-xl hover:shadow-[#4E9F86]/10 transition-all group hover:-translate-y-1"
  >
    <div className="h-14 w-14 bg-[#4E9F86]/10 rounded-2xl flex items-center justify-center text-[#4E9F86] mb-4 group-hover:bg-[#4E9F86] group-hover:text-white transition-all">
      <Icon className="h-7 w-7" />
    </div>
    <span className="text-4xl font-black text-[#1E5D88] tracking-tighter">{number}</span>
    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{label}</span>
  </motion.div>
)

/* ─── Testimonial Card ─── */
const TestimonialCard = ({ name, year, text, rating, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white rounded-[2.5rem] p-8 border border-[#F3B664]/20 shadow-lg flex flex-col gap-4 hover:border-[#4E9F86]/30 transition-all"
  >
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#F3B664] text-[#F3B664]" />
      ))}
    </div>
    <p className="text-[#2D5A4C]/80 font-medium leading-relaxed text-sm">"{text}"</p>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
      <div className="h-10 w-10 rounded-full bg-[#4E9F86]/10 flex items-center justify-center text-[#4E9F86] font-black text-sm">
        {name[0]}
      </div>
      <div>
        <p className="font-black text-[#1E5D88] text-sm tracking-tight">{name}</p>
        <p className="text-xs text-slate-400 font-medium">{year}</p>
      </div>
    </div>
  </motion.div>
)

/* ─── Plan Card ─── */
const PlanCard = ({ title, price, features, accent, delay, popular }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col gap-6 ${
      accent
        ? "bg-[#1E5D88] text-white shadow-2xl shadow-[#1E5D88]/30"
        : "bg-white border-2 border-[#F3B664]/20 shadow-lg"
    }`}
  >
    {popular && (
      <div className="absolute top-6 right-6 bg-[#F3B664] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white">
        Most Popular
      </div>
    )}
    <div>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent ? "text-[#F3B664]" : "text-[#4E9F86]"}`}>{title}</p>
      <div className="flex items-end gap-1">
        <span className={`text-5xl font-black tracking-tighter ${accent ? "text-white" : "text-[#1E5D88]"}`}>{price}</span>
        {price !== "Free" && <span className={`text-sm font-bold pb-2 ${accent ? "text-white/60" : "text-slate-400"}`}>/month</span>}
      </div>
    </div>
    <ul className="flex flex-col gap-3 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium">
          <CheckCircle className={`h-4 w-4 flex-shrink-0 ${accent ? "text-[#F3B664]" : "text-[#4E9F86]"}`} />
          <span className={accent ? "text-white/80" : "text-slate-500"}>{f}</span>
        </li>
      ))}
    </ul>
    <Button className={`h-12 rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 ${
      accent
        ? "bg-[#F3B664] hover:bg-[#e5a450] text-white shadow-lg"
        : "bg-[#4E9F86] hover:bg-[#3d806b] text-white"
    }`}>
      Get Started <ChevronRight className="h-4 w-4 ml-1" />
    </Button>
  </motion.div>
)

/* ─── MAIN PAGE ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDF1E1] text-[#2D5A4C] font-sans selection:bg-[#F3B664]/30 overflow-x-hidden">

      {/* ── ORIGINAL HEADER (unchanged) ── */}
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
        <Link href="/auth/login" className="lg:hidden">
          <Button size="sm" className="rounded-full bg-[#4E9F86] text-white font-bold uppercase text-[10px]">Sign In</Button>
        </Link>
      </header>

      <main className="relative mx-auto max-w-[1400px] px-6 md:px-12 pt-8 md:pt-12">

        {/* ── ORIGINAL DECORATIONS (unchanged) ── */}
        <div className="absolute top-[-50px] left-[-50px] w-[300px] md:w-[500px] h-[300px] md:h-[400px] bg-[#F3B664] rounded-full blur-[80px] opacity-20 -z-10" />
        <div className="absolute top-0 left-0 hidden md:block">
          <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <path d="M0 0H400C300 150 150 250 0 300V0Z" fill="#F3B664" />
          </svg>
        </div>

        {/* ── ORIGINAL HERO (unchanged) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
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
          <div className="lg:col-span-7 relative mt-12 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[90%] bg-[#F3B664] rounded-[50px] md:rounded-[100px] -z-10" />
            <div className="relative p-4 flex justify-center">
              <img src="/1.svg" alt="EasyUniversity Online Study" className="w-full max-w-[600px] h-auto drop-shadow-2xl" />
              <div className="absolute bottom-10 left-0 md:left-10 bg-[#1E5D88] px-4 py-3 rounded-full shadow-lg text-white flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-xs font-bold tracking-tight">English Dept. Approved</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ORIGINAL FEATURES (unchanged) ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-20">
          {[
            { icon: Brain, title: "AI Summaries", desc: "Complex modules explained simply." },
            { icon: BookOpen, title: "Full Library", desc: "All PDFs and TDs in one place." },
            { icon: Zap, title: "Smart Planning", desc: "Optimized study schedules." }
          ].map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="bg-white/50 border border-[#F3B664]/20 p-6 rounded-[2rem] flex items-start gap-4">
                <div className="text-[#4E9F86] p-3 bg-white rounded-xl shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-sm tracking-tighter text-[#1E5D88]">{f.title}</h4>
                  <p className="text-xs font-medium text-slate-500">{f.desc}</p>
                </div>
              </div>
            )
          })}
        </section>

        {/* ── ORIGINAL ENGLISH HUB SECTION (unchanged) ── */}
        <section className="mt-20 mb-28">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
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
                  <Button className="h-14 px-8 rounded-2xl bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest transition-all hover:scale-105">
                    Course Guide
                  </Button>
                </div>
              </div>
            </div>
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
                    {[1, 2, 3, 4].map(i => (
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

        {/* ── STATS SECTION ── */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
           
          
          </motion.div>
      
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-[#F3B664]/20 px-5 py-2 rounded-full mb-4">
              <Play className="h-4 w-4 text-[#F3B664]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F3B664]">How it works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1E5D88]">
              3 steps to <span className="text-[#4E9F86]">success</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#4E9F86]/20 via-[#F3B664]/50 to-[#4E9F86]/20" />
            {[
              { step: "01", title: "Create Your Account", desc: "Sign up for free in under 60 seconds. No credit card required.", color: "bg-[#4E9F86]" },
              { step: "02", title: "Choose Your Module", desc: "Browse curated content for every course in the English Department.", color: "bg-[#F3B664]" },
              { step: "03", title: "Learn With AI", desc: "Get instant explanations, summaries and personalized coaching.", color: "bg-[#1E5D88]" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] p-8 border border-[#F3B664]/20 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white font-black text-sm mb-6 ${s.color}`}>
                  {s.step}
                </span>
                <h4 className="text-lg font-black tracking-tight text-[#1E5D88] mb-3">{s.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{s.desc}</p>
                <div className={`absolute -bottom-6 -right-6 h-20 w-20 rounded-full opacity-5 ${s.color}`} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SCROLL ANIMATION — PLATFORM PREVIEW ── */}
        <section className="mb-10 -mt-16">
          <ContainerScroll
            titleComponent={
              <div>
                <div className="inline-flex items-center gap-2 bg-[#4E9F86]/10 px-5 py-2 rounded-full mb-6">
                  <Globe className="h-4 w-4 text-[#4E9F86]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4E9F86]">Platform Preview</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1E5D88] leading-none mb-4">
                  A platform built for <br />
                  <span className="text-[#4E9F86]">Algerian students</span>
                </h2>
                <p className="text-[#2D5A4C]/60 font-medium text-lg max-w-xl mx-auto">
                  Every feature designed around the way you study at the English Department.
                </p>
              </div>
            }
          >
            {/* Dashboard Mock UI */}
            <div className="h-full w-full p-4 md:p-8 flex flex-col gap-4 bg-[#FDF1E1]">
              {/* Mock nav */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#1E5D88] flex items-center justify-center">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-black text-[#1E5D88] text-sm uppercase tracking-tighter">EasyUniversity</span>
                </div>
                <div className="flex gap-2">
                  {["Dashboard", "Library", "AI Coach"].map(t => (
                    <span key={t} className="hidden md:block text-[9px] font-black uppercase tracking-widest text-[#4E9F86] bg-[#4E9F86]/10 px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              {/* Mock content */}
              <div className="grid grid-cols-3 gap-3 flex-1">
                <div className="col-span-2 bg-white rounded-2xl p-5 border border-[#F3B664]/20 shadow-sm">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#4E9F86] mb-3">Today's Progress</p>
                  <div className="flex flex-col gap-2">
                    {["British Literature — Chapter 4", "Phonetics — Vowels", "Translation Module 3"].map((m, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 rounded-full flex-1 bg-slate-100">
                          <div className="h-2 rounded-full bg-[#4E9F86]" style={{ width: `${[75, 45, 90][i]}%` }} />
                        </div>
                        <span className="text-[8px] font-bold text-slate-400 w-20 truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1E5D88] rounded-2xl p-4 flex flex-col justify-between">
                  <Brain className="h-6 w-6 text-[#F3B664]" />
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/60 mb-1">AI Coach</p>
                    <p className="text-white font-black text-xs leading-tight">Ask me anything about your modules</p>
                  </div>
                </div>
                <div className="bg-[#F3B664] rounded-2xl p-4 flex flex-col justify-between">
                  <Award className="h-6 w-6 text-white" />
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/80 mb-1">Streak</p>
                    <p className="text-white font-black text-2xl">7✧</p>
                  </div>
                </div>
                <div className="col-span-2 bg-white rounded-2xl p-4 border border-[#F3B664]/20 shadow-sm">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#4E9F86] mb-3">Upcoming Exams</p>
                  <div className="flex gap-2">
                    {["Linguistics", "Translation", "Literature"].map((e, i) => (
                      <div key={i} className="flex-1 bg-[#FDF1E1] rounded-xl p-2 text-center">
                        <p className="text-[8px] font-black text-[#1E5D88]">{e}</p>
                        <p className="text-[7px] text-slate-400 font-medium">In {[3, 7, 14][i]}d</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="mb-28 -mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-[#F3B664]/20 px-5 py-2 rounded-full mb-4">
              <MessageSquare className="h-4 w-4 text-[#F3B664]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F3B664]">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1E5D88]">
              What students <span className="text-[#4E9F86]">say</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard name="Amina B." year="L2 English Dept." rating={5} text="EasyUniversity changed how I study. The AI summaries save me hours every week — I finally understand phonetics!" delay={0} />
            <TestimonialCard name="Yacine K." year="L3 English Dept." rating={5} text="The digital library is incredible. Everything is organized, from TDs to past exams. I wish I had this in first year." delay={0.1} />
            <TestimonialCard name="Sara M." year="Master 1 English" rating={5} text="The AI Coach answered all my questions about British Literature at 2am before my exam. Absolute lifesaver." delay={0.2} />
          </div>
        </section>

        {/* ── PRICING SECTION ── */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-[#4E9F86]/10 px-5 py-2 rounded-full mb-4">
              <Award className="h-4 w-4 text-[#4E9F86]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4E9F86]">Simple pricing</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1E5D88]">
              Start free, <span className="text-[#4E9F86]">grow fast</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PlanCard
              title="Student"
              price="Free"
              features={["5 AI summaries/month", "Basic library access", "Community forum", "Module overviews"]}
              accent={false}
              delay={0}
            />
            <PlanCard
              title="Pro"
              price="400 DA"
              features={["Unlimited AI summaries", "Full library access", "Priority AI Coach", "Exam planning tools", "Audio recordings"]}
              accent={true}
              popular={true}
              delay={0.1}
            />
            <PlanCard
              title="Premium"
              price="700 DA"
              features={["Everything in Pro", "1-on-1 AI sessions", "Offline downloads", "Early access features", "Study group tools"]}
              accent={false}
              delay={0.2}
            />
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#1E5D88] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#F3B664]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4E9F86]/10 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#F3B664] px-5 py-2 rounded-full mb-8">
                <Zap className="h-4 w-4 text-white fill-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Join Today — It's Free</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-none mb-6">
                Ready to ace <br /> <span className="text-[#F3B664]">your exams?</span>
              </h2>
              <p className="text-white/60 font-medium text-lg max-w-lg mx-auto mb-10">
                Join 500+ students already studying smarter with Algeria's first AI-powered English Department platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="h-16 rounded-full bg-[#F3B664] hover:bg-[#e5a450] px-12 text-lg font-black uppercase tracking-widest text-white shadow-xl shadow-[#F3B664]/20 transition-transform hover:scale-105">
                  Start for Free
                </Button>
                <Button className="h-16 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white px-12 font-black uppercase tracking-widest transition-all hover:scale-105">
                  See the Platform
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#F3B664]/20 py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E5D88] shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-xl font-black uppercase tracking-tighter text-[#1E5D88]">Easy</span>
                <span className="block text-xl font-black uppercase tracking-tighter text-[#1E5D88]">University</span>
              </div>
            </div>
            <div className="flex gap-8">
              {["AI Coach", "Library", "Courses", "Community", "Pricing"].map(link => (
                <Link key={link} href="#" className="text-[10px] font-black uppercase tracking-widest text-[#4E9F86]/60 hover:text-[#4E9F86] transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#F3B664]/20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4E9F86]/40">
              © 2026 EasyUniversity • Dib Wissem — All rights reserved
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#4E9F86]/40">
              Made with ♡ for Algerian Students
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}