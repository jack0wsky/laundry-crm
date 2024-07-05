import Link from "next/link";
import { clsx } from "clsx";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { usePathname } from "next/navigation";
import { useLaundryId } from "@/modules/utils/use-params";
import { routes } from "@/modules/utils/routes";

export const HotelsListing = () => {
  const { hotels, loading } = useListHotels();

  const laundryId = useLaundryId();

  const pathname = usePathname();

  return (
    <>
      <p className="text-white font-bold opacity-30 mt-4">Hotele</p>

      {loading && (
        <div className="w-full flex flex-col">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && hotels.length > 0 && (
        <ul className="bg-gray-900 text-white h-full overflow-y-auto mt-3">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="w-full">
              <Link
                href={routes.hotelDetails.getPath(laundryId, hotel.id)}
                className={clsx(
                  "flex px-3 h-10 items-center w-full text-left capitalize rounded-lg transition-all",
                  pathname?.includes(hotel.id)
                    ? "bg-blue-800 text-white"
                    : "opacity-70 hover:opacity-100 hover:bg-gray-800",
                )}
              >
                {hotel.displayName || hotel.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
