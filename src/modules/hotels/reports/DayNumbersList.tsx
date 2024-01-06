import { getDaysInMonth } from "date-fns";

interface DayNumbersListProps {
  activeMonth: number;
  activeYear: number;
}

export const DayNumbersList = ({
  activeYear,
  activeMonth,
}: DayNumbersListProps) => {
  const days = Array.from(
    { length: getDaysInMonth(new Date(activeYear, activeMonth)) },
    (_, i) => i + 1,
  );

  return (
    <ol className="flex gap-x-3 h-[40px] items-center w-full sticky top-0">
      {days.map((day) => (
        <li
          key={day}
          style={{ minWidth: "80px" }}
          className="text-center  h-full flex items-center justify-center"
        >
          {day}
        </li>
      ))}
    </ol>
  );
};
