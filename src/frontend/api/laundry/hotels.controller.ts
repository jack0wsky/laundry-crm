import { useQuery } from "react-query";
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

export const useListMonthReport = (yearAndMonth: string, hotelId?: string) => {
  const { data } = useQuery(
    ["report", yearAndMonth, hotelId],
    () => db.getReport(hotelId || "", yearAndMonth),
    {
      enabled: !!hotelId,
    },
  );

  return {
    report: data || [],
  };
};

export const useListPricing = (customerName?: string) => {
  const { data } = useQuery(
    ["pricing", customerName],
    () => db.getPricing(customerName || ""),
    {
      enabled: !!customerName,
    },
  );

  return {
    pricing: data || [],
  };
};
