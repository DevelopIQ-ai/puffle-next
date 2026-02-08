"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface SessionData {
  user: {
    name: string;
    email: string;
    approved: boolean;
  };
}

export function useSession() {
  const [data, setData] = useState<SessionData | null>(null);
  const [isPending, setIsPending] = useState(true);

  const mapUser = useCallback((user: import("@supabase/supabase-js").User): SessionData => ({
    user: {
      name: user.user_metadata?.name ?? user.user_metadata?.full_name ?? "",
      email: user.email ?? "",
      approved: user.app_metadata?.approved === true,
    },
  }), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setData(user ? mapUser(user) : null);
      setIsPending(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setData(session?.user ? mapUser(session.user) : null);
      setIsPending(false);
    });

    return () => subscription.unsubscribe();
  }, [mapUser]);

  return { data, isPending };
}

export const signIn = {
  async email({ email, password }: { email: string; password: string }) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  },
};

export const signUp = {
  async email({ email, password, name }: { email: string; password: string; name: string }) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return { error };
  },
};

export async function signOut() {
  await supabase.auth.signOut();
}
