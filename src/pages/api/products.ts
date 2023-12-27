import { authComarch } from "@/frontend/utils/comarch-login";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { ERPProduct } from "@/shared/types";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const { token } = await authComarch();

  if (!token) res.status(401).json({});

  const { data } = await axios.get<ERPProduct[]>(
    "https://app.erpxt.pl/api2/public/products",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  res.status(200).json(data);
}
