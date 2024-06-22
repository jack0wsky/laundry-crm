"use server";

import { ComarchApi } from "@/modules/services/comarch.api";
import { authComarch } from "@/modules/comarch/comarch-login";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";

export const addNewCustomer = async (payload: CreateComarchCustomerPayload) => {
  const { token } = await authComarch();
  if (!token) return;

  const comarchApi = new ComarchApi(token);

  const { data } = await comarchApi.createCustomer(payload);

  return data;
};
