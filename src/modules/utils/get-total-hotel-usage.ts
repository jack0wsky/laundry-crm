import type { ReportItem } from "@/modules/services/supabase.types";
import type { Pricing } from "@/modules/hotels/pricing/types";
import { Report } from "@/modules/hotels/reports/types";

export interface ProvidedProduct {
  amount: number;
  product: { id: number; name: string };
  price: number;
}

export const getAmounts = (
  summary: Pick<Report, "product" | "amount" | "date">[],
  pricing: Pick<Pricing, "product" | "price">[],
) => {
  const arr: ProvidedProduct[] = [];

  for (const item of summary) {
    const product = pricing.find((el) => el.product.id === item.product.id);
    const exists = arr.find((el) => el.product.id === item.product.id);
    if (exists) {
      exists.amount += item.amount || 0;
    } else {
      if (!!product?.price && item.amount > 0) {
        arr.push({ ...item, price: product.price });
      }
    }
  }
  return arr;
};
