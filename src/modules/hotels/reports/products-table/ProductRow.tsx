import { getCommonPinningStyles } from "@/modules/hotels/reports/products-table/utils";
import { flexRender, Row } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";

interface ProductRowProps {
  row: Row<Pricing>;
}

export const ProductRow = ({ row }: ProductRowProps) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.product.id,
  });

  if (isDragging) {
    console.log("isDragging", isDragging);
  }

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-x-2 w-full py-2 bg-white pr-4"
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} style={{ ...getCommonPinningStyles(cell.column) }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
