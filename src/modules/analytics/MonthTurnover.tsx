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
    <li className="flex justify-between items-center w-full py-2 px-3 bg-white rounded-lg text-base">
      <p>{MONTHS[monthIndex - 1]}</p>

      {allPrices.length === 0 && loading && <p>Obliczanie...</p>}

      {!loading && (
        <p>
          {(turnover * 1.23).toLocaleString("pl-PL", {
            maximumFractionDigits: 2,
          })}{" "}
          zł ( {turnover.toLocaleString("pl-PL")} zł netto )
        </p>
      )}
    </li>
  );
};
