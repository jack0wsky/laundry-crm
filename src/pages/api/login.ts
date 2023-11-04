import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = process.env.ERP_CLIENT_ID;
  const secret = process.env.ERP_CLIENT_SECRET;

  const buff = new Buffer(`${id}:${secret}`);

  try {
    const { data } = await axios.post<{ access_token: string }>(
      `https://app.erpxt.pl/api2/public/token`,
      {
        grant_type: "client_credentials",
        client_id: id,
        client_secret: secret,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Basic ${buff.toString("base64")}`,
        },
      },
    );
    console.log("data", data);
  } catch (error) {
    console.error(error);
  }

  res.status(200).json({});
}
