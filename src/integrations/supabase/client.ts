// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zuawapcenjgpmrbeaohc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1YXdhcGNlbmpncG1yYmVhb2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNDUyMDMsImV4cCI6MjA1MjkyMTIwM30.fXJQIhoojajkP1xGZepHWc1yW1BCCFFsrSc9IK00pRE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);