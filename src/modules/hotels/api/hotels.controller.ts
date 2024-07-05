import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import type { Hotel } from "@/modules/hotels/types";
import { useCheckSession } from "@/modules/auth/auth.controller";
import { useLaundryId } from "@/modules/utils/use-params";

export const hotelsQueryKey = (userId: string | undefined) => [
  "hotels",
  userId,
];

export const useListHotels = () => {
  const { user } = useCheckSession();

  const laundryId = useLaundryId();

  const { data, isPending, isSuccess } = useQuery<Hotel[], Error>({
    queryKey: hotelsQueryKey(user?.id),
    queryFn: () => db.hotels.getAll(laundryId),
    enabled: !!laundryId,
  });

  return {
    hotels: data || [],
    loading: isPending,
    fetched: isSuccess,
  };
};

export const useUpdateHotelName = (options?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { user } = useCheckSession();

  const { mutate } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      db.hotels.updateHotelName(id, name),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: hotelsQueryKey(user?.id),
      });
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
  const laundryId = useLaundryId();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AddCustomerPayload) =>
      db.addNewClient({ ...payload, laundryId }),
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
  const { user } = useCheckSession();
  const laundryId = useLaundryId();

  const lastHotel = hotels.sort((a, b) => b.order - a.order)[0];

  const { mutate, isPending } = useMutation({
    mutationFn: (hotel: { name: string; customer: string }) =>
      db.hotels.addNew({ ...hotel, order: lastHotel.order + 5, laundryId }),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: hotelsQueryKey(user?.id),
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
