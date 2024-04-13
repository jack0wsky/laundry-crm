import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import type { Hotel } from "@/modules/hotels/types";

export const hotelsQueryKey = () => ["hotels"];
export const useListHotels = () => {
  const { data, isPending, isSuccess } = useQuery<Hotel[], Error>({
    queryKey: hotelsQueryKey(),
    queryFn: () => db.getHotels(),
    staleTime: Infinity,
  });

  return {
    hotels: data || [],
    loading: isPending,
    fetched: isSuccess,
  };
};
