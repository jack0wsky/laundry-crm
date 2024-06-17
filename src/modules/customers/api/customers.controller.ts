import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { db } from "@/modules/services/laundry.db";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";
import { DEFAULT_LAUNDRY_ID } from "@/modules/utils/config";
import { addNewCustomer } from "@/modules/comarch/add-new-customer.action";

const listCustomersKey = () => ["customers"];

export const useListCustomers = () => {
  const { data, isPending } = useQuery({
    queryKey: listCustomersKey(),
    queryFn: () => db.customers.listAll(),
  });

  return {
    customers: data || [],
    loading: isPending,
  };
};

export const useCreateCustomer = (options?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    { data: number },
    Error,
    CreateComarchCustomerPayload
  >({
    mutationFn: addNewCustomer,
    onSuccess: async (data, variables) => {
      await db.customers.addNew({
        id: data.data,
        name: variables.Name,
        nip: Number(variables.CustomerTaxNumber),
        laundryId: DEFAULT_LAUNDRY_ID,
      });

      await queryClient.invalidateQueries({ queryKey: listCustomersKey() });

      options?.onSuccess();
    },
  });

  return {
    createCustomer: mutate,
    loading: isPending,
  };
};
