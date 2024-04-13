import { eachMonthOfInterval } from "date-fns";
import { MonthTurnover } from "@/modules/analytics/MonthTurnover";
import { useMemo } from "react";

const startTime = new Date("2023-12-01");

const currentMonth = new Date();

const timeline = eachMonthOfInterval({
  start: startTime,
  end: currentMonth,
})
  .map((date) => {
    const [month, year] = date
      .toLocaleString("en", {
        month: "numeric",
        year: "numeric",
      })
      .split("/");
    return {
      month,
      year: Number(year),
    };
  })
  .sort((a, b) => (a.year > b.year ? -1 : 1));

export const TurnoversListing = () => {
  const timelineGrouped = useMemo(() => {
    return timeline.reduce<{ year: number; months: number[] }[]>(
      (acc, value) => {
        if (acc.findIndex((item) => item.year === value.year) === -1) {
          acc = [...acc, { year: value.year, months: [] }];
        }

        acc[acc.findIndex((item) => item.year === value.year)].months.push(
          Number(value.month),
        );
        return acc;
      },
      [],
    );
  }, [timeline]);

  return (
    <ul className="mt-12">
      {timelineGrouped.map((item, index) => (
        <li key={index} className="w-full mb-6">
          <p className="text-3xl font-medium">{item.year}</p>
          <ul className="w-full mt-3">
            {item.months
              .sort((a, b) => (a < b ? 1 : -1))
              .map((month) => (
                <MonthTurnover
                  key={month}
                  monthIndex={month}
                  year={item.year}
                />
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
