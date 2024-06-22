import { useMutation } from "@tanstack/react-query";
import { CreateInvoice } from "@/modules/hotels/reports/types";

import { createInvoice } from "@/modules/hotels/reports/invoices/api/create-invoice.action";

export const useGenerateInvoice = (options?: { onSuccess: () => void }) => {
  const {
    data: invoiceId,
    isPending,
    mutate,
  } = useMutation<number, Error, CreateInvoice>({
    mutationFn: async (payload) => {
      return await createInvoice(payload);
    },
    onSuccess: () => {
      options?.onSuccess();
    },
  });

  return {
    invoiceId,
    isPending,
    generateInvoice: mutate,
  };
};
