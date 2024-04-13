import Link from "next/link";
import classNames from "classnames";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";

interface HotelsListingProps {
  activeUrl: string | null;
}

export const HotelsListing = ({ activeUrl }: HotelsListingProps) => {
  const { hotels, loading } = useListHotels();

  return (
    <>
      <p className="text-white font-bold opacity-30 mt-4">Hotele</p>

      {loading && (
        <div className="w-full flex flex-col">
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
          <div className="w-full h-7 my-2 rounded-lg bg-white/10 animate-pulse" />
        </div>
      )}

      {!loading && hotels.length > 0 && (
        <ul className="bg-gray-900 text-white h-full overflow-y-auto mt-3">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="w-full">
              <Link
                href={`/${hotel.id}`}
                className={classNames(
                  "flex px-3 h-10 items-center w-full text-left capitalize rounded-lg transition-all",
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
      )}
    </>
  );
};
