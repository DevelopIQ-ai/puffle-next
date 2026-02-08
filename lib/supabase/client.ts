import { createBrowserClient } from "@supabase/ssr";

const cookieDomain =
  process.env.NODE_ENV === "production" ? ".puffle.ai" : undefined;

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookieOptions: {
        domain: cookieDomain,
      },
    }
  );
}
