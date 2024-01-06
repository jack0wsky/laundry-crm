import { useEffect } from "react";
import { useListHotels } from "@/modules/hotels/api/hotels.controller";
import { AuthProvider } from "@/modules/auth/Auth.context";
import { LoginModal } from "@/modules/auth/LoginModal";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const { hotels } = useListHotels();

  useEffect(() => {
    if (hotels.length === 0) return;

    router.push(`/${hotels[0].id}`);
  }, [hotels]);

  return (
    <AuthProvider>
      <LoginModal />
    </AuthProvider>
  );
}
