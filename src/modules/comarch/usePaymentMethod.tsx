import { useState } from "react";

export const usePaymentMethod = () => {
  const paymentMethods = [
    { id: 10238815, name: "Przelew" },
    { id: 10238814, name: "Gotówka" },
  ];

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<number>(paymentMethods[0].id);

  return {
    paymentMethods,
    selectedPaymentMethodId,
    changePaymentMethod: setSelectedPaymentMethodId,
  };
};
