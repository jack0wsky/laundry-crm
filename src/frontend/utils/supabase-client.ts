import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/shared/supabase";

const clientKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";
const serverKey = process.env.SUPABASE_API_KEY || "";

export const serverDB = createClient(
  "https://wsphrpbhhpjdhfeuwixi.supabase.co",
  serverKey || clientKey,
);

export const clientDB = createClient<Database>(
  "https://wsphrpbhhpjdhfeuwixi.supabase.co",
  clientKey,
);
