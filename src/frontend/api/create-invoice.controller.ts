import { useMutation } from "react-query";
import axios from "axios";
import { CreateInvoice } from "@/shared/types";

export const useCreateInvoice = () => {
  const { mutate, isLoading, error } = useMutation((dto: CreateInvoice) =>
    axios.post("/api/invoices/create", dto),
  );

  return {
    createInvoice: mutate,
    isLoading,
    error,
  };
};
