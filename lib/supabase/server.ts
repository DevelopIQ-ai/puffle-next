import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const cookieDomain =
  process.env.NODE_ENV === "production" ? ".puffle.ai" : undefined;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookieOptions: {
        domain: cookieDomain,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, { ...options, domain: cookieDomain })
            );
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    }
  );
}
