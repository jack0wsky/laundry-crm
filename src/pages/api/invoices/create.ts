import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/modules/comarch/comarch-login";
import { CreateInvoice } from "@/modules/hotels/reports/types";
import axios from "axios";

interface Request extends NextApiRequest {
  body: CreateInvoice;
}

export default async function handler(req: Request, res: NextApiResponse) {
  const { token } = await authComarch();

  if (!token) return res.status(401).json({});

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Only POST method allowed" });
  }

  try {
    const { data, status } = await axios.post(
      "https://app.erpxt.pl/api2/public/v1.4/invoices",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    );

    return res.status(status).json(data);
  } catch (error) {
    console.log(error);
  }
}
