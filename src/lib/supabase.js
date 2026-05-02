import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://kpojipgkdxokynfkrpoy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwb2ppcGdrZHhva3luZmtycG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTUzMzksImV4cCI6MjA5MzI5MTMzOX0.S84wD7x8YZdNLfL1OK8IQQT3amB7xSo3nY5THdB2Dc8'
)
