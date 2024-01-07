import { DayInput } from "@/modules/hotels/reports/DayInput";
import type { LaundryProduct } from "@/modules/hotels/pricing/types";
import { MONTHS } from "@/modules/utils/months";

interface ProductProps {
  product: LaundryProduct;
  onChange: (value: number, day: number) => void;
  productReport: { date: string; amount: number }[];
  days: number[];
  activeMonth: number;
}
export const LaundryService = ({
  product,
  onChange,
  productReport,
  days,
  activeMonth,
}: ProductProps) => {
  const report = productReport.map((item) => ({
    ...item,
    day: new Date(item.date).getDate(),
  }));

  const renderDays = days.map((day) => {
    const hasDay = report.find((item) => item.day === day);
    if (hasDay) {
      return { day, amount: hasDay.amount };
    }
    return { day, amount: 0 };
  });

  return (
    <div className="flex w-full gap-x-3">
      {renderDays.map((item) => (
        <DayInput
          key={`${product.name}-${item.day}-${item.amount}`}
          day={item.day}
          monthName={MONTHS[activeMonth]}
          defaultValue={item.amount}
          onChange={(value) => {
            onChange(value, item.day);
          }}
          name={product.name}
        />
      ))}
    </div>
  );
};
