import { LoginPage } from "@/modules/auth/LoginPage";
import { createClient } from "@/lib/auth/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (data && !error) {
    return redirect("/");
  }

  return <LoginPage />;
}
