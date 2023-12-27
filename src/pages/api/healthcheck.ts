import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/frontend/utils/comarch-login";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { token } = await authComarch();

  if (!token) return res.status(401).json({});

  res.status(200).json({ token });
}
