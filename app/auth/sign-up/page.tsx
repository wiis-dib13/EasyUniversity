"use client"

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react'

export default function SignUpPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [role, setRole] = useState<'student' | 'professor'>('student')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard/${role}`,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-sans selection:bg-teal-500/30 relative flex flex-col justify-center items-center py-20 overflow-hidden">
      
      {/* ── FLECHE DE RETOUR BRUTALISTE ── */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 z-50 flex items-center gap-3 group"
      >
        <div className="h-8 w-8 flex items-center justify-center border-2 border-slate-900 group-hover:bg-teal-500 group-hover:border-teal-500 group-hover:text-white transition-all">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Return</span>
      </Link>

      {/* GRAND TEXTE DÉCORATIF EN FOND */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-slate-200/40 leading-none select-none z-0 pointer-events-none tracking-tighter">
        JOIN.
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* EN-TÊTE */}
        <div className="mb-10 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">
              NEW <br/> SCHOLAR<span className="text-teal-500">.</span>
            </h1>
            <span className="inline-flex items-center gap-3 text-teal-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <div className="h-px w-6 bg-teal-600" />
              Registration
            </span>
          </div>
        </div>

        {/* CARTE D'INSCRIPTION BRUTALISTE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 md:p-10 border-2 border-slate-900 shadow-[16px_16px_0px_0px_rgba(15,23,42,1)]"
        >
          
          {/* SÉLECTEUR DE RÔLE BRUTALISTE */}
          <div className="mb-8 flex border-2 border-slate-200 p-1 bg-[#F8F8F8]">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                role === 'student'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('professor')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                role === 'professor'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-teal-600 hover:bg-slate-200/50'
              }`}
            >
              Professor
            </button>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            
            {/* FULL NAME */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 pl-12 rounded-none border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-teal-500 font-medium transition-colors"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.dz"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-12 rounded-none border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-teal-500 font-medium transition-colors"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 rounded-none border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-teal-500 font-medium transition-colors"
                />
              </div>
            </div>

            {/* REPEAT PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="repeat-password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="Repeat your password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="h-12 pl-12 rounded-none border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-teal-500 font-medium transition-colors"
                />
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border-l-4 border-red-600 p-3 text-xs font-bold text-red-600"
              >
                {error}
              </motion.div>
            )}

            {/* SUBMIT BUTTON */}
            <Button 
              type="submit" 
              className={`mt-4 h-14 w-full rounded-none text-xs font-black uppercase tracking-[0.2em] text-white transition-colors disabled:opacity-70 border-2 ${
                role === 'professor' 
                  ? 'bg-teal-600 border-teal-600 hover:bg-slate-900 hover:border-slate-900' 
                  : 'bg-slate-900 border-slate-900 hover:bg-teal-500 hover:border-teal-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating profile...
                </>
              ) : (
                `Enroll as ${role}`
              )}
            </Button>
          </form>

          {/* LIEN DE CONNEXION */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            Already enrolled?{' '}
            <Link href="/auth/login" className="font-black text-slate-900 hover:text-teal-500 transition-colors">
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* PETIT TEXTE ADDITIONNEL */}
        <p className="mt-12 text-center text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
          © 2026 Next-Edu. Secured by Supabase.
        </p>
      </div>
    </div>
  )
}