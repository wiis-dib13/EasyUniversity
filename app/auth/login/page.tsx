"use client"

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
    <div className="min-h-screen bg-[#F8F8F8] font-sans selection:bg-teal-500/30 relative flex flex-col justify-center items-center overflow-hidden">
      
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-slate-200/40 leading-none select-none z-0 pointer-events-none tracking-tighter">
        AUTH.
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* EN-TÊTE / LOGO */}
        <div className="mb-10 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex h-16 w-16 items-center justify-center bg-slate-900 border-2 border-slate-900 shadow-[8px_8px_0px_0px_#14b8a6]"
          >
            {/* Si tu as un vrai logo 1.png, tu peux le remettre ici, sinon la lettrine colle bien au style */}
            <span className="text-white font-black text-3xl leading-none">Q</span>
          </motion.div>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">
              WELCOME <br/> BACK<span className="text-teal-500">.</span>
            </h1>
            <span className="inline-flex items-center gap-3 text-teal-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <div className="h-px w-6 bg-teal-600" />
              Portal Access
            </span>
          </div>
        </div>

        {/* CARTE DE CONNEXION BRUTALISTE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 md:p-10 border-2 border-slate-900 shadow-[16px_16px_0px_0px_rgba(15,23,42,1)]"
        >
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
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
                  className="h-14 pl-12 rounded-none border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-teal-500 font-medium transition-colors"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                  Password
                </Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-[10px] font-bold text-teal-600 hover:text-slate-900 transition-colors underline decoration-transparent hover:decoration-slate-900 underline-offset-4"
                >
                  Forgot it?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 rounded-none border-2 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:border-teal-500 font-medium transition-colors"
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
              className="mt-4 h-14 w-full rounded-none bg-slate-900 hover:bg-teal-500 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors disabled:opacity-70" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Log In To Campus'
              )}
            </Button>
          </form>

          {/* LIEN D'INSCRIPTION */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[11px] font-medium text-slate-500 uppercase tracking-widest">
            New here?{' '}
            <Link href="/auth/sign-up" className="font-black text-slate-900 hover:text-teal-500 transition-colors">
              Apply Now
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