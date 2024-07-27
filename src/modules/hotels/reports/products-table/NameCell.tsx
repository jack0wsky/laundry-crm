import { DraggableIcon } from "@/modules/shared/icons/draggable";
import { CellContext } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";
import { useSortable } from "@dnd-kit/sortable";

export const NameCell = ({ cell, row }: CellContext<Pricing, unknown>) => {
  const { attributes, listeners } = useSortable({
    id: row.original.product.id,
  });

  return (
    <div
      style={{ width: cell.column.getSize() }}
      className="bg-gradient-to-r from-white from-80% to-transparent h-[42px] flex items-center pl-2"
    >
      <button {...attributes} {...listeners}>
        <DraggableIcon className="text-2xl text-palette-gray-300" />
      </button>
      <p>{row.original.product.name}</p>
    </div>
  );
};
