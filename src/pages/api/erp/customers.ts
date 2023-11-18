import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/backend/comarch-erp/login";
import axios from "axios";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { token } = await authComarch();

  const { data, status } = await axios.get(
    "https://app.erpxt.pl/api2/public/v1.2/customers",
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.status(status).json(data);
}
