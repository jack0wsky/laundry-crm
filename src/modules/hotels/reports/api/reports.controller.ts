import { useQuery } from "react-query";
import { db } from "@/modules/services/laundry.db";

export const useListMonthReport = (yearAndMonth: string, hotelId: string) => {
  const { data, refetch } = useQuery(["report", yearAndMonth, hotelId], () =>
    db.getReport(hotelId, yearAndMonth),
  );

  return {
    reports: data || [],
    fetchData: refetch,
  };
};
