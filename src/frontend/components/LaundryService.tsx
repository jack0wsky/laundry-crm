import { DayInput } from "@/frontend/components/DayInput";
import { LaundryProduct } from "@/shared/supabase";

interface ProductProps {
  product: LaundryProduct;
  onChange: (value: number, day: number) => void;
  productReport: { date: string; amount: number }[];
  days: number[];
}
export const LaundryService = ({
  product,
  onChange,
  productReport,
  days,
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
          defaultValue={item.amount}
          onChange={(value) => {
            console.log("onchange", value, item.day);
            onChange(value, item.day);
          }}
          name={product.name}
        />
      ))}
    </div>
  );
};
