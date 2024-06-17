"use client";

import { useEffect } from "react";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { LoginModal } from "@/modules/auth/LoginModal";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "CRM | L&apos;aqua",
// };

export default function Home() {
  const router = useRouter();

  const { hotels } = useListHotels();

  useEffect(() => {
    if (hotels.length === 0) return;

    router.push(`/${hotels[0].id}`);
  }, [hotels]);

  return <LoginModal />;
}
