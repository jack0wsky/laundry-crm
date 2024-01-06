import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { HotelsListing } from "@/modules/hotels/HotelsListing";
import { useRouter } from "next/router";

export const SideNavigation = () => {
  const router = useRouter();

  const activeUrl = (router.query.hotelId || router.route) as string;

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

      <HotelsListing activeUrl={activeUrl} />
    </nav>
  );
};
