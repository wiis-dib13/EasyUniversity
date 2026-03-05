'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, BookOpen, Calendar, Clock, Edit2, Save, ArrowLeft, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    department: '',
    bio: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (data) {
      setProfile(data)
      setFormData({
        full_name: data.full_name || '',
        email: user.email || '',
        phone: data.phone || '',
        department: data.department || 'English',
        bio: data.bio || ''
      })
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        department: formData.department,
        bio: formData.bio,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    setProfile(prev => ({ ...prev, ...formData }))
    setEditing(false)
    setSaving(false)
  }

  const stats = [
    { label: 'Department', value: profile?.department || 'English', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Member Since', value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A', icon: <Calendar className="h-5 w-5" /> },
  ]

  return (
    <div className="flex flex-col gap-8 pb-12 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/dashboard/student" className="flex items-center gap-2 text-[#4E9F86] font-bold uppercase text-xs tracking-widest mb-2 hover:underline">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-[#1E5D88] uppercase">
            My Profile
          </h1>
          <p className="mt-1 text-lg font-medium text-[#4E9F86]">
            Manage your personal information
          </p>
        </div>
        {!editing ? (
          <Button
            onClick={() => setEditing(true)}
            className="h-12 px-6 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest"
          >
            <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => setEditing(false)}
              className="h-12 px-6 rounded-full bg-white text-[#2D5A4C] border border-[#4E9F86]/20 font-black uppercase tracking-widest"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-12 px-6 rounded-full bg-[#4E9F86] hover:bg-[#3d806b] text-white font-black uppercase tracking-widest"
            >
              <Save className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#4E9F86] border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-[#4E9F86]/5 overflow-hidden lg:row-span-2">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#1E5D88] text-white text-3xl font-black mb-4 shadow-lg">
                {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : 'S'}
              </div>
              <h2 className="text-2xl font-black text-[#2D5A4C]">{formData.full_name || 'Student'}</h2>
              <p className="text-[#4E9F86] font-medium uppercase text-sm tracking-widest mt-1">Student</p>
              <p className="text-[#2D5A4C]/50 text-sm mt-4">{formData.department} Department</p>

              {profile?.bio && (
                <div className="mt-6 pt-6 border-t border-[#F3B664]/20">
                  <p className="text-[#2D5A4C]/70 text-sm">{profile.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-[#4E9F86]/5 overflow-hidden lg:col-span-2">
            <CardHeader className="px-8 pt-8 pb-4">
              <CardTitle className="text-lg font-black uppercase tracking-tighter text-[#1E5D88]">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5D88]/10 text-[#1E5D88]">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#2D5A4C]/50 uppercase tracking-widest">Full Name</p>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-[#F3B664]/20 focus:border-[#4E9F86] focus:outline-none font-bold text-[#2D5A4C]"
                      />
                    ) : (
                      <p className="font-bold text-[#2D5A4C]">{formData.full_name || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5D88]/10 text-[#1E5D88]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#2D5A4C]/50 uppercase tracking-widest">Email</p>
                    <p className="font-bold text-[#2D5A4C]">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5D88]/10 text-[#1E5D88]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#2D5A4C]/50 uppercase tracking-widest">Phone</p>
                    {editing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-[#F3B664]/20 focus:border-[#4E9F86] focus:outline-none font-bold text-[#2D5A4C]"
                      />
                    ) : (
                      <p className="font-bold text-[#2D5A4C]">{formData.phone || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5D88]/10 text-[#1E5D88]">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#2D5A4C]/50 uppercase tracking-widest">Department</p>
                    {editing ? (
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-[#F3B664]/20 focus:border-[#4E9F86] focus:outline-none font-bold text-[#2D5A4C] bg-white"
                      >
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Linguistics">Linguistics</option>
                      </select>
                    ) : (
                      <p className="font-bold text-[#2D5A4C]">{formData.department}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          <Card className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-[#4E9F86]/5 overflow-hidden lg:col-span-2">
            <CardHeader className="px-8 pt-8 pb-4">
              <CardTitle className="text-lg font-black uppercase tracking-tighter text-[#1E5D88]">About Me</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {editing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full mt-1 px-4 py-3 rounded-2xl border border-[#F3B664]/20 focus:border-[#4E9F86] focus:outline-none font-bold text-[#2D5A4C] resize-none"
                />
              ) : (
                <p className="text-[#2D5A4C]/70">
                  {formData.bio || 'No bio added yet. Click "Edit Profile" to add one.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
