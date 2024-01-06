import { NextApiRequest, NextApiResponse } from "next";
import { authComarch } from "@/modules/comarch/comarch-login";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { token } = await authComarch();
  res.status(200).json({ token });
}
