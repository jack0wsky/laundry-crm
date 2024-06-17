import axios from "axios";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";
import { CreateInvoice } from "@/modules/hotels/reports/types";

const BASE_URL = "https://app.erpxt.pl/api2/public";

export const VERSIONS = {
  V1_2: "/v1.2",
  V1_4: "/v1.4",
};

export const comarchClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export class ComarchApi {
  constructor(private readonly token: string) {}

  async createCustomer(payload: CreateComarchCustomerPayload) {
    return await comarchClient.post(
      `${BASE_URL}${VERSIONS.V1_2}/customers`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }
  async createInvoice(payload: CreateInvoice) {
    return await comarchClient.post(
      `${BASE_URL}${VERSIONS.V1_4}/invoices`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }
}
