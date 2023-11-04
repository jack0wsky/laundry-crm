import { authComarch } from "@/backend/comarch-erp/login";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token } = await authComarch();

  if (!token) res.status(401).json({});

  const { data } = await axios.get<any[]>(
    "https://app.erpxt.pl/api2/public/v1.4/invoices",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  res.status(200).json(data.slice(0, 2));
}
