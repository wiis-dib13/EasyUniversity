'use client'

import { createClient } from '@/lib/supabase/client'
import { BookOpen, Plus, FileText, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  enrollments: Record<string, unknown>[]
  availableCourses: Record<string, unknown>[]
  userId: string
}

export function StudentCoursesContent({ enrollments, availableCourses, userId }: Props) {
  const [enrolling, setEnrolling] = useState<string | null>(null)
  const [localEnrollments, setLocalEnrollments] = useState(enrollments)
  const [localAvailable, setLocalAvailable] = useState(availableCourses)

  const handleEnroll = async (courseId: string) => {
    setEnrolling(courseId)
    const supabase = createClient()
    const { error } = await supabase.from('enrollments').insert({
      student_id: userId,
      course_id: courseId,
    })
    if (!error) {
      const course = localAvailable.find((c) => c.id === courseId)
      if (course) {
        setLocalEnrollments([...localEnrollments, { id: crypto.randomUUID(), course_id: courseId, progress: 0, courses: course }])
        setLocalAvailable(localAvailable.filter((c) => c.id !== courseId))
      }
    }
    setEnrolling(null)
  }

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
        <p className="mt-1 text-muted-foreground">Manage your enrolled courses and discover new ones</p>
      </div>

      {localEnrollments.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Enrolled Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localEnrollments.map((enrollment) => {
              const course = enrollment.courses as Record<string, unknown>
              const professor = course?.profiles as Record<string, unknown>
              return (
                <Link key={enrollment.id as string} href={`/dashboard/student/courses/${course?.id}`}>
                  <Card className="transition-all hover:border-primary/20 hover:shadow-md cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground" style={{ backgroundColor: (course?.color as string) || '#6366f1' }}>
                          {((course?.title as string) || 'C').charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{course?.title as string}</CardTitle>
                          <p className="text-xs text-muted-foreground">By {professor?.full_name as string || 'Professor'}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <Progress value={(enrollment.progress as number) || 0} className="flex-1" />
                        <span className="text-xs font-medium text-muted-foreground">{(enrollment.progress as number) || 0}%</span>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {course?.code as string}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course?.recommended_hours as number || 3}h/week</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {localAvailable.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Available Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localAvailable.map((course) => {
              const professor = course.profiles as Record<string, unknown>
              return (
                <Card key={course.id as string}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground" style={{ backgroundColor: (course?.color as string) || '#6366f1' }}>
                        {((course?.title as string) || 'C').charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-base">{course?.title as string}</CardTitle>
                        <p className="text-xs text-muted-foreground">By {professor?.full_name as string || 'Professor'}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{course?.description as string || 'No description available'}</p>
                    <Button
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleEnroll(course.id as string)}
                      disabled={enrolling === (course.id as string)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {enrolling === (course.id as string) ? 'Enrolling...' : 'Enroll'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {localEnrollments.length === 0 && localAvailable.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <h3 className="mb-1 text-lg font-semibold text-foreground">No Courses Available</h3>
            <p className="text-sm text-muted-foreground">Courses will appear here when professors create them.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
