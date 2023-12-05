import { LaundryService } from "@/frontend/components/LaundryService";
import { format } from "date-fns";
import { db } from "@/frontend/laundry.db";
import { v4 as uuid } from "uuid";
import {
  useListMonthReport,
  useListPricing,
} from "@/frontend/api/laundry/hotels.controller";
import { GenerateInvoiceModal } from "@/frontend/components/GenerateInvoiceModal";
import { Hotel } from "@/shared/supabase";
import { getDaysInMonth } from "date-fns";
import { DayNumbersList } from "@/frontend/components/DayNumbersList";

interface ReportProductsTableProps {
  activeHotel: Hotel;
  paymentMethodId: number;
  openModal: boolean;
  onCloseModalClick: () => void;
  activeMonth: number;
  activeYear: number;
}

export const ReportProductsTable = ({
  activeHotel,
  paymentMethodId,
  openModal,
  onCloseModalClick,
  activeMonth,
  activeYear,
}: ReportProductsTableProps) => {
  const yearAndMonth = format(new Date(activeYear, activeMonth), "yyyy-MM");
  const { report, fetchData } = useListMonthReport(
    yearAndMonth,
    activeHotel.id,
  );
  const { pricing, loading } = useListPricing(activeHotel.name);

  const days = Array.from(
    { length: getDaysInMonth(new Date(activeYear, activeMonth)) },
    (_, i) => i + 1,
  );

  const customerProducts = pricing;

  return (
    <>
      <GenerateInvoiceModal
        isVisible={openModal}
        pricing={pricing}
        summary={report}
        onClose={onCloseModalClick}
        paymentMethodId={paymentMethodId}
      />

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
      {customerProducts.length > 0 && (
        <section className="w-full flex flex-col pb-7 min-h-screen px-4">
          <div className="w-full flex">
            {customerProducts.length > 0 && (
              <div className="w-[200px]">
                <ul className="flex flex-col w-[200px] gap-y-2 pt-10">
                  {customerProducts.map((item) => (
                    <li key={item.id} className="p-2 capitalize">
                      {item.product.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-x-3 overflow-x-auto w-full">
              {customerProducts.length > 0 && (
                <DayNumbersList
                  activeYear={activeYear}
                  activeMonth={activeMonth}
                />
              )}

              <div className="flex flex-col gap-y-2">
                {customerProducts.map(({ product }) => {
                  const productReport = report.filter(
                    (item) => item.product.id === product.id,
                  );

                  return (
                    <LaundryService
                      key={`${product.id}-${activeHotel.id}-${product.name}`}
                      days={days}
                      productReport={productReport.map(({ amount, date }) => ({
                        amount: amount || 0,
                        date,
                      }))}
                      product={product}
                      onChange={async (value, day) => {
                        const date = format(
                          new Date(activeYear, activeMonth, day),
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
      )}
    </>
  );
};
