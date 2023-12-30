import { useMutation, useQuery, useQueryClient } from "react-query";
import { db } from "@/frontend/laundry.db";
import { Pricing } from "@/shared/supabase";

export const useListHotels = () => {
  const { data } = useQuery("hotels", () => db.getHotels());

  return {
    hotels: data || [],
  };
};

export const useListMonthReport = (yearAndMonth: string, hotelId: string) => {
  const { data, refetch } = useQuery(["report", yearAndMonth, hotelId], () =>
    db.getReport(hotelId, yearAndMonth),
  );

  return {
    report: data || [],
    fetchData: refetch,
  };
};

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
