import { FullReport } from "@/modules/hotels/types";

export interface Turnover extends FullReport {
  total: number;
}

export interface Timeline {
  year: number;
  months: number[];
}
