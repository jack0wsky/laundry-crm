"use client";

import { useRouter } from "next/navigation";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useEffect } from "react";

export const HomePage = () => {
  const router = useRouter();

  const { hotels } = useListHotels();

  useEffect(() => {
    if (hotels.length === 0) return;

    router.push(`/${hotels[0].id}`);
  }, [hotels]);

  return null;
};
