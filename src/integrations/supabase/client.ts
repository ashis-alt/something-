// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zjvbwfzxyeisukpkkgja.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqdmJ3Znp4eWVpc3VrcGtrZ2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxODQxNjcsImV4cCI6MjA1Mjc2MDE2N30.ZDERclYyHRLPhsChmAW5lCtQGNL8q56-zG31Fgf8-uk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);