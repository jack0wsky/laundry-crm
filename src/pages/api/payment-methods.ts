import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/modules/comarch/comarch-login";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token } = await authComarch();

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Only GET method allowed" });
  }

  const { data, status } = await axios.get(
    "https://app.erpxt.pl/api2/public/paymenttypes",
    { headers: { Authorization: `Bearer ${token}` } },
  );

  res.status(status).json(data);
}
