import { Dialog } from "@headlessui/react";
import { CreateInvoice } from "@/modules/hotels/reports/types";
import type { ReportItem } from "@/modules/services/supabase.types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { InvoiceSummary } from "@/modules/hotels/reports/generate-invoice/InvoicesSummary";
import { SuccessStateView } from "@/modules/hotels/reports/generate-invoice/SucessStateView";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";

interface GenerateInvoiceModalProps {
  isVisible: boolean;
  onClose: () => void;
  summary: ReportItem[];
  pricing: Pricing[];
  customerId: number;
}

export const GenerateInvoiceModal = ({
  isVisible,
  onClose,
  summary,
  pricing,
  customerId,
}: GenerateInvoiceModalProps) => {
  const [invoiceCreated, setInvoiceCreated] = useState(false);

  const {
    data: invoiceId,
    isLoading,
    mutate: generateInvoice,
  } = useMutation<number, Error, CreateInvoice>(
    async (payload: CreateInvoice) => {
      const { data } = await axios.post("/api/invoices/create", payload);
      return data;
    },
    {
      onSuccess: () => {
        setInvoiceCreated(true);
      },
    },
  );

  return (
    <Dialog open={isVisible} onClose={onClose} className="bg-gray-800">
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 p-4 text-white z-20">
        <Dialog.Overlay />
        <Dialog.Panel className="min-w-[400px] bg-white rounded-2xl text-black p-4">
          {invoiceCreated && (
            <SuccessStateView
              onClose={onClose}
              invoiceId={invoiceId as number}
            />
          )}

          {!invoiceCreated && (
            <InvoiceSummary
              summary={summary}
              onClose={onClose}
              pricing={pricing}
              customerId={customerId}
              onCreate={{
                action: generateInvoice,
                loading: isLoading,
              }}
            />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
