'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Brain, ArrowRight, Check, Calendar, Clock, BookOpen, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

type Step = 'questionnaire' | 'generating' | 'plan'

interface StudySession {
  id: string
  day: string
  time: string
  subject: string
  activity: string
  duration: string
}

export default function SchedulePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const isSetup = searchParams.get('setup') === 'true'

  const [step, setStep] = useState<Step>(isSetup ? 'questionnaire' : 'plan')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasPlan, setHasPlan] = useState(false)
  const [studyPlan, setStudyPlan] = useState<StudySession[]>([])

  const [answers, setAnswers] = useState({
    english_level: '',
    goal: '',
    study_hours_per_day: 0,
    favorite_subject: ''
  })

  const questions = [
    {
      id: 'english_level',
      question: 'What is your current English level?',
      icon: <BookOpen className="h-8 w-8" />,
      options: [
        { value: 'beginner', label: 'Beginner', desc: 'Just starting out' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Can communicate basics' },
        { value: 'advanced', label: 'Advanced', desc: 'Fluent in most situations' },
        { value: 'native', label: 'Native', desc: 'English is my first language' }
      ]
    },
    {
      id: 'goal',
      question: 'What is your main study goal?',
      icon: <Target className="h-8 w-8" />,
      options: [
        { value: 'academic', label: 'Academic Success', desc: 'Excel in university courses' },
        { value: 'certification', label: 'Get Certified', desc: 'Prepare for exams like TOEFL/IELTS' },
        { value: 'professional', label: 'Career Growth', desc: 'Use English professionally' },
        { value: 'fluency', label: 'Become Fluent', desc: 'Improve overall communication' }
      ]
    },
    {
      id: 'study_hours_per_day',
      question: 'How many hours can you study daily?',
      icon: <Clock className="h-8 w-8" />,
      options: [
        { value: 1, label: '1 hour', desc: 'Limited time available' },
        { value: 2, label: '2 hours', desc: 'Moderate commitment' },
        { value: 3, label: '3 hours', desc: 'Good study routine' },
        { value: 4, label: '4+ hours', desc: 'Full focus on learning' }
      ]
    },
    {
      id: 'favorite_subject',
      question: 'Which English subject interests you most?',
      icon: <Brain className="h-8 w-8" />,
      options: [
        { value: 'literature', label: 'Literature', desc: 'Reading and analyzing texts' },
        { value: 'linguistics', label: 'Linguistics', desc: 'Language structure & grammar' },
        { value: 'communication', label: 'Communication', desc: 'Speaking and writing skills' },
        { value: 'business', label: 'Business English', desc: 'Professional communication' }
      ]
    }
  ]

  useEffect(() => {
    checkExistingPlan()
  }, [])

  const checkExistingPlan = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data: plan } = await supabase
      .from('study_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (plan) {
      setHasPlan(true)
      setStudyPlan(plan.sessions || [])
      setStep('plan')
    }
  }

  const handleAnswer = (value: string | number) => {
    const questionId = questions[currentQuestion].id
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      submitQuestionnaire()
    }
  }

  const canProceed = () => {
    const questionId = questions[currentQuestion].id
    const value = answers[questionId as keyof typeof answers]
    return value !== '' && value !== 0
  }

  const generateStudyPlan = (): StudySession[] => {
    const sessions: StudySession[] = []
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const hours = answers.study_hours_per_day

    const subjectMap: Record<string, string> = {
      literature: 'English Literature',
      linguistics: 'English Linguistics',
      communication: 'Communication Skills',
      business: 'Business English'
    }

    const activities = [
      'Reading comprehension practice',
      'Vocabulary building',
      'Grammar exercises',
      'Essay writing',
      'Listening practice',
      'Speaking practice',
      'Group discussion',
      'Quiz preparation'
    ]

    days.forEach((day, index) => {
      if (index < 5 || hours > 2) {
        sessions.push({
          id: `${index}-1`,
          day,
          time: hours > 2 ? '09:00 AM' : '10:00 AM',
          subject: subjectMap[answers.favorite_subject] || 'English',
          activity: activities[index % activities.length],
          duration: '1 hour'
        })

        if (hours > 2) {
          sessions.push({
            id: `${index}-2`,
            day,
            time: '02:00 PM',
            subject: 'General English',
            activity: activities[(index + 3) % activities.length],
            duration: '1 hour'
          })
        }
      }
    })

    return sessions
  }

  const submitQuestionnaire = async () => {
    setLoading(true)
    setStep('generating')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      await supabase.from('ai_coach_responses').insert({
        user_id: user.id,
        english_level: answers.english_level,
        goal: answers.goal,
        study_hours_per_day: answers.study_hours_per_day,
        favorite_subject: answers.favorite_subject
      })

      const sessions = generateStudyPlan()
      await supabase.from('study_plans').insert({
        user_id: user.id,
        title: 'Personalized Study Plan',
        description: `A ${answers.study_hours_per_day} hour/day plan focused on ${answers.goal}`,
        sessions
      })

      setStudyPlan(sessions)
      setHasPlan(true)
      setStep('plan')
    } catch (error) {
      console.error('Error:', error)
      setStep('questionnaire')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'questionnaire') {
    const q = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E5D88] to-[#2D5A4C] p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3B664] text-white mb-4 shadow-lg">
              <Brain className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">Personalize Your AI Coach</h1>
            <p className="text-[#FDF1E1]/70 mt-2">Question {currentQuestion + 1} of {questions.length}</p>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5D88]/10 text-[#1E5D88]">
                  {q.icon}
                </div>
                <h2 className="text-xl font-black text-[#1E5D88]">{q.question}</h2>
              </div>

              <div className="grid gap-4">
                {q.options.map((option) => {
                  const isSelected = answers[q.id as keyof typeof answers] === option.value
                  return (
                    <button
                      key={String(option.value)}
                      onClick={() => handleAnswer(option.value)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-[#4E9F86] bg-[#4E9F86]/5 shadow-lg'
                          : 'border-[#F3B664]/20 hover:border-[#F3B664]/50'
                      }`}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 shrink-0 ${
                        isSelected ? 'border-[#4E9F86] bg-[#4E9F86]' : 'border-[#F3B664]/30'
                      }`}>
                        {isSelected && <Check className="h-4 w-4 text-white" />}
                      </div>
                      <div>
                        <p className="font-black text-[#2D5A4C]">{option.label}</p>
                        <p className="text-sm text-[#2D5A4C]/50">{option.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="h-12 px-8 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Generate Plan <Brain className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E5D88] to-[#2D5A4C] flex items-center justify-center p-4">
        <Card className="rounded-[2.5rem] border-none shadow-2xl p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#F3B664] border-t-transparent mx-auto mb-6" />
          <h2 className="text-2xl font-black text-[#1E5D88] uppercase">Generating Your Plan</h2>
          <p className="text-[#2D5A4C]/60 mt-2">Our AI is creating your personalized study schedule...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1E5D88] uppercase">
            Your Study Plan
          </h1>
          <p className="mt-1 text-lg font-medium text-[#4E9F86]">
            Personalized schedule based on your preferences
          </p>
        </div>
        <Button
          onClick={() => setStep('questionnaire')}
          className="h-12 px-6 rounded-full bg-[#1E5D88] hover:bg-[#164a70] text-white font-black uppercase tracking-widest"
        >
          <Brain className="mr-2 h-4 w-4" /> Regenerate
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-[2rem] border-none bg-[#1E5D88] text-white shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <Calendar className="h-8 w-8 text-[#F3B664]" />
            <div>
              <p className="text-2xl font-black">{studyPlan.length}</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Sessions/Week</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-none bg-[#4E9F86] text-white shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <Clock className="h-8 w-8 text-[#F3B664]" />
            <div>
              <p className="text-2xl font-black">{answers.study_hours_per_day}h</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Daily Study</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-none bg-[#F3B664] text-white shadow-lg">
          <CardContent className="p-6 flex items-center gap-4">
            <Target className="h-8 w-8 text-white" />
            <div>
              <p className="text-2xl font-black capitalize">{answers.goal}</p>
              <p className="text-xs uppercase tracking-widest opacity-70">Your Goal</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-[#F3B664]/20 bg-white/50 shadow-xl shadow-[#4E9F86]/5 overflow-hidden">
        <CardHeader className="px-8 pt-8 pb-4">
          <CardTitle className="text-xl font-black uppercase tracking-tighter text-[#1E5D88]">Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {studyPlan.map((session) => (
              <div
                key={session.id}
                className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm border border-[#F3B664]/20 hover:border-[#4E9F86]/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#1E5D88] uppercase text-sm">{session.day}</span>
                  <span className="text-xs font-bold text-[#4E9F86] uppercase tracking-widest">{session.time}</span>
                </div>
                <div>
                  <p className="font-black text-[#2D5A4C]">{session.subject}</p>
                  <p className="text-sm text-[#2D5A4C]/60">{session.activity}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#F3B664] font-bold uppercase tracking-widest">
                  <Clock className="h-3 w-3" /> {session.duration}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[2.5rem] border-[#1E5D88]/20 bg-[#1E5D88]/5 overflow-hidden">
        <CardContent className="p-8">
          <h3 className="text-lg font-black text-[#1E5D88] uppercase mb-4">Study Tips</h3>
          <ul className="space-y-2 text-[#2D5A4C]/70">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-[#4E9F86] shrink-0 mt-0.5" />
              <span>Stick to your schedule consistently for best results</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-[#4E9F86] shrink-0 mt-0.5" />
              <span>Take short 5-minute breaks between study sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-[#4E9F86] shrink-0 mt-0.5" />
              <span>Review previous lessons before starting new topics</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
