import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Session-aware client for admin pages and server actions. RLS enforces who can write. */
export async function serverClient() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component; the proxy refreshes the session instead.
        }
      },
    },
  });
}

const allowed = () =>
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

/** Returns the signed-in admin's email, or null. */
export async function currentAdmin() {
  const supabase = await serverClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  return email && allowed().includes(email) ? email : null;
}
