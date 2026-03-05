'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignUpSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDF1E1] px-4 font-sans selection:bg-[#F3B664]/30">
      {/* EFFET DE FOND (Blob Orange) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#F3B664_0%,_transparent_25%)] opacity-30" />
      
      <div className="relative w-full max-w-md">
        {/* LOGO SECTION */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[#1E5D88] shadow-2xl shadow-[#1E5D88]/30">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div className="leading-none">
            <span className="block text-2xl font-black uppercase tracking-tighter text-[#1E5D88]">Easy</span>
            <span className="block text-2xl font-black uppercase tracking-tighter text-[#1E5D88]">University</span>
          </div>
        </div>

        {/* MAIN CARD */}
        <Card className="rounded-[3rem] border-none bg-white shadow-2xl shadow-[#4E9F86]/10 overflow-hidden">
          <CardHeader className="text-center pt-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#4E9F86]/10 text-[#4E9F86]">
              <Mail className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tighter text-[#1E5D88]">
              Check Your Email
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center px-8 pb-10">
            <p className="mb-8 text-base font-medium leading-relaxed text-[#2D5A4C]/70">
              {"Awesome! We've sent a confirmation link to your inbox. Click it to activate your account and start your journey with us."}
            </p>

            <div className="space-y-4">
              <Link href="/auth/login" className="block">
                <Button className="w-full h-14 rounded-2xl bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-[1.02] active:scale-95">
                  Back to Sign In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F3B664]">
                Check your spam folder if you don't see it!
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-[#2D5A4C]/40">
          © 2026 EasyUniversity • Higher Education Simplified
        </p>
      </div>
    </div>
  )
}