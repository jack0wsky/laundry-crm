"use client";

import Link from "next/link";
import { ReactElement, ReactNode } from "react";
import { ReportsIcon } from "@/modules/shared/icons/reports.icon";
import { SuitcaseIcon } from "@/modules/shared/icons/suitcase.icon";
import { Route } from "@/modules/utils/routes";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@/modules/shared/icons/home.icon";
import { PlusIcon } from "@/modules/shared/icons/plus.icon";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { User } from "@/modules/shared/User";

export const Navigation = () => {
  const pathname = usePathname();

  const { hotels, loading } = useListHotels();

  return (
    <div className="flex flex-col justify-between w-[300px] bg-white h-screen fixed py-7 px-3">
      <nav className="flex flex-col w-full overflow-y-hidden pb-28">
        <NavItem
          icon={<ReportsIcon className="text-xl" />}
          href={Route.Turnovers}
          label="Obroty"
          active={pathname === Route.Turnovers}
        />
        <NavItem
          icon={<SuitcaseIcon className="text-xl" />}
          href={Route.Customers}
          label="Klienci"
          active={pathname === Route.Customers}
        />
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <NavItem
              icon={<HomeIcon className="text-xl" />}
              href=""
              label="Hotele"
              active={
                ![Route.Customers, Route.Turnovers].includes(pathname as Route)
              }
            />
            <button className="w-7 h-7 rounded-full flex justify-center items-center bg-palette-blue-600/10">
              <PlusIcon className="text-lg text-palette-blue-600" />
            </button>
          </div>

          <ul className="flex flex-col h-full overflow-y-auto pl-6">
            {hotels.map((hotel) => (
              <li
                key={hotel.id}
                className={clsx(
                  "border-l border-l-palette-gray-100 py-1",
                  pathname?.includes(hotel.id) && "border-l-palette-gray-800",
                )}
              >
                <Link
                  href={`/${hotel.id}`}
                  className={clsx(
                    "font-base pl-6",
                    pathname?.includes(hotel.id) && "font-bold",
                  )}
                >
                  {hotel.displayName || hotel.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <User />
    </div>
  );
};

interface NavItemProps {
  icon: ReactElement;
  href: string;
  label: string;
  active: boolean;
}

function NavItem({ icon, href, label, active }: NavItemProps) {
  return (
    <Link href={href} className="flex items-center gap-x-2 p-2">
      <div
        className={clsx(
          "w-9 h-9 flex justify-center items-center rounded-lg",
          active ? "bg-palette-blue-600/10 text-palette-blue-600" : 'bg-palette-gray-50',
        )}
      >
        {icon}
      </div>
      <span className={clsx("font-medium", active && "text-palette-blue-600")}>
        {label}
      </span>
    </Link>
  );
}
