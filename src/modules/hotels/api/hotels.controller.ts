import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import type { Hotel } from "@/modules/hotels/types";
import { listCustomersWithHotelsKey } from "@/modules/customers/api/customers.controller";

export const hotelsQueryKey = () => ["hotels"];

export const useListHotels = () => {
  const { data, isPending, isSuccess } = useQuery<Hotel[], Error>({
    queryKey: hotelsQueryKey(),
    queryFn: () => db.hotels.getAll(),
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

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      db.hotels.updateHotelName(id, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: listCustomersWithHotelsKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: hotelsQueryKey(),
      });
      options?.onSuccess();
    },
  });

  return {
    updateName: mutate,
    loading: isPending,
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

export const useAddHotel = (options?: {
  onSuccess: (hotelId: string) => void;
}) => {
  const { hotels } = useListHotels();
  const queryClient = useQueryClient();

  const lastHotel = hotels.sort((a, b) => b.order - a.order)[0];

  const { mutate, isPending } = useMutation({
    mutationFn: (hotel: { name: string; customer: string }) =>
      db.hotels.addNew({ ...hotel, order: lastHotel.order + 5 }),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: hotelsQueryKey() });
      void queryClient.invalidateQueries({
        queryKey: listCustomersWithHotelsKey(),
      });

      if (!data) return;
      options?.onSuccess(data[0].id);
    },
  });

  return {
    addHotel: mutate,
    loading: isPending,
  };
};
