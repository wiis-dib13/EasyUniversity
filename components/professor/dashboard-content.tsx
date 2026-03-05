'use client'

import React, { cloneElement, isValidElement } from 'react'
import Link from 'next/link'
import { BookOpen, Users, Upload, FileText, Plus, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  profile: Record<string, unknown> | null
  courses: Record<string, unknown>[]
  totalStudents: number
  totalMaterials: number
}

export function ProfessorDashboardContent({ profile, courses, totalStudents, totalMaterials }: Props) {
  const firstName = ((profile?.full_name as string) || 'Professor').split(' ')[0]

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans selection:bg-[#F3B664]/30">
      
      {/* GREETING SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1E5D88] uppercase">
            Welcome, Prof. {firstName}
          </h1>
          <p className="mt-1 text-lg font-medium text-[#4E9F86]">
            Ready to manage your English modules and students?
          </p>
        </div>
        <Link href="/dashboard/professor/courses">
          <Button className="h-14 px-8 rounded-full bg-[#1E5D88] hover:bg-[#154363] text-white font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95 gap-2">
            <Plus className="h-5 w-5" /> Create Course
          </Button>
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard icon={<BookOpen />} label="Total Courses" value={courses.length} color="bg-[#4E9F86]" />
        <StatCard icon={<Users />} label="Total Students" value={totalStudents} color="bg-[#1E5D88]" />
        <StatCard icon={<FileText />} label="Materials Uploaded" value={totalMaterials} color="bg-[#F3B664]" />
      </div>

      {/* COURSES SECTION */}
      <Card className="rounded-[2.5rem] border-[#F3B664]/20 bg-white/50 shadow-xl shadow-[#4E9F86]/5 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-4">
          <CardTitle className="text-xl font-black uppercase tracking-tighter text-[#1E5D88]">Your Active Courses</CardTitle>
          <Link href="/dashboard/professor/courses" className="text-xs font-black uppercase tracking-widest text-[#4E9F86] hover:underline">Manage All</Link>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          {courses.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center">
              <div className="h-20 w-20 bg-[#FDF1E1] rounded-full flex items-center justify-center text-[#4E9F86] mb-4">
                <BookOpen className="h-10 w-10 opacity-40" />
              </div>
              <h3 className="font-black text-[#1E5D88] uppercase tracking-tight text-xl mb-2">No Courses Yet</h3>
              <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs">Start by creating your first English module for your students.</p>
              <Link href="/dashboard/professor/courses">
                <Button className="rounded-full bg-[#4E9F86] text-white font-black uppercase px-8 h-12 tracking-widest">
                  <Plus className="mr-2 h-4 w-4" /> Create First Course
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div key={course.id as string} className="group rounded-[2rem] bg-white p-5 shadow-sm border border-transparent hover:border-[#4E9F86]/30 transition-all hover:shadow-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-md" style={{ backgroundColor: (course.color as string) || '#4E9F86' }}>
                      {((course.title as string) || 'C').charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-black text-[#1E5D88] truncate uppercase text-sm tracking-tight leading-tight">{course.title as string}</p>
                      <p className="text-[10px] font-bold text-[#4E9F86] uppercase tracking-widest mt-1">{course.code as string} • {course.semester as string}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <Link href={`/dashboard/professor/upload?course=${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full h-11 rounded-xl border-[#F3B664]/30 text-[#1E5D88] font-black uppercase text-[10px] tracking-widest hover:bg-[#FDF1E1] gap-2">
                        <Upload className="h-3.5 w-3.5" /> Upload
                      </Button>
                    </Link>
                    <Link href="/dashboard/professor/students" className="flex-1">
                      <Button variant="ghost" className="w-full h-11 rounded-xl text-[#4E9F86] font-black uppercase text-[10px] tracking-widest hover:bg-[#4E9F86]/10 gap-2">
                        <Users className="h-3.5 w-3.5" /> Students
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// STYLED STAT CARD
function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-[#4E9F86]/5 overflow-hidden transition-transform hover:scale-105">
      <CardContent className="flex items-center gap-5 p-6">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-md ${color} text-white`}>
          {isValidElement(icon) ? cloneElement(icon as React.ReactElement<any>, { className: "h-7 w-7" }) : icon}
        </div>
        <div>
          <p className="text-3xl font-black text-[#1E5D88] tracking-tighter leading-none">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C]/40 mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}