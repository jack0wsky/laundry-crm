import { NextApiRequest, NextApiResponse } from "next";
import PDFTable from "pdfkit-table";
import path from "node:path";
import { clientDB } from "@/modules/services/laundry.db";
import { constructPdfFileName } from "@/modules/utils/construct-pdf-file-name";

interface Request extends NextApiRequest {
  body: {
    month: number;
    year: number;
    hotelName: string;
    reports: any[];
  };
}

interface GroupedReport {
  name: string;
  reports: { date: string; amount: number }[];
}

const groupReportsByProduct = (reports: any[]): GroupedReport[] => {
  let items: any[] = [];

  reports.forEach((item) => {
    const exists = items.find((i) => i.name === item.product.name);
    if (exists) {
      items = [
        ...items.filter((i) => i.name !== item.product.name),
        {
          ...exists,
          reports: [
            ...exists.reports,
            { date: item.date, amount: item.amount },
          ].sort((a, b) => a.date.localeCompare(b.date)),
        },
      ];
    } else {
      items.push({
        name: item.product.name,
        reports: [{ date: item.date, amount: item.amount }],
      });
    }
  });

  return items;
};

export default async function handler(req: Request, res: NextApiResponse) {
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

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => {
    try {
      await clientDB.storage
        .from("sheets")
        .upload(
          constructPdfFileName(hotelName, month, year),
          Buffer.concat(buffers),
          {
            contentType: "application/pdf",
          },
        );
    } catch (error) {
      console.error(error);
    }
  });

  doc.end();

  res.status(200).json(items);
}
