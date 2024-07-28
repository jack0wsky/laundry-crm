import { Pricing } from "@/modules/hotels/pricing/types";
import { Report } from "@/modules/hotels/reports/types";

export interface Customer {
  id: number;
  name: string;
  nip: number | null;
}

export interface Hotel {
  id: string;
  name: string;
  displayName: string | null;
  customer: Customer;
  order: number;
}

export interface FullReport {
  id: string;
  name: string;
  pricing: Pick<Pricing, "product" | "price">[];
  reports: Pick<Report, "product" | "amount" | "date">[];
}
