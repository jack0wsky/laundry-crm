import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useUpdateHotelName = (options?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      db.updateHotelName(id, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: hotelsQueryKey() });
      options?.onSuccess();
    },
  });

  return {
    updateName: mutate,
  };
};
