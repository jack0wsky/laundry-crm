import { Customers } from "@/modules/customers/view";
import { Metadata } from "next";
import { createClient } from "@/lib/auth/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Klienci | L'aqua",
};

export default async function Page() {
  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/login");
  }

  return <Customers />;
}
