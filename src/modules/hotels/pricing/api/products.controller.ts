import { useQuery } from "@tanstack/react-query";
import { db } from "@/modules/services/laundry.db";
import { useCheckSession } from "@/modules/auth/auth.controller";

export const useListProducts = () => {
  const { user } = useCheckSession();

  const { data, isLoading } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: () => db.listProducts(),
  });

  return {
    products: data || [],
    loading: isLoading,
  };
};
