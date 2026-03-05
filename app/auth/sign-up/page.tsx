'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GraduationCap, Mail, Lock, User, Loader2 } from 'lucide-react'

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
    // FOND BEIGE ET POLICE SANS-SERIF DU THEME
    <div className="flex min-h-screen items-center justify-center bg-[#FDF1E1] px-4 py-12 font-sans selection:bg-[#F3B664]/30 relative overflow-hidden">
      
      {/* FORMES ORGANIQUES EN ARRIERE-PLAN */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#F3B664] rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4E9F86] rounded-full blur-[120px] opacity-10 pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        
        {/* EN-TÊTE / LOGO */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#1E5D88] shadow-lg shadow-[#1E5D88]/20">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div className="text-center leading-none mb-2">
            <span className="block text-2xl font-black uppercase tracking-tighter text-[#1E5D88]">Easy</span>
            <span className="block text-2xl font-black uppercase tracking-tighter text-[#1E5D88]">University</span>
          </div>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4E9F86]">
            Create Account
          </p>
        </div>

        {/* CARTE D'INSCRIPTION */}
        <div className="rounded-[2.5rem] border border-[#F3B664]/20 bg-white/70 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-[#4E9F86]/10">
          
          {/* SÉLECTEUR DE RÔLE (Student / Professor) */}
          <div className="mb-8 flex gap-2 rounded-2xl bg-white/60 p-1.5 border border-[#F3B664]/30 shadow-inner">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                role === 'student'
                  ? 'bg-[#4E9F86] text-white shadow-md'
                  : 'text-[#2D5A4C]/60 hover:text-[#1E5D88] hover:bg-white/80'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('professor')}
              className={`flex-1 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                role === 'professor'
                  ? 'bg-[#1E5D88] text-white shadow-md'
                  : 'text-[#2D5A4C]/60 hover:text-[#1E5D88] hover:bg-white/80'
              }`}
            >
              Professor
            </button>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            
            {/* FULL NAME */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-widest text-[#1E5D88] ml-2">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4E9F86]/70" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 pl-12 rounded-2xl border-[#F3B664]/30 bg-white text-[#2D5A4C] placeholder:text-[#2D5A4C]/30 focus-visible:ring-[#4E9F86] focus-visible:border-transparent font-medium shadow-sm"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-[#1E5D88] ml-2">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4E9F86]/70" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.dz"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 rounded-2xl border-[#F3B664]/30 bg-white text-[#2D5A4C] placeholder:text-[#2D5A4C]/30 focus-visible:ring-[#4E9F86] focus-visible:border-transparent font-medium shadow-sm"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-[#1E5D88] ml-2">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4E9F86]/70" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pl-12 rounded-2xl border-[#F3B664]/30 bg-white text-[#2D5A4C] placeholder:text-[#2D5A4C]/30 focus-visible:ring-[#4E9F86] focus-visible:border-transparent font-medium shadow-sm"
                />
              </div>
            </div>

            {/* REPEAT PASSWORD */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="repeat-password" className="text-[10px] font-black uppercase tracking-widest text-[#1E5D88] ml-2">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4E9F86]/70" />
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="Repeat your password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="h-14 pl-12 rounded-2xl border-[#F3B664]/30 bg-white text-[#2D5A4C] placeholder:text-[#2D5A4C]/30 focus-visible:ring-[#4E9F86] focus-visible:border-transparent font-medium shadow-sm"
                />
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                {error}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <Button 
              type="submit" 
              className={`mt-4 h-14 w-full rounded-full text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 ${
                role === 'professor' 
                  ? 'bg-[#1E5D88] hover:bg-[#154669] shadow-[#1E5D88]/20' 
                  : 'bg-[#4E9F86] hover:bg-[#3d806b] shadow-[#4E9F86]/20'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                `Sign Up as ${role === 'student' ? 'Student' : 'Professor'}`
              )}
            </Button>
          </form>

          {/* LIEN DE CONNEXION */}
          <div className="mt-8 text-center text-sm font-medium text-[#2D5A4C]/60">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-bold text-[#1E5D88] hover:text-[#4E9F86] transition-colors hover:underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}