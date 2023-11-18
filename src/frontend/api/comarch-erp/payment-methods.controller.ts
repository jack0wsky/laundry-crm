import { useQuery } from "react-query";
import axios from "axios";
import { PaymentMethod } from "@/shared/types";

export const useListPaymentMethods = () => {
  const { data, isLoading, error } = useQuery<PaymentMethod[], Error>(
    "payment-methods",
    async () => {
      const { data } = await axios.get("/api/payment-methods");
      return data;
    },
    { retry: false, refetchOnWindowFocus: false, refetchInterval: false },
  );

  return {
    paymentMethods: data || [],
    loading: isLoading,
    error,
  };
};
