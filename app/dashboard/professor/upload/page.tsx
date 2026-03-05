'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Upload, FileText, CheckCircle } from 'lucide-react'

export default function UploadMaterialsPage() {
  const searchParams = useSearchParams()
  const preselectedCourse = searchParams.get('course')

  const [courses, setCourses] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourse || '')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [materialType, setMaterialType] = useState('document')
  const [materials, setMaterials] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: coursesData } = await supabase.from('courses').select('*').eq('professor_id', user.id)
    setCourses(coursesData || [])
    const { data: materialsData } = await supabase.from('materials').select('*, courses(title)').eq('professor_id', user.id).order('created_at', { ascending: false })
    setMaterials(materialsData || [])
    setLoading(false)
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)
    setSuccess(false)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('materials').insert({
      course_id: selectedCourse,
      professor_id: user.id,
      title,
      description,
      type: materialType,
    })

    if (!error) {
      setTitle(''); setDescription(''); setSuccess(true)
      loadData()
      setTimeout(() => setSuccess(false), 3000)
    }
    setUploading(false)
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
        <h1 className="text-2xl font-bold text-foreground">Upload Materials</h1>
        <p className="mt-1 text-muted-foreground">Share course content, TDs, and documents with your students</p>
      </div>

      <Card className="border-primary/20">
        <CardHeader><CardTitle>Upload New Material</CardTitle></CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">You need to create a course first before uploading materials.</p>
          ) : (
            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Course</Label>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
                    <option value="">Select a course</option>
                    {courses.map((c) => (
                      <option key={c.id as string} value={c.id as string}>{c.title as string} ({c.code as string})</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Material Type</Label>
                  <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
                    <option value="document">Document</option>
                    <option value="course">Course Lecture</option>
                    <option value="td">TD (Travaux Diriges)</option>
                    <option value="exam">Exam</option>
                    <option value="pdf">PDF Resource</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input placeholder="e.g. Chapter 1 - Introduction" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description (Optional)</Label>
                <Input placeholder="Brief description of this material" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={uploading} className="gap-2">
                  {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : <><Upload className="h-4 w-4" /> Upload Material</>}
                </Button>
                {success && (
                  <span className="flex items-center gap-1.5 text-sm text-success">
                    <CheckCircle className="h-4 w-4" /> Material uploaded successfully
                  </span>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Uploaded Materials</CardTitle></CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <div className="py-8 text-center">
              <FileText className="mx-auto mb-3 h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No materials uploaded yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {materials.map((m) => (
                <div key={m.id as string} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.title as string}</p>
                      <p className="text-xs text-muted-foreground capitalize">{m.type as string} - {(m.courses as Record<string, unknown>)?.title as string}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(m.created_at as string).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
