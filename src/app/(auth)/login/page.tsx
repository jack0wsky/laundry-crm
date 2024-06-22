import { LoginPage } from "@/modules/auth/LoginPage";
import { createClient } from "@/lib/auth/supabase/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zaloguj się | L'aqua",
};

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (!!data.session && !error) {
    return redirect("/");
  }

  return <LoginPage />;
}
