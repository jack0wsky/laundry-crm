import { db } from "@/modules/services/laundry.db";
import { useEffect, useState } from "react";
import { getAmounts } from "@/modules/utils/get-total-hotel-usage";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { useActiveMonth } from "@/modules/utils/useActiveMonth";
import { format } from "date-fns";

export const MainPanel = () => {
  const [items, setItems] = useState<any[]>([]);
  const { activeDate } = useActiveMonth();

  const yearAndMonth = format(
    new Date(activeDate.year, activeDate.month),
    "yyyy-MM",
  );

  const fetchData = async () => {
    const arr: any[] = [];
    const hotels = await db.getHotels();

    await Promise.all(
      (hotels || []).map(async (hotel) => {
        const reports = await db.getReport(hotel.id, yearAndMonth);
        const pricing = (await db.getPricing(hotel.name)) as Pricing[];
        arr.push(...getAmounts(reports, pricing));
      }),
    );

    setItems(arr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = items.reduce((acc, item) => {
    return (acc += item.amount * item.price);
  }, 0);

  return (
    <section className="w-full h-screen ml-[300px] px-5 py-4">
      <h1 className="text-2xl">Panel</h1>
      <div className="text-2xl mt-5">
        <p className="font-medium text-gray-700">Obrót miesięczny:</p>
        <h2 className="font-bold text-6xl mt-2">
          {total.toLocaleString("pl-PL")} zł
        </h2>
      </div>
    </section>
  );
};
