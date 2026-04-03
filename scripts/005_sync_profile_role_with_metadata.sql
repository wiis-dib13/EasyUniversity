-- Ensure newly created profiles keep the selected signup role (student/professor)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  selected_role text;
BEGIN
  selected_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');

  IF selected_role NOT IN ('student', 'professor') THEN
    selected_role := 'student';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    selected_role
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    role = EXCLUDED.role,
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate signup trigger to ensure latest function is used
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Optional one-time repair for existing users with mismatched roles
UPDATE public.profiles p
SET
  role = CASE
    WHEN COALESCE(u.raw_user_meta_data->>'role', 'student') IN ('student', 'professor')
      THEN COALESCE(u.raw_user_meta_data->>'role', 'student')
    ELSE 'student'
  END,
  updated_at = now()
FROM auth.users u
WHERE p.id = u.id
  AND p.role IS DISTINCT FROM CASE
    WHEN COALESCE(u.raw_user_meta_data->>'role', 'student') IN ('student', 'professor')
      THEN COALESCE(u.raw_user_meta_data->>'role', 'student')
    ELSE 'student'
  END;
