import { HomePage } from "@/app/HomePage";
import { Metadata } from "next";
import { createClient } from "@/lib/auth/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CRM | L&apos;aqua",
};

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/login");
  }

  return <HomePage />;
}
