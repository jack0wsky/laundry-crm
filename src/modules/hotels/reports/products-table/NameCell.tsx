import { CellContext } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";

export const NameCell = ({ cell, row }: CellContext<Pricing, unknown>) => {
  return (
    <div
      style={{ width: cell.column.getSize() }}
      className="bg-gradient-to-r from-white from-80% to-transparent h-[42px] flex items-center pl-6"
    >
      <p>{row.original.product.name}</p>
    </div>
  );
};
