'use server'

import { authComarch } from "@/modules/comarch/comarch-login";
import { ComarchApi } from "@/modules/services/comarch.api";
import { CreateInvoice } from "@/modules/hotels/reports/types";

export const createInvoice = async (payload: CreateInvoice) => {
  const { token } = await authComarch();

  if (!token) return;

  const comarchApi = new ComarchApi(token);
  const { data } = await comarchApi.createInvoice(payload);

  return data;
};
