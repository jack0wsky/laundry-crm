"use server";

import axios from "axios";

export const authComarch = async () => {
  const id = process.env.ERP_CLIENT_ID;
  const secret = process.env.ERP_CLIENT_SECRET;

  const buff = new Buffer(`${id}:${secret}`);

  try {
    const { data } = await axios.post<{
      access_token: string;
      expires: number;
    }>(
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

    return { token: data.access_token, expires: data.expires };
  } catch (error) {
    console.error(error);
    return { token: null, expires: null };
  }
};
