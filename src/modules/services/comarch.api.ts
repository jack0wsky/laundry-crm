import axios from "axios";
import { CreateComarchCustomerPayload } from "@/modules/comarch/types";

export const comarchClient = axios.create({
  baseURL: "https://app.erpxt.pl/api2/public/v1.2",
});

export class ComarchApi {
  constructor(private readonly token: string) {}

  async createCustomer(payload: CreateComarchCustomerPayload) {
    return await comarchClient.post("/customers", payload, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
}
