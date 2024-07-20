import PDFTable from "pdfkit-table";
import path from "node:path";
import { groupReportsByProduct } from "@/modules/hotels/pdf-summary/utils";
import { clientDB } from "@/modules/services/laundry.db";
import { constructPdfFileName } from "@/modules/utils/construct-pdf-file-name";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { hotelName, reports, month, year } = req.body;

  const doc = new PDFTable({
    margin: 10,
    size: "A4",
    lang: "pl-PL",
    pdfVersion: "1.7",
  });

  const satoshiFont = path.join(
    process.cwd(),
    "src/styles/Satoshi-Variable.ttf",
  );

  doc.registerFont("Satoshi", satoshiFont);

  let buffers: any[] = [];

  const days = Array.from({ length: 31 }).map((_, i) => (i + 1).toString());

  const items = groupReportsByProduct(reports);

  try {
    await doc.table(
      {
        title: hotelName,
        headers: [
          { label: "Nazwa", width: 80 },
          ...days.map((item) => ({ label: item, width: 15 })),
        ],
        rows: items.map((item) => {
          return [
            item.name,
            ...item.reports.map(({ amount }) =>
              amount > 0 ? amount.toString() : "",
            ),
          ];
        }),
      },
      {
        width: 600,
        prepareHeader: () => doc.font("Satoshi").fontSize(7),
        prepareRow: () => doc.font("Satoshi").fontSize(7),
      },
    );
  } catch (error) {
    return (
      res
        .status(400)
        // @ts-ignore
        .json({ ...error, message: "Failed to generate PDF" })
    );
  }

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => {
    try {
      const { data, error } = await clientDB.storage
        .from("sheets")
        .upload(
          constructPdfFileName(hotelName, month, year),
          Buffer.concat(buffers),
          {
            contentType: "application/pdf",
          },
        );

      if (error) {
        return res.status(400).json(error);
      }

      return res.status(200).json({ message: "PDF Uploaded", data });
    } catch (error) {
      console.error(error);
      return (
        res
          .status(400)
          // @ts-ignore
          .json({ ...error, message: "Failed to upload PDF" })
      );
    }
  });

  doc.end();
}
