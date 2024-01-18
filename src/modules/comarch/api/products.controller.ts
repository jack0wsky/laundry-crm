import { useQuery } from "react-query";
import { db } from "@/modules/services/laundry.db";

export const useListProducts = () => {
  const { data, isLoading } = useQuery([], () => db.listProducts());

  return {
    products: data || [],
    loading: isLoading,
  };
};
