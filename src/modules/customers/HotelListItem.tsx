import { CustomersHotel } from "@/modules/services/laundry.db";
import { KebabMenuIcon } from "@/modules/shared/icons/kebab-menu.icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface HotelListItemProps {
  hotel: CustomersHotel;
  onEditClick: () => void;
}

export const HotelListItem = ({ hotel, onEditClick }: HotelListItemProps) => {
  const router = useRouter();

  return (
    <li
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/${hotel.id}`);
      }}
      role="button"
      className="w-[250px] px-5 py-3 bg-palette-gray-50 rounded-full flex justify-between items-center group hover:bg-palette-blue-600 transition-colors"
    >
      <p className="text-base group-hover:text-white">
        {hotel.displayName || hotel.name}
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-palette-gray-400 group-hover:text-white">
            <KebabMenuIcon className="text-xl" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onEditClick}>Edytuj</DropdownMenuItem>
          <DropdownMenuItem>Usuń</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};
