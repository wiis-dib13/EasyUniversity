'use client'

import React, { cloneElement, isValidElement } from 'react'
import Link from 'next/link'
import { BookOpen, Brain, Calendar, Bell, BarChart3, ArrowRight, Clock, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface Props {
  profile: Record<string, unknown> | null
  enrollments: Record<string, unknown>[]
  reminders: Record<string, unknown>[]
  grades: Record<string, unknown>[]
  needsQuestionnaire: boolean
}

export function StudentDashboardContent({ profile, enrollments, reminders, grades, needsQuestionnaire }: Props) {
  const firstName = ((profile?.full_name as string) || 'Student').split(' ')[0]

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans selection:bg-teal-500/30">
      
      {/* GREETING SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1E5D88] uppercase">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-lg font-medium text-[#4E9F86]">
            {"Ready to master your English modules today?"}
          </p>
        </div>

      </div>

      {/* AI COACH CALL TO ACTION */}
      {needsQuestionnaire && (
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1E5D88] p-1 shadow-xl shadow-[#1E5D88]/20">
            <div className="rounded-[2.4rem] bg-[#1E5D88] px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F3B664] text-white shadow-lg">
                        <Brain className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Personalize Your AI Coach</h3>
                        <p className="text-[#FDF1E1]/70 font-medium max-w-md text-sm md:text-base">
                            Answer 4 quick questions to get a customized study schedule for your English degree.
                        </p>
                    </div>
                </div>
                <Link href="/dashboard/student/schedule?setup=true" className="w-full md:w-auto relative z-10">
                    <Button className="w-full md:w-auto h-14 px-8 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
      )}

      {/* STATS GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<BookOpen />} label="Enrolled Courses" value={enrollments.length} color="bg-[#4E9F86]" />
        <StatCard icon={<Calendar />} label="Study Sessions" value={reminders.length} color="bg-[#1E5D88]" />
        <StatCard icon={<BarChart3 />} label="Grades Received" value={grades.length} color="bg-[#F3B664]" />
        <StatCard icon={<Bell />} label="Notifications" value={reminders.length} color="bg-white border-2 border-[#F3B664]/20" isDarkText={true} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* MY COURSES */}
        <Card className="rounded-[2.5rem] border-slate-200 bg-white/70 shadow-xl shadow-slate-900/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-black uppercase tracking-tighter text-[#1E5D88]">My Courses</CardTitle>
            <Link href="/dashboard/student/courses" className="text-xs font-black uppercase tracking-widest text-[#4E9F86] hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="px-6 pb-8 flex flex-col gap-4">
            {enrollments.length === 0 ? (
              <EmptyState icon={<BookOpen />} text="No courses yet" link="/dashboard/student/courses" btnText="Browse Courses" />
            ) : (
              enrollments.slice(0, 4).map((enrollment) => (
                <div key={enrollment.id as string} className="group flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm border border-transparent hover:border-[#4E9F86]/30 transition-all">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-md" style={{ backgroundColor: ((enrollment.courses as any)?.color as string) || '#4E9F86' }}>
                    {((enrollment.courses as any)?.title as string || 'C').charAt(0)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-black text-[#1E5D88] truncate uppercase text-sm tracking-tight">{(enrollment.courses as any)?.title as string}</p>
                    <p className="text-[10px] font-bold text-[#4E9F86] uppercase tracking-widest opacity-70">{(enrollment.courses as any)?.code as string}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                      <Progress value={(enrollment.progress as number) || 0} className="w-16 md:w-24 h-2 bg-slate-200" />
                      <span className="text-[10px] font-black text-[#1E5D88]">{(enrollment.progress as number) || 0}%</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* STUDY SESSIONS */}
        <Card className="rounded-[2.5rem] border-slate-200 bg-white/70 shadow-xl shadow-slate-900/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-black uppercase tracking-tighter text-[#1E5D88]">Upcoming Sessions</CardTitle>
            <Link href="/dashboard/student/schedule" className="text-xs font-black uppercase tracking-widest text-[#4E9F86] hover:underline">Full Schedule</Link>
          </CardHeader>
          <CardContent className="px-6 pb-8 flex flex-col gap-4">
            {reminders.length === 0 ? (
              <EmptyState icon={<Clock />} text="No upcoming sessions" link="/dashboard/student/schedule" btnText="Set Up Plan" />
            ) : (
              reminders.map((reminder) => (
                <div key={reminder.id as string} className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm border border-transparent hover:border-teal-500/30 transition-all">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#2D5A4C] text-sm uppercase tracking-tight leading-none mb-1">{reminder.title as string}</p>
                    <p className="text-[10px] font-bold text-[#2D5A4C]/50 uppercase tracking-widest">
                      {new Date(reminder.reminder_time as string).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full text-[#4E9F86] hover:bg-[#4E9F86]/10">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* GRADES */}
      {grades.length > 0 && (
        <Card className="rounded-[2.5rem] border-slate-200 bg-white/70 shadow-xl shadow-slate-900/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-4">
            <CardTitle className="text-xl font-black uppercase tracking-tighter text-[#1E5D88]">Recent Grades</CardTitle>
            <Link href="/dashboard/student/grades" className="text-xs font-black uppercase tracking-widest text-[#4E9F86] hover:underline">View All Scores</Link>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {grades.map((grade) => (
                <div key={grade.id as string} className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
                  <div>
                    <p className="font-black text-[#1E5D88] uppercase text-xs">{(grade.courses as any)?.title as string}</p>
                    <p className="text-[10px] font-bold text-[#4E9F86] uppercase tracking-widest mt-1">{grade.assessment_type as string}</p>
                  </div>
                  <p className="text-2xl font-black text-teal-600">{grade.grade as number}<span className="text-xs text-[#2D5A4C]/30 ml-1">/{grade.max_grade as number}</span></p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// HELPERS COMPONENTS
function StatCard({ icon, label, value, color, isDarkText = false }: { icon: React.ReactNode; label: string; value: number; color: string; isDarkText?: boolean }) {
  return (
    <Card className="rounded-[2rem] border-none bg-white shadow-xl shadow-slate-900/5 overflow-hidden transition-transform hover:scale-105">
      <CardContent className="flex items-center gap-5 p-6">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-md ${color} ${!isDarkText ? 'text-white' : 'text-teal-600'}`}>
          {isValidElement(icon) ? cloneElement(icon as React.ReactElement<any>, { className: "h-6 w-6" }) : icon}
        </div>
        <div>
          <p className="text-3xl font-black text-[#2D5A4C] tracking-tighter">{value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#2D5A4C]/40">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ icon, text, link, btnText }: { icon: React.ReactNode; text: string; link: string; btnText: string }) {
    return (
        <div className="py-10 text-center flex flex-col items-center">
      <div className="h-16 w-16 bg-teal-500/10 rounded-full flex items-center justify-center text-[#4E9F86] mb-4">
                {isValidElement(icon) ? cloneElement(icon as React.ReactElement<any>, { className: "h-8 w-8 opacity-40" }) : icon}
            </div>
            <p className="font-bold text-[#2D5A4C]/50 uppercase text-xs tracking-widest mb-4">{text}</p>
            <Link href={link}>
                <Button size="sm" variant="outline" className="rounded-full border-[#4E9F86] text-[#4E9F86] font-black uppercase text-[10px] tracking-widest hover:bg-[#4E9F86] hover:text-white transition-colors">
                    {btnText}
                </Button>
            </Link>
        </div>
    )
}