import { NextApiRequest, NextApiResponse } from "next";
import { serverDB } from "@/backend/supabase-client";
import * as XLSX from "xlsx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "Wrong method" });
  }

  const { data } = await serverDB.storage
    .from("laundry-files")
    .download(`sheets/${req.query["filename"]}`);

  if (!data) return res.status(400);

  const buffer = await data.arrayBuffer();

  const workbook = XLSX.read(buffer);

  const docs: (string | number | null)[][][] = workbook.SheetNames.map(
    (sheet) => {
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
        header: 1,
        blankrows: false,
      });
    },
  );

  const test = docs.map((document) => {
    const [name] = document;

    const startPoint = document.findIndex((el) => el.includes("asortyment"));

    const products = document.slice(startPoint + 1).map((product, _, arr) => {
      return {
        name: product[0],
        amount: product[1],
        price: product[4],
      };
    });

    return {
      name: name[1],
      products,
    };
  });

  res.status(200).json({ clients: test });
}
