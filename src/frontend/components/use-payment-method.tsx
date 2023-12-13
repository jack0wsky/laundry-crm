import { useListPaymentMethods } from "@/frontend/api/comarch-erp/payment-methods.controller";
import { useState } from "react";

export const usePaymentMethod = () => {
  const { paymentMethods } = useListPaymentMethods();

  const transfer = paymentMethods.find((method) => method.name === "Przelew");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<{
    name: string;
    id: number;
  }>({ name: transfer?.name || "Przelew", id: transfer?.id || 0 });

  return {
    selectedPaymentMethod,
    changePaymentMethod: setSelectedPaymentMethod,
  };
};
