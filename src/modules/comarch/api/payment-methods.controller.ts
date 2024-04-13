import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PaymentMethod {
  Name: string;
  Primary: boolean;
  Deadline: number;
  Type: number;
  Id: number;
}

export const useListPaymentMethods = () => {
  const { data, isPending, error } = useQuery<PaymentMethod[], Error>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const { data } = await axios.get("/api/payment-methods");
      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  return {
    paymentMethods: (data || []).map((item) => ({
      name: item.Name,
      id: item.Id,
    })),
    loading: isPending,
    error,
  };
};
