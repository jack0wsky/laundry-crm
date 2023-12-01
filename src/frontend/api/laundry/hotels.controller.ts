import { useMutation, useQuery } from "react-query";
import { db } from "@/frontend/laundry.db";

export const useListHotels = () => {
  const { data } = useQuery("hotels", () => db.getHotels());

  return {
    hotels: data || [],
  };
};

export const useListProducts = () => {
  const { data } = useQuery("products", () => db.getProducts());

  return {
    products: data || [],
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
  const { data } = useQuery(["pricing", hotelName], () =>
    db.getPricing(hotelName),
  );

  return {
    pricing: data || [],
  };
};

export const useAddPrice = () => {
  const { mutate, isLoading, error } = useMutation(
    (payload: { hotelName: string; price: number; productId: number }) =>
      db.setPrices([]),
  );

  return {
    addPrice: mutate,
    isLoading,
    error,
  };
};
