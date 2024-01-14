import { useState, useRef, useEffect } from "react";
import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { RightArrowIcon } from "@/modules/shared/icons/right-arrow.icon";
import { PricingModal } from "@/modules/hotels/pricing/PricingModal";
import { Button } from "@/modules/shared/Button";
import { MONTHS } from "@/modules/utils/months";
import axios from "axios";
import type { Hotel } from "@/modules/hotels/types";
import { format } from "date-fns";
import { useListMonthReport } from "@/modules/hotels/reports/api/reports.controller";
import { db } from "@/modules/services/laundry.db";
import { PDFFileIcon } from "@/modules/shared/icons/pdf-file.icon";

interface HeaderProps {
  activeDate: {
    month: number;
    year: number;
  };
  activeHotel: Hotel;
  onPreviousArrowClick: () => void;
  onNextArrowClick: () => void;
  onGenerateInvoiceClick: () => void;
}
export const Header = ({
  activeHotel,
  activeDate,
  onPreviousArrowClick,
  onNextArrowClick,
  onGenerateInvoiceClick,
}: HeaderProps) => {
  const [openPricingModal, setPricingModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const yearAndMonth = format(
    new Date(activeDate.year, activeDate.month),
    "yyyy-MM",
  );
  const { reports } = useListMonthReport(yearAndMonth, activeHotel.id);

  const generatePDF = async () => {
    const activeMonth = activeDate.month + 1;
    const { status } = await axios.post(`/api/table`, {
      month: activeMonth,
      year: activeDate.year,
      hotelName: activeHotel.name,
      reports,
    });

    if (status === 200) {
      setTimeout(async () => {
        const data = await db.downloadPDF(
          activeHotel.name,
          activeMonth,
          activeDate.year,
        );

        if (data) {
          setDownloadUrl(data.signedUrl);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (!downloadLinkRef.current || !downloadUrl) return;

    downloadLinkRef.current.click();
  }, [downloadUrl, downloadLinkRef.current]);

  return (
    <header className="w-full flex flex-col px-4">
      {openPricingModal && (
        <PricingModal
          hotelName={activeHotel.name}
          isVisible={openPricingModal}
          onClose={() => setPricingModal(false)}
        />
      )}
      <div className="w-full flex justify-between items-center py-5">
        <h2 className="text-2xl capitalize font-bold">{activeHotel.name}</h2>

        <div className="flex items-center gap-x-6">
          <a
            className="hidden"
            href={downloadUrl || ""}
            download="File.pdf"
            target="_blank"
            ref={downloadLinkRef}
          ></a>
          <Button variant="secondary" onClick={() => setPricingModal(true)}>
            Cennik
          </Button>
          <Button
            variant="secondary"
            onClick={generatePDF}
            prefix={<PDFFileIcon className="text-xl" />}
          >
            Generuj zestawienie
          </Button>
          <Button onClick={onGenerateInvoiceClick}>Zobacz podsumowanie</Button>
        </div>
      </div>

      <div className="flex h-[80px] justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 mb-4">
            <h2 className="text-2xl">
              {MONTHS[activeDate.month]} {activeDate.year}
            </h2>

            <div className='flex items-center gap-x-3'>
              <button
                onClick={onPreviousArrowClick}
                className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
              >
                <LeftArrowIcon />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-white flex justify-center items-center"
                onClick={onNextArrowClick}
              >
                <RightArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
