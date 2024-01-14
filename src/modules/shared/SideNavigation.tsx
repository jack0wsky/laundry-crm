import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { HotelsListing } from "@/modules/hotels/HotelsListing";
import { useRouter } from "next/router";

export const SideNavigation = () => {
  const router = useRouter();

  const activeUrl = (router.query.hotelId || router.route) as string;

  const ROUTE = "/turnovers";

  return (
    <nav className="w-[300px] bg-gray-900 flex flex-col h-full fixed p-3">
      <Link
        href={ROUTE}
        className={classNames(
          "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all text-white",
          {
            "bg-blue-800": activeUrl === ROUTE,
            "opacity-70 hover:opacity-100 hover:bg-gray-800":
              activeUrl !== ROUTE,
          },
        )}
      >
        Obroty
      </Link>

      <HotelsListing activeUrl={activeUrl} />
    </nav>
  );
};
