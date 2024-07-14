import { HotelDetailsPage } from "@/modules/hotels/HotelDetailsPage";
import { createClient } from "@/lib/auth/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { hotelId: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (!data.session && error) {
    return redirect("/login");
  }
  return <HotelDetailsPage hotelId={params.hotelId} />;
}
