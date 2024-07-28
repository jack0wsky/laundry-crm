import { useTurnover } from "@/modules/analytics/api/turnover.controller";
import { clsx } from "clsx";
import { MONTHS } from "@/modules/utils/months";
import { formatDate } from "@/modules/utils/format-date";

interface OverviewProps {
  currentYear: number;
}

export const Overview = ({ currentYear }: OverviewProps) => {
  const today = new Date();

  const currenMonthLabel = MONTHS[today.getMonth()];

  const currentYearAndMonth = formatDate({
    format: "yyyy-MM",
    year: currentYear,
    month: today.getMonth(),
  });

  const previousYearAndMonth = formatDate({
    format: "yyyy-MM",
    year: currentYear,
    month: today.getMonth() - 1,
  });

  const { turnover: currentTurnover, loading: currentTurnoverLoading } =
    useTurnover(currentYearAndMonth);

  const { turnover: previousTurnover, loading: previousTurnoverLoading } =
    useTurnover(previousYearAndMonth);

  const percentage =
    (1 -
      Number(currentTurnover.toFixed(0)) /
        Number(previousTurnover.toFixed(0))) *
    100;

  const parsedPercentage =
    percentage > 100
      ? `+${percentage.toFixed(0)}%`
      : `-${percentage.toFixed(0)}%`;

  const previousMonthTurnover = `${previousTurnover.toLocaleString(
    "pl-PL",
  )} zł`;

  return (
    <div className="flex bg-white w-full h-[230px] mt-10 px-9 py-8 rounded-[20px] border border-palette-gray-100">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-palette-gray-300 uppercase font-black text-xs">
            Obecny miesiąc
          </p>
          <p className="text-[28px] font-medium">{currenMonthLabel}</p>
        </div>

        <div>
          {previousTurnoverLoading ? (
            <div className="h-5 w-[160px] animate-pulse bg-palette-gray-50 rounded-lg" />
          ) : (
            <p className="text-palette-gray-300 uppercase font-bold text-sm">
              Poprzedni miesiąc: {previousMonthTurnover} netto
            </p>
          )}
          <div className="flex items-center gap-x-3">
            {currentTurnoverLoading ? (
              <div className="h-12 w-[200px] animate-pulse bg-palette-gray-50 rounded-lg" />
            ) : (
              <p className="font-bold text-[32px]">
                {currentTurnover.toLocaleString("pl-PL")} zł netto
              </p>
            )}

            {currentTurnover > 0 && (
              <p
                className={clsx(
                  "px-2 py-1.5 rounded-full font-bold",
                  percentage > 100
                    ? "text-palette-green-700 bg-palette-green-700/10"
                    : "text-palette-red-500 bg-palette-red-500/10",
                )}
              >
                {parsedPercentage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
