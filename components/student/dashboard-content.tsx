'use client'

import Link from 'next/link'
import { BookOpen, Brain, Calendar, Bell, BarChart3, ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface Props {
  profile: Record<string, unknown> | null
  enrollments: Record<string, unknown>[]
  reminders: Record<string, unknown>[]
  grades: Record<string, unknown>[]
  needsQuestionnaire: boolean
}

export function StudentDashboardContent({ profile, enrollments, reminders, grades, needsQuestionnaire }: Props) {
  const firstName = ((profile?.full_name as string) || 'Student').split(' ')[0]

  return (
    <div className="flex flex-col gap-6 pt-12 lg:pt-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">{"Here's your learning overview"}</p>
      </div>

      {needsQuestionnaire && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Set Up Your Study Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Complete a quick questionnaire so our AI can create a personalized study schedule for you.
                </p>
              </div>
            </div>
            <Link href="/dashboard/student/schedule?setup=true">
              <Button size="sm" className="gap-2">
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<BookOpen className="h-4 w-4" />} label="Enrolled Courses" value={enrollments.length} color="bg-primary/10 text-primary" />
        <StatCard icon={<Calendar className="h-4 w-4" />} label="Study Sessions" value={reminders.length} color="bg-accent/10 text-accent" />
        <StatCard icon={<BarChart3 className="h-4 w-4" />} label="Grades Received" value={grades.length} color="bg-success/10 text-success" />
        <StatCard icon={<Bell className="h-4 w-4" />} label="Notifications" value={reminders.length} color="bg-warning/10 text-warning-foreground" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">My Courses</CardTitle>
            <Link href="/dashboard/student/courses" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {enrollments.length === 0 ? (
              <div className="py-8 text-center">
                <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No courses yet</p>
                <Link href="/dashboard/student/courses">
                  <Button size="sm" variant="outline" className="mt-3">Browse Courses</Button>
                </Link>
              </div>
            ) : (
              enrollments.slice(0, 4).map((enrollment) => {
                const course = enrollment.courses as Record<string, unknown>
                return (
                  <div key={enrollment.id as string} className="flex items-center gap-3 rounded-lg border border-border/50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-primary-foreground" style={{ backgroundColor: (course?.color as string) || '#6366f1' }}>
                      {((course?.title as string) || 'C').charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{course?.title as string}</p>
                      <p className="text-xs text-muted-foreground">{course?.code as string}</p>
                    </div>
                    <Progress value={(enrollment.progress as number) || 0} className="w-20" />
                    <span className="text-xs text-muted-foreground">{(enrollment.progress as number) || 0}%</span>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Upcoming Study Sessions</CardTitle>
            <Link href="/dashboard/student/schedule" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {reminders.length === 0 ? (
              <div className="py-8 text-center">
                <Clock className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No upcoming sessions</p>
                <Link href="/dashboard/student/schedule">
                  <Button size="sm" variant="outline" className="mt-3">Set Up Plan</Button>
                </Link>
              </div>
            ) : (
              reminders.map((reminder) => (
                <div key={reminder.id as string} className="flex items-start gap-3 rounded-lg border border-border/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{reminder.title as string}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(reminder.reminder_time as string).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {grades.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Recent Grades</CardTitle>
            <Link href="/dashboard/student/grades" className="text-sm text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {grades.map((grade) => (
                <div key={grade.id as string} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{(grade.courses as Record<string, unknown>)?.title as string}</p>
                    <p className="text-xs text-muted-foreground capitalize">{grade.assessment_type as string}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{grade.grade as number}/{grade.max_grade as number}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
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
