import { flexRender, Row } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";

export const ProductRow = ({ getVisibleCells, original }: Row<Pricing>) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: original.id,
  });

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
      className="w-full flex justify-between border-b border-palette-gray-100 pb-2 items-center mt-2"
    >
      {getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
