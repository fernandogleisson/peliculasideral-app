-- 0006_drop_on_auth_user_created.sql
-- Remove o trigger que criava profile placeholder em cada signup.
-- Profile agora é criado APENAS pelo Server Action submitOnboarding.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
