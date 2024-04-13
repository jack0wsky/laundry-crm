import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import type { Pricing } from "@/modules/hotels/pricing/types";
import {
  getAmounts,
  ProvidedProduct,
} from "@/modules/utils/get-total-hotel-usage";
import { useMemo } from "react";

export const useGetTurnover = (yearAndMonth: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["turnover", yearAndMonth],
    queryFn: async () => {
      const allPrices: ProvidedProduct[] = [];
      const hotels = await db.getHotels();

      await Promise.all(
        (hotels || []).map(async (hotel) => {
          const reports = await db.getReport(hotel.id, yearAndMonth);
          const pricing = (await db.getPricing(hotel.name)) as Pricing[];
          allPrices.push(...getAmounts(reports, pricing));
        }),
      );

      return allPrices;
    },
    refetchOnMount: true,
  });

  const totalTurnover = useMemo(() => {
    return (data || []).reduce((acc, item) => {
      return (acc += item.amount * item.price);
    }, 0);
  }, [data]);

  return {
    allPrices: data || [],
    turnover: totalTurnover,
    loading: isPending,
  };
};
