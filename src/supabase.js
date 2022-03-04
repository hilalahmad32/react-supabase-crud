import { createClient } from '@supabase/supabase-js'
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlneXlwcmpqZml0a3Rna3p0YmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzMjQ2MDMsImV4cCI6MTk2MTkwMDYwM30.6k_g7qXjrjE7rT0KrR2ICvOsMSVTSq7l_omcQZmjRrQ"

const url = "https://igyyprjjfitktgkztblk.supabase.co"

export const supabase = createClient(url, key)