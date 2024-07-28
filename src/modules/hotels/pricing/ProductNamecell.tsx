import { CellContext } from "@tanstack/react-table";
import { Pricing } from "@/modules/hotels/pricing/types";
import { useSortable } from "@dnd-kit/sortable";
import { DraggableIcon } from "@/modules/shared/icons/draggable";

export const ProductNameCell = ({ row }: CellContext<Pricing, unknown>) => {
  const { attributes, listeners } = useSortable({
    id: row.original.id,
  });

  return (
    <div className="flex items-center">
      <button {...attributes} {...listeners}>
        <DraggableIcon className="text-2xl text-palette-gray-300" />
      </button>
      <p className="font-medium text-lg mr-2 w-[200px]">
        {row.original.product.name}
      </p>
    </div>
  );
};
