'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, BarChart3, TrendingUp, ArrowLeft, Filter } from 'lucide-react'
import Link from 'next/link'

interface Grade {
  id: string
  grade: number
  max_grade: number
  assessment_type: string
  assigned_at: string
  courses: {
    title: string
    code: string
    color: string
  }
}

export default function GradesPage() {
  const supabase = createClient()
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchGrades()
  }, [])

  const fetchGrades = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('grades')
      .select('*, courses(title, code, color)')
      .eq('student_id', user.id)
      .order('assigned_at', { ascending: false })

    if (data) setGrades(data)
    setLoading(false)
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-[#4E9F86]'
    if (percentage >= 70) return 'text-[#1E5D88]'
    if (percentage >= 50) return 'text-[#F3B664]'
    return 'text-red-500'
  }

  const getGradeBg = (percentage: number) => {
    if (percentage >= 90) return 'bg-[#4E9F86]'
    if (percentage >= 70) return 'bg-[#1E5D88]'
    if (percentage >= 50) return 'bg-[#F3B664]'
    return 'bg-red-500'
  }

  const filteredGrades = filter === 'all' 
    ? grades 
    : grades.filter(g => g.assessment_type.toLowerCase() === filter)

  const average = grades.length > 0
    ? Math.round(grades.reduce((acc, g) => acc + (g.grade / g.max_grade * 100), 0) / grades.length)
    : 0

  const assessmentTypes = [...new Set(grades.map(g => g.assessment_type))]

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/dashboard/student" className="flex items-center gap-2 text-[#4E9F86] font-bold uppercase text-xs tracking-widest mb-2 hover:underline">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1E5D88] uppercase">
            My Grades
          </h1>
          <p className="mt-1 text-lg font-medium text-[#4E9F86]">
            View and track your academic performance
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-[2rem] border-none bg-[#1E5D88] text-white shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-[#F3B664]" />
            <div>
              <p className="text-2xl font-black">{grades.length}</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Total Grades</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-none bg-[#4E9F86] text-white shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <TrendingUp className="h-8 w-8 text-[#F3B664]" />
            <div>
              <p className="text-2xl font-black">{average}%</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Average Score</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-none bg-[#F3B664] text-white shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-white" />
            <div>
              <p className="text-2xl font-black">{new Set(grades.map(g => g.courses?.title)).size}</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Courses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      {assessmentTypes.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-[#4E9F86]" />
          <Button
            onClick={() => setFilter('all')}
            className={`rounded-full text-xs font-black uppercase tracking-widest h-8 px-4 ${
              filter === 'all' 
                ? 'bg-[#4E9F86] text-white' 
                : 'bg-white text-[#2D5A4C] border border-[#4E9F86]/20'
            }`}
          >
            All
          </Button>
          {assessmentTypes.map(type => (
            <Button
              key={type}
              onClick={() => setFilter(type.toLowerCase())}
              className={`rounded-full text-xs font-black uppercase tracking-widest h-8 px-4 ${
                filter === type.toLowerCase() 
                  ? 'bg-[#4E9F86] text-white' 
                  : 'bg-white text-[#2D5A4C] border border-[#4E9F86]/20'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      )}

      {/* Grades List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4E9F86] border-t-transparent" />
        </div>
      ) : filteredGrades.length === 0 ? (
        <Card className="rounded-[2.5rem] border-[#F3B664]/20 bg-white/50 p-12 text-center">
          <BarChart3 className="h-12 w-12 text-[#F3B664]/30 mx-auto mb-4" />
          <p className="text-[#2D5A4C]/50 font-bold uppercase text-sm">No grades yet</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGrades.map((grade) => {
            const percentage = Math.round((grade.grade / grade.max_grade) * 100)
            return (
              <Card key={grade.id} className="rounded-[2rem] border-none bg-white shadow-lg shadow-[#4E9F86]/5 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-black text-[#2D5A4C] uppercase text-sm">{grade.courses?.title || 'Course'}</p>
                      <p className="text-xs text-[#4E9F86] font-bold uppercase tracking-widest">{grade.courses?.code || ''}</p>
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#FDF1E1] ${getGradeColor(percentage)}`}>
                      {grade.assessment_type}
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className={`text-4xl font-black ${getGradeColor(percentage)}`}>
                        {grade.grade}
                        <span className="text-lg text-[#2D5A4C]/30">/{grade.max_grade}</span>
                      </p>
                      <p className="text-xs text-[#2D5A4C]/50 mt-1">
                        {new Date(grade.assigned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#FDF1E1]">
                      <span className={`text-xl font-black ${getGradeColor(percentage)}`}>{percentage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
