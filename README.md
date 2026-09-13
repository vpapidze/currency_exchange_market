# კურსი · Kursi

Next.js + Supabase marketplace connecting Georgian currency-exchange companies with clients.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/ka`).

## Supabase (one-time)

1. Env is in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
2. In **Supabase → SQL Editor**, run `supabase/schema.sql`.
   If the app was already set up once, also run `supabase/patch_profile_insert.sql`.
3. **Authentication → Providers**: enable Email.
4. For local testing, disable **Confirm email** (Authentication → Providers → Email).
5. Register a user in the app, then promote yourself:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@email.com');
```

Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

## Roles

- **Client** — `/ka/dashboard` wallet, rates wizard, requests
- **Company** — `/ka/company` rates, inbound requests, wallet
- **Admin** — `/admin` users, companies, transactions, ledger, messages, settings

Companies stay `pending` until an admin approves them. Only approved offices appear on the public rate board.

## Notes

- Deposit/withdraw in v1 is a typed amount (no payment provider yet).
- Exchange quotes lock for 15 minutes. Confirm moves internal wallets.
- Languages: `ka` (default), `en`, `ru`.
