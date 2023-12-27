import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/frontend/utils/comarch-login";
import axios from "axios";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { token } = await authComarch();

  const { data, status } = await axios.get(
    "https://app.erpxt.pl/api2/public/paymenttypes",
    { headers: { Authorization: `Bearer ${token}` } },
  );

  res.status(status).json(data);
}
