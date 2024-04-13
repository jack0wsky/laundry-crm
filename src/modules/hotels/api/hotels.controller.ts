import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import type { Hotel } from "@/modules/hotels/types";

export const hotelsQueryKey = () => ["hotels"];
export const useListHotels = () => {
  const { data, isPending } = useQuery<Hotel[], Error>({
    queryKey: hotelsQueryKey(),
    queryFn: () => db.getHotels(),
  });

  return {
    hotels: data || [],
    loading: isPending,
  };
};
