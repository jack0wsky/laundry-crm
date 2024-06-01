import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@/modules/hotels/types";
import { KebabMenuIcon } from "@/modules/shared/icons/kebab-menu.icon";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { TrashIcon } from "@/modules/shared/icons/trash.icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: () => <p className="pl-4 py-2 text-sm text-palette-gray-500">Nazwa</p>,
    cell: ({ row }) => {
      return <p className="pl-4">{row.getValue("name")}</p>;
    },
  },
  {
    accessorKey: "nip",
    header: () => <p className="text-sm py-2 text-palette-gray-500">NIP</p>,
    cell: ({ row }) => <p>{row.getValue("nip")}</p>,
  },
  {
    accessorKey: "actions",
    header: () => null,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="w-7 h-7 flex justify-center items-center group">
            <KebabMenuIcon className="text-palette-gray-600 group-hover:text-black" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-x-2 text-base">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-palette-gray-100">
              <PencilIcon />
            </div>
            Edytuj
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-x-2 text-[#F53E3E] text-base">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#FFECEC]">
              <TrashIcon />
            </div>
            Usuń
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
