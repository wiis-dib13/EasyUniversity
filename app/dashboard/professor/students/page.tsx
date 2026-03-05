'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Users, Save } from 'lucide-react'

export default function ProfessorStudentsPage() {
  const [enrollments, setEnrollments] = useState<Record<string, unknown>[]>([])
  const [courses, setCourses] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: coursesData } = await supabase.from('courses').select('*').eq('professor_id', user.id)
    setCourses(coursesData || [])

    const courseIds = (coursesData || []).map((c) => c.id)
    if (courseIds.length > 0) {
      const { data: enrollData } = await supabase
        .from('enrollments')
        .select('*, profiles(full_name, email), courses(title, code)')
        .in('course_id', courseIds)
      setEnrollments(enrollData || [])
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center pt-12 lg:pt-0">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Students</h1>
        <p className="mt-1 text-muted-foreground">View enrolled students and their progress</p>
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <h3 className="mb-1 text-lg font-semibold text-foreground">No Students Enrolled</h3>
            <p className="text-sm text-muted-foreground">Students will appear here when they enroll in your courses.</p>
          </CardContent>
        </Card>
      ) : (
        courses.map((course) => {
          const courseEnrollments = enrollments.filter((e) => e.course_id === course.id)
          if (courseEnrollments.length === 0) return null
          return (
            <Card key={course.id as string}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-primary-foreground" style={{ backgroundColor: (course.color as string) || '#6366f1' }}>
                    {((course.title as string) || 'C').charAt(0)}
                  </div>
                  {course.title as string}
                  <span className="ml-auto text-sm font-normal text-muted-foreground">{courseEnrollments.length} students</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {courseEnrollments.map((enrollment) => {
                    const student = enrollment.profiles as Record<string, unknown>
                    return (
                      <div key={enrollment.id as string} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {((student?.full_name as string) || 'S').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{student?.full_name as string || 'Student'}</p>
                            <p className="text-xs text-muted-foreground">{student?.email as string}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary">{(enrollment.progress as number) || 0}% progress</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })
      )}
    </div>
  )
}
