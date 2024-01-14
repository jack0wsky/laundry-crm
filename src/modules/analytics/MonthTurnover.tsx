import { MONTHS } from "@/modules/utils/months";
import { format } from "date-fns";
import { db } from "@/modules/services/laundry.db";
import type { Pricing } from "@/modules/hotels/pricing/types";
import {
  getAmounts,
  ProvidedProduct,
} from "@/modules/utils/get-total-hotel-usage";
import { useEffect, useState } from "react";

interface MonthTurnoverProps {
  monthIndex: number;
  year: number;
}
export const MonthTurnover = ({ monthIndex, year }: MonthTurnoverProps) => {
  const [prices, setPrices] = useState<ProvidedProduct[]>([]);
  const [calculatingTurnover, setCalculatingTurnover] = useState(false);
  const yearAndMonth = format(new Date(year, monthIndex - 1), "yyyy-MM");

  const getMonthTurnover = async () => {
    const arr: ProvidedProduct[] = [];
    const hotels = await db.getHotels();

    setCalculatingTurnover(true);

    await Promise.all(
      (hotels || []).map(async (hotel) => {
        const reports = await db.getReport(hotel.id, yearAndMonth);
        const pricing = (await db.getPricing(hotel.name)) as Pricing[];
        arr.push(...getAmounts(reports, pricing));
      }),
    );

    setPrices(arr);
    setCalculatingTurnover(false);
  };

  useEffect(() => {
    getMonthTurnover();
  }, []);

  const total = prices.reduce((acc, item) => {
    return (acc += item.amount * item.price);
  }, 0);

  return (
    <div className="flex justify-between items-center w-full border-b border-gray-300 py-2">
      <p className="text-xl">{MONTHS[monthIndex - 1]}</p>

      {prices.length === 0 || (calculatingTurnover && <p>Obliczanie...</p>)}

      <p>{total * 1.23}</p>
      {!calculatingTurnover && (
        <p className="text-xl">
          {(total * 1.23).toLocaleString("pl-PL", { maximumFractionDigits: 2 })}{" "}
          zł ( {total.toLocaleString("pl-PL")} zł netto )
        </p>
      )}
    </div>
  );
};
