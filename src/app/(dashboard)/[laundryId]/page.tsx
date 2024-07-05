import { QueryClient } from "@tanstack/react-query";
import { hotelsQueryKey } from "@/modules/hotels/api/hotels.controller";
import { createClient } from "@/lib/auth/supabase/server";
import { db } from "@/modules/services/laundry.db";
import { HomePage } from "@/app/HomePage";

export default async function Page({
  params,
}: {
  params: { laundryId: string };
}) {
  const queryClient = new QueryClient();

  const supabase = createClient();

  const { data } = await supabase.auth.getSession();

  await queryClient.prefetchQuery({
    queryKey: hotelsQueryKey(data.session?.user.id),
    queryFn: () => db.hotels.getAll(params.laundryId),
  });

  return <HomePage />;
}
