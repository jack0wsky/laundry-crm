import { useMutation, useQuery, useQueryClient } from "react-query";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { db } from "@/modules/services/laundry.db";

export const useListPricing = (hotelName: string) => {
  const { data, isLoading } = useQuery<Pricing[], Error>(
    ["pricing", hotelName],
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
      queryClient.invalidateQueries(["pricing", variables.hotelName]);
    },
  });

  return {
    updatePrice: mutate,
    isLoading,
    error,
  };
};
