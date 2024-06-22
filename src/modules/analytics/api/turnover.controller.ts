import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import type { Pricing } from "@/modules/hotels/pricing/types";
import {
  getAmounts,
  ProvidedProduct,
} from "@/modules/utils/get-total-hotel-usage";
import { useMemo } from "react";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useCheckSession } from "@/modules/auth/auth.controller";

export const useGetTurnover = (yearAndMonth: string) => {
  const { hotels, fetched } = useListHotels();

  const { user } = useCheckSession();

  const { data, isPending } = useQuery({
    queryKey: ["turnover", yearAndMonth, user?.id],
    queryFn: async () => {
      const allPrices: ProvidedProduct[] = [];

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
    enabled: fetched,
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
