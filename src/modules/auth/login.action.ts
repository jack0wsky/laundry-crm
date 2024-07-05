"use server";

import { createClient } from "@/lib/auth/supabase/server";

export const login = async (email: string, password: string) => {
  const client = createClient();

  const { data } = await client.auth.signInWithPassword({
    email,
    password,
  });

  return {
    userId: data.user?.id,
  };
};
