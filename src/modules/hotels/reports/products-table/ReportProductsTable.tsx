import type { Hotel } from "@/modules/hotels/types";
import { useActiveMonth } from "@/modules/utils/useActiveMonth";
import { useReportsTable } from "@/modules/hotels/reports/useReportsTable";
import { ReportProductsHeader } from "@/modules/hotels/reports/products-table/ReportProductsHeader";
import { EmptyState } from "@/modules/hotels/reports/products-table/EmptyState";
import { TableHeader } from "@/modules/hotels/reports/products-table/TableHeader";
import { ProductRow } from "@/modules/hotels/reports/products-table/ProductRow";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ReportProductsTableProps {
  activeHotel: Hotel;
}

export const ReportProductsTable = ({
  activeHotel,
}: ReportProductsTableProps) => {
  const { previousMonth, nextMonth, activeDate } = useActiveMonth();

  const { table, pricing, loadingPricing, reports, swapItems, productsIds } =
    useReportsTable(activeHotel, activeDate);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragEnd={swapItems}
    >
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
                <SortableContext
                  items={productsIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <ProductRow key={row.original.product.id} row={row} />
                    );
                  })}
                </SortableContext>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DndContext>
  );
};
