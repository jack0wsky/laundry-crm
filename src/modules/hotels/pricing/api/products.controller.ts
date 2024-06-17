import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";

export const useListProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => db.listProducts(),
  });

  return {
    products: data || [],
    loading: isLoading,
  };
};
