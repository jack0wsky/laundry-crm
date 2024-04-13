import { MONTHS } from "@/modules/utils/months";
import { format } from "date-fns";
import { useGetTurnover } from "@/modules/analytics/api/turnover.controller";

interface MonthTurnoverProps {
  monthIndex: number;
  year: number;
}
export const MonthTurnover = ({ monthIndex, year }: MonthTurnoverProps) => {
  const yearAndMonth = format(new Date(year, monthIndex - 1), "yyyy-MM");

  const { allPrices, turnover, loading } = useGetTurnover(yearAndMonth);

  return (
    <div className="flex justify-between items-center w-full border-b border-gray-300 py-2">
      <p className="text-xl">{MONTHS[monthIndex - 1]}</p>

      {(allPrices.length === 0 || loading) && <p>Obliczanie...</p>}

      {!loading && (
        <p className="text-xl">
          {(turnover * 1.23).toLocaleString("pl-PL", {
            maximumFractionDigits: 2,
          })}{" "}
          zł ( {turnover.toLocaleString("pl-PL")} zł netto )
        </p>
      )}
    </div>
  );
};
