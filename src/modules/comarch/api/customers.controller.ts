import { useQuery } from "@tanstack/react-query";

import { db } from "@/modules/services/laundry.db";

export const useListCustomers = () => {
  const { data, isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: () => db.listCustomers(),
  });

  return {
    customers: data || [],
    loading: isPending,
  };
};
