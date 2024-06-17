import React, { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { HotelsListing } from "@/modules/hotels/HotelsListing";
import { useRouter } from "next/router";
import { AddHotelModal } from "@/modules/hotels/add-hotel/AddHotelModal";
import { CurrentUser } from "@/modules/shared/CurrentUser";
import { Route } from "@/modules/utils/routes";

export const SideNavigation = () => {
  const router = useRouter();
  const [openAddHotelModal, setOpenAddHotelModal] = useState(false);

  const activeUrl = (router.query.hotelId || router.route) as string;

  return (
    <nav className="w-[300px] bg-gray-900 flex flex-col h-full fixed p-3">
      <CurrentUser />
      <Link
        href={Route.Turnovers}
        className={clsx(
          "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all text-white",
          activeUrl === Route.Turnovers
            ? "bg-blue-800"
            : "opacity-70 hover:opacity-100 hover:bg-gray-800",
        )}
      >
        Obroty
      </Link>

      <Link
        href={Route.Customers}
        className={clsx(
          "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all text-white",
          activeUrl === Route.Customers
            ? "bg-blue-800"
            : "opacity-70 hover:opacity-100 hover:bg-gray-800",
        )}
      >
        Klienci
      </Link>

      <HotelsListing activeUrl={activeUrl} />

      {openAddHotelModal && (
        <AddHotelModal
          open={openAddHotelModal}
          onClose={() => setOpenAddHotelModal(false)}
        />
      )}

      <button
        onClick={() => setOpenAddHotelModal(true)}
        className="text-white px-5 py-2.5 w-full border border-blue-600 rounded-lg mt-5"
      >
        Dodaj hotel
      </button>
    </nav>
  );
};
