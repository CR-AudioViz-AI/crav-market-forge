import { createClient } from '@supabase/supabase-js';
import { Database } from './types';
import { publishableKey, supabaseUrl } from "@craudioviz/platform-sdk";

const SUPABASE_URL = supabaseUrl();
const supabaseAnonKey = publishableKey();

export const supabase = createClient<Database>(SUPABASE_URL, supabaseAnonKey);
