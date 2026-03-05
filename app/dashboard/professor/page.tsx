import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfessorDashboardContent } from '@/components/professor/dashboard-content'

export default async function ProfessorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('professor_id', user.id)

  const courseIds = (courses || []).map((c) => c.id)
  let totalStudents = 0
  let totalMaterials = 0

  if (courseIds.length > 0) {
    const { count: studentCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .in('course_id', courseIds)

    const { count: materialCount } = await supabase
      .from('materials')
      .select('*', { count: 'exact', head: true })
      .eq('professor_id', user.id)

    totalStudents = studentCount || 0
    totalMaterials = materialCount || 0
  }

  return (
    <ProfessorDashboardContent
      profile={profile}
      courses={courses || []}
      totalStudents={totalStudents}
      totalMaterials={totalMaterials}
    />
  )
}
