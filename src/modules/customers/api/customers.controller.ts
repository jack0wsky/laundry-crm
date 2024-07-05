import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { db } from "@/modules/services/laundry.db";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";
import { addNewCustomer } from "@/modules/comarch/add-new-customer.action";
import { useCheckSession } from "@/modules/auth/auth.controller";
import { useLaundryId } from "@/modules/utils/use-params";

const listCustomersKey = (userId: string | undefined) => ["customers", userId];

export const useListCustomers = () => {
  const { user } = useCheckSession();

  const laundryId = useLaundryId();

  const { data, isPending } = useQuery({
    queryKey: listCustomersKey(user?.id),
    queryFn: () => db.customers.listAll(laundryId),
    enabled: !!laundryId,
  });

  return {
    customers: data || [],
    loading: isPending,
  };
};

export const useCreateCustomer = (options?: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const { user } = useCheckSession();
  const laundryId = useLaundryId();

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
        laundryId: laundryId,
      });

      await queryClient.invalidateQueries({
        queryKey: listCustomersKey(user?.id),
      });

      options?.onSuccess();
    },
  });

  return {
    createCustomer: mutate,
    loading: isPending,
  };
};
