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
import {useEffect, useRef, useState} from "react";
import { MONTHS } from "@/modules/utils/months";
import { CalendarIcon } from "@/modules/shared/icons/calendar.icon";
import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { RightArrowIcon } from "@/modules/shared/icons/right-arrow.icon";
import {useGeneratePdfReport} from "@/modules/hotels/pdf-summary/use-generate-pdf-report";

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
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const yearAndMonth = format(new Date(activeYear, activeMonth), "yyyy-MM");
  const { reports } = useListMonthReport(yearAndMonth, activeHotel.id);
  const { pricing, loading } = useListPricing(activeHotel.name);

  const { generatePdfReport, isPending } = useGeneratePdfReport({
    onSuccess: setDownloadUrl,
  });

  const generatePDF = async () => {
    generatePdfReport({
      month: activeMonth + 1,
      year: activeYear,
      hotelName: activeHotel.name,
      reports,
    });
  };

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
        <section className="w-full flex flex-col pb-5 px-4 relative bg-white rounded-[20px]">
          <div className="w-full flex justify-between items-center pt-4 pb-6">
            <div className="flex items-center bg-palette-gray-50 rounded-full w-max py-1 pl-3 pr-1">
              <div className="flex items-center gap-x-2">
                <CalendarIcon />
                <p className="text-base font-medium">{MONTHS[activeMonth]}</p>
              </div>

              <div className="flex items-center gap-x-1 ml-4">
                <button className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                  <LeftArrowIcon />
                </button>
                <button className="w-7 h-7 rounded-full bg-white flex justify-center items-center">
                  <RightArrowIcon />
                </button>
              </div>
            </div>
          </div>

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
