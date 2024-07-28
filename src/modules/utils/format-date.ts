import { format } from "date-fns";

interface FullDate {
  format: "yyyy-MM-dd";
  year: number;
  month: number;
  day: number;
}

interface YearAndMonth {
  format: "yyyy-MM";
  year: number;
  month: number;
}

type Payload = FullDate | YearAndMonth;

export const formatDate = (payload: Payload) => {
  if (payload.format === "yyyy-MM-dd") {
    return format(
      new Date(payload.year, payload.month, payload.day),
      "yyyy-MM-dd",
    );
  }

  return format(new Date(payload.year, payload.month), "yyyy-MM");
};
