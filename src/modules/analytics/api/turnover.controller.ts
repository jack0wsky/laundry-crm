import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { useMemo } from "react";
import { mapFullReportToTurnover } from "@/modules/analytics/helpers/mappers";

export const useTurnover = (yearAndMonth: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["turnover", yearAndMonth],
    queryFn: async () => {
      return await db.getFullReport(yearAndMonth);
    },
    select: mapFullReportToTurnover,
  });

  const totalTurnover = useMemo(() => {
    return (data || [])?.reduce((acc, item) => {
      return (acc += item.total);
    }, 0);
  }, [data]);

  return { turnover: totalTurnover, loading: isPending };
};
