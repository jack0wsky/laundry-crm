import { DayInput } from "@/frontend/components/DayInput";
import { LaundryProduct } from "@/shared/supabase";
import { months } from "@/shared/constants";

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
    <div className="flex gap-x-3 w-full">
      {renderDays.map((item) => (
        <DayInput
          key={`${product.name}-${item.day}-${item.amount}`}
          day={item.day}
          monthName={months[activeMonth]}
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
