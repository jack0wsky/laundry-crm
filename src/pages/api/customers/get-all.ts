import { NextApiResponse } from "next";
import { authComarch } from "@/modules/comarch/comarch-login";
import axios from "axios";
import { ComarchCustomer } from "@/modules/comarch/types";

export default async function handler(req: Request, res: NextApiResponse) {
  const { token } = await authComarch();

  if (!token) return res.status(401).json({});

  if (req.method !== "GET") {
    return res.status(400).json({ error: "Only GET method allowed" });
  }

  try {
    const { data, status } = await axios.get<ComarchCustomer[]>(
      "https://app.erpxt.pl/api2/public/v1.2/customers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    );

    return res.status(status).json(data);
  } catch (error) {}
}
