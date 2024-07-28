import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KebabMenuIcon } from "@/modules/shared/icons/kebab-menu.icon";
import { PencilIcon } from "@/modules/shared/icons/pencil.icon";
import { TrashIcon } from "@/modules/shared/icons/trash.icon";
import { motion } from "framer-motion";

interface PricingListingItemProps {
  name: string;
  price: number;
  onEdit: () => void;
  onDelete: () => void;
}
export const PricingListingItem = ({
  name,
  price,
  onEdit,
  onDelete,
}: PricingListingItemProps) => {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 100 },
        animate: { opacity: 1, y: 0 },
      }}
      className="w-full flex justify-between border-b border-palette-gray-100 pb-2 items-center"
    >
      <p className="font-medium text-lg mr-2 w-full">{name}</p>

      <div className="flex items-center">
        <div className="flex items-center gap-x-1 px-3 py-1.5 bg-palette-gray-50 rounded-full min-w-9">
          <p>{price}</p> zł
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-8 h-8 flex justify-center items-center">
            <KebabMenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={onEdit}
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
      </div>
    </motion.li>
  );
};
