// ==========================================================
// إعدادات Supabase — بدّل هاد القيمتين بالمعلومات ديال المشروع
// كتلقاهم فـ Supabase Dashboard → Project Settings → API
// ==========================================================
const SUPABASE_URL = "https://zpnstnqdcfjlzisimyyb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbnN0bnFkY2ZqbHppc2lteXliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTM2MTUsImV4cCI6MjEwNTQ4OTYxNX0.IdAtmggc6gu8ePcwVAdmSqgwgk0U55C6Vk5M808Vr_0";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
