import { useMutation, useQuery, useQueryClient } from "react-query";
import { db } from "@/modules/services/laundry.db";
import { v4 as uuid } from "uuid";

const listMonthReportQueryKey = (yearAndMonth: string, hotelId: string) => [
  "report",
  yearAndMonth,
  hotelId,
];
export const useListMonthReport = (yearAndMonth: string, hotelId: string) => {
  const { data, refetch } = useQuery(
    listMonthReportQueryKey(yearAndMonth, hotelId),
    () => db.getReport(hotelId, yearAndMonth),
  );

  return {
    reports: data || [],
    fetchData: refetch,
  };
};

export const useCreateReport = (
  activeHotelId: string,
  yearAndMonth: string,
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async ({
      amount,
      date,
      productId,
    }: {
      amount: number;
      date: string;
      productId: number;
    }) => {
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
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          listMonthReportQueryKey(yearAndMonth, activeHotelId),
        );
      },
    },
  );

  return {
    addReport: mutate,
    loading: isLoading,
  };
};
