-- Local testing only. Run in Supabase SQL Editor so registered users
-- can log in without clicking a confirmation email.
-- Authentication → Providers → Email → Confirm email can stay on.

update auth.users
set email_confirmed_at = coalesce(email_confirmed_at, now())
where email_confirmed_at is null;
