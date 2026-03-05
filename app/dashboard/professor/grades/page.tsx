'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, BarChart3, Save, CheckCircle } from 'lucide-react'

export default function ProfessorGradesPage() {
  const [courses, setCourses] = useState<Record<string, unknown>[]>([])
  const [enrollments, setEnrollments] = useState<Record<string, unknown>[]>([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [gradeInputs, setGradeInputs] = useState<Record<string, { grade: string; feedback: string; type: string }>>({})

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: coursesData } = await supabase.from('courses').select('*').eq('professor_id', user.id)
    setCourses(coursesData || [])
    setLoading(false)
  }

  async function loadStudents(courseId: string) {
    setSelectedCourse(courseId)
    const supabase = createClient()
    const { data } = await supabase.from('enrollments').select('*, profiles(full_name, email)').eq('course_id', courseId)
    setEnrollments(data || [])
    const inputs: Record<string, { grade: string; feedback: string; type: string }> = {}
    ;(data || []).forEach((e) => {
      inputs[e.student_id] = { grade: '', feedback: '', type: 'exam' }
    })
    setGradeInputs(inputs)
  }

  async function handleSaveGrades() {
    setSaving(true)
    const supabase = createClient()
    const grades = Object.entries(gradeInputs)
      .filter(([, v]) => v.grade)
      .map(([studentId, v]) => ({
        student_id: studentId,
        course_id: selectedCourse,
        grade: parseFloat(v.grade),
        feedback: v.feedback,
        assessment_type: v.type,
      }))

    if (grades.length > 0) {
      await supabase.from('grades').insert(grades)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
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
        <h1 className="text-2xl font-bold text-foreground">Manage Grades</h1>
        <p className="mt-1 text-muted-foreground">Assign grades and provide feedback to students</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Select Course</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {courses.map((c) => (
              <Button key={c.id as string} variant={selectedCourse === c.id ? 'default' : 'outline'} size="sm" onClick={() => loadStudents(c.id as string)}>
                {c.title as string}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCourse && enrollments.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Assign Grades</CardTitle>
            <div className="flex items-center gap-2">
              {success && (
                <span className="flex items-center gap-1.5 text-sm text-success"><CheckCircle className="h-4 w-4" /> Saved</span>
              )}
              <Button onClick={handleSaveGrades} disabled={saving} size="sm" className="gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Grades
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {enrollments.map((enrollment) => {
                const student = enrollment.profiles as Record<string, unknown>
                const studentId = enrollment.student_id as string
                return (
                  <div key={studentId} className="rounded-lg border border-border/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {((student?.full_name as string) || 'S').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student?.full_name as string || 'Student'}</p>
                        <p className="text-xs text-muted-foreground">{student?.email as string}</p>
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Grade (/20)</Label>
                        <Input type="number" min="0" max="20" step="0.5" placeholder="0-20"
                          value={gradeInputs[studentId]?.grade || ''}
                          onChange={(e) => setGradeInputs({ ...gradeInputs, [studentId]: { ...gradeInputs[studentId], grade: e.target.value } })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Type</Label>
                        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={gradeInputs[studentId]?.type || 'exam'}
                          onChange={(e) => setGradeInputs({ ...gradeInputs, [studentId]: { ...gradeInputs[studentId], type: e.target.value } })}
                        >
                          <option value="exam">Exam</option>
                          <option value="td">TD</option>
                          <option value="quiz">Quiz</option>
                          <option value="assignment">Assignment</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Feedback</Label>
                        <Input placeholder="Optional feedback"
                          value={gradeInputs[studentId]?.feedback || ''}
                          onChange={(e) => setGradeInputs({ ...gradeInputs, [studentId]: { ...gradeInputs[studentId], feedback: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCourse && enrollments.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BarChart3 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No students enrolled in this course yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
