create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'student',
  avatar_url text,
  department text default 'English',
  bio text,
  phone text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
