import { useQuery } from "react-query";
import axios from "axios";
import { Customer } from "@/shared/types";

export const useListCustomers = () => {
  const { data, isLoading, error } = useQuery<Customer[]>(
    "customers",
    async () => {
      const { data } = await axios.get("/api/erp/customers");
      return data;
    },
    { retry: 2, refetchOnWindowFocus: false },
  );

  return {
    customers: data || [],
    loading: isLoading,
    error,
  };
};
