import { LaundryService } from "@/modules/hotels/reports/LaundryService";
import { format } from "date-fns";
import {
  useCreateReport,
  useListMonthReport,
} from "@/modules/hotels/reports/api/reports.controller";
import { useListPricing } from "@/modules/hotels/pricing/api/pricing.controller";
import { GenerateInvoiceModal } from "@/modules/hotels/reports/GenerateInvoiceModal";
import type { Hotel } from "@/modules/hotels/types";
import { getDaysInMonth } from "date-fns";
import { CSSProperties, useMemo, useState } from "react";
import { MONTHS } from "@/modules/utils/months";
import { CalendarIcon } from "@/modules/shared/icons/calendar.icon";
import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { RightArrowIcon } from "@/modules/shared/icons/right-arrow.icon";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  Column,
  ColumnDef,
} from "@tanstack/react-table";
import { useActiveMonth } from "@/modules/utils/useActiveMonth";
import { DayInput } from "@/modules/hotels/reports/DayInput";
import { DraggableIcon } from "@/modules/shared/icons/draggable";
import { Pricing, PricingWithReports } from "@/modules/hotels/pricing/types";
import { Button } from "@/modules/shared/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ReportProductsTableProps {
  activeHotel: Hotel;
}

const noResults: PricingWithReports[] = [];

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export const ReportProductsTable = ({
  activeHotel,
}: ReportProductsTableProps) => {
  const [openInvoiceSummaryModal, setOpenInvoiceSummaryModal] = useState(false);
  const { previousMonth, nextMonth, activeDate } = useActiveMonth();

  const yearAndMonth = format(
    new Date(activeDate.year, activeDate.month),
    "yyyy-MM",
  );

  const { reports } = useListMonthReport(yearAndMonth, activeHotel.id);
  const { pricing, loading } = useListPricing(activeHotel.name);

  const { addReport } = useCreateReport(activeHotel.id, yearAndMonth);

  const days = Array.from(
    { length: getDaysInMonth(new Date(activeDate.year, activeDate.month)) },
    (_, i) => i + 1,
  );

  const saveReport = async (productId: number, amount: number, day: number) => {
    const date = format(
      new Date(activeDate.year, activeDate.month, day),
      "yyyy-MM-dd",
    );

    addReport({ amount, date, productId });
  };

  const customerProducts = pricing;

  const productWithReports = useMemo(() => {
    return customerProducts;
  }, [customerProducts, activeDate.year, activeDate.month]);

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
        // @ts-ignore
        cell: ({ row }) => {
          const date = format(
            new Date(activeDate.year, activeDate.month, day),
            "yyyy-MM-dd",
          );

          const report = reports.find(
            (report) =>
              report.date === date &&
              report.product.id === row.original.product.id,
          );

          return (
            <DayInput
              day={day}
              name={row.original.product.name}
              defaultValue={report?.amount || 0}
              onChange={(value) => {
                console.log(value);
              }}
              monthName={MONTHS[activeDate.month]}
            />
          );
        },
      };
    }),
  ];

  const table = useReactTable({
    data: productWithReports ?? noResults,
    state: {
      columnPinning: {
        left: ["name"],
      },
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex flex-col bg-white rounded-[20px] mb-5">
        <div className="w-full flex justify-between items-center pt-4 px-5 pb-6">
          <div className="flex items-center bg-palette-gray-50 rounded-full w-max py-1 pl-3 pr-1">
            <div className="flex items-center gap-x-2">
              <CalendarIcon />
              <p className="text-base font-medium">
                {MONTHS[activeDate.month]}
              </p>
            </div>

            <div className="flex items-center gap-x-1 ml-4">
              <button
                onClick={previousMonth}
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center"
              >
                <LeftArrowIcon />
              </button>
              <button
                onClick={nextMonth}
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center"
              >
                <RightArrowIcon />
              </button>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenInvoiceSummaryModal(true)}>
                Generuj fakturę
              </Button>
            </DialogTrigger>
            <DialogContent>
              <GenerateInvoiceModal
                isVisible={openInvoiceSummaryModal}
                pricing={pricing}
                summary={reports}
                customerId={activeHotel.customer.id}
                onClose={() => setOpenInvoiceSummaryModal(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto w-full max-w-[1200px]">
          <table style={{ width: table.getTotalSize() }}>
            <thead className="w-full flex items-center">
              {table.getHeaderGroups().map((header) => {
                return (
                  <tr key={header.id} className="w-full flex gap-x-2">
                    {header.headers.map((item) => (
                      <th
                        key={item.id}
                        style={{ ...getCommonPinningStyles(item.column) }}
                      >
                        {flexRender(
                          item.column.columnDef.header,
                          item.getContext(),
                        )}
                      </th>
                    ))}
                  </tr>
                );
              })}
            </thead>
            <tbody className="w-full">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.original.product.id}
                    className="flex items-center gap-x-2 w-full py-2 bg-white pr-4"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ ...getCommonPinningStyles(cell.column) }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="w-full h-1/2 flex justify-center items-center">
          <p>Ładowanie danych...</p>
        </div>
      )}
      {!loading && customerProducts.length === 0 && (
        <div className="w-full h-1/2 flex justify-center items-center">
          <p>Brak cennika</p>
        </div>
      )}
    </>
  );
};
