import type { ReportItem } from "@/modules/services/supabase.types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { InvoiceSummary } from "@/modules/hotels/reports/invoices/InvoicesSummary";
import { SuccessStateView } from "@/modules/hotels/reports/invoices/SucessStateView";
import { useState } from "react";
import { useGenerateInvoice } from "@/modules/hotels/reports/invoices/api/invoices.controller";

export interface GenerateInvoiceModalProps {
  onClose: () => void;
  summary: ReportItem[];
  pricing: Pricing[];
  customerId: number;
}

export const GenerateInvoiceModal = ({
  onClose,
  summary,
  pricing,
  customerId,
}: GenerateInvoiceModalProps) => {
  const [invoiceCreated, setInvoiceCreated] = useState(false);

  const { generateInvoice, invoiceId, isPending } = useGenerateInvoice({
    onSuccess: () => setInvoiceCreated(true),
  });

  return !invoiceCreated ? (
    <InvoiceSummary
      summary={summary}
      pricing={pricing}
      customerId={customerId}
      onCreate={{
        action: generateInvoice,
        loading: isPending,
      }}
    />
  ) : (
    <SuccessStateView onClose={onClose} invoiceId={invoiceId as number} />
  );
};
