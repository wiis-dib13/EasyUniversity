'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const colors = {
    bg: "#F2F7F9",
    teal: "#107B75",
    orange: "#FB6F4A",
    textDark: "#1E293B",
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user!.id)
        .single()

      if (profile?.role === 'professor') {
        toast({
          title: 'Welcome back, Professor!',
          description: 'Redirecting to your dashboard...',
        })
        router.push('/dashboard/professor')
      } else {
        toast({
          title: 'Welcome back!',
          description: 'Redirecting to your dashboard...',
        })
        router.push('/dashboard/student')
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-[#107B75]/20 relative" style={{ backgroundColor: colors.bg }}>
      
      {/* ── FLECHE DE RETOUR ── */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-xl transition-all group"
      >
        <ArrowLeft size={20} className="text-[#107B75] group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold text-[#1E293B]">Retour</span>
      </Link>

      {/* FORMES ORGANIQUES EN ARRIERE-PLAN (style next-edu) */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#107B75]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FB6F4A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#107B75]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
        <div className="w-full max-w-md">
          
          {/* EN-TÊTE / LOGO avec 1.png - CORRIGÉ */}
          <div className="mb-8 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#107B75] shadow-xl shadow-[#107B75]/20"
            >
              <img 
                src="/1.png" 
                alt="Next Edu Logo" 
                className="h-10 w-10 object-contain"
              />
            </motion.div>
            <div className="text-center leading-none mb-2">
              <span className="block text-3xl font-black tracking-tighter text-[#1E293B]">
                next<span className="text-[#107B75]">-edu</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100">
              <span className="h-2 w-2 rounded-full bg-[#FB6F4A] animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1E293B]">
                Welcome Back
              </p>
            </div>
          </div>

          {/* CARTE DE CONNEXION (style next-edu) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2.5rem] bg-white p-8 sm:p-10 shadow-2xl border border-slate-100"
          >
            
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              
              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-[#1E293B] ml-2">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#107B75]/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.dz"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 pl-12 rounded-2xl border-slate-200 bg-white text-[#1E293B] placeholder:text-[#1E293B]/30 focus-visible:ring-[#107B75] focus-visible:border-transparent font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-[#1E293B] ml-2">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#107B75]/50" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 rounded-2xl border-slate-200 bg-white text-[#1E293B] placeholder:text-[#1E293B]/30 focus-visible:ring-[#107B75] focus-visible:border-transparent font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* LIEN MOT DE PASSE OUBLIÉ */}
              <div className="flex justify-end">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs font-bold text-[#107B75] hover:text-[#FB6F4A] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600 flex items-center gap-2"
                >
                  <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                  {error}
                </motion.div>
              )}

              {/* SUBMIT BUTTON */}
              <Button 
                type="submit" 
                className="mt-2 h-14 w-full rounded-2xl bg-[#107B75] hover:bg-[#0c5f5a] text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-[#107B75]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* LIEN D'INSCRIPTION */}
            <div className="mt-8 text-center text-sm font-medium text-[#1E293B]/60">
              {"Don't have an account? "}
              <Link href="/auth/sign-up" className="font-bold text-[#107B75] hover:text-[#FB6F4A] transition-colors hover:underline underline-offset-4">
                Create one
              </Link>
            </div>

            {/* BADGE DE SÉCURITÉ */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F7F9]">
                <div className="h-1.5 w-1.5 rounded-full bg-[#107B75]" />
                <span className="text-[8px] font-bold text-[#1E293B] uppercase tracking-widest">
                  Secured by Supabase
                </span>
              </div>
            </div>
          </motion.div>

          {/* PETIT TEXTE ADDITIONNEL */}
          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#1E293B]/40">
            © 2026 next-edu. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}