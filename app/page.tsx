import Link from "next/link"
import { GraduationCap, BookOpen, Users, Brain, ArrowRight, Calendar, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EasyEducation</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-success" />
              English Department - University Platform
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Your Smarter Way to
              <span className="block text-primary"> Study & Succeed</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              EasyEducation helps Algerian university students stay organized with AI-powered study planning, 
              connect with professors, and access course materials all in one modern platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  I have an account
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border/50 bg-card/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground">Everything You Need to Excel</h2>
              <p className="mt-3 text-muted-foreground">Built specifically for Algerian university students and professors</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain className="h-5 w-5" />}
                title="AI Study Coach"
                description="Get personalized study advice, motivational tips, and learning strategies from your AI-powered study assistant."
              />
              <FeatureCard
                icon={<Calendar className="h-5 w-5" />}
                title="Smart Study Plans"
                description="Complete a quick questionnaire and get a personalized study schedule with reminders and revision sessions."
              />
              <FeatureCard
                icon={<BookOpen className="h-5 w-5" />}
                title="Course Materials"
                description="Access all your courses, TDs, PDFs, and documents uploaded by your professors in one organized place."
              />
              <FeatureCard
                icon={<Users className="h-5 w-5" />}
                title="Professor Tools"
                description="Professors can upload materials, track student progress, assign grades, and manage their courses."
              />
              <FeatureCard
                icon={<Bell className="h-5 w-5" />}
                title="Smart Notifications"
                description="Never miss a study session. Get timely reminders for upcoming classes, assignments, and revision schedules."
              />
              <FeatureCard
                icon={<GraduationCap className="h-5 w-5" />}
                title="Grades & Feedback"
                description="View your grades and professor feedback in real-time. Track your academic progress across all courses."
              />
            </div>
          </div>
        </section>

        <section id="about" className="px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Built for Algerian Universities</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              EasyEducation is designed specifically for the English Department, helping students stay connected 
              with their professors, follow structured study plans, and achieve academic success through 
              AI-powered tools and modern learning technology.
            </p>
            <div className="mt-10">
              <Link href="/auth/sign-up">
                <Button size="lg" className="gap-2">
                  Join EasyEducation Today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-card/50 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">EasyEducation</span>
          </div>
          <p className="text-sm text-muted-foreground">Algerian University Platform - English Department</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
