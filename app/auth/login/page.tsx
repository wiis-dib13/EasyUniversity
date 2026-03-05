'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GraduationCap, Mail, Lock, Loader2 } from 'lucide-react'
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
    // FOND BEIGE ET POLICE SANS-SERIF DU THEME
    <div className="flex min-h-screen items-center justify-center bg-[#FDF1E1] px-4 font-sans selection:bg-[#F3B664]/30 relative overflow-hidden">
      
      {/* FORMES ORGANIQUES EN ARRIERE-PLAN (Style Dribbble) */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#F3B664] rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#4E9F86] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="relative w-full max-w-md z-10">
        
        {/* EN-TÊTE / LOGO */}
        <div className="mb-10 flex flex-col items-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[#1E5D88] shadow-lg shadow-[#1E5D88]/20">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div className="text-center leading-none mb-2">
            <span className="block text-2xl font-black uppercase tracking-tighter text-[#1E5D88]">Easy</span>
            <span className="block text-2xl font-black uppercase tracking-tighter text-[#1E5D88]">University</span>
          </div>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4E9F86]">
            Welcome Back
          </p>
        </div>

        {/* CARTE DE CONNEXION (Transparente, arrondie, style moderne) */}
        <div className="rounded-[2.5rem] border border-[#F3B664]/20 bg-white/70 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-[#4E9F86]/10">
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
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
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              className="mt-2 h-14 w-full rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-[#4E9F86]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100" 
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
          <div className="mt-8 text-center text-sm font-medium text-[#2D5A4C]/60">
            {"Don't have an account? "}
            <Link href="/auth/sign-up" className="font-bold text-[#1E5D88] hover:text-[#4E9F86] transition-colors hover:underline underline-offset-4">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}