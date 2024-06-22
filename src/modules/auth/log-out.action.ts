"use server";

import { createClient } from "@/lib/auth/supabase/server";

export const logout = async () => {
  const client = createClient();

  await client.auth.signOut();
};
