import { MONTHS } from "@/modules/utils/months";
import { useTurnover } from "@/modules/analytics/api/turnover.controller";
import { formatDate } from "@/modules/utils/format-date";

interface MonthTurnoverProps {
  monthIndex: number;
  year: number;
}
export const MonthTurnover = ({ monthIndex, year }: MonthTurnoverProps) => {
  const yearAndMonth = formatDate({
    format: "yyyy-MM",
    year,
    month: monthIndex - 1,
  });

  const { turnover, loading } = useTurnover(yearAndMonth);

  return (
    <li className="flex justify-between items-center w-full py-2 px-3 bg-white rounded-lg text-base">
      <p>{MONTHS[monthIndex - 1]}</p>

      {turnover === 0 && loading && <p>Obliczanie...</p>}

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
