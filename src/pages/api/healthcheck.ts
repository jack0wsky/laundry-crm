import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/backend/comarch-erp/login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token } = await authComarch();

  if (!token) return res.status(401).json({});

  res.status(200).json({ token });
}
