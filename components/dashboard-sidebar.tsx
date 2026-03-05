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
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-sidebar-foreground">EasyEducation</span>
          <span className="text-xs text-muted-foreground capitalize">{role} Portal</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <div className="mb-3 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary/10 text-sm font-semibold text-sidebar-primary">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">{userName || 'User'}</span>
            <span className="text-xs text-muted-foreground capitalize">{role}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card shadow-sm lg:hidden"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {navContent}
      </aside>
    </>
  )
}
