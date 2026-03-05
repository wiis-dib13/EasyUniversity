'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bell, Calendar, BookOpen, MessageSquare, AlertCircle, Check, Trash2, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'

interface Notification {
  id: string
  title: string
  message: string
  type: 'reminder' | 'grade' | 'course' | 'message' | 'alert'
  is_read: boolean
  created_at: string
  reminder_time?: string
  courses?: {
    title: string
  }
}

export default function NotificationsPage() {
  const supabase = createClient()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: reminders } = await supabase
      .from('study_reminders')
      .select('*, courses(title)')
      .eq('student_id', user.id)
      .order('reminder_time', { ascending: false })
      .limit(20)

    if (reminders) {
      const formattedNotifications = reminders.map(r => ({
        id: r.id,
        title: r.title,
        message: r.description || `Study session for ${r.courses?.title || 'course'}`,
        type: 'reminder' as const,
        is_read: r.is_read || false,
        created_at: r.created_at,
        reminder_time: r.reminder_time,
        courses: r.courses
      }))
      setNotifications(formattedNotifications)
    }
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    await supabase
      .from('study_reminders')
      .update({ is_read: true })
      .eq('id', id)

    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    )
  }

  const markAllAsRead = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('study_reminders')
      .update({ is_read: true })
      .eq('student_id', user.id)

    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
  }

  const deleteNotification = async (id: string) => {
    await supabase
      .from('study_reminders')
      .delete()
      .eq('id', id)

    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Calendar className="h-5 w-5" />
      case 'grade': return <BookOpen className="h-5 w-5" />
      case 'message': return <MessageSquare className="h-5 w-5" />
      case 'alert': return <AlertCircle className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'bg-[#1E5D88] text-white'
      case 'grade': return 'bg-[#4E9F86] text-white'
      case 'message': return 'bg-[#F3B664] text-white'
      case 'alert': return 'bg-red-500 text-white'
      default: return 'bg-[#2D5A4C] text-white'
    }
  }

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread'
      ? notifications.filter(n => !n.is_read)
      : notifications.filter(n => n.type === filter)

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/dashboard/student" className="flex items-center gap-2 text-[#4E9F86] font-bold uppercase text-xs tracking-widest mb-2 hover:underline">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1E5D88] uppercase">
            Notifications
          </h1>
          <p className="mt-1 text-lg font-medium text-[#4E9F86]">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            className="h-12 px-6 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest"
          >
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Bell className="h-4 w-4 text-[#4E9F86]" />
        <Button
          onClick={() => setFilter('all')}
          className={`rounded-full text-xs font-black uppercase tracking-widest h-8 px-4 ${
            filter === 'all' 
              ? 'bg-[#4E9F86] text-white' 
              : 'bg-white text-[#2D5A4C] border border-[#4E9F86]/20'
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter('unread')}
          className={`rounded-full text-xs font-black uppercase tracking-widest h-8 px-4 ${
            filter === 'unread' 
              ? 'bg-[#4E9F86] text-white' 
              : 'bg-white text-[#2D5A4C] border border-[#4E9F86]/20'
          }`}
        >
          Unread ({unreadCount})
        </Button>
        <Button
          onClick={() => setFilter('reminder')}
          className={`rounded-full text-xs font-black uppercase tracking-widest h-8 px-4 ${
            filter === 'reminder' 
              ? 'bg-[#4E9F86] text-white' 
              : 'bg-white text-[#2D5A4C] border border-[#4E9F86]/20'
          }`}
        >
          Reminders
        </Button>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4E9F86] border-t-transparent" />
        </div>
      ) : filteredNotifications.length === 0 ? (
        <Card className="rounded-[2.5rem] border-[#F3B664]/20 bg-white/50 p-12 text-center">
          <Bell className="h-12 w-12 text-[#F3B664]/30 mx-auto mb-4" />
          <p className="text-[#2D5A4C]/50 font-bold uppercase text-sm">No notifications</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`rounded-[2rem] border-none shadow-lg overflow-hidden transition-all ${
                notification.is_read 
                  ? 'bg-white shadow-[#4E9F86]/5 opacity-75' 
                  : 'bg-white shadow-[#4E9F86]/10 border-l-4 border-[#4E9F86]'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${getColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-[#2D5A4C]">{notification.title}</h3>
                        <p className="text-sm text-[#2D5A4C]/60 mt-1">{notification.message}</p>
                        {notification.reminder_time && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-[#F3B664] font-bold uppercase tracking-widest">
                            <Clock className="h-3 w-3" />
                            {new Date(notification.reminder_time).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!notification.is_read && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Check className="h-4 w-4 text-[#4E9F86]" />
                          </Button>
                        )}
                        <Button
                          onClick={() => deleteNotification(notification.id)}
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
