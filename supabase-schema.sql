-- انسخ هاد الكود وحطو فـ Supabase Dashboard → SQL Editor → New query → Run
-- (خاص مرة وحدة فقط، عند الإعداد الأول)

-- جدول المنتجات/الإعلانات
create table if not exists ads (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    titre text not null,
    categorie text,
    prix text,
    ville text,
    telephone text,
    description text,
    photo_url text,
    created_at timestamp with time zone default now()
);

-- تفعيل الحماية (RLS) — إجباري فـ Supabase
alter table ads enable row level security;

-- أي حد يقدر يشوف كل المنتجات (عرض عام)
create policy "الكل يقدر يشوف المنتجات"
on ads for select
using (true);

-- غير المستخدم المسجل يقدر يزيد منتج بحسابه
create policy "المستخدم يزيد منتج بحسابه"
on ads for insert
with check (auth.uid() = user_id);

-- غير صاحب المنتج يقدر يعدل/يمسح منتجاتو
create policy "صاحب المنتج يعدل منتجاتو"
on ads for update
using (auth.uid() = user_id);

create policy "صاحب المنتج يمسح منتجاتو"
on ads for delete
using (auth.uid() = user_id);

-- ==========================================================
-- بعد تشغيل هاد الكود، دير Storage Bucket لصور المنتجات:
-- Dashboard → Storage → New bucket → اسمو: ads-photos → Public bucket: خليه مفعّل (Public)
-- ==========================================================
