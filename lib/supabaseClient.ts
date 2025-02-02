import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ofjnvjitdxjowdcwnwho.supabase.co'
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mam52aml0ZHhqb3dkY3dud2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MDIzMTMsImV4cCI6MjA1NDA3ODMxM30._UrxmX4Hmq-CiiSfVgaDuXdgysw02sKyHaJopkVsAe8"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY , {
    auth: {
      persistSession: true, // ✅ Ensures session persistence
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });