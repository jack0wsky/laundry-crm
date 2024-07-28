import { FullReport } from "@/modules/hotels/types";
import { Turnover } from "@/modules/analytics/types";

const mergeReportsWithProductPrice = ({ reports, pricing }: FullReport) => {
  return reports.map((report) => {
    const index = pricing.findIndex(
      (price) => price.product === report.product,
    );

    return {
      ...report,
      price: index === -1 ? 0 : pricing[index].price,
    };
  });
};

export const mapFullReportToTurnover = (items: FullReport[]): Turnover[] => {
  return items.map((item) => {
    const reportsWithPrice = mergeReportsWithProductPrice(item);

    return {
      ...item,
      reports: reportsWithPrice,
      total: reportsWithPrice.reduce(
        (acc, item) => (acc += item.amount * item.price),
        0,
      ),
    };
  });
};
