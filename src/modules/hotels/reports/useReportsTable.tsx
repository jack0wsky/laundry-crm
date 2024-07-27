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
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/modules/utils/format-date";
import { DailyInputCell } from "@/modules/hotels/reports/products-table/DailyInputCell";
import { NameCell } from "@/modules/hotels/reports/products-table/NameCell";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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

  const [items, setItems] = useState<Pricing[]>([]);

  useEffect(() => {
    if (pricing.length === 0 || loading) return;

    const cachedPricing = localStorage.getItem("laqua_pricing");

    setItems(cachedPricing ? JSON.parse(cachedPricing) : pricing);
  }, [pricing, loading]);

  const productsIds = useMemo(
    () => items.map((item) => item.product.id),
    [items],
  );

  const swapItems = ({ active, over }: DragEndEvent) => {
    if (active && over && active.id !== over.id) {
      setItems((data) => {
        const oldIndex = productsIds.indexOf(active.id as number);
        const newIndex = productsIds.indexOf(over.id as number);
        const updatedArray = arrayMove(data, oldIndex, newIndex);
        localStorage.setItem("laqua_pricing", JSON.stringify(updatedArray));

        return updatedArray;
      });
    }
  };

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
    return items;
  }, [items, activeDate.year, activeDate.month]);

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
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

  return {
    table,
    pricing,
    loadingPricing: loading,
    reports,
    swapItems,
    productsIds,
  };
};
