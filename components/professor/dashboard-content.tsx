'use client'

import Link from 'next/link'
import { BookOpen, Users, Upload, FileText, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  profile: Record<string, unknown> | null
  courses: Record<string, unknown>[]
  totalStudents: number
  totalMaterials: number
}

export function ProfessorDashboardContent({ profile, courses, totalStudents, totalMaterials }: Props) {
  const firstName = ((profile?.full_name as string) || 'Professor').split(' ')[0]

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Welcome, Prof. {firstName}
          </h1>
          <p className="mt-1 text-muted-foreground">Manage your courses and track student progress</p>
        </div>
        <Link href="/dashboard/professor/courses">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={<BookOpen className="h-4 w-4" />} label="Total Courses" value={courses.length} color="bg-primary/10 text-primary" />
        <StatCard icon={<Users className="h-4 w-4" />} label="Total Students" value={totalStudents} color="bg-accent/10 text-accent" />
        <StatCard icon={<FileText className="h-4 w-4" />} label="Materials Uploaded" value={totalMaterials} color="bg-success/10 text-success" />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg">Your Courses</CardTitle>
          <Link href="/dashboard/professor/courses" className="text-sm text-primary hover:underline">Manage</Link>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <h3 className="mb-1 text-lg font-semibold text-foreground">No Courses Yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Create your first course to get started.</p>
              <Link href="/dashboard/professor/courses">
                <Button className="gap-2"><Plus className="h-4 w-4" /> Create Course</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div key={course.id as string} className="rounded-xl border border-border/50 p-4 transition-all hover:border-primary/20 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground" style={{ backgroundColor: (course.color as string) || '#6366f1' }}>
                      {((course.title as string) || 'C').charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{course.title as string}</p>
                      <p className="text-xs text-muted-foreground">{course.code as string} - {course.semester as string}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <Link href={`/dashboard/professor/upload?course=${course.id}`}>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Upload className="h-3 w-3" /> Upload
                      </Button>
                    </Link>
                    <Link href="/dashboard/professor/students">
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                        <Users className="h-3 w-3" /> Students
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
