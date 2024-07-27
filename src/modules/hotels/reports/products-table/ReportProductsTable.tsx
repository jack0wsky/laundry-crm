import { format } from "date-fns";
import { useCreateReport } from "@/modules/hotels/reports/api/reports.controller";
import type { Hotel } from "@/modules/hotels/types";
import { flexRender } from "@tanstack/react-table";
import { useActiveMonth } from "@/modules/utils/useActiveMonth";
import { useReportsTable } from "@/modules/hotels/reports/useReportsTable";
import { ReportProductsHeader } from "@/modules/hotels/reports/products-table/ReportProductsHeader";
import { EmptyState } from "@/modules/hotels/reports/products-table/EmptyState";
import { TableHeader } from "@/modules/hotels/reports/products-table/TableHeader";
import { getCommonPinningStyles } from "@/modules/hotels/reports/products-table/utils";

interface ReportProductsTableProps {
  activeHotel: Hotel;
}

export const ReportProductsTable = ({
  activeHotel,
}: ReportProductsTableProps) => {
  const { previousMonth, nextMonth, activeDate } = useActiveMonth();

  const yearAndMonth = format(
    new Date(activeDate.year, activeDate.month),
    "yyyy-MM",
  );

  const { addReport } = useCreateReport(activeHotel.id, yearAndMonth);

  const saveReport = async (productId: number, amount: number, day: number) => {
    const date = format(
      new Date(activeDate.year, activeDate.month, day),
      "yyyy-MM-dd",
    );

    addReport({ amount, date, productId });
  };

  const { table, pricing, loadingPricing, reports } = useReportsTable(
    activeHotel,
    activeDate,
  );

  console.log("pricing", pricing);

  return (
    <>
      <div
        style={{ height: "calc(100vh - 110px)" }}
        className="flex flex-col bg-white rounded-[20px] mb-5 mx-5"
      >
        {loadingPricing && (
          <div className="w-full h-1/2 flex justify-center items-center">
            <p>Ładowanie danych...</p>
          </div>
        )}
        {!loadingPricing && pricing.length === 0 && (
          <EmptyState hotelName={activeHotel.name} />
        )}

        {pricing.length > 0 && (
          <ReportProductsHeader
            onArrowBackClick={previousMonth}
            onArrowForwardClick={nextMonth}
            activeDate={activeDate}
            customerId={activeHotel.customer.id}
            hotelName={activeHotel.name}
            pricing={pricing}
            reports={reports}
          />
        )}

        {pricing.length > 0 && (
          <div className="overflow-x-auto w-full max-w-[1200px]">
            <table style={{ width: table.getTotalSize() }}>
              <TableHeader table={table} />

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
        )}
      </div>
    </>
  );
};
