import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/modules/comarch/comarch-login";
import { ComarchApi } from "@/modules/services/comarch.api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token } = await authComarch();

  if (!token) return res.status(401).json({});

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Only POST method allowed" });
  }

  try {
    const comarchApi = new ComarchApi(token);
    const { data, status } = await comarchApi.createCustomer(req.body);

    return res.status(status).json(data);
  } catch (error) {}
}
