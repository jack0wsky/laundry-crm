import { useState } from "react";
import { useCheckSession } from "@/modules/auth/auth.controller";
import { DownArrowIcon } from "@/modules/shared/icons/down-arrow.icon";
import { clsx } from "clsx";
import { LogoutIcon } from "@/modules/shared/icons/logout.icon";
import Image from "next/image";

export const User = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useCheckSession();

  return (
    <div className="flex flex-col w-full mt-12 transition-all px-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <div className="h-11 w-11 border border-palette-gray-100 rounded-lg flex justify-center items-center">
            <Image
              src="/laqua-logo.png"
              width={28}
              height={28}
              alt="Laqua logo"
            />
          </div>
          <p className="text-palette-gray-800">{user?.email}</p>
        </div>

        <button
          onClick={() => setToggle((prevState) => !prevState)}
          className="w-7 h-7 rounded-full bg-palette-gray-50 flex items-center justify-center"
        >
          <DownArrowIcon className={clsx(toggle && "rotate-180")} />
        </button>
      </div>

      {toggle && (
        <button className="flex items-center mt-3 gap-x-4 text-palette-red-500 p-1 group">
          <div className="w-9 h-9 flex justify-center items-center bg-palette-red-100 group-hover:bg-palette-red-500 rounded-lg transition-colors">
            <LogoutIcon className="text-xl group-hover:text-white" />
          </div>
          <span className="group-hover:font-medium">Wyloguj</span>
        </button>
      )}
    </div>
  );
};
