'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  GraduationCap, BookOpen, LayoutDashboard, User, Brain, Calendar,
  Bell, LogOut, Menu, X, BarChart3, Upload, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const studentLinks = [
  { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/student/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/student/schedule', label: 'Study Plan', icon: Calendar },
  { href: '/dashboard/student/ai-coach', label: 'AI Coach', icon: Brain },
  { href: '/dashboard/student/grades', label: 'Grades', icon: BarChart3 },
  { href: '/dashboard/student/notifications', label: 'Notifications', icon: Bell },
  { href: '/dashboard/student/profile', label: 'Profile', icon: User },
]

const professorLinks = [
  { href: '/dashboard/professor', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/professor/courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/professor/upload', label: 'Upload Materials', icon: Upload },
  { href: '/dashboard/professor/students', label: 'Students', icon: Users },
  { href: '/dashboard/professor/grades', label: 'Manage Grades', icon: BarChart3 },
  { href: '/dashboard/professor/profile', label: 'Profile', icon: User },
]

export function DashboardSidebar({ role, userName }: { role: 'student' | 'professor'; userName: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = role === 'student' ? studentLinks : professorLinks

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const navContent = (
    <div className="flex h-full flex-col bg-[#F8F8F8] border-r border-slate-200/80 font-sans shadow-xl w-56 fixed left-0 top-0">
      {/* LOGO SECTION - Plus grande */}
      <div className="flex items-center gap-4 px-8 py-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5D88] shadow-lg shadow-[#1E5D88]/30 text-white shrink-0">
          <GraduationCap className="h-7 w-7" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-lg font-black uppercase tracking-tighter text-[#1E5D88]">Easy</span>
          <span className="text-lg font-black uppercase tracking-tighter text-[#1E5D88]">University</span>
        </div>
      </div>

      {/* NAVIGATION - Boutons plus larges et hauts */}
      <nav className="flex-1 px-5 py-4 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 rounded-[1.25rem] px-5 py-4 text-[13px] font-black uppercase tracking-[0.1em] transition-all duration-200 ${
                  isActive
                    ? 'bg-[#4E9F86] text-white shadow-lg shadow-[#4E9F86]/20 scale-[1.02]'
                    : 'text-[#2D5A4C]/70 hover:bg-white hover:text-[#4E9F86] hover:translate-x-1 shadow-none'
                }`}
              >
                <link.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-[#4E9F86]'}`} />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* FOOTER SECTION - Profil plus large */}
      <div className="p-6 mt-auto bg-gradient-to-t from-slate-100/70 to-transparent">
        <div className="rounded-[2.5rem] bg-white p-5 border border-slate-200 shadow-lg shadow-slate-900/5">
            <div className="mb-5 flex items-center gap-4 px-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-white font-black text-xl shadow-md">
                    {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-[15px] font-black text-[#1E5D88] uppercase tracking-tight leading-tight">{userName || 'User'}</span>
                    <span className="text-[10px] font-bold text-[#4E9F86] uppercase tracking-widest">{role} Portal</span>
                </div>
            </div>
            <Button 
                variant="ghost" 
                className="w-full h-12 justify-start gap-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95" 
                onClick={handleLogout}
            >
                <LogOut className="h-5 w-5" />
                Sign Out
            </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* MOBILE TRIGGER - Plus gros pour les pouces */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white text-[#1E5D88] shadow-2xl lg:hidden transition-transform active:scale-90"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div 
            className="fixed inset-0 z-40 bg-[#1E5D88]/40 backdrop-blur-md lg:hidden transition-opacity" 
            onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* SIDEBAR - Un peu plus large pour accommoder les gros boutons */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-80 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {navContent}
      </aside>
    </>
  )
}