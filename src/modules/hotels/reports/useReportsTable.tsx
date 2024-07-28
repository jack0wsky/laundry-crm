import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pricing, PricingWithReports } from "@/modules/hotels/pricing/types";
import { getDaysInMonth } from "date-fns";
import { useListMonthReport } from "@/modules/hotels/reports/api/reports.controller";
import { useListPricing } from "@/modules/hotels/pricing/api/pricing.controller";
import { Hotel } from "@/modules/hotels/types";
import { useMemo } from "react";
import { formatDate } from "@/modules/utils/format-date";
import { DailyInputCell } from "@/modules/hotels/reports/products-table/DailyInputCell";
import { NameCell } from "@/modules/hotels/reports/products-table/NameCell";

const noResults: PricingWithReports[] = [];

export const useReportsTable = (
  activeHotel: Hotel,
  activeDate: {
    month: number;
    year: number;
  },
) => {
  const yearAndMonth = formatDate({
    format: "yyyy-MM",
    ...activeDate,
  });

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
      cell: NameCell,
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
            <DailyInputCell
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
    getRowId: (row) => row.product.id.toString(),
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    pricing,
    loadingPricing: loading,
    reports,
  };
};
