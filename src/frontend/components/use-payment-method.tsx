import { useListPaymentMethods } from "@/frontend/api/comarch-erp/payment-methods.controller";
import { useState } from "react";

export const usePaymentMethod = () => {
  const { paymentMethods } = useListPaymentMethods();

  const transfer = paymentMethods.find((method) => method.name === "Przelew");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(
    transfer?.id || 0,
  );

  return {
    paymentMethods,
    selectedPaymentMethod,
    changePaymentMethod: setSelectedPaymentMethod,
  };
};
