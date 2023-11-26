import { LaundryService } from "@/frontend/components/LaundryService";
import { format } from "date-fns";
import { db } from "@/frontend/laundry.db";
import { v4 as uuid } from "uuid";
import {
  useListMonthReport,
  useListProducts,
} from "@/frontend/api/laundry/hotels.controller";
import { GenerateInvoiceModal } from "@/frontend/components/GenerateInvoiceModal";
import { Hotel } from "@/shared/supabase";

interface ReportProductsTableProps {
  activeHotel: Hotel;
  paymentMethodId: number;
  openModal: boolean;
  onCloseModalClick: () => void;
}

export const ReportProductsTable = ({
  activeHotel,
  paymentMethodId,
  openModal,
  onCloseModalClick,
}: ReportProductsTableProps) => {
  const { products: laundryProducts } = useListProducts();
  const { report } = useListMonthReport(activeHotel.id);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <GenerateInvoiceModal
        isVisible={openModal}
        summary={report}
        onClose={onCloseModalClick}
        paymentMethodId={paymentMethodId}
        customerName={activeHotel?.customer.name || ""}
      />
      <section className="w-full flex flex-col">
        <div className="w-full flex">
          <div className="w-[200px]">
            <ul className="flex flex-col w-[200px] gap-y-2 mt-[40px]">
              {laundryProducts.map((product) => (
                <li key={product.id} className="p-2 capitalize">
                  {product.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-x-3 overflow-x-auto w-full">
            <ol className="flex gap-x-3 h-[40px] items-center w-full">
              {days.map((day) => (
                <li
                  key={day}
                  style={{ minWidth: "80px" }}
                  className="text-center  h-full flex items-center justify-center"
                >
                  {day}
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-y-2">
              {laundryProducts.map((product) => {
                const productReport = report.filter(
                  (item) => item.product.id === product.id,
                );

                return (
                  <LaundryService
                    key={`${product.id}-${activeHotel.id}-${product.name}`}
                    productReport={productReport.map(({ amount, date }) => ({
                      amount: amount || 0,
                      date,
                    }))}
                    product={product}
                    onChange={async (value, day) => {
                      const date = format(
                        new Date(currentYear, currentMonth, day),
                        "yyyy-MM-dd",
                      );

                      const report = await db.getReportForDate(
                        activeHotel.id,
                        date,
                        product.id,
                      );
                      const lastReport = report[0];

                      await db.reportProductAmount(
                        activeHotel.id,
                        value,
                        date,
                        product.id,
                        !!lastReport ? lastReport.id : uuid(),
                      );
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
