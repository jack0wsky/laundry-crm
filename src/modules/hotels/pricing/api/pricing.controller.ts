import { useMutation, useQuery, useQueryClient } from "react-query";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { db, CreatePricingItemPayload } from "@/modules/services/laundry.db";

const listPricing = (hotelName: string) => ["pricing", hotelName];

export const useListPricing = (hotelName: string) => {
  const { data, isLoading } = useQuery<Pricing[], Error>(
    listPricing(hotelName),
    () => db.getPricing(hotelName),
  );

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
  const { mutate, isLoading, error } = useMutation<
    void,
    Error,
    UpdateHotelPricing
  >((payload) => db.updatePrice(payload.id, payload.price), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(listPricing(variables.hotelName));
    },
  });

  return {
    updatePrice: mutate,
    isLoading,
    error,
  };
};

export const useAddPricingItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation<
    void,
    Error,
    CreatePricingItemPayload
  >((payload) => db.addPrice(payload), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(listPricing(variables.hotel));
    },
  });

  return {
    addProductWithPrice: mutate,
    loading: isLoading,
  };
};
