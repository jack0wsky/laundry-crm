import { Row } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";
import { formatDate } from "@/modules/utils/format-date";
import { useCreateReport } from "@/modules/hotels/reports/api/reports.controller";
import { DayInput } from "@/modules/hotels/reports/DayInput";
import { MONTHS } from "@/modules/utils/months";

interface DailyInputCellProps {
  day: number;
  row: Row<Pricing>;
  activeHotelId: string;
  activeDate: {
    month: number;
    year: number;
  };
  reports: any[];
}

export const DailyInputCell = ({
  day,
  row,
  activeDate,
  reports,
  activeHotelId,
}: DailyInputCellProps) => {
  const date = formatDate({
    format: "yyyy-MM-dd",
    ...activeDate,
    day,
  });

  const yearAndMonth = formatDate({
    format: "yyyy-MM",
    ...activeDate,
  });

  const report = reports.find(
    (report) =>
      report.date === date && report.product.id === row.original.product.id,
  );

  const { addReport } = useCreateReport(activeHotelId, yearAndMonth);

  const saveReport = async (productId: number, amount: number, day: number) => {
    addReport({
      amount,
      date: formatDate({
        format: "yyyy-MM-dd",
        ...activeDate,
        day,
      }),
      productId,
    });
  };

  return (
    <DayInput
      day={day}
      name={row.original.product.name}
      defaultValue={report?.amount || 0}
      onBlur={(value) => {
        saveReport(row.original.product.id, value, day);
      }}
      monthName={MONTHS[activeDate.month]}
    />
  );
};
