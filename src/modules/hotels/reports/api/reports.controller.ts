import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { v4 as uuid } from "uuid";
import { useCheckSession } from "@/modules/auth/auth.controller";

const listMonthReportQueryKey = (
  yearAndMonth: string,
  hotelId: string,
  userId: string | undefined,
) => ["report", yearAndMonth, hotelId, userId];

export const useListMonthReport = (yearAndMonth: string, hotelId: string) => {
  const { user } = useCheckSession();

  const { data, refetch } = useQuery({
    queryKey: listMonthReportQueryKey(yearAndMonth, hotelId, user?.id),
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
  const { user } = useCheckSession();
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
        queryKey: listMonthReportQueryKey(
          yearAndMonth,
          activeHotelId,
          user?.id,
        ),
      });
    },
  });

  return {
    addReport: mutate,
    loading: isPending,
  };
};
