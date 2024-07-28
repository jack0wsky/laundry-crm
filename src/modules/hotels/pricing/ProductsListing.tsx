import { Pricing } from "@/modules/hotels/pricing/types";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KebabMenuIcon } from "@/modules/shared/icons/kebab-menu.icon";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useUpdateProductOrder } from "@/modules/hotels/pricing/api/pricing.controller";
import { ProductRow } from "@/modules/hotels/pricing/ProductRow";
import { ProductNameCell } from "@/modules/hotels/pricing/ProductNamecell";

interface ProductsListingProps {
  hotelName: string;
  pricing: Pricing[];
  onProductEdit: (product: Pricing) => void;
  onProductDelete: (product: Pricing) => void;
}

export const ProductsListing = ({
  hotelName,
  pricing,
  onProductEdit,
}: ProductsListingProps) => {
  const [products, setProducts] = useState<Pricing[]>(pricing);

  const { updateProductOrder } = useUpdateProductOrder(hotelName);

  const productsIds = products.map((product) => product.id);

  const swapItems = ({ active, over }: DragEndEvent) => {
    if (active && over && active.id !== over.id) {
      const movedProductOrder = products.find(
        (product) => product.id === active.id,
      );

      const overProductOrder = products.find(
        (product) => product.id === over.id,
      );

      if (!overProductOrder) return;

      updateProductOrder({
        productId: active.id as string,
        newOrderNumber: overProductOrder?.order + 0.01,
      });

      setProducts((data) => {
        const oldIndex = productsIds.indexOf(active.id as string);
        const newIndex = productsIds.indexOf(over.id as string);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  const table = useReactTable({
    data: products ?? [],
    columns: [
      {
        accessorKey: "name",
        cell: ProductNameCell,
      },
      {
        accessorKey: "price",
        size: 100,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-x-1 px-3 py-1.5 bg-palette-gray-50 rounded-full min-w-9">
              <p>{row.original.price}</p> zł
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-8 h-8 flex justify-center items-center">
                <KebabMenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => onProductEdit(row.original)}
                  className="hover:bg-palette-gray-50 flex items-center gap-x-2 cursor-pointer"
                >
                  <PencilIcon className="text-xl" />
                  <span className="text-base">Edytuj</span>
                </DropdownMenuItem>
                {/*<DropdownMenuItem
              onClick={onDelete}
              className="flex items-center gap-x-2 text-palette-red-500 hover:bg-palette-red-500/10 cursor-pointer"
            >
              <TrashIcon className="text-xl" />
              <span className="text-base">Usuń</span>
            </DropdownMenuItem>*/}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragEnd={swapItems}
    >
      <table style={{ width: table.getTotalSize() }}>
        <tbody className="w-full">
          <SortableContext
            items={productsIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row) => (
              <ProductRow key={row.id} {...row} />
            ))}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
};
