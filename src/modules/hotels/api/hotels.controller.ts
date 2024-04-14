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

export interface AddCustomerPayload {
  nip: number;
  name: string;
}

export const useAddCustomer = (options?: { onSuccess: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AddCustomerPayload) => db.addNewClient(payload),
    onSuccess: options?.onSuccess,
  });

  return {
    addCustomer: mutate,
    loading: isPending,
  };
};

export const useAddHotel = () => {
  const { hotels } = useListHotels();
  const queryClient = useQueryClient();

  const lastHotel = hotels.sort((a, b) => b.order - a.order)[0];

  const { mutate, isPending } = useMutation({
    mutationFn: (hotel: { name: string; customer: string }) =>
      db.addNewHotel({ ...hotel, order: lastHotel.order + 5 }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: hotelsQueryKey() });
    },
  });

  return {
    addHotel: mutate,
    loading: isPending,
  };
};
