import { createClient } from "@supabase/supabase-js";

const clientKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";
const serverKey = process.env.SUPABASE_API_KEY || "";

export const serverDB = createClient(
  "https://vtxubqtmrzzwtjggyzbp.supabase.co",
  serverKey || clientKey,
);

export const clientDB = createClient(
  "https://vtxubqtmrzzwtjggyzbp.supabase.co",
  clientKey,
);
