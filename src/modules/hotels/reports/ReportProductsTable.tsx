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
import { DayNumbersList } from "@/modules/hotels/reports/DayNumbersList";
import { useEffect, useRef } from "react";

interface ReportProductsTableProps {
  activeHotel: Hotel;
  openModal: boolean;
  onCloseModalClick: () => void;
  activeMonth: number;
  activeYear: number;
}

const COLUMN_WIDTH = 80 + 12;

export const ReportProductsTable = ({
  activeHotel,
  openModal,
  onCloseModalClick,
  activeMonth,
  activeYear,
}: ReportProductsTableProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const yearAndMonth = format(new Date(activeYear, activeMonth), "yyyy-MM");
  const { reports } = useListMonthReport(yearAndMonth, activeHotel.id);
  const { pricing, loading } = useListPricing(activeHotel.name);

  const { addReport } = useCreateReport(activeHotel.id, yearAndMonth);

  const days = Array.from(
    { length: getDaysInMonth(new Date(activeYear, activeMonth)) },
    (_, i) => i + 1,
  );
  const wrapper = document.querySelector(".wrapper");

  useEffect(() => {
    const reportsWithAmount = reports.filter((item) => item.amount > 0);
    const latestReport = reportsWithAmount[reportsWithAmount.length - 1];
    const daysTillToday =
      new Date(latestReport ? latestReport.date : new Date()).getDate() - 1;

    if (!wrapper) return;

    setTimeout(() => {
      if (reportsWithAmount.length === 0) {
        wrapper.scrollTo({ left: 0 });
      } else {
        wrapper.scroll({
          left: COLUMN_WIDTH * daysTillToday,
        });
      }
    }, 800);
  }, [wrapper, activeHotel.id, reports.length]);

  const saveReport = async (productId: number, amount: number, day: number) => {
    const date = format(new Date(activeYear, activeMonth, day), "yyyy-MM-dd");

    addReport({ amount, date, productId });
  };

  const customerProducts = pricing;

  return (
    <>
      <GenerateInvoiceModal
        isVisible={openModal}
        pricing={pricing}
        summary={reports}
        customerId={activeHotel.customer.id}
        onClose={onCloseModalClick}
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
        <section className="w-full flex flex-col pb-5 px-4 relative">
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

            <div
              className="flex flex-col gap-x-3 w-full overflow-x-auto wrapper relative"
              ref={container}
            >
              {customerProducts.length > 0 && (
                <DayNumbersList
                  activeYear={activeYear}
                  activeMonth={activeMonth}
                />
              )}
              <div className="flex flex-col gap-y-2 pt-10">
                {customerProducts.map(({ product }) => {
                  const productReport = reports
                    .filter((item) => item.product.id === product.id)
                    .map(({ amount, date }) => ({
                      amount: amount || 0,
                      date,
                    }));

                  return (
                    <LaundryService
                      key={`${product.id}-${activeHotel.id}-${product.name}`}
                      days={days}
                      productReport={productReport}
                      activeMonth={activeMonth}
                      product={product}
                      onChange={(value, day) =>
                        saveReport(product.id, value, day)
                      }
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
