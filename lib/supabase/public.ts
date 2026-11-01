import { createClient } from "@supabase/supabase-js";

/** Cookie-free client for public catalogue reads, so shop pages stay static. */
export function publicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
}
