import classNames from "classnames";
import { Hotel } from "@/shared/supabase";

interface ClientsProps {
  hotels: Hotel[];
  activeHotel: Hotel | null;
  onClick: (hotel: Hotel) => void;
}

export const Clients = ({ hotels, onClick, activeHotel }: ClientsProps) => {
  return (
    <nav className="w-[300px] bg-gray-900 h-full fixed p-3">
      <p className='text-white font-bold opacity-30'>Klienci</p>
      <ul className="w-full bg-gray-900 text-white h-full overflow-y-auto max-h-screen mt-3">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="w-full">
            <button
              onClick={() => onClick(hotel)}
              className={classNames(
                "px-3 py-2 w-full text-left capitalize rounded-lg opacity-70 hover:opacity-100 hover:bg-gray-800 transition-all",
                {
                  "bg-blue-500 text-white opacity-100":
                    activeHotel?.id === hotel.id,
                },
              )}
            >
              {hotel.displayName || hotel.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
