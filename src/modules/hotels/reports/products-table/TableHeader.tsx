import { flexRender, Table } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";
import { getCommonPinningStyles } from "@/modules/hotels/reports/products-table/utils";

interface TableHeaderProps {
  table: Table<Pricing>;
}

export const TableHeader = ({ table }: TableHeaderProps) => {
  return (
    <thead className="w-full flex items-center">
      {table.getHeaderGroups().map((header) => {
        return (
          <tr key={header.id} className="w-full flex gap-x-2">
            {header.headers.map((item) => (
              <th
                key={item.id}
                style={{ ...getCommonPinningStyles(item.column) }}
              >
                {flexRender(item.column.columnDef.header, item.getContext())}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );
};
