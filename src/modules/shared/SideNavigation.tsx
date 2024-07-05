"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { HotelsListing } from "@/modules/hotels/HotelsListing";
import { usePathname } from "next/navigation";
import { AddHotelModal } from "@/modules/hotels/add-hotel/AddHotelModal";
import { CurrentUser } from "@/modules/shared/CurrentUser";
import { routes } from "@/modules/utils/routes";
import { useLaundryId } from "@/modules/utils/use-params";

export const SideNavigation = () => {
  const pathname = usePathname();
  const laundryId = useLaundryId();
  const [openAddHotelModal, setOpenAddHotelModal] = useState(false);

  return (
    <nav className="w-[300px] bg-gray-900 flex flex-col h-full fixed p-3">
      <CurrentUser />
      <Link
        href={routes.turnovers.getPath(laundryId)}
        className={clsx(
          "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all text-white",
          pathname === routes.turnovers.getPath(laundryId)
            ? "bg-blue-800"
            : "opacity-70 hover:opacity-100 hover:bg-gray-800",
        )}
      >
        Obroty
      </Link>

      <Link
        href={routes.customers.getPath(laundryId)}
        className={clsx(
          "flex px-3 py-2 w-full text-left capitalize rounded-lg transition-all text-white",
          pathname === routes.customers.getPath(laundryId)
            ? "bg-blue-800"
            : "opacity-70 hover:opacity-100 hover:bg-gray-800",
        )}
      >
        Klienci
      </Link>

      <HotelsListing />

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
