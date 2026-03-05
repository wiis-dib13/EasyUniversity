'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Plus, Trash2, BookOpen } from 'lucide-react'

export default function ProfessorCoursesPage() {
  const [courses, setCourses] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [semester, setSemester] = useState('S1')
  const [recommendedHours, setRecommendedHours] = useState('3')
  const [color, setColor] = useState('#6366f1')

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('courses').select('*').eq('professor_id', user.id).order('created_at', { ascending: false })
    setCourses(data || [])
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('courses').insert({
      professor_id: user.id,
      title,
      code,
      description,
      semester,
      recommended_hours: parseInt(recommendedHours),
      color,
    })

    if (!error) {
      setTitle(''); setCode(''); setDescription(''); setShowForm(false)
      loadCourses()
    }
    setCreating(false)
  }

  async function handleDelete(courseId: string) {
    const supabase = createClient()
    await supabase.from('courses').delete().eq('id', courseId)
    setCourses(courses.filter((c) => c.id !== courseId))
  }

  const colors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center pt-12 lg:pt-0">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Courses</h1>
          <p className="mt-1 text-muted-foreground">Create and organize your courses</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> {showForm ? 'Cancel' : 'New Course'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/20">
          <CardHeader><CardTitle>Create New Course</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Course Title</Label>
                  <Input placeholder="e.g. English Literature" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Course Code</Label>
                  <Input placeholder="e.g. ENG301" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Input placeholder="Brief description of the course" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label>Semester</Label>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={semester} onChange={(e) => setSemester(e.target.value)}>
                    <option value="S1">Semester 1</option>
                    <option value="S2">Semester 2</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Recommended Hours/Week</Label>
                  <Input type="number" min="1" max="20" value={recommendedHours} onChange={(e) => setRecommendedHours(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {colors.map((c) => (
                      <button key={c} type="button" onClick={() => setColor(c)}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${color === c ? 'border-foreground scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Button type="submit" disabled={creating} className="self-start">
                {creating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : 'Create Course'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {courses.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <h3 className="mb-1 text-lg font-semibold text-foreground">No Courses Yet</h3>
            <p className="text-sm text-muted-foreground">Click the button above to create your first course.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id as string} className="transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground" style={{ backgroundColor: (course.color as string) || '#6366f1' }}>
                      {((course.title as string) || 'C').charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{course.title as string}</p>
                      <p className="text-xs text-muted-foreground">{course.code as string} - {course.semester as string}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(course.id as string)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {course.description && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{course.description as string}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
