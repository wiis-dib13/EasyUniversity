-- AI Coach Questionnaire & Study Plan table
create table if not exists public.ai_coach_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  english_level text not null,
  goal text not null,
  study_hours_per_day integer not null,
  favorite_subject text not null,
  created_at timestamptz default now()
);

-- Study Plan table
create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  sessions jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.ai_coach_responses enable row level security;
alter table public.study_plans enable row level security;

-- Policies for ai_coach_responses
drop policy if exists "ai_coach_responses_select_own" on public.ai_coach_responses;
create policy "ai_coach_responses_select_own" on public.ai_coach_responses for select using (auth.uid() = user_id);

drop policy if exists "ai_coach_responses_insert_own" on public.ai_coach_responses;
create policy "ai_coach_responses_insert_own" on public.ai_coach_responses for insert with check (auth.uid() = user_id);

drop policy if exists "ai_coach_responses_update_own" on public.ai_coach_responses;
create policy "ai_coach_responses_update_own" on public.ai_coach_responses for update using (auth.uid() = user_id);

-- Policies for study_plans
drop policy if exists "study_plans_select_own" on public.study_plans;
create policy "study_plans_select_own" on public.study_plans for select using (auth.uid() = user_id);

drop policy if exists "study_plans_insert_own" on public.study_plans;
create policy "study_plans_insert_own" on public.study_plans for insert with check (auth.uid() = user_id);

drop policy if exists "study_plans_update_own" on public.study_plans;
create policy "study_plans_update_own" on public.study_plans for update using (auth.uid() = user_id);

drop policy if exists "study_plans_delete_own" on public.study_plans;
create policy "study_plans_delete_own" on public.study_plans for delete using (auth.uid() = user_id);
