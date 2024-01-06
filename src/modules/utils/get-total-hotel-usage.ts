import type { ReportItem } from "@/modules/services/supabase.types";
import type { Pricing } from "@/modules/hotels/pricing/types";

export const getAmounts = (summary: ReportItem[], pricing: Pricing[]) => {
  const arr: {
    amount: number;
    product: { id: number; name: string };
    price: number;
  }[] = [];

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
