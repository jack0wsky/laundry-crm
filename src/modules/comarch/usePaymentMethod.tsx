import { useListPaymentMethods } from "@/modules/comarch/api/payment-methods.controller";
import { useEffect, useState } from "react";

export const usePaymentMethod = () => {
  const { paymentMethods } = useListPaymentMethods();

  const transfer = paymentMethods.find((method) => method.name === "Przelew");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(
    transfer?.id || 0,
  );

  useEffect(() => {
    if (!transfer) return;
    setSelectedPaymentMethod(transfer.id);
  }, [transfer]);

  return {
    paymentMethods,
    selectedPaymentMethod,
    changePaymentMethod: setSelectedPaymentMethod,
  };
};
