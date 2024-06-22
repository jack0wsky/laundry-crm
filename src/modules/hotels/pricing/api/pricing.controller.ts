import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { db, CreatePricingItemPayload } from "@/modules/services/laundry.db";
import { useCheckSession } from "@/modules/auth/auth.controller";

const listPricing = (hotelName: string, userId: string | undefined) => [
  "pricing",
  hotelName,
  userId,
];

export const useListPricing = (hotelName: string) => {
  const { user } = useCheckSession();

  const { data, isLoading } = useQuery<Pricing[], Error>({
    queryKey: listPricing(hotelName, user?.id),
    queryFn: () => db.getPricing(hotelName),
  });

  return {
    pricing: data || [],
    loading: isLoading,
  };
};

interface UpdateHotelPricing {
  id: string;
  price: number;
  hotelName: string;
}

export const useUpdatePrice = () => {
  const { user } = useCheckSession();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation<
    void,
    Error,
    UpdateHotelPricing
  >({
    mutationFn: (payload) => db.pricing.updateOne(payload.id, payload.price),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: listPricing(variables.hotelName, user?.id),
      });
    },
  });

  return {
    updatePrice: mutate,
    isLoading: isPending,
    error,
  };
};

export const useAddPricingItem = () => {
  const { user } = useCheckSession();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    void,
    Error,
    CreatePricingItemPayload
  >({
    mutationFn: (payload) => db.pricing.addNew(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: listPricing(variables.hotel, user?.id),
      });
    },
  });

  return {
    addProductWithPrice: mutate,
    loading: isPending,
  };
};
