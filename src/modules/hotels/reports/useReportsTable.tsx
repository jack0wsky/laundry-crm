import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { Pricing, PricingWithReports } from "@/modules/hotels/pricing/types";
import { DraggableIcon } from "@/modules/shared/icons/draggable";
import { format, getDaysInMonth } from "date-fns";
import { DayInput } from "@/modules/hotels/reports/DayInput";
import { MONTHS } from "@/modules/utils/months";
import {
  useCreateReport,
  useListMonthReport,
} from "@/modules/hotels/reports/api/reports.controller";
import { useListPricing } from "@/modules/hotels/pricing/api/pricing.controller";
import { Hotel } from "@/modules/hotels/types";
import { useMemo } from "react";

const noResults: PricingWithReports[] = [];

interface DayCellProps {
  day: number;
  row: Row<Pricing>;
  activeHotelId: string;
  activeDate: {
    month: number;
    year: number;
  };
  reports: any[];
}

const DayCell = ({
  day,
  row,
  activeDate,
  reports,
  activeHotelId,
}: DayCellProps) => {
  const date = format(
    new Date(activeDate.year, activeDate.month, day),
    "yyyy-MM-dd",
  );
  const yearAndMonth = format(
    new Date(activeDate.year, activeDate.month),
    "yyyy-MM",
  );

  const report = reports.find(
    (report) =>
      report.date === date && report.product.id === row.original.product.id,
  );

  const { addReport } = useCreateReport(activeHotelId, yearAndMonth);

  const saveReport = async (productId: number, amount: number, day: number) => {
    const date = format(
      new Date(activeDate.year, activeDate.month, day),
      "yyyy-MM-dd",
    );

    addReport({ amount, date, productId });
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

export const useReportsTable = (
  activeHotel: Hotel,
  activeDate: {
    month: number;
    year: number;
  },
) => {
  const yearAndMonth = format(
    new Date(activeDate.year, activeDate.month),
    "yyyy-MM",
  );

  const { reports } = useListMonthReport(yearAndMonth, activeHotel.id);
  const { pricing, loading } = useListPricing(activeHotel.name);

  const days = Array.from(
    { length: getDaysInMonth(new Date(activeDate.year, activeDate.month)) },
    (_, i) => i + 1,
  );

  const columns: ColumnDef<Pricing>[] = [
    {
      header: () => (
        <div className="w-[200px] h-6 bg-gradient-to-r from-white to-transparent" />
      ),
      accessorKey: "name",
      size: 200,
      cell: ({ row, cell }) => {
        return (
          <div
            style={{ width: cell.column.getSize() }}
            className="bg-gradient-to-r from-white from-80% to-transparent h-[42px] flex items-center pl-2"
          >
            <DraggableIcon className="text-2xl text-palette-gray-300" />
            <p>{row.original.product.name}</p>
          </div>
        );
      },
    },
    ...days.map((day) => {
      return {
        header: () => (
          <span className="text-palette-gray-600 text-sm font-bold">
            {day.toString()}
          </span>
        ),
        accessorKey: day.toString(),
        size: 72,
        cell: ({ row }: CellContext<Pricing, unknown>) => {
          return (
            <DayCell
              day={day}
              row={row}
              activeHotelId={activeHotel.id}
              activeDate={activeDate}
              reports={reports}
            />
          );
        },
      };
    }),
  ];

  const availablePricing = useMemo(() => {
    return pricing;
  }, [pricing, activeDate.year, activeDate.month]);

  const table = useReactTable({
    data: availablePricing ?? noResults,
    state: {
      columnPinning: {
        left: ["name"],
      },
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    pricing,
    loadingPricing: loading,
    reports,
  };
};
