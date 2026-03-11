"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  BookOpen, Brain, Calendar, Star, Users, Menu, X, Zap, 
  GraduationCap, CheckCircle2, ArrowRight, MousePointer2 
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NextEduLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const colors = {
    bg: "#F2F7F9",
    teal: "#107B75",
    orange: "#FB6F4A",
    textDark: "#1E293B",
  }

  const navLinks = [
    { name: "AI Coach", href: "#" },
    { name: "English Dept", href: "#" },
    { name: "Courses", href: "#" },
    { name: "Library", href: "#" }
  ]

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-[#107B75]/20" style={{ backgroundColor: colors.bg }}>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[100] bg-white p-8 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <img
                  src="/1.png"
                  alt="Easy University Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-black tracking-tighter text-[#1E293B]">next-edu</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
            </div>
            <nav className="flex flex-col gap-8 text-2xl font-bold">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
              ))}
              <Button asChild className="mt-4 h-16 rounded-2xl bg-[#FB6F4A] text-xl font-bold text-white shadow-xl">
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative z-50 flex items-center justify-between px-6 py-6 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: -10 }}
            className="h-10 w-10 flex items-center justify-center"
          >
            <img
              src="/1.png"
              alt="Easy University Logo"
              className="h-10 w-10 object-contain"
            />
          </motion.div>
          <span style={{ color: colors.textDark }} className="text-2xl font-black tracking-tighter">
            next<span style={{ color: colors.teal }}>-edu</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-bold text-[14px] uppercase tracking-wider text-[#1E293B]">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#107B75] transition-colors">{link.name}</Link>
          ))}
          <Button asChild className="rounded-xl px-8 py-6 font-bold text-white shadow-xl hover:scale-105 transition-all bg-[#FB6F4A] hover:bg-[#e05b38]">
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </nav>

        <button className="md:hidden text-[#1E293B]" onClick={() => setIsMenuOpen(true)}>
          <Menu size={32} />
        </button>
      </header>

      <main className="max-w-[1200px] mx-auto px-6">
        
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ color: colors.teal }} className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
              ONLINE<br />EDUCATION
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 mb-8">
              <span className="h-2 w-2 rounded-full bg-[#FB6F4A] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest">Fast • Simple • Adapted</span>
            </div>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md mb-10">
              La plateforme n°1 pour les étudiants du département d'Anglais. Réussissez vos modules avec nos résumés IA et ressources exclusives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Button className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold text-white shadow-2xl hover:-translate-y-1 transition-all bg-[#FB6F4A]">
                Commencer Gratuitement
              </Button>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <img 
                        key={i} 
                        src={`https://i.pravatar.cc/100?img=${i+10}`} 
                        alt="Student"
                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                 </div>
                 <p className="text-xs font-bold text-slate-600">Rejoint par +500 étudiants</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative lg:block"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#107B75]/10 rounded-full blur-3xl" />
            
            {/* Photo principale avec différentes options de forme ronde */}
            <div className="relative z-10">
              {/* Option 1: Cercle parfait */}
              <img 
                src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg" 
                alt="Education Illustration" 
                className="w-full h-auto rounded-full border-8 border-white shadow-2xl"
              />
              
              {/* Option 2: Forme ovale */}
              {/* <img 
                src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg" 
                alt="Education Illustration" 
                className="w-full h-auto rounded-[50%] border-8 border-white shadow-2xl"
              /> */}
              
              {/* Option 3: Coins très arrondis (presque cercle mais pas tout à fait) */}
              {/* <img 
                src="https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg" 
                alt="Education Illustration" 
                className="w-full h-auto rounded-[100px] border-8 border-white shadow-2xl"
              /> */}
              
            
              
          
            </div>
          </motion.div>
        </section>

        {/* ── STATS SECTION ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 bg-white p-8 rounded-[3rem] shadow-sm">
           {[
             { label: "Ressources", val: "200+" },
             { label: "Résumés IA", val: "1.2k" },
             { label: "Étudiants", val: "500+" },
             { label: "Satisfaction", val: "99%" }
           ].map((stat, i) => (
             <div key={i} className="text-center">
               <h3 className="text-3xl font-black text-[#107B75]">{stat.val}</h3>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
             </div>
           ))}
        </section>

        {/* ── FEATURES & DASHBOARD ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-7 bg-white rounded-[3rem] p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <div className="flex items-center gap-3 text-[#107B75]">
                <GraduationCap size={24} />
                <span className="font-bold text-slate-800 uppercase text-xs tracking-widest">Dashboard de l'étudiant</span>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-slate-200" />
                <div className="h-2 w-2 rounded-full bg-slate-200" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-3xl">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Progression Semestre</p>
                   <div className="h-32 w-32 rounded-full border-[12px] border-[#107B75] border-t-slate-200 flex items-center justify-center mx-auto">
                      <span className="text-2xl font-black text-[#107B75]">70%</span>
                   </div>
                </div>
                
                {/* Nouvelle image ronde ajoutée */}
                <div className="bg-slate-50 p-4 rounded-3xl flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop" 
                    alt="Student"
                    className="h-16 w-16 rounded-full object-cover border-3 border-[#107B75]"
                  />
                  <div>
                    <p className="font-bold text-sm">Marie L.</p>
                    <p className="text-xs text-slate-500">Top étudiante du mois</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#107B75] text-white p-6 rounded-3xl h-full flex flex-col justify-between">
                   <Brain size={32} className="opacity-50" />
                   <div>
                     <p className="font-bold text-xl mb-2 italic">"Ready for Phonetics?"</p>
                     <Button className="w-full bg-white/20 hover:bg-white/30 border-none text-white font-bold rounded-xl">
                       Lancer le Quiz IA
                     </Button>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
             {[
               { icon: Brain, title: "Résumés IA", desc: "Tes cours synthétisés en 1 minute." },
               { icon: BookOpen, title: "Bibliothèque", desc: "Examens, PDFs et supports audio." },
               { icon: Calendar, title: "Planning IA", desc: "Un calendrier d'étude qui s'adapte à toi." }
             ].map((item, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ x: 10 }}
                 className="bg-white p-6 rounded-[2rem] flex items-center gap-6 cursor-pointer border-2 border-transparent hover:border-[#107B75]/10 shadow-sm"
               >
                  <div className="h-14 w-14 rounded-2xl bg-[#E8F2F1] text-[#107B75] flex items-center justify-center">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                  <ArrowRight size={18} className="ml-auto text-slate-300" />
               </motion.div>
             ))}
          </div>
        </section>

        {/* ── TESTIMONIALS WITH ROUNDED IMAGES ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
           <div className="bg-white p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
              <Star className="absolute -top-4 -right-4 text-[#FB6F4A]/10 w-24 h-24" />
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108777-466fd6c79e9b?w=150&h=150&fit=crop" 
                  alt="Sarah M."
                  className="h-14 w-14 rounded-full object-cover border-2 border-[#107B75]"
                />
                <div>
                  <h5 className="font-black text-slate-800">Sarah M.</h5>
                  <p className="text-xs font-bold text-[#107B75] uppercase">Master 1 Civilisation</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium italic leading-relaxed">
                "Grâce à next-edu, j'ai pu rattraper tout mon retard en Phonétique. Les résumés IA sont d'une précision incroyable."
              </p>
           </div>
           
           <div className="bg-white p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
              <Star className="absolute -top-4 -right-4 text-[#FB6F4A]/10 w-24 h-24" />
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" 
                  alt="Rayane K."
                  className="h-14 w-14 rounded-full object-cover border-2 border-[#FB6F4A]"
                />
                <div>
                  <h5 className="font-black text-slate-800">Rayane K.</h5>
                  <p className="text-xs font-bold text-[#FB6F4A] uppercase">Licence 2 Linguistique</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium italic leading-relaxed">
                "Enfin une plateforme moderne pour nous ! La bibliothèque de ressources est super riche et bien organisée."
              </p>
           </div>
        </section>

        {/* ── NEW SECTION WITH ROUNDED IMAGES ── */}
        <section className="mb-32">
          <h2 className="text-3xl font-black text-[#1E293B] mb-8 text-center">Nos étudiants en action</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=300&fit=crop"
            ].map((src, i) => (
              <img 
                key={i}
                src={src}
                alt={`Student ${i+1}`}
                className="w-full h-48 object-cover rounded-[2rem] shadow-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </section>

        {/* ── AVATARS CIRCLE SECTION ── */}
        <section className="mb-32 text-center">
          <h2 className="text-3xl font-black text-[#1E293B] mb-8">Notre communauté</h2>
          <div className="flex justify-center -space-x-4">
            {[1,2,3,4,5].map(i => (
              <img 
                key={i}
                src={`https://i.pravatar.cc/150?img=${i+20}`}
                alt={`User ${i}`}
                className="h-16 w-16 rounded-full border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300"
              />
            ))}
          </div>
          <p className="mt-6 text-slate-600 font-medium">+500 étudiants nous font confiance</p>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: colors.teal }} className="rounded-t-[4rem] pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
            PRÊT À RÉUSSIR<br /><span className="text-[#FB6F4A]">TON SEMESTRE ?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
            <Button className="h-16 px-12 rounded-2xl bg-[#FB6F4A] hover:bg-white hover:text-[#FB6F4A] text-white font-black text-lg shadow-2xl transition-all">
              S'inscrire Maintenant
            </Button>
            <Button className="h-16 px-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-lg backdrop-blur-md transition-all">
              Voir le Guide
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-white/10 pt-12">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-white">
                 <img
                   src="/1.png"
                   alt="Easy University Logo"
                   className="h-8 w-8 object-contain"
                 />
                 <span className="text-2xl font-black tracking-tighter uppercase">next-edu</span>
               </div>
               <p className="text-white/60 text-sm font-medium">
                 Le futur de l'éducation pour le département d'anglais en Algérie.
               </p>
               <div className="flex items-center gap-2 mt-4">
                 <img 
                   src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=50&h=50&fit=crop" 
                   alt="Team"
                   className="h-10 w-10 rounded-full object-cover border-2 border-white"
                 />
                 <img 
                   src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=50&h=50&fit=crop" 
                   alt="Team"
                   className="h-10 w-10 rounded-full object-cover border-2 border-white"
                 />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-3">
                 <h4 className="text-white font-black uppercase text-xs tracking-widest">Plateforme</h4>
                 <ul className="text-white/60 text-sm space-y-2 font-bold">
                   <li className="hover:text-white cursor-pointer transition-colors">Cours</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Examens</li>
                   <li className="hover:text-white cursor-pointer transition-colors">Quiz IA</li>
                 </ul>
               </div>
               <div className="space-y-3">
                 <h4 className="text-white font-black uppercase text-xs tracking-widest">Support</h4>
                 <ul className="text-white/60 text-sm space-y-2 font-bold">
                   <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                   <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                 </ul>
               </div>
            </div>

            <div className="flex flex-col md:items-end justify-center">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10 inline-block">
                 <p className="text-white font-black text-xs uppercase tracking-widest mb-1">Status</p>
                 <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-green-400" />
                   <span className="text-white/80 text-sm font-bold uppercase tracking-widest">Servers Online</span>
                 </div>
               </div>
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mt-8 italic">
                 © 2026 Designed for English Dept
               </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}