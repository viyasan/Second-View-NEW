// lib/supabase.ts
// Supabase client configuration

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not set. Auth features will not work.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Types for our database
export interface Profile {
  id: string;
  email: string;
  name: string | null;
  age: number | null;
  sex: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}
