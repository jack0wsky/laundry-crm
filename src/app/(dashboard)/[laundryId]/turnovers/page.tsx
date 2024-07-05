import { TurnoversPage } from "@/modules/analytics/TurnoversPage";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/supabase/server";

export const metadata: Metadata = {
  title: "Obroty | L'aqua",
};

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/login");
  }

  return <TurnoversPage />;
}
