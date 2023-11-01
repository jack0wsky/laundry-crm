import type { NextApiRequest, NextApiResponse } from "next";
import xlsx from "node-xlsx";
import { saveUploadedFile } from "@/backend/save-uploaded-file";
import type { Product } from "@/shared/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const file = await saveUploadedFile(req);

    const excelFile = xlsx.parse(
      `${process.cwd()}/public/files/${file?.originalFilename}`,
    );

    const clients = excelFile.map((item) => {
      const startPoint = item.data.findIndex((item) =>
        item.includes("suma sztuk"),
      );
      const products = item.data
        .splice(startPoint + 1)
        .reduce<Product[]>((acc, item) => {
          acc.push({ name: item[0], amount: item[1], price: item[4] });
          return acc;
        }, []);

      return {
        name: item.name,
        products,
      };
    });

    res.status(200).json({ clients });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
