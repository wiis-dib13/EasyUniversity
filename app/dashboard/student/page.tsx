import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { StudentDashboardContent } from '@/components/student/dashboard-content'

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: questionnaire } = await supabase
    .from('study_plans')
    .select('*')
    .eq('user_id', user.id)
    .limit(1)
    .single()

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('student_id', user.id)

  const { data: reminders } = await supabase
    .from('study_reminders')
    .select('*')
    .eq('student_id', user.id)
    .eq('is_read', false)
    .order('reminder_time', { ascending: true })
    .limit(5)

  const { data: grades } = await supabase
    .from('grades')
    .select('*, courses(title)')
    .eq('student_id', user.id)
    .order('assigned_at', { ascending: false })
    .limit(5)

  const needsQuestionnaire = !questionnaire || !questionnaire.id

  return (
    <StudentDashboardContent
      profile={profile}
      enrollments={enrollments || []}
      reminders={reminders || []}
      grades={grades || []}
      needsQuestionnaire={needsQuestionnaire}
    />
  )
}
