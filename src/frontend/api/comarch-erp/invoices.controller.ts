import { useMutation } from "react-query";
import axios from "axios";
import { CreateInvoice } from "@/shared/types";

export const useCreateInvoice = () => {
  const { mutate, isLoading, isSuccess, data } = useMutation<
    { id: string },
    Error,
    CreateInvoice
  >((payload) => axios.post("/api/invoices/create", payload));

  return {
    createInvoice: mutate,
    isLoading,
    successfullyCreated: isSuccess,
    data,
  };
};
