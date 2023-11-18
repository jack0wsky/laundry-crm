import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/backend/comarch-erp/login";
import axios from "axios";
import { CreateInvoice } from "@/shared/types";

interface Request extends NextApiRequest {
  body: CreateInvoice;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = await authComarch();

  if (!token) res.status(401).json({});

  const { data, status } = await axios.post(
    "https://app.erpxt.pl/api2/public/v1.4/invoices",
    req.body,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  res.status(status).json(data);
}
