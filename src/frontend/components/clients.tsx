import classNames from "classnames";
import { Hotel } from "@/shared/supabase";
import Link from "next/link";

interface ClientsProps {
  hotels: Hotel[];
  activeUrl: string | null;
}

export const Clients = ({ hotels, activeUrl }: ClientsProps) => {
  return (
    <nav className="w-[300px] bg-gray-900 h-screen fixed p-3">
      <Link
        href="/panel"
        className={classNames(
          "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all text-white",
          {
            "bg-blue-800": activeUrl === "/panel",
            "opacity-70 hover:opacity-100 hover:bg-gray-800":
              activeUrl !== "/panel",
          },
        )}
      >
        Panel główny
      </Link>
      <p className="text-white font-bold opacity-30 mt-4">Hotele</p>
      <ul className="w-full bg-gray-900 text-white h-5/6 overflow-y-scroll max-h-screen mt-3">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="w-full h-min">
            <Link
              href={`/${hotel.id}`}
              className={classNames(
                "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all",
                {
                  "bg-blue-800 text-white": activeUrl === hotel.id,
                  "opacity-70 hover:opacity-100 hover:bg-gray-800":
                    activeUrl !== hotel.id,
                },
              )}
            >
              {hotel.displayName || hotel.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
