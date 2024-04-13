import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { v4 as uuid } from "uuid";

const listMonthReportQueryKey = (yearAndMonth: string, hotelId: string) => [
  "report",
  yearAndMonth,
  hotelId,
];
export const useListMonthReport = (yearAndMonth: string, hotelId: string) => {
  const { data, refetch } = useQuery({
    queryKey: listMonthReportQueryKey(yearAndMonth, hotelId),
    queryFn: () => db.getReport(hotelId, yearAndMonth),
  });

  return {
    reports: data || [],
    fetchData: refetch,
  };
};

interface CreateReportPayload {
  amount: number;
  date: string;
  productId: number;
}
export const useCreateReport = (
  activeHotelId: string,
  yearAndMonth: string,
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ amount, date, productId }: CreateReportPayload) => {
      const report = await db.getReportForDate(activeHotelId, date, productId);
      const lastReport = report[0];

      await db.reportProductAmount(
        activeHotelId,
        amount,
        date,
        productId,
        !!lastReport ? lastReport.id : uuid(),
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: listMonthReportQueryKey(yearAndMonth, activeHotelId),
      });
    },
  });

  return {
    addReport: mutate,
    loading: isPending,
  };
};
