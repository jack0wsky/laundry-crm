import { CalendarIcon } from "@/modules/shared/icons/calendar.icon";
import { MONTHS } from "@/modules/utils/months";
import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { RightArrowIcon } from "@/modules/shared/icons/right-arrow.icon";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/modules/shared/Button";
import { GenerateInvoiceModal } from "@/modules/hotels/reports/GenerateInvoiceModal";
import { useState, useRef, useEffect } from "react";
import type { Pricing } from "@/modules/hotels/pricing/types";
import type { Report } from "@/modules/hotels/reports/types";
import { PDFFileIcon } from "@/modules/shared/icons/pdf-file.icon";
import { useGeneratePdfReport } from "@/modules/hotels/pdf-summary/use-generate-pdf-report";
import { LoadingSpinner } from "@/modules/shared/LoadingSpinner";

interface ReportProductsHeaderProps {
  onArrowBackClick: () => void;
  onArrowForwardClick: () => void;
  activeDate: {
    month: number;
    year: number;
  };
  customerId: number;
  pricing: Pricing[];
  reports: Report[];
  hotelName: string;
}

export const ReportProductsHeader = ({
  onArrowBackClick,
  onArrowForwardClick,
  activeDate,
  customerId,
  pricing,
  reports,
  hotelName,
}: ReportProductsHeaderProps) => {
  const [openInvoiceSummaryModal, setOpenInvoiceSummaryModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!downloadLinkRef.current || !downloadUrl) return;

    downloadLinkRef.current.click();
  }, [downloadUrl, downloadLinkRef.current]);

  const { generatePdfReport, isPending } = useGeneratePdfReport({
    onSuccess: setDownloadUrl,
  });

  const generatePDF = async () => {
    const activeMonth = activeDate.month + 1;
    generatePdfReport({
      month: activeMonth,
      year: activeDate.year,
      hotelName,
      reports,
    });
  };

  return (
    <div className="w-full flex justify-between items-center pt-4 px-5 pb-6">
      <div className="flex items-center bg-palette-gray-50 rounded-full w-max py-1 pl-3 pr-1">
        <div className="flex items-center gap-x-2">
          <CalendarIcon />
          <p className="text-base font-medium">{MONTHS[activeDate.month]}</p>
        </div>

        <div className="flex items-center gap-x-1 ml-4">
          <button
            onClick={onArrowBackClick}
            className="w-7 h-7 rounded-full bg-white flex justify-center items-center"
          >
            <LeftArrowIcon />
          </button>
          <button
            onClick={onArrowForwardClick}
            className="w-7 h-7 rounded-full bg-white flex justify-center items-center"
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        <a
          className="hidden"
          href={downloadUrl || ""}
          download="File.pdf"
          target="_blank"
          ref={downloadLinkRef}
        ></a>

        <Button
          variant="secondary"
          onClick={generatePDF}
          className={isPending ? "animate-pulse" : ""}
          disabled={isPending}
          prefix={
            isPending ? <LoadingSpinner /> : <PDFFileIcon className="text-xl" />
          }
        >
          {isPending ? "Generowanie PDF..." : "Generuj zestawienie"}
        </Button>

        <Dialog open={openInvoiceSummaryModal}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpenInvoiceSummaryModal(true)}>
              Generuj fakturę
            </Button>
          </DialogTrigger>
          <DialogContent>
            <GenerateInvoiceModal
              pricing={pricing}
              summary={reports}
              customerId={customerId}
              onClose={() => setOpenInvoiceSummaryModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
