import { MonthTurnover } from "@/modules/analytics/MonthTurnover";
import { Timeline } from "@/modules/analytics/helpers/group-months-by-years";

interface TurnoversListingProps {
  timeline: Timeline[];
}

export const TurnoversListing = ({ timeline }: TurnoversListingProps) => {
  return (
    <ul className="py-12 w-full pl-9 flex flex-col gap-y-5">
      {timeline.map((item, index) => (
        <li key={index} className="flex items-start justify-between w-full">
          <p className="text-3xl font-medium">{item.year}</p>
          <ul className="max-w-[800px] w-full flex flex-col gap-y-2">
            {item.months.map((month) => (
              <MonthTurnover key={month} monthIndex={month} year={item.year} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
