"use client";

import { useRouter } from "next/navigation";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { useEffect } from "react";
import { useLaundryId } from "@/modules/utils/use-params";

export const HomePage = () => {
  const router = useRouter();

  const { hotels } = useListHotels();

  const laundryId = useLaundryId();

  useEffect(() => {
    if (hotels.length === 0) {
      return router.push(`/${laundryId}/customers`);
    } else {
      router.push(`/${laundryId}/${hotels[0].id}`);
    }
  }, [hotels]);

  return null;
};
