import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { db, CreatePricingItemPayload } from "@/modules/services/laundry.db";

const listPricing = (hotelName: string) => ["pricing", hotelName];

export const useListPricing = (hotelName: string) => {
  const { data, isLoading } = useQuery<Pricing[], Error>({
    queryKey: listPricing(hotelName),
    queryFn: () => db.getPricing(hotelName),
    select: (data) => data.sort((a, b) => (a.order > b.order ? 1 : -1)),
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
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation<
    void,
    Error,
    UpdateHotelPricing
  >({
    mutationFn: (payload) => db.pricing.updateOne(payload.id, payload.price),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: listPricing(variables.hotelName),
      });
    },
  });

  return {
    updatePrice: mutate,
    isLoading: isPending,
    error,
  };
};

export const useUpdateProductOrder = (hotelName: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { productId: string; newOrderNumber: number }) =>
      db.changeProductOrder(payload.productId, payload.newOrderNumber),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: listPricing(hotelName) });
    },
  });

  return {
    updateProductOrder: mutate,
    loading: isPending,
  };
};

export const useAddPricingItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    void,
    Error,
    CreatePricingItemPayload
  >({
    mutationFn: (payload) => db.pricing.addNew(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: listPricing(variables.hotel) });
    },
  });

  return {
    addProductWithPrice: mutate,
    loading: isPending,
  };
};
