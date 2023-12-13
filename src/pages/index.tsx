import { useEffect } from "react";
import { useListHotels } from "@/frontend/api/laundry/hotels.controller";
import { AuthProvider } from "@/frontend/Auth.context";
import { Login } from "@/frontend/components/Login";
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
      <Login />
    </AuthProvider>
  );
}
