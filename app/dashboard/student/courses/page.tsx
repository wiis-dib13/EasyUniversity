import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { StudentCoursesContent } from '@/components/student/courses-content'

export default async function StudentCourses() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*, profiles(full_name))')
    .eq('student_id', user.id)

  const { data: allCourses } = await supabase
    .from('courses')
    .select('*, profiles(full_name)')

  const enrolledIds = new Set((enrollments || []).map((e) => e.course_id))
  const availableCourses = (allCourses || []).filter((c) => !enrolledIds.has(c.id))

  return (
    <StudentCoursesContent
      enrollments={enrollments || []}
      availableCourses={availableCourses}
      userId={user.id}
    />
  )
}
