import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FileText, Download, BookOpen, Clock, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: course } = await supabase
    .from('courses')
    .select('*, profiles(full_name)')
    .eq('id', id)
    .single()

  const { data: materials } = await supabase
    .from('materials')
    .select('*')
    .eq('course_id', id)
    .order('created_at', { ascending: false })

  if (!course) redirect('/dashboard/student/courses')

  const professor = course.profiles as Record<string, unknown>

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-primary-foreground" style={{ backgroundColor: course.color || '#6366f1' }}>
          {course.title.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {professor?.full_name as string || 'Professor'}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.code}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.recommended_hours}h/week recommended</span>
          </div>
        </div>
      </div>

      {course.description && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">About This Course</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">{course.description}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Course Materials</CardTitle>
        </CardHeader>
        <CardContent>
          {!materials || materials.length === 0 ? (
            <div className="py-8 text-center">
              <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No materials uploaded yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{material.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{material.type} {material.file_size ? `- ${(material.file_size / 1024 / 1024).toFixed(1)}MB` : ''}</p>
                    </div>
                  </div>
                  {material.file_url && (
                    <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
