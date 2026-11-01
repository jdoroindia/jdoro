import { NextResponse, type NextRequest } from "next/server";
import { serverClient } from "@/lib/supabase/server";

/** The link in the login email lands here; we swap its code for a session. */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (code) {
    const supabase = await serverClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.redirect(new URL("/admin/login?error=link", request.url));
}
