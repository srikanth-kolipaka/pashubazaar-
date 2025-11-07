# PashuBazaar – OLX-style Animal Marketplace

## 1) Supabase (Backend)
1. Create project → copy **Project URL** + **Anon key**.
2. Storage → New bucket → name `media` → Public: ON.
3. SQL Editor → run in order:
   - `sql/01_base_tables.sql`
   - `sql/02_policies.sql`
   - `sql/03_feature_pack.sql` (optional for Admin/Reports)
4. Auth → Providers → enable **Email** (and **Phone** if using OTP).
5. Auth → URL Configuration → set your Vercel URL as **Site URL** and in **Redirect URLs**.

## 2) Vercel (Frontend)
1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
   - `NEXT_PUBLIC_STORAGE_BUCKET` = `media`
   - `NEXT_PUBLIC_SITE_URL` = your Vercel URL
   - `SUPABASE_SERVICE_ROLE_KEY` = (optional, server-only)
4. Deploy.

## 3) First Login + Admin
- Open `/login` → login via email magic link (or `/login/phone` for OTP if enabled).
- Supabase → Table Editor → `auth.users` → copy your `id` (UUID).
- SQL Editor:
```sql
insert into public.admins(user_id) values('YOUR-AUTH-UUID');
```
- Visit `/admin` to moderate.

## 4) Key Pages
- `/` – Browse with filters
- `/sell` – Post listing (photos/videos upload to Supabase Storage)
- `/listing/[id]` – Details + Call + WhatsApp + Chat + Mark Sold
- `/chat/[threadId]` – Realtime chat
- `/my` – My listings
- `/admin` – Admin panel (if you added yourself to admins)

## 5) Local Dev (optional)
```
cp .env.example .env.local
# fill values
npm i
npm run dev
```
Open http://localhost:3000

## Notes
- Make sure Storage bucket is public and named `media`.
- If images don't load, check the object path and bucket permissions.
- If login fails to redirect, fix Auth URL configuration.
