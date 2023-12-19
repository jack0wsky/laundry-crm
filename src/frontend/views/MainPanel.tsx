import { db } from "@/frontend/laundry.db";
import { useEffect, useState } from "react";
import { useActiveMonth } from "@/frontend/components/use-active-month";
import { format } from "date-fns";

const calculateTurnover = (data: any[]) => {
  const sum = data.reduce((acc, item) => {
    return (acc += item.amount * item.price);
  }, 0);

  return sum.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const MainPanel = () => {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const { activeDate } = useActiveMonth();
  const getReport = async () => {
    const yearAndMonth = format(
      new Date(activeDate.year, activeDate.month),
      "yyyy-MM",
    );

    const allPricings = await db.getAllPricings();

    const allReports = await db.getAllReports(yearAndMonth);

    const mapped = allReports
      .map((report) => {
        const item = (allPricings || []).find(
          (pricing) =>
            pricing.product.id === report.product.id &&
            pricing.hotel.id === report.hotel,
        );

        return {
          ...report,
          price: item?.price,
        };
      })
      .filter((item) => item.amount > 0);

    const total = mapped.reduce((acc, item) => {
      return (acc = acc + item.amount * item.price);
    }, 0);

    setTotal(total);
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <section className="w-full h-screen ml-[300px] px-5 py-4">
      <h1 className="text-2xl">Panel</h1>
      <div className="text-2xl mt-5">
        <p className="font-medium text-gray-700">Obrót miesięczny:</p>
        <h2 className="font-bold text-6xl mt-2">
          {total.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          zł
        </h2>
      </div>
    </section>
  );
};
